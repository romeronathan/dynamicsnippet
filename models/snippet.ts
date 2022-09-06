import mongoose, { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";

export type SnippetDocument = Document & {
    title: string;
    description: string;
    url: string;
    code: string;
    userId: string;
};

const snippetSchema = new Schema<SnippetDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    code: { type: String, required: true },
    userId: { type: String, required: true },
});


export const Snippet = mongoose.models.Snippets || model<SnippetDocument>("Snippets", snippetSchema);
