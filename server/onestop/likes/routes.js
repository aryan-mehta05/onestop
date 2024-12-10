import { model } from "mongoose";
import * as dao from "./dao.js";

export default function LikesRoutes(app) {
    const likePost = async (request, response) => {
        const {uid, pid} = request.body;
        const like = await dao.likePost(pid, uid);
        return response.send(like);
    };
    app.post("/api/likes/likePost", likePost);

    const getLikesByPostId = async (req, res) => {
        const {pid} = req.params;
        const likes = await dao.getLikesByPostId({pid});
        return res.send(likes);
    };
    app.get("/api/likes/:pid", getLikesByPostId);

    const getLikesByUserId = async (req, res) => {
        const {uid} = req.params;
        const likes = await dao.getLikesByUserId(uid);
        return res.send(likes);
    };
    app.get("/api/likes/user/:uid", getLikesByUserId);
}
