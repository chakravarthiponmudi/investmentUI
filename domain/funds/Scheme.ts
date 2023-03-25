import { Transaction } from "./Transaction";
export class Scheme {

    private _transaction:[Transaction];
    close: number;

    constructor(private _type : SchemeType,
        private _advisor: string,
        private _isin: string,
        private _folioId : number,
        private _name : string,
        private _marketValue: number,
        private _schemeCloseDate: string

        ) {}

    
    public get type() {
        return this._type;
    }

    public get advisor() {
        return this._advisor;
    }

    public get isin() {
        return this._isin;
    }

    public get folioId() {
        return this._folioId;
    }
    public get scheme() {
        return this._name;
    }

    public get transaction() {
        return this._transaction;
    }

    public set transaction(t:[Transaction]){
        this.transaction = t;
    }

    public get marketValue() {
        return this._marketValue;
    }

    public get schemeCloseDate() {
        return this._schemeCloseDate;
    }
}

export enum SchemeType {
    DEBT = "DEBT",
    EQUITY = "EQUITY"
}