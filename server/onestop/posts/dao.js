import model from "./model.js";

export function createPost(post) {
    return model.create(post);
}

export function updatePost(post) {
    return model.findOneAndUpdate({ _id: post._id }, { $set: post });
}

export function deletePost(postId) {
    return model.deleteOne({ _id: postId });
}

export function findAllPosts() {
    return model.find().sort({ _id: -1 });
}

export function findPostsByUsername(username) {
    return model.find({ poster: username });
}

export function findPostsByCity(city) {
    return model.find({ destinationCity: new RegExp(city, "i") });
}

export function findPostsByCityAndCountry(city, country) {
    const cityRegExp = new RegExp(city, "i");
    const countryRegExp = new RegExp(country, "i");

    return model.find({ destinationCity: cityRegExp, destinationCountry: countryRegExp });
}

export function findPostsByQuery(query) {
    const queryRegExp = new RegExp(query, "i");

    return model.find({
        $or: [
            { destinationCity: queryRegExp },
            { destinationCountry: queryRegExp },
            { poster: queryRegExp },
            { caption: queryRegExp }
        ]
    });
}
