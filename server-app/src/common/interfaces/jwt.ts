export interface JwtInputPayload {
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    sub: string;
    email: string;
    role: string;
}

export interface JwtValidatedOutput {
    userId: string;
    email: string;
    role: string;
}
