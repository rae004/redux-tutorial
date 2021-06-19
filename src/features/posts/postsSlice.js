import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

// const initialState = [
//   {
//     id: '1',
//     user: '0',
//     title: 'First Post!',
//     content: 'Hello!',
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
//   },
//   {
//     id: '2',
//     user: '2',
//     title: 'Second Post',
//     content: 'More text',
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
//   }
// ]
const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async initialPost => {
  const response = await client.post('/fakeApi/posts', { post: initialPost })
  console.log('our add new post response ', response);
  return response.post
})

/**
 *
 * @type {Slice<[{date: string, reactions: {rocket: number, hooray: number, thumbsUp: number, eyes: number, heart: number}, id: string, title: string, user: string, content: string}, {date: string, reactions: {rocket: number, hooray: number, thumbsUp: number, eyes: number, heart: number}, id: string, title: string, user: string, content: string}], {reactionAdded(*, *): void, postUpdated(*, *): void, postAdded: {prepare(*, *, *=): {payload: {date: string, reactions: {rocket: number, hooray: number, thumbsUp: number, eyes: number, heart: number}, id: string, title: any, user: any, content: any}}, reducer(*, *): void}}, string>}
 */
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            user: userId,
            title,
            content,
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
          }
        }
      }
    },
    postUpdated(state, action) {
      const {id, title, content, date} = action.payload
      const postExists = state.posts.find( post => post.id === id)
      if (postExists) {
        postExists.title = title
        postExists.content = content
        postExists.date = date
      }
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload)
    },
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

/**
 *
 * @param state
 * @returns {[{sentence: *, paragraph: *, sentences: *, words: *}, {sentence: *, paragraph: *, sentences: *, words: *}, {sentence: *, paragraph: *, sentences: *, words: *}]|HasMany<string>|Reducer<[{date: string, reactions: {rocket: number, hooray: number, thumbsUp: number, eyes: number, heart: number}, id: string, title: string, user: string, content: string}, {date: string, reactions: {rocket: number, hooray: number, thumbsUp: number, eyes: number, heart: number}, id: string, title: string, user: string, content: string}]>|*}
 */
export const selectAllPosts = state => state.posts.posts

/**
 * Return a single post from Redux Store by Post ID
 * @param state
 * @param postId
 */
export const selectPostById = (state, postId) => {
  return state.posts.posts.find(post => post.id === postId)
}
