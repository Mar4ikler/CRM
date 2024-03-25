export interface JwtInputPayload {
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    sub: string;
    nickname: string;
    role: string;
}

export interface JwtValidatedOutput {
    userId: string;
    nickname: string;
    role: string;
}
