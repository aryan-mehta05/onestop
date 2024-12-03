import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    photo: String,
    location: { type: String, required: true },
    caption: String,
},
    { collection: "posts" }
);

export default postSchema;