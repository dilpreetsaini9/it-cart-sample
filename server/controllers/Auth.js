import 'dotenv/config';
import JWT from 'jsonwebtoken'

// my imports
import { User } from "../models/UserModel.js";
import { createHash, verifyHash } from '../utils/bcrypt.js';


// signup controller
export const postSignupController = async (req, res) => {
    const { name, lastName, username, password } = req.body;

    if (!name || !lastName || !username || !password) {
        return res.status(400).json({ "message": "BAD-REQUEST" });
    }

    try {

        let hashedPassword = createHash(password)

        const newUser = new User({
            firstName: name,
            lastName: lastName,
            userName: username,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();

        if (savedUser) {

            let payload = {
                id: savedUser._id
            }

            const accessToken = JWT.sign(payload, process.env.JWTKEY, { expiresIn: '30d' });

            return res.status(200).json({ "message": "success", "token": accessToken });
        } else {

            return res.status(400).json({ "message": "Unauthorized" });

        }
    } catch (error) {
        res.status(500).json({ "message": "Internal Server Error" });
    }
};


// login controller
export const postLoginController = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ "message": "BAD-REQUEST" });
    }

    try {
        const findingUser = await User.findOne({ userName: username });

        if (findingUser) {

            const hashedPasswordFromDB = findingUser.password;
            const result = await verifyHash(password, hashedPasswordFromDB)

            if (result) {

                let payload = {

                    id: findingUser._id

                }

                const accessToken = JWT.sign(payload, process.env.JWTKEY, { expiresIn: '30d' });

                res.status(200).json({ "message": "success", "token": accessToken });

            } else {
                res.status(401).json({ "message": "Unauthorized" });
            }
        } else {
            res.status(404).json({ "message": "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({ "message": "Internal Server Error" });
    }
};



// Verify JWT
export const VerifyJWTController = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];

    if (authorizationHeader) {

        try {
            let decode = JWT.verify(authorizationHeader, process.env.JWTKEY);
           

            let userInfo = await User.findOne({ _id: decode.id }, { password: 0, _id: 0, __v: 0, userName: 0, lastName: 0 });

            res.status(200).json(userInfo)
        } catch (error) {
            res.status(404).json({ "message": "Unauthorized" })

        }

    } else {
        res.status(404).json({ "message": "header not found" })
    }
};

// Profile
export const VerifyProfileController = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];

    if (authorizationHeader) {

        try {
            let decode = JWT.verify(authorizationHeader, process.env.JWTKEY)

            let userInfo = await User.findOne({ _id: decode.id }, { password: 0, _id: 0, __v: 0, userName: 0 });

            if (userInfo) {
                res.status(200).json({ userInfo })
            } else {
                res.status(404).json({ "message": "Unauthorized" })
            }
        } catch (e) {
            res.status(404).json({ "message": "Unauthorized" })
        }
    } else {
        res.status(404).json({ "message": "header not found" })
    }
};