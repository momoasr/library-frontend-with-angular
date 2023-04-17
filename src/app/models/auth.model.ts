export interface TokenData {
    userData: UserData;
    isValidToken: boolean;
    token: string;
}

export interface UserData {
    public_id: string;
    userName: string;
    exp: number;
}