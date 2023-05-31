import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAppSelector } from '../../store/hook';
import { selectResults } from '../../store/gameSlice';
import { INavigationForScreen } from '../types';
import styles from './resultsScreenStyles';

const ResultsScreen = ({ navigation }: INavigationForScreen) => {
    const results = useAppSelector(selectResults);

    const handleNewGamePress = () => {
        navigation.navigate('Game');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Results</Text>
            <View style={styles.resultsContainer}>
                {results.map((result, index) => (
                    <Text key={index} style={styles.result}>
                        {`${result.playerName}: ${result.score}`}
                    </Text>
                ))}
            </View>
            <Button title="New Game" onPress={handleNewGamePress} color={'red'} />
        </View>
    );
}

export default ResultsScreen;