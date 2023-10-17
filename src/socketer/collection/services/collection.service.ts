import { Injectable } from "@nestjs/common";
import { v4 } from "uuid";
import { CollectionGateway } from "../collection.gateway";
import { TCollection, TDocType, TDocument } from "./types";

@Injectable()
export class CollectionService {

    collections = new Map<string, TCollection>();

    constructor() { }

    createCollection(name: string) {
        if (this.collections.has(name)) {
            return { error: new Error("Collection already exists"), collection: null };
        }

        const collection: TCollection = {
            id: name,
            documents: new Map<string, TDocType>()
        }

        this.collections.set(name, collection);


        return { error: null, collection };
    }

    createDocument(collectionName: string, document: any) {
        let collection: TCollection;

        if (!this.collections.has(collectionName)) {
            const { error, collection: createdCollection } = this.createCollection(collectionName);
            if (error) {
                throw error;
            }
            collection = createdCollection;
        }

        collection = this.collections.get(collectionName)
        const docId = v4();
        const doc = collection.documents.set(docId, { ...document, id: docId });

        return doc;
    }

    updateDocument(collectionName: string, documentId: string, payload: Object) {
        const isCollectionAvailable = this.collections.has(collectionName);

        if (isCollectionAvailable) {
            const collection = this.collections.get(collectionName);
            const isDocumentAvailable = collection.documents.has(documentId);
            if (isDocumentAvailable) {
                const document = collection.documents.get(documentId);
                const updatedDocument = { ...document, ...payload };
                collection.documents.set(documentId, updatedDocument);
                return updatedDocument;
            }
        }
        return null;
    }
}
