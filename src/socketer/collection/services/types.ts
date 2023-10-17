export type TDocType = Object & { id: string };
export type TDocument = Map<string, TDocType>;

export type TCollection = {
    id: string;
    documents: TDocument
}
