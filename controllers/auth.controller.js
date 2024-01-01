import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import sendValidationErr from "../utils/sendValidationErr.js";

async function register(req, res) {
    try {
        const existedUser = await User.findOne({ email: req.body.email });

        if (existedUser) {
            return res.status(404).send("User is already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(req.body.password, salt);

        // Create user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: passwordHashed,
        });

        // Save to db
        const user = await newUser.save();

        res.status(200).send(user);
    } catch (error) {
        if (error.name === "ValidationError") {
            sendValidationErr(res, error);
            return;
        }

        res.status(500).send(error);
    }
}

async function login(req, res) {
    const { password, email } = req.body;

    try {
        const user = await User.findOne({ email: email });
        const originPassword = await bcrypt.compare(password, user.password);

        if (!user) {
            res.status(404).send("Email is not valid");
        }
        if (!originPassword) {
            res.status(404).send("Password is not valid");
        }

        if (user && originPassword) {
            res.status(200).send(user);
        }
    } catch (error) {
        if (error.name === "ValidationError") {
            sendValidationErr(res, error);
            return;
        }
        res.status(500).send(error);
    }
}

async function logout(req, res) {}

export { register, login, logout };
