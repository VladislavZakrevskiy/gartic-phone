import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { useAppDispatch } from '../hooks';
import undoRedo from '../../tools/UndoRedo';
import { IUser } from '../../models/IUser';

interface State {
    users: IUser[]
}

const initialState: State = {
    users: []
};



const userSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        pushUsers: (state, action: PayloadAction<IUser>) => {
            state.users.push(action.payload)
        },

        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload
        },

        deleteUser: (state, action) => {
            state.users = state.users.filter(a => a.username !== action.payload)
        }
    },


})

export const { pushUsers, setUsers, deleteUser } = userSlice.actions;
export default userSlice.reducer