import model from "./model.js";

export function findAllPosts() {
    return model.find();
}

export function findPostsByUsername(username) {
    return model.find({ poster: username });
}

export function findPostsByLocation(location) {
    return model.find({ location: location });
}
