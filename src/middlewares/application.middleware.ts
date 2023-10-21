import { NextFunction, Request, Response } from "express";
import { ApplicationService } from "../services";

export default function ApplicationMiddleware(applicationService: ApplicationService) {

    return (req: Request, res: Response, next: NextFunction) => {

    }
}
