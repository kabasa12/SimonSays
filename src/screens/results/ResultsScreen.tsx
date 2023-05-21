import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAppSelector } from '../../store/hook';
import { selectResults } from '../../store/gameSlice';
import { INavigationForScreen } from '../types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    resultsContainer: {
        marginBottom: 20,
    },
    result: {
        fontSize: 24,
        marginBottom: 10,
        color: 'white'
    },
});

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