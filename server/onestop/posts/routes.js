import * as dao from "./dao.js";

export default function PostsRoutes(app) {
    const createPost = async (request, response) => {
        const post = request.body;
        const newPost = await dao.createPost(post);

        return response.send(newPost);
    };
    app.post("/api/posts/createPost", createPost);

    const updatePost = async (request, response) => {
        const post = request.body;

        await dao.updatePost(post);

        response.sendStatus(200);
    };
    app.put("/api/posts/updatePost", updatePost);

    const deletePost = async (request, response) => {
        const { postId } = request.params;

        await dao.deletePost(postId);

        response.sendStatus(200);
    };
    app.delete("/api/posts/deletePost/:postId", deletePost)

    const getAllPosts = async (request, response) => {
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

    const getPostsByCity = async (request, response) => {
        const { city } = request.params;
        const posts = await dao.findPostsByCity(city);

        return response.send(posts);
    };
    app.get("/api/posts/getPostsByLocation/:city", getPostsByCity);

    const getPostsByCityAndCountry = async (request, response) => {
        const { city, country } = request.query;
        const posts = await dao.findPostsByCityAndCountry(city, country);

        return response.send(posts);
    };
    app.get("/api/posts/getPostsByLocation", getPostsByCityAndCountry);

    const getPostsByQuery = async (request, response) => {
        const { query } = request.query;
        const posts = await dao.findPostsByQuery(query);

        return response.send(posts);
    };
    app.get("/api/posts/getPostsByQuery", getPostsByQuery);

    const getPostsByUser = async (req, res) => {
        const { username } = req.params;
        const posts = await dao.findPostsByUsername(username);

        return res.send(posts);
    };
    app.get("/api/posts/getPostsByUser/:username", getPostsByUser);
}
