export interface ITokenProvider {
    generateToken(userId: number, expiresIn: string | number): Promise<string>;
}
