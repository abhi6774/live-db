import { Router } from "express";
import { ApplicationService } from "../services";

const router = Router();

const appService = new ApplicationService();

router.get("/", async (req, res) => {
    res.send(await appService.getApps());
});

export default router;
