import * as dao from "./dao.js";

export default function PostsRoutes(app) {
    const createPost = async (request, response) => { };
    const likePost = async (request, response) => { };
    const updatePost = async (request, response) => { };
    const deletePost = async (request, response) => { };

    const getAllPosts = async (_, response) => {
        const posts = await dao.findAllPosts();

        return response.send(posts);
    };
    app.get("/api/posts/getAllPosts", getAllPosts);

    const getPostsByUsername = async (request, response) => {
        const { username } = request.params;
        const posts = await dao.findPostsByUsername(username);

        return response.send(posts);
    };
    app.get("/api/posts/getPostsByUsername/:username", getPostsByUsername);

    const getPostsByLocation = async (request, response) => {
        const { location } = request.params;
        const posts = await dao.findPostsByLocation(location);

        return response.send(posts);
    };
    app.get("/api/posts/getPostsByLocation/:location", getPostsByLocation);
}
