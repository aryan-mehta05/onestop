import model from "./model.js";


export async function findFriendsByUID(uid) {
    return model.find({ user1:uid }).populate("user2");
}

export async function addFriend(user1, user2) {
    return model.create({user1:user1, user2:user2});
}

export async function findFriendsByUIDNoDetail(uid) {
    return model.find({ user1:uid })
}