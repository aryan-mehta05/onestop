import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    user1: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }
},
    { collection: "friends" }
);

export default friendSchema;