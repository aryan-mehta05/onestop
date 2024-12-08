import * as dao from "./dao.js";

export default function FriendsRoutes(app) {
    const findFriendsByUID = async (req, res) => {
        const {uid} = req.params;
        const friends = await dao.findFriendsByUID(uid);
        return res.send(friends);
    }
    app.get("/api/friends/:uid", findFriendsByUID);
}