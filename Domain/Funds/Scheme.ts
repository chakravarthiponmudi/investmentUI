import { Transaction } from "./Transaction";
export class Scheme {

    private _transaction:[Transaction];

    constructor(private _type : SchemeType,
        private _advisor: String,
        private _isin: String,
        private _folioId : number,
        private _name : String,
        private _marketValue: number

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
}

export enum SchemeType {
    DEBT = "DEBT",
    EQUITY = "EQUITY"
}