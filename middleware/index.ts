import {Request, Response, NextFunction} from 'express';
import jwt from "jsonwebtoken";

const AuthToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, 'jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225', (err) => {
        if(err) return res.sendStatus(403);
        next();
    })
}

export default AuthToken 