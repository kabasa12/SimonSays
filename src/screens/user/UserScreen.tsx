import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { INavigationForScreen } from '../types';
import { selectPlayerName, setPlayerName } from '../../store/gameSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './userScreenStyles';

const UserScreen = ({ navigation }: INavigationForScreen) => {
    const playerName = useAppSelector(selectPlayerName);
    const dispatch = useAppDispatch();

    const handleStartPress = () => {
        navigation.navigate('Game');
    };

    const handleNameChange = (name: string) => {
        dispatch(dispatch(setPlayerName(name)));
    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={playerName}
                onChangeText={handleNameChange}
                placeholder="Enter your name"
                placeholderTextColor='gray'
            />
            <TouchableOpacity onPress={handleStartPress} disabled={!playerName} style={styles.button}>
                <Text style={[styles.txt, !playerName ? { color: 'gray' } : { color: 'white' }]}>Submit</Text>
            </TouchableOpacity>
        </View>
    );

}

export default UserScreen;