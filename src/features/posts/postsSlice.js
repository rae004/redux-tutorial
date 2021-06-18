import {createSlice, nanoid} from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  {
    id: '1',
    user: '0',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: '2',
    user: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        console.log('add post reducer action ', action)
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        console.log('add post prepare ', title, content, userId)
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            user: userId,
            title,
            content,
          }
        }
      }
    },
    postUpdated(state, action) {
      console.log("Our Post Updated Action Bob ", action)
      const {id, title, content} = action.payload
      const postExists = state.find( post => post.id === id)
      if (postExists) {
        postExists.title = title
        postExists.content = content
      }
    }
  }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer
