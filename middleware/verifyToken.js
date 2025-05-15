const admin = require('../config/firebaseAdmin')

const verifyToken = async (req,res, next) =>{
    const authHeader = req.headers.authorization

    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json({message: "no token provided"})
    }

    const idToken = authHeader.split("Bearer ")[1];

    try{
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        req.user = decodedToken
        next()
    } catch(error){
        console.error('Token verification failed', error)
        return res.status(403).json({message: 'Unauthorized'})
    }
}

module.exports = verifyToken;