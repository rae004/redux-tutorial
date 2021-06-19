import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {client} from "../../api/client";


export const fetchUsers = createAsyncThunk('users/fetchPosts',async () => {
    const response = await client.get('/fakeApi/users');
    return response.users;
} )

const ourUsers = [
    {lastName: 'Engel', firstName: 'Robert', username: 'rae004', name: "Robert Engel", id: '0'},
    {lastName: 'Markowski', firstName: 'Greg', username: 'gregYA', name: "Greg Markowskie", id: '1'},
    {lastName: 'Hoddinott', firstName: 'Ryan', username: 'rOob', name: "Ryan Hoddinott", id: '2'},
]
const initialState = [];


const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
            ourUsers.forEach(user => action.payload.push(user));
            return action.payload;
        }
    }
})

export default userSlice.reducer