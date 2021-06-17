import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: '0', name: "Robert Engel"},
    {id: '1', name: "Greg Markowskie"},
    {id: '2', name: "Ryan Hoddinott"},
]

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
})

export default userSlice.reducer