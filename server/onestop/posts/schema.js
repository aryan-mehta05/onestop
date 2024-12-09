import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    poster: { type: String, required: true },
    photo: { type: Buffer, required: true },
    destinationCity: { type: String, required: true },
    destinationCountry: { type: String, required: true },
    caption: { type: String, required: true },
    views: { type: Number, required: true },
    likes: { type: Number, required: true },
},
    { collection: "posts" }
);

export default postSchema;
