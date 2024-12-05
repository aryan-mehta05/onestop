import mongoose from "mongoose";

const flightInspirationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    origin: String,
    destination: String,
    departureDate: Date,
    returnDate: Date,
    price: Number
},
    { collection: "flightInspiration" }
);

export default flightInspirationSchema;