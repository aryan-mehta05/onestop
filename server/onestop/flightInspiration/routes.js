import * as dao from "./dao.js";

export default function FlightInspirationRoutes(app) {

    app.post("/api/flightInspiration/", async (req, res) => {
        // console.log(req.body);
        await dao.createFlightInspiration(req.body);
        res.json(req.body);
    });

    app.get("/api/flightInspiration/", async (req, res) => {
        const searchHistory = await dao.getAllFlightInspiration();
        res.send(searchHistory);
    })

}