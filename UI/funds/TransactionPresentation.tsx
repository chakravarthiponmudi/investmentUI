import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Transaction } from "../../domain/funds/Transaction";

type Props = {
    transactions: Transaction[],
};

const TransactionPresentation = ({ transactions }: Props) => {
    return (
        <View>
            <TransactionHeader />
            {transactions.filter(t => !t.charges).map((transaction) => (
                <TransactionDetails key={transaction.id} transaction={transaction} />
            ))}
        </View>
    );
}

const TransactionHeader = () => {
    return (
        <View style={style.transactionheader}>
            <Text style={style.transaction__date_header}>Date</Text>
            <Text style={style.transaction__description_header}>Description</Text>
            <Text style={style.transaction__amount_header}>Amount</Text>
            <Text style={style.transaction__units_header}>Units</Text>
        </View>
    );
}


const TransactionDetails = ({ transaction }) => {
    return (
            <View style={style.transaction}>
                <Text style={style.transaction__date}>
                    {new Date(transaction.date).toLocaleDateString()}
                </Text>
                <Text style={style.transaction__description}>{transaction.description}</Text>
                <Text style={style.transaction__amount}>
                    {transaction.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                    })}
                </Text>
                <Text style={style.transaction__units}> {transaction.units}
                </Text>
            </View>

    );
}

const style = StyleSheet.create({
    transactionheader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        backgroundColor: "yellow",
    },
    transaction__date_header: {
        flex: 1,
        textAlign: "left",
        fontSize: 20,
        color: "red",
    },
    transaction__description_header: {
        flex: 2,
        textAlign: "left",
        fontSize: 20,
        color: "red",
    },
    transaction__amount_header: {
        flex: 1,
        textAlign: "right",
        fontSize: 20,
        color: "red",
    },
    transaction__units_header: {
        flex: 1,
        textAlign: "right",
        fontSize: 20,
        color: "red",
    },
    transaction: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },

    transaction__date: {
        flex: 1,
        textAlign: "left",
    },
    transaction__description: {
        flex: 2,
        textAlign: "left",
    },
    transaction__amount: {
        flex: 1,
        textAlign: "right",
    },
    transaction__units: {
        flex: 1,
        textAlign: "right",
    },
});

export default TransactionPresentation;