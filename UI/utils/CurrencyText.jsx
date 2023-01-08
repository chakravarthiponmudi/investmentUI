import React from 'react';
import {Text} from 'react-native'
import { formatCurrency } from 'react-native-format-currency';
type Props = {
    currencyCode : String,
    amount: Number,
    style: any
}

const CurrencyText = ({currencyCode, amount, style}:Props) => {
    const [formattedCurrency] = formatCurrency({amount:amount, code: currencyCode});
    return (
        <Text style={style}>
            {formattedCurrency}
        </Text>
    )
}

export default CurrencyText;