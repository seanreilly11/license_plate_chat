const bcryptjs = require("bcryptjs");
// const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const Car = require("../models/Car");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { JWT_TOKEN } = require("../config/keys");
// const auth = require("../middlewares/auth");

// @desc Get all users
// @route GET /api/v1/users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $lookup: {
                    from: "cars",
                    localField: "carId",
                    foreignField: "_id",
                    as: "carDetails",
                },
            },
            { $unwind: "$carDetails" },
        ]).sort({ lastLogin: -1 });
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc Get user by ID
// @route GET /api/v1/users/:id
exports.getUserByID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "No user found" });

        // get conversations that have messages
        const conversations = await Conversation.find({
            users: { $in: [req.params.id] },
            messages: { $exists: true, $ne: [] },
        }).sort({ updatedDate: -1 });

        // get last message sent details
        let messageIds = [];
        conversations.forEach(
            (convo) =>
                (messageIds = [
                    ...messageIds,
                    convo.messages[convo.messages.length - 1],
                ])
        );
        const lastMessages = await Message.find({
            _id: { $in: messageIds },
        });

        // get array of all other conversation users
        let otherUserIds = [];
        conversations.forEach((convos) => {
            otherUserIds = [
                ...otherUserIds,
                new mongoose.Types.ObjectId(
                    convos.users.filter((user) => user != req.params.id)[0]
                ),
            ];
        });
        // get other users details
        let otherUsers = await User.aggregate([
            {
                $match: {
                    _id: { $in: otherUserIds },
                },
            },
            {
                $lookup: {
                    from: "cars",
                    localField: "carId",
                    foreignField: "_id",
                    as: "carDetails",
                },
            },
            { $unwind: "$carDetails" },
        ]);
        conversations.forEach((convo, i) => {
            // add user details to correct conversation
            otherUsers.forEach((user, j) => {
                if (convo.users.includes(user._id)) {
                    const { firstname, lastname, carDetails, _id } = {
                        ...otherUsers[j],
                    };
                    conversations[i] = {
                        ...conversations[i]._doc,
                        userDetails: { firstname, lastname, carDetails, _id },
                    };
                }
            });
            // add last message sent text to convo
            lastMessages.forEach((msg) => {
                if (
                    convo.messages[convo.messages.length - 1].toString() ==
                    msg._id
                )
                    conversations[i] = {
                        ...conversations[i],
                        lastMessageText: msg.text,
                    };
            });
        });

        return res.status(200).json({
            ...user._doc,
            conversations,
            password: undefined,
            token: undefined,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc Get users by plate
// @route GET /api/v1/users/plate/:plate
exports.getUsersByPlate = async (req, res) => {
    try {
        const { plate } = req.user;
        const cars = await Car.aggregate([
            {
                $match: {
                    plate: {
                        $regex: req.params.plate.toUpperCase(),
                        $ne: plate.toUpperCase(),
                    },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "carId",
                    as: "userDetails",
                },
            },
            {
                $project: {
                    _id: 1,
                    plate: 1,
                    "userDetails._id": 1,
                    "userDetails.firstname": 1,
                    "userDetails.lastname": 1,
                },
            },
            { $unwind: "$userDetails" },
            { $limit: 10 },
        ]).sort({ plate: 1 });
        return res.status(200).json(cars);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc login user
// @route POST /api/v1/users/login
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ error: "Email is not valid" });

        const car = await Car.findById(user.carId);

        if (!bcryptjs.compareSync(req.body.password, user.password))
            return res.status(401).json({
                error: "Incorrect password",
            });

        const token = generateToken(user, car.plate);
        const updatedUser = await User.updateOne(
            {
                _id: user._id,
            },
            {
                $currentDate: {
                    updatedDate: true,
                    lastLogin: true,
                },
                $set: { token },
            }
        );

        return res.status(200).json({
            id: user._id,
            firstname: user.firstname,
            token,
            plate: car.plate,
        });
        // return res.status(200).json({ ...userWithToken._doc, password: undefined });
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc logout user
// @route POST /api/v1/users/logout
exports.logoutUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        if (!user) return res.status(404).json({ error: "User not found" });

        const updateUser = await User.updateOne(
            {
                _id: user._id,
            },
            {
                $currentDate: {
                    updatedDate: true,
                },
                $set: { token: "" },
            }
        );
        return res.status(200).end();
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc login user on console
// @route POST /api/v1/users/adminlogin
exports.loginAdminUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (bcryptjs.compareSync(req.body.password, user.password)) {
            if (!user.admin)
                return res
                    .status(403)
                    .json({ error: "Unauthorised. Not admin" });

            const token = generateToken(user);
            const updateUser = await User.updateOne(
                {
                    _id: user._id,
                },
                {
                    $currentDate: {
                        updatedDate: true,
                    },
                    $set: { token },
                }
            );
            return res.status(200).json({
                id: user._id,
                token,
                firstname: user.firstname,
            });
        } else
            return res.status(401).json({
                error: "Incorrect password",
            });
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc Send email
// @route
exports.sendEmail = async (req, res, next) => {
    try {
        // var transporter = nodemailer.createTransport({
        //     service: "Gmail",
        //     auth: {
        //         user: "seanreilly52@gmail.com",
        //         pass: "xgywkihemptapjyj",
        //     },
        // });

        // Define the email
        var mailOptions = {
            from: "Aotearoa DJ Academy",
            to: "seanreilly123@hotmail.com", // TODO: add result email
            subject: "Welcome to Aotearoa DJ Academy",
            html: defineEmailHTML(req.result),
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send(500, err.message);
            } else {
                res.status(200).json(true);
            }
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc Verify user email
// @route PATCH api/v1/users/email?token=:token
exports.verifyEmail = async (req, res, next) => {
    try {
        const { user_id, email } = jwt.verify(req.query.token, JWT_TOKEN);

        const user = await User.findOne({ _id: user_id });
        if (!user) return res.status(404).json({ error: "User not found" });
        if (user.email !== email)
            return res.status(404).json({ error: "Email doesn't match email" });
        const updateUser = await User.updateOne(
            {
                _id: user_id,
            },
            {
                $currentDate: {
                    updatedDate: true,
                },
                $set: { verified: true },
            }
        );
        return res.status(200).json(true);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

function defineEmailHTML(data) {
    let html = `<div style="display: flex; justify-content: center">
        <div
            style="
                width: 50%;
                min-width: 500px;
                background: #ccc;
                text-align: center;
                padding: 2rem;
            "
        >
            <h1 style="margin-top: 0">Welcome to Aotearoa DJ Academy!</h1>
            <h3>Hi ${data.firstname},</h3>
            <p>Thanks for joining the Dojo.</p>
            <p>
                You're almost ready to start learning the ins and outs of
                DJing and producing and start your journey to the big stage.
            </p>
            <p>
                Please click on the button below to verify your email
                address and get exclusive access to Dojo content.
            </p>
            <br />
            <a
                href="http://localhost:3000/emailverification?token=${generateToken(
                    data
                )}"
                style="
                    background-color: #c120ca;
                    color: #fff;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                "
                >Verify your email</a
            >
            <br />
            <br />
            <p>
                Thanks, <br />
                Aotearoa DJ Academy
            </p>
        </div>
    </div>`;
    return html;
}

// @desc Add new user
// @route POST /api/v1/users
exports.registerUser = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        let { plate } = req.body;
        plate = plate.toUpperCase();
        // this.sendEmail({ firstname });
        User.findOne({ email })
            .then((result) => {
                if (result)
                    return res
                        .status(409)
                        .json({ error: "Email is already in use" });

                Car.findOne({ plate })
                    .then((result) => {
                        if (result)
                            return res
                                .status(409)
                                .json({ error: "Car is already in use" });

                        const car = new Car({ plate });
                        car.save()
                            .then((result) => {
                                const hash = bcryptjs.hashSync(password);
                                const user = new User({
                                    firstname,
                                    lastname,
                                    email,
                                    password: hash,
                                    carId: result._id,
                                });
                                user.save()
                                    .then((result) => {
                                        return res.status(201).json(result);
                                    })
                                    .catch((err) => {
                                        return res.status(500).json({
                                            error: err.message,
                                        });
                                    });
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    error: err.message,
                                });
                            });
                    })
                    .catch((err) => {
                        return res.status(500).json({ error: err.message });
                    });
            })
            .catch((err) => {
                return res.status(500).json({ error: err.message });
            });
    } catch (err) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(
                (val) => val.message
            );
            return res.status(400).json({
                error: messages,
            });
        } else {
            return res.status(500).json({
                error: "Server error",
            });
        }
    }
};

// @desc give user admin right
// @route PATCH /api/v1/users/adminrights
exports.makeUserAdmin = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const userCheck = await User.findById(userId);
        if (!userCheck)
            return res.status(404).json({ error: "User not found" });

        const user = await User.findOneAndUpdate(
            {
                _id: userId,
            },
            {
                $currentDate: {
                    updatedDate: true,
                },
                $set: { admin: true },
            }
        );
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc update user details
// @route PATCH /api/v1/users/:id
exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userCheck = await User.findById(id);
        if (!userCheck)
            return res.status(404).json({ error: "User not found" });

        const user = await User.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $currentDate: {
                    updatedDate: true,
                },
                $set: req.body,
            }
        );
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc Get users completed courses and videos
// @route GET /api/v1/users/completed/:id
exports.getUsersCompletedItems = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "No user found" });

        return res.status(200).json({
            courses: user.coursesCompleted,
            videos: user.videosCompleted,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

function generateToken(user, plate) {
    // var length = isAdmin ? 8 : 16,
    //     charset =
    //         "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    //     retVal = "";
    // for (var i = 0, n = charset.length; i < length; ++i)
    //     retVal += charset.charAt(Math.floor(Math.random() * n));
    const token = jwt.sign(
        { userId: user._id, email: user.email, plate },
        JWT_TOKEN,
        {
            expiresIn: "24h",
        }
    );
    return token;
}

//
// STATS
//

// @desc Get users completed courses and videos stats
// @route GET /api/v1/users/stats/:id
exports.getUserStats = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "No user found" });
        const videos = user.videosCompleted;
        let completedVideos = [];

        for (let i = 0; i < videos.length; i++) {
            const video = await Video.findById(videos[i]);
            completedVideos = [...completedVideos, video.timeLength];
        }

        const totalWatchTime = completedVideos.reduce((a, b) => a + b, 0);

        return res.status(200).json({
            courses: user.coursesCompleted.length,
            videos: user.videosCompleted.length,
            totalWatchTime,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
