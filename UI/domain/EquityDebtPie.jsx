import React from "react";
import { View, Text } from "react-native";
import { VictoryPie } from 'victory-native';

const EquityDebtPie = (props) => {

    return (
        <VictoryPie
            colorScale={[ "orange",  "navy" , "red"]}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            data={props.data}
        />
            
    )
}

export default EquityDebtPie;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       