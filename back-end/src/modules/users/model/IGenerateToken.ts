export interface IGenerateToken {
    id?: number;
    token: string;
    userId: number;
    expireIn: Date;
    role: string;
}
