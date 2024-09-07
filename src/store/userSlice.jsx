import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsers(state, action) {
            state.users = action.payload;
        },
        deleteUser(state, action) {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        addUser(state, action) {
            state.users.push(action.payload);
        },
        updateUser(state, action) {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index >= 0) {
                state.users[index] = action.payload;
            }
        },
    },
});

export const {fetchUsers, deleteUser, addUser, updateUser} = usersSlice.actions;

export default usersSlice.reducer;