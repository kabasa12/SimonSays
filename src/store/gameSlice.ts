import { createSlice, PayloadAction, createAsyncThunk, ThunkDispatch, Action } from '@reduxjs/toolkit';
import { RootState, AppThunk, store } from '../store'
import AsyncStorage from '@react-native-async-storage/async-storage';
import soundUtils from '../utils/soundUtils';
import { Result, Status, initialState } from './types';

export const selectUserSequence = (state: RootState) => state.game.userSequence;
export const selectSequence = (state: RootState) => state.game.sequence;
export const selectIsPlaying = (state: RootState) => state.game.isPlaying;
export const selectPlayerName = (state: RootState) => state.game.playerName;
export const selectScore = (state: RootState) => state.game.score;
export const selectResults = (state: RootState) => state.game.results;
export const selectActiveButton = (state: RootState) => state.game.activeButton;
export const selectIsFailed = (state: RootState) => state.game.isFailed;

const saveResultAsync = createAsyncThunk(
  "saveResults",
  async (result: Result) => {
    try {
      const storedResults = await AsyncStorage.getItem('results');
      const parsedResults: Result[] = storedResults ? JSON.parse(storedResults) : [];

      const existingIndex = parsedResults.findIndex((r) => r.playerName === result.playerName);
      if (existingIndex !== -1) {
        parsedResults[existingIndex].score = result.score;
      } else {
        parsedResults.push(result);
      }

      const updatedResults = parsedResults.slice(-10);
      await AsyncStorage.setItem('results', JSON.stringify(updatedResults));
      return updatedResults;
    } catch (err) {
      console.log('Failed to save results', err);
    }
  });

export const handleUserSequence =
  (): AppThunk => async (dispatch, getState) => {
    const userSequence = selectUserSequence(getState())

    if (userSequence.length > 0) {
      const lastIndex = userSequence.length - 1;
      const currenSequence = selectSequence(getState())

      if (userSequence[lastIndex] !== currenSequence[lastIndex])
        handleFail(dispatch, getState);
      else if (userSequence.length === currenSequence.length) {
        dispatch(increaseScore());
        dispatch(clearUserSequence());
        await delay(150);
        await addToSimonSequence(dispatch, getState);
      }
    }
  };

export const handleButtonPress = (color: string): AppThunk => (dispatch, getState) => {
  const currentIsPlaying = selectIsPlaying(getState());
  if (!currentIsPlaying) return;
  dispatch(addToUserSequence(color));
  soundUtils.playSound(color);
  dispatch(handleUserSequence());
};

export const handleStartPress = (): AppThunk => async (dispatch, getState) => {
  dispatch(clearSequence());
  dispatch(clearUserSequence());
  dispatch(setIsPlaying(true));
  dispatch(setIsFailed(false));
  await addToSimonSequence(dispatch, getState);
};

export const resetGame = (): AppThunk => (dispatch) => {
  dispatch(setIsFailed(false));
  dispatch(setIsPlaying(false));
  dispatch(clearScore());
  dispatch(clearSequence());
  dispatch(clearUserSequence());
  dispatch(setPlayerName(''));
};

const addToSimonSequence =
  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>,
    getState: typeof store.getState): Promise<void> => {
    const colors = ['red', 'green', 'blue', 'yellow'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    dispatch(addToSequence(randomColor));
    const currSequence = selectSequence(getState())

    for (let i = 0; i < currSequence.length; i++) {
      const currenColor = currSequence[i];
      await delay(700);
      dispatch(setActiveButton(currenColor));
      soundUtils.playSound(currenColor);
      await delay(300)
      dispatch(setActiveButton(''));
    }

  };

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const handleFail =
  (dispatch: ThunkDispatch<RootState, unknown, Action<string>>,
    getState: typeof store.getState) => {
    const currPlayerName = selectPlayerName(getState());
    const currentScore = selectScore(getState());
    dispatch(setIsPlaying(false));
    dispatch(setIsFailed(true));
    dispatch(clearScore());
    dispatch(saveResultAsync({ playerName: currPlayerName, score: currentScore }));
  };

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
    },
    addToUserSequence(state, action) {
      state.userSequence = [...state.userSequence, action.payload]
      console.log(state.userSequence)
    },
    addToSequence(state, action) {
      // console.log('slice addToSequence', action.payload)
      state.sequence = [...state.sequence, action.payload];
      console.log(state.sequence);
    },
    clearSequence(state) {
      state.sequence = [];
    },
    clearUserSequence(state) {
      state.userSequence = [];
    },
    clearScore(state) {
      state.score = 0;
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    increaseScore(state) {
      state.score++;
    },
    setResults(state, action) {
      state.results = [...state.results, action.payload]
    },
    setPlayerName(state, action: PayloadAction<string>) {
      state.playerName = action.payload;
    },
    setActiveButton(state, action) {
      state.activeButton = action.payload;
    },
    setIsFailed(state, action) {
      state.isFailed = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveResultAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(saveResultAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.results = action.payload ?? []
      })
      .addCase(saveResultAsync.rejected, (state) => {
        state.status = "failed";
      })
  }
});

export const {
  addToSequence,
  addToUserSequence,
  clearSequence,
  clearUserSequence,
  clearScore,
  setIsPlaying,
  increaseScore,
  setResults,
  setPlayerName,
  setActiveButton,
  setIsFailed } = gameSlice.actions;

export default gameSlice.reducer;