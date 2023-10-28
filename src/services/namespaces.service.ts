import { Namespace } from "socket.io";
import { Singleton } from "../utils/instancer";
import { ErrorMessage } from "../utils/utils";


// const collections = ["/startup", "/registeredapp"];

interface Startup {
    id: string;
    name: string;
    description?: string;
}

interface RegisteredApp {
    id: string,
    name: string,
    description?: string,
}


interface Collection<T> {
    set: (id: string, app: T) => void;
    get: (id: string) => T | undefined;
    getAll: () => Map<string, T>;
    delete: (id: string) => void;
    keys: () => IterableIterator<string>;
}

export const collections = (() => {

    const startup = new Map<string, Startup>();

    const registeredapp = new Map<string, RegisteredApp>();

    return {
        get names() { return ["startup", "registeredapp"] },
        get startup(): Collection<Startup> {
            return {
                set: (id: string, stup: Startup) => {
                    startup.set(id, stup);
                },
                get: (id: string) => {
                    return startup.get(id);
                },
                getAll: () => {
                    return startup;
                },
                delete: (id: string) => {
                    startup.delete(id);
                },
                keys: () => {
                    return startup.keys();
                }
            };
        },
        get registeredapp(): Collection<RegisteredApp> {
            return {
                set: (id: string, app: RegisteredApp) => {
                    registeredapp.set(id, app);
                },
                get: (id: string) => {
                    return registeredapp.get(id);
                },
                getAll: () => {
                    return registeredapp;
                },
                delete: (id: string) => {
                    registeredapp.delete(id);
                },
                keys: () => {
                    return registeredapp.keys();
                }
            };
        },
    }
})()


collections.startup.set("1", { id: "1", name: "Startup 1" });
collections.startup.set("2", { id: "2", name: "Startup 2" });
collections.startup.set("3", { id: "3", name: "Startup 3" });

collections.registeredapp.set("1", { id: "1", name: "Registered App 1" });
collections.registeredapp.set("2", { id: "2", name: "Registered App 2" });
collections.registeredapp.set("3", { id: "3", name: "Registered App 3" });



interface AddNamespaceReturn {
    result: { name: string, namespace: Namespace } | null,
    error: ErrorMessage | null
}

@Singleton
export default class NamespaceService {

    private namespaces = new Map<string, Namespace>();


    add(name: string, documentId: string, namespace: Namespace): AddNamespaceReturn {
        name = name.slice(1);
        if (this.namespaces.has(name)) {
            return { result: { name, namespace: this.namespaces.get(name) as Namespace }, error: null };
        }

        if (!collections.names.includes(name)) return { error: { message: "Invalid namespace" }, result: null };
        const collection = collections[name] as Collection<Startup> | Collection<RegisteredApp>;
        if (collection.get(documentId) === undefined) return { error: { message: "Document not found" }, result: null };

        this.namespaces.set(name, namespace);
        return { result: { name, namespace }, error: null };
    }

    get(name: string) {
        name = name.slice(1);
        return this.namespaces.get(name);
    }

    getAll() {
        return this.namespaces;
    }

    remove(name: string) {
        name = name.slice(1);
        this.namespaces.delete(name);
    }

    removeAll() {
        this.namespaces.clear();
    }

    has(name: string) {
        name = name.slice(1);
        return this.namespaces.has(name) && collections.names.includes(name);
    }
}
