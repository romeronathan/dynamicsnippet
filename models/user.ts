import mongoose, { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";

export type UserDocument = Document & {
    name: string;
    email: string;
    accessToken: string;
    tokens: [string];
};

const userSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    accessToken: { type: String, unique: true },
    tokens: { type: [String], unique: true },
});


export const User = mongoose.models.Users || model<UserDocument>("Users", userSchema);
