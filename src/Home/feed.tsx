import * as db from "../TempDB";

export default function Feed() {
    const posts = db.posts
    return (
        <div>
            <h2>The Feed!</h2>
            <ol>
                {posts
                .sort((postA: any, postB: any)=> postB.likes - postA.likes)
                .map((post: any) => (
                    <li>
                        <div>
                            Post ID: {post._id}
                        </div>
                        <div>
                            User: {post.user_id}
                        </div>
                        <img src={post.image} alt="" />
                        <div>{post.caption}</div>
                        <div>Likes: {post.likes}</div>
                        <hr />
                        <br />
                    </li>
                ))}
            </ol>
        </div>
    )
}