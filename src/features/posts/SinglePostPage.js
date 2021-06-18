import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import {TimeAgo} from "./TimeAgo";

export const SinglePostPage = ({ match }) => {
    const postId = match.params.postId;

    const post = useSelector(state => state.posts.find((post) => post.id === postId))
    console.log('our post ', post)
    console.log('our match', postId)
    console.log('our post id for comparison', post.id)
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
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
                <p className={'post-content'}>{post.content}</p>
                <Link to={`/editPost/${post.id}`} className={'button'}>
                    Edit Post.
                </Link>
            </article>
        </section>
    )
}