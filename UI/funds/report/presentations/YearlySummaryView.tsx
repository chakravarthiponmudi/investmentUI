import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { YEAR_WISE_MONTHLY_DATA, MONTHLY_DATA, YEARLY_MONTHLY_FOLIO_DATA } from '../SummartDataTypes';


type Props = {
    year: string;
    amount: number;
    monthlyData: YEAR_WISE_MONTHLY_DATA;
    allFolioMonthlyData: YEARLY_MONTHLY_FOLIO_DATA;
    getMonthlySummary: any;
    getMonthlySummaryDetails: any;
}

const orderedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const getOrderedMonths = (months: string[]) => {
    return orderedMonths.filter((currentMonth) => {
        return months.includes(currentMonth);
    })
}

type MonthlySummaryViewProps = {
    year: string;
    monthlyData: MONTHLY_DATA;
    allFolioMonthlyData: YEARLY_MONTHLY_FOLIO_DATA;
    getMonthlySummaryDetails: any;
}

const MonthlySummaryView = ({ year, monthlyData, getMonthlySummaryDetails, allFolioMonthlyData }: MonthlySummaryViewProps) => {

    const months = getOrderedMonths(Object.keys(monthlyData));

    const isAllFolioDataPresent = (year: string, month: string) => {
        if (allFolioMonthlyData[year] != undefined && allFolioMonthlyData[year][month] != undefined) {
            return true;
        }
        return false;
    }


    return (
        <View>
            {months.map((month) => {
                return <View key={month}>
                    <TouchableWithoutFeedback  onPress={() => getMonthlySummaryDetails(year, month)}>
                        <View style={[style.monthlyDetailsContainer]}>
                            <Text >{month} </Text>
                            <Text>{Math.round(monthlyData[month])}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {isAllFolioDataPresent(year,month) && <FolioDataSummaryView year={year} month={month} foliosData={allFolioMonthlyData[year][month]}/>}
                </View>
            })}
        </View>
    )

}


const FolioDataSummaryView = ({ year, month, foliosData }: any) => {
    const amcs = Object.keys(foliosData);

    return (
        <View>
            {
                amcs.map((amc) => {
                    return <View key={foliosData[amc].folio_id}>
                        <View style={style.folioContainer}>
                            <Text>{amc}</Text>
                            <Text>{Math.round(foliosData[amc].totalInvestment)}</Text>
                        </View>
                    </View>
                })
            }
        </View>
    )
}

const YearlySummaryView = ({ year, monthlyData, amount, getMonthlySummary, getMonthlySummaryDetails, allFolioMonthlyData }: Props) => {

    let isEmptyMonthlyData = true
    if (Object.keys(monthlyData).length != 0 && monthlyData[year] != undefined) {
        isEmptyMonthlyData = false
    }


    return (
        <TouchableWithoutFeedback onPress={() => getMonthlySummary(year)}>
            <View>
                <View style={style.container}>
                    <Text>{year}</Text>
                    <Text >{Math.round(amount)}</Text>
                </View>
                <View style={[style.monthlyContainer, isEmptyMonthlyData && style.hideContainer]}>
                    {isEmptyMonthlyData ? <View></View> : <MonthlySummaryView allFolioMonthlyData={allFolioMonthlyData} year={year} monthlyData={monthlyData[year]} getMonthlySummaryDetails={(year, month) => getMonthlySummaryDetails(year, month)} />}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginVertical: 6,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffa069',
        borderRadius: 10,
    },
    monthlyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginVertical: 6,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#afa069',
        borderRadius: 10,
    },
    monthlyDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginVertical: 6,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#00a069',
        borderRadius: 10,
    },
    folioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginVertical: 6,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 50,
        paddingRight: 10,
        backgroundColor: '#34ac00',
        borderRadius: 10,
    },
    hideContainer: {
        display: 'none'
    }
});

export default YearlySummaryView;