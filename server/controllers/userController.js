const userModel = require("../models/userModel");

exports.loginUser = async (req, res, next) => {
    const {userId, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ email: userId }, {username: userId}]
    }).select("+password");

    if (!user) {
        // do something 
    }

    
};
