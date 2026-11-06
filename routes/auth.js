import express from "express";
const authrouter = express.Router();
import bcrypt from "bcrypt";
import User from "../models/user.js";

// signup
authrouter.get("/register", (req, res) => {
    res.render("signup");
});

authrouter.post("/register", async (req, res) => {
    const { name, phone, password } = req.body;
    const fail = (status, alertMessage) => res.status(status).render("signup", { alertMessage });

    if (!password || password.length < 8) return fail(400, "Password must be at least 8 characters");

    try {
        await User.create({ name, phone, password: await bcrypt.hash(password, 10) });
        res.redirect("/auth/login");
    } catch (err) {
        if (err.name === "ValidationError") return fail(400, Object.values(err.errors)[0].message);
        if (err.code === 11000) return fail(409, `${Object.keys(err.keyPattern)[0]} is already taken`);
        fail(500, "Something went wrong");
    }
});

// login
authrouter.get("/login", (req, res) => {
    res.send("login page");
});

authrouter.post("/login", (req, res) => {
    res.send("login form submitted");
});

export default authrouter;