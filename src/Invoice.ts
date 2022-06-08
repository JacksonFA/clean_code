import Clonable from "./Clonable";
import InvoiceEvent from "./InvoiceEvent";

export default class Invoice implements Clonable {
    code: string;
    month: number;
    year: number;
    amount: number;
    events: InvoiceEvent[];

    constructor(code: string, month: number, year: number, amount: number) {
        this.code = code;
        this.month = month;
        this.year = year;
        this.amount = amount;
        this.events = [];
    }

    addEvents(invoiceEvent: InvoiceEvent) {
        this.events.push(invoiceEvent);
    }

    getBalance() {
        return this.events.reduce((total, event) => {
            total -= event.amount;
            return total;
        }, this.amount);
    }

    clone() {
        return JSON.parse(JSON.stringify(this));
    }
}