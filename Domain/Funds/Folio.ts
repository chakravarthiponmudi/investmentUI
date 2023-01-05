import { Scheme } from "./Scheme";
export class Folio {
 
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

}

