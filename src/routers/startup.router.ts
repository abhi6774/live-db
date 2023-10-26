import { Router } from "express";
import { StartUpService } from "../services";

const startup = Router();

const startupService = new StartUpService();

startup.get("/", (req, res) => {
    res.json(startupService.getAll());
});


startup.post("/", async (req, res) => {
    const startup = {
        name: req.body.name,
        description: req.body.description,
        logo: req.body.logo,
        cover: req.body.cover,
    }
    const created = await startupService.create(startup);
    res.json(created);
});


startup.get("/:id", (req, res) => {

    const startup = startupService.getOne(req.params.id);

    if (!startup) {
        res.status(404).json({ error: "Startup not found" });
    } else {
        res.json(startup);
    }

});



export default startup;
