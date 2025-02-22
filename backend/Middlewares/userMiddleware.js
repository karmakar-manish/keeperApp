import jwt from "jsonwebtoken"
import JWT_SECRET from "../config.js";

function userMiddleware(req,res,next){
    //get the token from authorization header
    const authHeader = req.headers.authorization

    //incase of no authHeader or doesn't start with "Bearer "
    if(!authHeader || !authHeader.startsWith("Bearer "))
    {
        return res.status(401).json({
            message: "Authorization failed!"
        })
    }

    //get only the token
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId //put the userId in req body
        next()
    }catch(error)
    {
        return res.status(403).json({
            message: "Error while decoding jwt!",
            error: error
        })
    }
}
export default userMiddleware