import { Document, Schema, Model, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface UserInfo {
	username: string;
	password: string;
}

export interface UserModel extends Document, UserInfo {
	last_login: Date;
	verifyPassword(password:string, callback:any):any;
}

export var UserSchema: Schema = new Schema({
	username: String,
	password: String,
	last_login: { type: Date, default: Date.now }
});

UserSchema.methods.verifyPassword = function(password:string, callback:any) {
		bcrypt.compare(password, this.password)
			.then(match => {
				callback(null, match);
			}).catch(err => callback(err, false));
}

export const User: Model<UserModel> = model<UserModel>("User", UserSchema);