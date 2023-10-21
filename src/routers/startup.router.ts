import { Router } from "express";
import { StartUpService } from "services";

const startup = Router();


const startupService = StartUpService.getInstance();

startup.get("/", (req, res) => {
    res.json(startupService.getAll());
});


startup.post("/", (req, res) => {
    const startup = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        logo: req.body.logo,
        cover: req.body.cover,
    }
    startupService.create(startup);
    res.json(startup);
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
