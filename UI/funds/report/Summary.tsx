import React, { useEffect } from "react";
import { View, Text } from "react-native";
import config from "../../config/Config";
import YearlySummaryView from "./presentations/YearlySummaryView";
import { FOLIO_DATA, YEARLY_MONTHLY_FOLIO_DATA, YEAR_WISE_DATA, YEAR_WISE_MONTHLY_DATA } from "./SummartDataTypes";

type Props = {
    route: any,
    navigation: any,
}



const Summary = ({route, navigation}: Props) => {

    const [data , setData ] = React.useState<YEAR_WISE_DATA>({});
    const [ monthlyData , setMonthlyData ] = React.useState<YEAR_WISE_MONTHLY_DATA>({});
    const [ folioData, setFolioData ] = React.useState<YEARLY_MONTHLY_FOLIO_DATA>({});

    const getYearlySummary = async () => {
        try {
            const response = await fetch(`http://${config.server.host}:${config.server.port}/summary/`);
            const jResponse = await response.json();
            setData(jResponse);
        } catch (error) {
            console.error(error);
        }
    }

    const getMonthlySummaryDetails = async(year: string, month: string) => {
        try {
            const data = {
                ...folioData
            }
            
            if (data[year] == null) {
                data[year] = {};
                data[year][month] = {};
                const response = await fetch(`http://${config.server.host}:${config.server.port}/summary/${year}/${month}`);
                const jResponse:Record<string, FOLIO_DATA> = await response.json();
                data[year][month] = jResponse;
                setFolioData(data);
            } else if (data[year][month] == null) {
                data[year][month] = {};
                const response = await fetch(`http://${config.server.host}:${config.server.port}/summary/${year}/${month}`);
                const jResponse:Record<string, FOLIO_DATA> = await response.json();
                data[year][month] = jResponse;
                setFolioData(data);
            } else {
                console.log('Data already present', year,' ', month, ' ', JSON.stringify(data));
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    const getMontlySummary = async (year: number) => {
        if (monthlyData[year]) {
            return;
        }
        try {
            const response = await fetch(`http://${config.server.host}:${config.server.port}/summary/${year}`);
            const jResponse = await response.json();
            const data = {
                ...monthlyData,
                [year]:jResponse
            }
            setMonthlyData(data );
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getYearlySummary();
    }, [])

    const getYearlySummaryView = (data) => {
        const years = Object.keys(data);
        return years.map((year) => {
            const amount = data[year];
            return <YearlySummaryView key={year} year={year} amount={amount}
                getMonthlySummary={(year) => getMontlySummary(year)}
                getMonthlySummaryDetails={(year, month) => getMonthlySummaryDetails(year, month)}
                monthlyData={monthlyData} allFolioMonthlyData={folioData}
            />  
        })
    }
    return (
        <View>
            {data == null ? '' : getYearlySummaryView(data)}
        </View>
    )
}

export default Summary;