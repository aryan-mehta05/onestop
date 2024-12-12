import model from "./model.js";

export const createUser = (user) => {
    delete user._id;

    return model.create(user);
}

export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const findUserByUsername = (username) => model.findOne({ username: username });

export const updateUser = (uid, user) => model.updateOne({ _id: uid }, { $set: user });