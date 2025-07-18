import jwt from "jsonwebtoken"

export const samsungMiddleware = (req,res,next)=>{
     const fullToken = req.headers.authorization;
    if (!fullToken) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = fullToken.split("Bearer ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }
        next();
    } catch (err) {
        console.log("ERROR",err)
        return res.status(401).json({ error: "Token verification failed" });
    }

}