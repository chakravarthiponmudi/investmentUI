type YEAR = string;
type MONTH = string;
type AMOUNT = number;
export type MONTHLY_DATA = Record<MONTH, AMOUNT>;
export type YEAR_WISE_MONTHLY_DATA = Record<YEAR, MONTHLY_DATA>;
export type YEAR_WISE_DATA = Record<YEAR, AMOUNT>;

export type FOLIO_DATA = {
    folio_id : number;
    totalInvestment: number;
    amc: string;
    year: string;
    month: string;
}
type AMC =string;
export type YEARLY_MONTHLY_FOLIO_DATA = Record<YEAR,Record<MONTH,Record<AMC,FOLIO_DATA>>>;