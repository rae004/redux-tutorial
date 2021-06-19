import React from "react";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { Link } from "react-router-dom";
import { ReactionButtons } from "./ReactionButtons";

export const PostExcerpt = post => {
    return  (
        <article className={'post-excerpt'} key={post.post.id}>
            <h3>
                {post.post.title}
            </h3>
            <PostAuthor userId={post.post.user} />
            <TimeAgo timestamp={post.post.date} />
            <p className={'post-content'}>
                {post.post.content.substring(0, 100)}
            </p>
            <Link to={`/posts/${post.post.id}`} className={'button muted-button'}>
                View Post.
            </Link>
            <ReactionButtons post={post.post} />
        </article>
    )
}