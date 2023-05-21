import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { INavigationForScreen } from '../types';

import {
    handleButtonPress,
    handleStartPress,
    resetGame,
    selectActiveButton,
    selectIsFailed,
    selectIsPlaying,
    selectScore
} from '../../store/gameSlice';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'//'#E5E5E5',
    },
    circle: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 100,
        maxHeight: 100,
        maxWidth: 100,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        top: -230
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    startBtnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    button: {
        flex: 1,
        aspectRatio: 1,
        margin: 5,
    },
    redButton: {
        backgroundColor: '#FF5252',
        borderTopLeftRadius: 200,
        borderBottomRightRadius: 150
    },
    greenButton: {
        backgroundColor: '#66BB6A',
        borderTopRightRadius: 200,
        borderBottomLeftRadius: 150
    },
    blueButton: {
        backgroundColor: '#448AFF',
        borderBottomLeftRadius: 200,
        borderTopRightRadius: 150
    },
    yellowButton: {
        backgroundColor: '#FFC107',
        borderBottomRightRadius: 200,
        borderTopLeftRadius: 150
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    footerText: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold'
    },
    footer: {
        position: 'absolute',
        bottom: 10,
        textAlign: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        maxHeight: 20,
    }
});


const GameScreen = ({ navigation }: INavigationForScreen) => {
    const score = useAppSelector(selectScore);
    const isPlaying = useAppSelector(selectIsPlaying);
    const isFailed = useAppSelector(selectIsFailed);
    const activeButton = useAppSelector(selectActiveButton);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isPlaying && isFailed)
            navigation.navigate('Results')
    }, [isPlaying]);

    useEffect(() => {
        const backHandle = () => {
            dispatch(resetGame());
            return false;
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backHandle);
        return () => backHandler.remove();
    }, []);

    const handleButtonPressWithAnimation = (color: string) => {
        dispatch(handleButtonPress(color));
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.redButton, activeButton === 'red' ? { opacity: 0.5 } : null]}
                    onPress={() => handleButtonPressWithAnimation('red')}
                />
                <TouchableOpacity
                    style={[styles.button, styles.greenButton, activeButton === 'green' ? { opacity: 0.5 } : null]}
                    onPress={() => handleButtonPressWithAnimation('green')}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.blueButton, activeButton === 'blue' ? { opacity: 0.5 } : null]}
                    onPress={() => handleButtonPressWithAnimation('blue')}
                />
                <TouchableOpacity
                    style={[styles.button, styles.yellowButton, activeButton === 'yellow' ? { opacity: 0.5 } : null]}
                    onPress={() => handleButtonPressWithAnimation('yellow')}
                />
            </View>
            <TouchableOpacity
                style={[styles.circle, isPlaying ? { opacity: 0 } : null]}
                onPress={() => dispatch(handleStartPress())}
                disabled={isPlaying}>
                <Text style={styles.startBtnText}>start</Text>
            </TouchableOpacity>
            <Text style={styles.score}>Score: {score}</Text>
            <View style={styles.footer}>
                <Text style={styles.footerText}>{'Created By Yaniv Kabesa'}</Text>
            </View>
        </View>
    );
};

export default GameScreen;