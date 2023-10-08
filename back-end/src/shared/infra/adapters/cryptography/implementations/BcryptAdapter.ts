import bcrypt from "bcrypt";
import { ICriptography } from "../ICryptography";

export class BcryptAdapter implements ICriptography {
    private readonly salt: number;

    constructor() {
        this.salt = Number(process.env.SALT);
    }

    public async encrypt(plainText: string): Promise<string> {
        const encryptedText = await bcrypt.hash(plainText, this.salt);

        return encryptedText;
    }

    public async compare(
        plainText: string,
        encryptedText: string,
    ): Promise<boolean> {
        const isValid = await bcrypt.compare(plainText, encryptedText);
        return isValid;
    }
}
