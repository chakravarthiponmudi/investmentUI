import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { Transaction } from "../../domain/funds/Transaction";
import config from "../config/Config";
import TransactionPresentation from "./TransactionPresentation";

type Props = {
    route: any,
    navigation: any,    
};
 
const TransactionView = ({route, navigation} :Props) => {

    const [transactions, setTransactions] = React.useState<Transaction[]>([]);

    const getTransactions = async (schemeId: number): Promise<void> => {
        try {
            const response = await fetch(`http://${config.server.host}:${config.server.port}/schemes/${schemeId}/transactions`);
            const transactions: [Transaction] = await response.json();
            setTransactions(transactions);
        }catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getTransactions(route.params.schemeId)
    }, [])

    return (
        <ScrollView>
            <TransactionPresentation transactions={transactions} />
        </ScrollView>
    )
}

export default TransactionView;