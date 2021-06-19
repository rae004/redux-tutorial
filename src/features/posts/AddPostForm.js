import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from "@reduxjs/toolkit";
import { addNewPost } from "./postsSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const dispatch = useDispatch()
    const users = useSelector(state => state.users);
    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    const onUserIdChange = e => setUserId(e.target.value);
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
    const userOptions = users.map(user =>
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    )
    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                const resultAction = await dispatch(
                    addNewPost({ title, content, user: userId})
                )
                unwrapResult(resultAction)
                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
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