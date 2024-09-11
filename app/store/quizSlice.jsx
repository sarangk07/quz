'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    choice1: 'default',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    timeLeft: 30,
    isFrozen: false,
};


const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers:{
        setChoice1: (state,action) => {
            state.choice1 = action.payload;
        },
        setQuestions: (state,action) => {
            state.questions = action.payload;
        },
        setCurrentQuestionIndex: (state,action) => {
            state.currentQuestionIndex = action.payload;
        },
        setScore: (state,action) => {
            state.score = action.payload;
        },
        setTimeLeft: (state,action) => {
            state.timeLeft = action.payload;
        },
        setIsFrozen: (state,action) => {
            state.isFrozen = action.payload;
        },
    }
});

export const {
    setChoice1,
    setQuestions,
    setCurrentQuestionIndex,
    setScore,
    setTimeLeft,
    setIsFrozen,
} = quizSlice.actions;

export default quizSlice.reducer;