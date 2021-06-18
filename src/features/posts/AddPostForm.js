import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { postAdded } from './postsSlice'

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const dispatch = useDispatch()

    const users = useSelector(state => state.users);
    console.log('users in add post ', users);

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    const onUserIdChange = e => setUserId(e.target.value);

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
    // const canSave = true

    const userOptions = users.map(user =>
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    )

    const onSavePostClicked = () => {
        console.log("Bobs here ", title, content, userId)
        if (title && content) {
            dispatch(postAdded(title, content, userId))
            setTitle('')
            setContent('')
            setUserId('')
        }
    }

    return (
        <section>
            <h2>Add New Post</h2>
            <form>
                <label htmlFor={"postTitle"}>Post Title:</label>
                <input
                    type={'text'}
                    id={'postTitle'}
                    name={'postTitle'}
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor={'postAuthor'}>Post Author:</label>
                <select id={'postAuthor'} value={userId} onChange={onUserIdChange}>
                    <option value={''}/>
                    { userOptions }
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id={'postContent'}
                    name={'postContent'}
                    value={content}
                    onChange={onContentChange}
                />
                <button type={'button'} onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
            </form>
        </section>
    )
}