import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Animated, LayoutAnimation, Platform} from 'react-native';

type Props = {
    onPress: any
    toggeState: boolean
}

const ToggleButton = (props: Props) => {
  const [isOn, setIsOn] = useState(props.toggeState);
  const [width, setWidth] = useState(new Animated.Value(20));

  const handlePress = async () => {
    if (!isOn) {
        return;
    }
    LayoutAnimation.configureNext({
        duration: 500,
        update: {
          type: LayoutAnimation.Types[Platform.OS === 'ios' ? 'easeInEaseOut' : 'linear'],
        },
      });
    
    let newState = !isOn;

    await props.onPress(newState);
    setIsOn(newState);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View style={{ borderRadius: 5, width: width, height: 10, backgroundColor: isOn ? 'green': 'grey' }} />
      </TouchableOpacity>
      <Text style={{ marginLeft: 5, width:40 }}>{isOn ? 'Open' : 'Close'}</Text>
    </View>
  );
};


export default ToggleButton;
