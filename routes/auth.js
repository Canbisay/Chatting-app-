import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const authrouter = express.Router();

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
    res.render("login");
});

authrouter.post("/login", async(req, res) => {
const {name , password } = req.body;
const user = await User.findOne({ name }).select("+password");
const ok = user && await bcrypt.compare(password, user.password);
if (!ok) return res.status(401).render("login", { alertMessage: "Invalid name or password" });
const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
res.cookie("token", token, { httpOnly: true });
res.send("on chating page");
});

export default authrouter;