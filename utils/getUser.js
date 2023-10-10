const jwt = require("jsonwebtoken");
require("dotenv/config");

const getUser = (req)=>{
    const token = req?.headers?.authorization?.split(" ")[1].toString();
    const secretKey = process.env.secret_key;
    const decoded = jwt?.verify(token, secretKey);
    const id  = decoded._id;
    const username =  decoded.username;
    //console.log(decoded)
    return  {
        token : token,
        id : id,
        username : username,
    }
}

module.exports = getUser;