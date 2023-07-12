import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

interface RequestProps {
    username: string;
    password: string;
}

const Login = async (req: Request, res: Response) => {
    try {
        //   const secret = process.env.ACCESS_TOKEN_SECRET;
        const passwordDummy = '$2b$10$0tIo.VWSEi16AF4DuHIkS.CqqEZ4IYMurB8FhyDfzSWQ7gVX62Vz6';
        const { username, password } = req.body as RequestProps;
    
        // FIND USERNAME IN DATABASE
        if (username !== 'admin') throw new Error('Username or password incorrect');
  
        const match = await bcrypt.compare(password, passwordDummy);
        if (!match) throw new Error('Username or password incorrect');
  
        const accessToken = jwt.sign({ username }, 'jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225', {
            expiresIn: '36000s',
        });
  
        res.status(200).json({
            message: 'Login successful',
            accessToken: accessToken,
        });
    } catch (error) {
        res.status(500).json({
            message: `${error}`,
        });
    }
  };

const Register = async(req:Request, res:Response) => {
    try {
        const { username, password } = req.body as RequestProps;
        console.log({username});
        
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        console.log({hashPassword});
        

        // INSERT username & hashPassword to DB
        res.status(200).json({
            msg: "Registes Success",
            username,
            password
        });
    } catch (error) {
        res.status(404).json({msg:`${error}`});
    }
}

export { Login, Register }