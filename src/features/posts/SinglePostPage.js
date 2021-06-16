import React from "react";
import { useSelector } from "react-redux";

export const SinglePostPage = ({ match }) => {
    const postId = match.params.postId;

    const post = useSelector(state => state.posts.find((post) => post.id === postId))
    console.log('our match', postId)
    console.log('our post for comparison', post)
    if (!post) {
        return (
            <section>
                <h2>Post NOT Found! :(</h2>
            </section>
        )
    }

    return (
        <section>
            <article className={'post'}>
                <h2>{post.title}</h2>
                <p className={'post-content'}>{post.content}</p>
            </article>
        </section>
    )
}