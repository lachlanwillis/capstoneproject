import { Document, Schema, Model } from 'mongoose';
export interface UserInfo {
    email: string;
    name: string;
    password: string;
    verified: boolean;
    token?: string;
    admin?: boolean;
    facebook?: {
        id: string;
        token: string;
        name: string;
        email: string;
    };
    google?: {
        id: string;
        token: string;
        name: string;
        email: string;
    };
    points: number;
    postcode?: number;
    deleted?: boolean;
    leaderboardVisible: boolean;
}
export interface UserModel extends Document, UserInfo {
    last_login: Date;
    verifyPassword(password: string, callback: any): any;
}
export declare var UserSchema: Schema;
export declare const User: Model<UserModel>;
