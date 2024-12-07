import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    poster: String,
    photo: String,
    destinationCity: { type: String, required: true },
    destinationCountry: { type: String, required: true },
    caption: String,
},
    { collection: "posts" }
);

export default postSchema;