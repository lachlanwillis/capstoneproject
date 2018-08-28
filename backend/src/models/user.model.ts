import { Document, Schema, Model, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface UserInfo {
	email: string;
	name: string;
	password: string;
	verified: boolean;
	token?: string;
	admin?: boolean;
	facebook?: { id: string, token: string, name: string, email: string };
	google?: { id: string, token: string, name: string, email: string };
	points: number;
	postcode?: number;
    deleted?: boolean;
    leaderboardVisible: boolean;
}

export interface UserModel extends Document, UserInfo {
	last_login: Date;
	verifyPassword(password:string, callback:any):any;
}

export var UserSchema: Schema = new Schema({
	email: String,
	name: String,
	password: String,
	token: String,
	verified: { type: Boolean, default: false },
	admin: { type: Boolean, default: false },
	last_login: { type: Date, default: Date.now },
	points: { type: Number, default: 0 },
	deleted: { type: Boolean, default: false },
	postcode: Number,
	google: {
		id: String,
		token: String,
		name: String,
		email: String
	},
	facebook: {
		id: String,
		token: String,
		name: String,
		email: String
    },
    leaderboardVisible: {type: Boolean, default: true}
});

UserSchema.methods.verifyPassword = function(password:string, callback:any) {
		bcrypt.compare(password, this.password)
			.then(match => {
				console.log('match', match)
				callback(null, match);
			}).catch(err => callback(err, false));
}

export const User: Model<UserModel> = model<UserModel>("User", UserSchema);