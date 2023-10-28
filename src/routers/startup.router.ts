import { Router } from "express";
import { NamespaceService, StartUpService } from "../services";
import { collections } from "../services/namespaces.service";

const startup = Router();

const startupService = new StartUpService();

const namespaceService = new NamespaceService();

startup.get("/", (req, res) => {
    res.json(collections.startup.get("2"));
});


startup.post("/", async (req, res) => {
    collections.startup.set(req.body.id, {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
    });
    namespaceService.get("/startup")!.in(req.body.id).emit("changes", req.body);
    res.json(collections.startup.get(req.body.id));
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
