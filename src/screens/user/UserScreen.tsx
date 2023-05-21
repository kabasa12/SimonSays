import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { INavigationForScreen } from '../types';
import { selectPlayerName, setPlayerName } from '../../store/gameSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'black',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'red',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'white',
    },
    button: {
        flex: 1,
        aspectRatio: 1,
        margin: 5,
        maxHeight: 100,
        maxWidth: 100,
    },
    txt: {
        fontSize: 30,
        fontWeight: 'bold',
    }
});

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