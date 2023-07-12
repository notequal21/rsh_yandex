import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';

export interface AnswersState {
  results: number[];
  answers: number[];
  shared: string[];
  calculatedValue: number;
  startTime: string;
  finishTime: string;
  backSlide: boolean;
}

const initialState: AnswersState = {
  results: [-999, -999, -999, -999],
  answers: [],
  shared: [],
  calculatedValue: 0,
  startTime: '',
  finishTime: '',
  backSlide: false,
};

export const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    setAnswerByIdBtn: (state, action: PayloadAction<any>) => {
      state.answers[action.payload.id] = action.payload.value;
    },
    setAnswerById: (state, action: PayloadAction<any>) => {
      state.results[action.payload.id] = action.payload.value;
    },
    setCalculatedValue: (state, action: PayloadAction<any>) => {
      state.calculatedValue = action.payload;
    },
    setStartTime: (state, action: PayloadAction<any>) => {
      state.startTime = action.payload;
    },
    setFinishTime: (state, action: PayloadAction<any>) => {
      state.finishTime = action.payload;
    },
    setBackSlide: (state, action: PayloadAction<any>) => {
      state.backSlide = action.payload;
    },
  },
});

export const {
  setAnswerById,
  setCalculatedValue,
  setAnswerByIdBtn,
  setStartTime,
  setFinishTime,
  setBackSlide,
} = answersSlice.actions;

export const selectResult = (state: RootState) => state.answers.results;
export const selectStartTime = (state: RootState) => state.answers.startTime;
export const selectFinishTime = (state: RootState) => state.answers.finishTime;
export const selectAnswers = (state: RootState) => state.answers.answers;
export const selectCalculatedValue = (state: RootState) =>
  state.answers.calculatedValue;
export const selectBackSlide = (state: RootState) => state.answers.backSlide;

export default answersSlice.reducer;
