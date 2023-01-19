import { Scheme } from "./Scheme";
export class Folio {
   
    private _folio : string;

    private _investmentAmount: number;
 
    constructor(private _id: number, private _amc:string, private _schemes: [Scheme]) {

    }

    public get id(){
        return this._id;
    }

    public get amc() {
        return this._amc;
    }

    public get schemes() {
        return this._schemes;
    }

    public set schemes(schemes: [Scheme]) {
        this._schemes = schemes;
    }

    public get investmentAmount() {
        return this._investmentAmount;
    }

    public set investmentAmount(investmentAmount : number) {
        this._investmentAmount = investmentAmount;
    }

    public get folio() {
        return this._folio;
    }

    public set folio(folio : string) {
        this._folio = folio;
    }

}

