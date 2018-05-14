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

UserSchema.pre('save', function(next: any) {
	let user = this as UserModel;
 
	if (!user.isModified('password')) return next();
	else {
		bcrypt.genSalt(5, (err:any, salt:string) => {
			if (err) return next(err);
			else {
				bcrypt.hash(user.password, salt, (err:any, hash:string) => {
					if (err) return next(err);
					else {
						user.password = hash;
						return next();
					}
				});
			}
		});
	}

	return next();

});

UserSchema.methods.verifyPassword = function(password:string, callback:any) {
	bcrypt.compare(password, this.password, (err:any, isMatch:boolean) => {
		if (err) return callback(err);
		else {
			return callback(null, isMatch);
		} 
	})
}

export const User: Model<UserModel> = model<UserModel>("User", UserSchema);