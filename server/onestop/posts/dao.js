import model from "./model.js";

export function findAllPosts() {
    return model.find();
}

export function findPostsByUsername(username) {
    return model.find({ poster: username });
}

export function findPostsByCity(city) {
    return model.find({ destinationCity: city });
}
