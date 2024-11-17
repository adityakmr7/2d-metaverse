
import jwt from "jsonwebtoken";
import {JWT_PASSWORD} from "../config";
import {NextFunction,Request,Response} from "express";

export const userMiddleware  = (req:Request,res:Response,next:NextFunction) => {
    const headers = req.headers.authorization;
    const token = headers?.split(' ')[1];
    if(!token) {
        res.status(403).json({
            message:'UnAuthorized'
        })
        return;

    }
    try {
        const decoded = jwt.verify(token,JWT_PASSWORD) as {role:string,userId:string};
        req.userId = decoded.userId;
        next();
    }catch (e) {
        res.status(401).json({
            message:'UnAuthorized'
        })
    }
}