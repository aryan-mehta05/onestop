import model from "./model.js";

export function findAllHistory(userId) {
    return model.find({ user: userId });
}

export function createFlightInspiration(flightInspiration) {
    return model.create(flightInspiration);
}

export function getAllFlightInspiration() {
    return model.find();
}