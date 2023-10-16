import { Injectable } from "@nestjs/common";
import { v3, v4 } from "uuid";

interface IMessage {
    id: string;
    text: string;
}

@Injectable()
export class MessageService {

    accumulator: IMessage[] = [];

    saveMessage(message: string) {
        this.accumulator.push({
            id: v4(),
            text: message
        });
    }

    getMessages() {
        return this.accumulator.slice(-10);
    }
}
