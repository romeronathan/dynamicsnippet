import { Schema, Document, model } from "mongoose";

export type InviteDocument = Document & {
    title: string;
    value: String;
    description: String;
    userId: String;
    url: String;
    isDeleted: Boolean;
};

const InviteSchema = new Schema<InviteDocument>({
    title: { type: String, required: true },
    value: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    url: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
});

export const Invite = model<InviteDocument>("Invite", InviteSchema);
