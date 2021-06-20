import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { client } from "../../api/client";

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
        const allNotifications = selectAllNotifications(getState())
        const [ latestNotification ] = allNotifications
        const latestTimestamp = latestNotification ? latestNotification.date : ''
        const respnse = await client.get(
            `/fakeApi/notifications?since=${latestTimestamp}`
        )
        return respnse.notifications
    }
)

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {},
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
            state.push(...action.payload)
            state.sort((a, b) => b.date.localeCompare(a.date))
        }
    }
})

export default  notificationSlice.reducer

export const selectAllNotifications = state => state.notifications