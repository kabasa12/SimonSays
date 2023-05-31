import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { INavigationForScreen } from '../types';
import styles from './gameScreenStyles';
import {
    handleButtonPress,
    handleStartPress,
    resetGame,
    selectActiveButton,
    selectIsFailed,
    selectIsPlaying,
    selectScore
} from '../../store/gameSlice';

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