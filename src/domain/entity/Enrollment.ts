import ClassRoom from "./ClassRoom";
import EnrollmentCode from "./VOs/EnrollmentCode";
import Invoice from "./Invoice";
import InvoiceEvent from "./InvoiceEvent";
import Level from "./Level";
import Module from "./Module";
import Student from "./Student";

export default class Enrollment {
    student: Student;
    level: Level;
    module: Module;
    classRoom: ClassRoom;
    code: EnrollmentCode;
    sequence: number
    issueDate: Date;
    installments: number;
    status: string;
    invoices: Invoice[];

    constructor(student: Student, level: Level, module: Module, classRoom: ClassRoom, issueDate: Date, sequence: number, installments: number = 12) {
        if (student.getAge() < module.minimumAge) throw new Error('Student below minimum age');
        if (classRoom.isFinished(issueDate)) throw new Error('Class is already finished');
        if (classRoom.getProgress(issueDate) > 25) throw new Error('Class is already started');
        this.student = student;
        this.level = level;
        this.module = module;
        this.classRoom = classRoom;
        this.sequence = sequence;
        this.issueDate = issueDate;
        this.code = new EnrollmentCode(level.code, module.code, classRoom.code, issueDate, sequence);
        this.invoices = [];
        this.installments = installments;
        this.status = 'active';
        this.generateInvoices();
    }

    generateInvoices() {
        let installmentAmount = Math.trunc((this.module.price/this.installments) * 100) / 100;
        for (let i = 1; i <= this.installments; i++) {
            this.invoices.push(new Invoice(this.code.value, i, this.issueDate.getFullYear(), installmentAmount));
        }
        const total = this.invoices.reduce((total, invoice) => {
            total += invoice.amount;
            return total;
        }, 0);
        const rest = Math.trunc((this.module.price - total) * 100) / 100;
        this.invoices[this.installments - 1].amount = installmentAmount + rest;
    }

    getInvoiceBalance(): number {
        return this.invoices.reduce((total, invoice) => {
            total += invoice.getBalance();
            return total;
        }, 0);
    }

    getInvoice(month: number, year: number): Invoice | undefined {
        const invoice = this.invoices.find(invoice => invoice.month === month && invoice.year === year);
        return invoice;
    }

    payInvoice(month: number, year: number, amount: number, paymentDate: Date) {
        const invoice = this.getInvoice(month, year);
        if (!invoice) { throw new Error('Invalid invoice'); }
        if (invoice.getStatus(paymentDate) === 'overdue') {
            const penalty =  invoice.getPenalty(paymentDate);
            const interests =  invoice.getInterests(paymentDate);
            invoice.addEvents(new InvoiceEvent('penalty', penalty));
            invoice.addEvents(new InvoiceEvent('interests', interests));
        }
        invoice.addEvents(new InvoiceEvent('payment', amount));
    }
}