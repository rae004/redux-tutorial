import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import {postUpdated} from "./postsSlice";

export const EditPostForm = ({ match }) => {
    const { postId } = match.params
    const post = useSelector(state =>
        state.posts.find(post => post.id === postId)
    )

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const dispatch = useDispatch()
    const history = useHistory()

    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({id: postId, title, content}))
            history.push(`/posts/${postId}`)
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <label>Post Title:</label>
            <input
                type={'text'}
                id={'postTitle'}
                name={'postTitle'}
                placeholder={'speak your mind...'}
                value={title}
                onChange={onTitleChange}
            />
            <label>Post Content:</label>
            <textarea
                id={'postContent'}
                name={'postContent'}
                placeholder={'placeholder content'}
                value={content}
                onChange={onContentChange}
            />
            <button
                type={'button'}
                onClick={onSavePostClicked}
            >Save Changes</button>
        </section>
    )
}
