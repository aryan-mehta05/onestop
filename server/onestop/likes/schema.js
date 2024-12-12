import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "PostModel" }
},
    { collection: "likes" }
);

export default likeSchema;