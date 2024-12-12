import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const signup = async (request, response) => {
        const user = await dao.findUserByUsername(request.body.username);

        if (user) {
            response.status(400).json({ message: "The username \'" + request.body.username + "\' is already taken." });
            return;
        }

        const currentUser = await dao.createUser(request.body);

        request.session["currentUser"] = currentUser;
        response.json(currentUser);
    };
    app.post("/api/users/signup", signup);

    const signin = async (request, response) => {
        const { username, password } = request.body;
        const currentUser = await dao.findUserByCredentials(username, password);

        if (!currentUser) {
            response.status(401).json({ message: "Login failed. Please try again." });
            return;
        }

        request.session["currentUser"] = currentUser;
        response.json(currentUser);
    };
    app.post("/api/users/signin", signin);

    const signout = (request, response) => {
        request.session.destroy();
        response.sendStatus(200);
    };
    app.post("/api/users/signout", signout);

    const profile = async (request, response) => {
        const currentUser = request.session["currentUser"];

        if (!currentUser) {
            response.sendStatus(401).json({ message: "Failed to fetch the user profile." })
            return;
        }

        response.json(currentUser);
    };
    app.post("/api/users/profile", profile);

    const findUsersByUsername = async (req, res) => {
        const { username } = req.params;
        const user = await dao.findUserByUsername(username);
        return res.send(user);
    };
    app.get("/api/user/:username", findUsersByUsername);

    const updateUser = async (req, res) => {
        const user = req.body;
        const { uid } = req.params;
        const updatedUser = await dao.updateUser(uid, user)
        res.send(updatedUser);
    };
    app.put("/api/user/update/:uid", updateUser);
}
