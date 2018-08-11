import { Document, Schema, Model, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface UserInfo {
	username: string;
	password: string;
	admin?: boolean;
	facebook?: { id: string, token: string, name: string, email: string };
	google?: { id: string, token: string, name: string, email: string };
}

export interface UserModel extends Document, UserInfo {
	last_login: Date;
	verifyPassword(password:string, callback:any):any;
}

export var UserSchema: Schema = new Schema({
	username: String,
	password: String,
	admin: { type: Boolean, default: false },
	last_login: { type: Date, default: Date.now },
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
	}
});

UserSchema.methods.verifyPassword = function(password:string, callback:any) {
		bcrypt.compare(password, this.password)
			.then(match => {
				callback(null, match);
			}).catch(err => callback(err, false));
}

export const User: Model<UserModel> = model<UserModel>("User", UserSchema);