import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { useAppDispatch } from '../hooks';
import undoRedo from '../../tools/UndoRedo';
import { Mode } from '../../modes/Mode';

interface State {
    mode: Mode | null
}

const initialState: State = {
    mode: null
};



const modesSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload
        },


    },

});

export const { setMode } = modesSlice.actions;
export default modesSlice.reducer