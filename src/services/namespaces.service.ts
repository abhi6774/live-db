import { Namespace } from "socket.io";
import { Singleton } from "../utils/instancer";


const collections = ["startup", "registeredapp"];

@Singleton
export default class NamespaceService {

    private namespaces = new Map<string, Namespace>();


    add(name: string, namespace: Namespace) {
        this.namespaces.set(name, namespace);
    }

    get(name: string) {
        return this.namespaces.get(name);
    }

    getAll() {
        return this.namespaces;
    }

    remove(name: string) {
        this.namespaces.delete(name);
    }

    removeAll() {
        this.namespaces.clear();
    }

    has(name: string) {
        if (!this.namespaces.has(name)) return false;
        if (!collections.includes(name)) return false;
        return true;
    }
}
