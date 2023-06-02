const { User } = require("../models/User");

let auth = (req, res, next) => {
    let token = req.cookies.x_auth;

    // console.log('get Token by client----->', req.cookies)
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({
            isAuth: false,
            error: true
        })
        req.token = token;
        req.user = user;

        // console.log('auth req ->', token)
        next()
    })
}

module.exports = { auth }