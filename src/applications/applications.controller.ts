import { Body, Controller, Post } from "@nestjs/common";
import { ApplicationService } from "./services/applications.service";

@Controller("applications")
export class ApplicationController {

    constructor(private applicationService: ApplicationService) { }

    @Post("register")
    registerApplication(@Body() body: { name: string, description?: string }) {
        return this.applicationService.registerApplication(body.name, body.description);
    }

    @Post("delete")
    deleteApplication(@Body("appId") appId: string) {
        return this.applicationService.deleteApplication(appId);
    }
}
