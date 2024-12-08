import model from "./model.js";


export async function findFriendsByUID(uid) {
    return model.find({ user1:uid }).populate("user2");
}