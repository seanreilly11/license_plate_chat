const jwt = require("jsonwebtoken");

const { JWT_TOKEN } = require("../config/keys");

const verifyToken = (req, res, next) => {
    const url = req._parsedUrl.pathname;
    const notRequiredArr = [
        "/api/v1/users/login",
        "/api/v1/users/adminlogin",
        "/api/v1/users/logout",
        "/api/v1/users/email",
    ];
    const notRequiredPost = ["/api/v1/users"];
    const notRequired =
        notRequiredArr.includes(url) ||
        (req.method == "POST" && notRequiredPost.includes(url));
    if (notRequired) return next();

    const token = req.headers["authorization"]?.split(" ")[1];
    // console.log(token);
    if (!token)
        return res
            .status(403)
            .json({ error: "A token is required for authentication" });

    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ error: "Invalid Token" });
    }
    return next();
};

module.exports = verifyToken;
