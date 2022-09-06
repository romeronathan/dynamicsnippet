
import { Charset } from "../enums/charset";

export const createRandomToken = (n: number, charset: Charset): String => {
    var randomstring = require("randomstring");
    return randomstring.generate({
        length: n,
        charset: charset,
    });
};
