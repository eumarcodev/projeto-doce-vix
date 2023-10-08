export interface IJWTProvider {
    generateToken(userId: number, JWTSalt: string): string;
    validateToken(token: string): boolean;
}
