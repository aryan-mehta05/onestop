import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    poster: { type: String, required: true },
    photo: { type: Buffer },
    destinationCity: { type: String, required: true },
    destinationCountry: { type: String, required: true },
    caption: { type: String, required: true },
    likes: { type: Number },
},
    { collection: "posts" }
);

export default postSchema;