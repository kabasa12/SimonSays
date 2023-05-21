import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addToSequence, clearSequence, increaseScore, setPlayerName } from '../store/gameSlice';
import soundUtils from '../utils/soundUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Navigation = {
    navigate: (screen: string) => void;
};

type Result = {
    playerName: string;
    score: number;
};

const useSimonGame = (navigation: Navigation) => {
    const dispatch = useDispatch();
    const { sequence, playerName } = useSelector((state: RootState) => state.game);
    const score = useSelector((state: RootState) => state.game.score);
    const [isPlaying, setIsPlaying] = useState(false);
    const [userSequence, setUserSequence] = useState<string[]>([]);
    const [results, setResults] = useState<Result[]>([])

    // useEffect(() => {
    //     loadResults();
    // }, []);

    // useEffect(() => {
    //     const loadResults = async () => {
    //         try {
    //             const storedResults = await AsyncStorage.getItem('results');
    //             const parsedResults: Result[] = storedResults ? JSON.parse(storedResults) : [];
    //             setResults(parsedResults);
    //         } catch (err) {
    //             console.log('Failed to load results', err);
    //         }
    //     };

    //     loadResults();
    //     // if (isPlaying) {
    //     //     const handler = setTimeout(addToSimonSequence, 0);
    //     //     return () => clearTimeout(handler);
    //     // }
    // }, []);

    // useEffect(() => {
    //     const handleUserSequence = (userSequence: string[]) => {
    //         if (userSequence.length > 0) {
    //             const lastIndex = userSequence.length - 1;
    //             console.log('handleUserSequence lastindex', lastIndex)
    //             console.log(userSequence);
    //             console.log(sequence)
    //             if (userSequence[lastIndex] !== sequence[lastIndex])
    //                 handleFail();
    //             else if (userSequence.length === sequence.length) {
    //                 dispatch(increaseScore());
    //                 setUserSequence([]);
    //                 setTimeout(addToSimonSequence, 1000);
    //             }
    //         }
    //     };
    //     handleUserSequence(userSequence);
    // }, [userSequence, sequence]);


    // const addToSimonSequence = () => {
    //     const colors = ['red', 'green', 'blue', 'yellow'];
    //     const randomColor = colors[Math.floor(Math.random() * colors.length)];
    //     console.log('addToSimonSequence ', randomColor)
    //     dispatch(addToSequence(randomColor));
    //     console.log('after addToSimonSequence', sequence)
    //     soundUtils.playSound(randomColor);
    // };

    // const handleButtonPress = (color: string) => {
    //     console.log('handleButtonPress 1', color);
    //     if (!isPlaying) return;
    //     console.log('handleButtonPress 2')
    //     dispatch(clearSequence());
    //     setUserSequence((prevSequence) => [...prevSequence, color])
    //     soundUtils.playSound(color);
    // };

    // const handleStartPress = () => {
    //     console.log('handleStartPress 1')
    //     setIsPlaying(true);
    //     addToSimonSequence()
    // };

    // const handleFail = () => {
    //     console.log('handleFail 1')
    //     setIsPlaying(false);
    //     saveResult({ playerName, score });
    //     navigation.navigate('Results');
    // };




    // const saveResult = async (result: Result) => {
    //     try {
    //         const storedResults = await AsyncStorage.getItem('results');
    //         const parsedResults: Result[] = storedResults ? JSON.parse(storedResults) : [];

    //         const existingIndex = parsedResults.findIndex((r) => r.playerName === result.playerName);
    //         if (existingIndex !== -1) {
    //             parsedResults[existingIndex].score = result.score;
    //         } else {
    //             parsedResults.push(result);
    //         }

    //         const updatedResults = parsedResults.slice(-10);
    //         await AsyncStorage.setItem('results', JSON.stringify(updatedResults));
    //         setResults(updatedResults);
    //     } catch (err) {
    //         console.log('Failed to save results', err);
    //     }
    // };

    const handleNameChange = (name: string) => {
        dispatch(setPlayerName(name))
    }

    return {
        score,
        results,
        isPlaying,
        playerName,
        //handleButtonPress,
        //handleStartPress,
        handleNameChange,
    }
}

export default useSimonGame;