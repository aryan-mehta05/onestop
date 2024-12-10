import model from "./model.js";

export async function likePost(pid, uid) {
    return model.create({ user: uid, post: pid });
}

export async function getLikesByPostId(pid) {
    return model.find({ post: pid })
}

export async function getLikesByUserId(uid) {
    return model.find({ user: uid });
}