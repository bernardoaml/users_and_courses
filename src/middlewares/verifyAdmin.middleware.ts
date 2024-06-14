import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const verifyAdminToken = (
    req:Request, 
    res:Response, 
    next:NextFunction
    ): void=>{
        const {userId} = req.params
        const {sub, admin} = res.locals.decoded

        if (admin) return next()

        else {
            throw new AppError("Insufficient permission", 403)
        }

    }

    export default verifyAdminToken