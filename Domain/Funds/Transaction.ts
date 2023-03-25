export class Transaction {
    private _transactionDate: string;
    private _transactionType: string;
    private _units: number;
    private _amount: number;
    private _nav: number;
    private _id: string;
    private _charges: boolean;

    public get transactionDate() {
        return this._transactionDate;
    }

    public set transactionDate(transactionDate: string) {
        this._transactionDate = transactionDate;
    }

    public get transactionType() {
        return this._transactionType;
    }

    public set transactionType(transactionType: string) {     
        this._transactionType = transactionType;
    }

    public get units() {        
        return this._units;
    }

    public set units(units: number) {     
        this._units = units;
    }

    public get amount() {     
        return this._amount;
    }

    public set amount(amount: number) {    
        this._amount = amount;
    }

    public get nav() {     
        return this._nav;
    }

    public set nav(nav: number) {     
        this._nav = nav;
    }

    public get id() {     
        return this._id;
    }

    public set id(id: string) {     
        this._id = id;
    }

    public get charges() {
        return this._charges;
    }

    public set charges(charges: boolean) {
        this._charges = charges;
    }
}   