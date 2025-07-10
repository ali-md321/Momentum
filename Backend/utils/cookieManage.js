
module.exports.sendCookie = (user={},statusCode,res) => {
    const token = user.generateToken();

    const userData = user.toObject();
    delete userData.password;

    const options = {
        expires : new Date(Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }

    res.status(statusCode)
       .cookie('token',token,options)
       .json({
            message : "User LoggedIn and Token Generated!!",
            user : userData
       })
    
}

module.exports.deleteCookie = (statusCode,res) => {
    res.status(statusCode).cookie('token',"", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "None",
        secure: true,
    }).json({
        message : "User LogOut!!",
    })
}