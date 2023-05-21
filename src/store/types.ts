export interface Result {
    playerName: string;
    score: number;
};

export type Status = "loading" | "failed" | "success";

export interface GameState {
    status: Status;
    score: number;
    sequence: string[];
    playerName: string;
    userSequence: string[];
    isPlaying: boolean;
    results: Result[];
    activeButton: string;
    isFailed: boolean;
}

export const initialState: GameState = {
    status: "loading",
    score: 0,
    sequence: [],
    playerName: '',
    userSequence: [],
    isPlaying: false,
    results: [],
    activeButton: '',
    isFailed: false
}