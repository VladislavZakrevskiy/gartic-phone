import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { useAppDispatch } from '../hooks';
import undoRedo from '../../tools/UndoRedo';
import { Mode } from '../../modes/Mode';
import { NavigateFunction } from 'react-router-dom';
import axios from 'axios';
import { API } from '../API/postForReducers';

interface State {
    mode: Mode | null
    finish: boolean[]
    page: number
}

const initialState: State = {
    mode: null,
    finish: [],
    page: 0
};

interface IFinish {
    finish: boolean
    nav: NavigateFunction
    path: string
    image: string
    sentence: string
    round: number
    username: string
    currentName: string
}


const modesSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload
        },

        pushFinish(state, action: PayloadAction<IFinish>) {
            const {finish, image, nav, path, round, username, sentence, currentName} = action.payload
            if ( currentName === username ) {
                if(image) {
                    API.postImage(round, state.mode?.players[0].id!, image, username)
                }
                else {
                    API.postSentence(sentence, round, state.mode?.players[0].id!, username)
                }  
            }
            
            state.finish.push(finish)
            if(state.finish.length === state.mode?.players.length!) {
                nav(path)
                state.finish = []
            }
        },

        setPage: (state) => {
            state.page += 1
        }
    },
});

export const { setMode, pushFinish, setPage } = modesSlice.actions;
export default modesSlice.reducer