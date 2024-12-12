import * as dao from "./dao.js";

export default function FriendsRoutes(app) {
    const findFriendsByUID = async (req, res) => {
        const {uid} = req.params;
        const friends = await dao.findFriendsByUID(uid);
        return res.send(friends);
    };
    app.get("/api/friends/:uid", findFriendsByUID);

    const addFriend = async (req, res) => {
        const {user1, user2} = req.body;
        const friend = await dao.addFriend(user1, user2);
        return res.send(friend);
    };
    app.post("/api/friends/add", addFriend)

    const findFriendsByUIDNoDetail = async (req, res) => {
        const {uid} = req.params;
        const friends = await dao.findFriendsByUIDNoDetail(uid);
        return res.send(friends);
    };
    app.get("/api/friends/no_detail/:uid", findFriendsByUIDNoDetail);
}