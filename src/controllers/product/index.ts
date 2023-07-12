import { Request, Response } from 'express';

const GetData = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: 'product'
        })
    } catch (error) {
        res.status(500)
    }
}

export { GetData }