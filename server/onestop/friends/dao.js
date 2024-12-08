import model from "./model.js";
import * as userDao from "../users/dao.js"

// export function findFriendsByUserName(username) {
//     const foundUser = userDao.findUserByUsername(username);
//     // const foundUser = await userDao.findUserByUsername(username);
//     const user_id = foundUser._id;
//     console.log(foundUser._id);
//     return model.find({ user1: user_id }).populate("user2");
// }