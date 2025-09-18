import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";


// @route POST /api/auth/register
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.status(400).json({ message: "User Already Exist" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    });
};

// @route POST /api/auth/login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    let isMatch = false;
    const user = await User.findOne({ email });


    if (user) isMatch = await user.matchPassword(password);

    if (isMatch) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });

    } else {
        res.status(401).json({ message: 'Invalid Email or Passowrd' });
    }

};