import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";

export type UserDocument = Document & {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    isAdmin: boolean;
    deactivatedDate: Date;
    confirmUserAgreement: Boolean;
    passwordResetToken: String | undefined;
    passwordResetExpires: Date | undefined;
};

const userSchema = new Schema<UserDocument>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    isAdmin: { type: Boolean, required: true },
    deactivatedDate: Date,
    confirmUserAgreement: { type: Boolean, required: true },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: String },
});

userSchema.pre("save", async function save(next) {
    const user = this as UserDocument;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

export const User = model<UserDocument>("User", userSchema);
