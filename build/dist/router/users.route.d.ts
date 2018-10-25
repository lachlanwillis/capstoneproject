import { RequestHandler } from 'express';
/**
 * The handler that manages user sign ups. Creates an entry in the database for a user and
 * and stores information like email and hashed password.
 */
export declare const HandleUserSignup: RequestHandler;
export declare const HandleUserLogin: RequestHandler;
/**
 * The hander for users loging out.
 */
export declare const HandleUserLogout: RequestHandler;
/**
 * The handler for checking whether a user is an admin or not
 */
export declare const IsUserAdmin: RequestHandler;
/**
 * The handler for promoting a user to admin
 */
export declare const PromoteUser: RequestHandler;
/**
 * Handler for demoting a user. Takes an id of a user from the body.
 */
export declare const DemoteUser: RequestHandler;
/**
 * Handler for opting a user out of the leaderboard
 * @param req
 * @param res
 */
export declare const OptOutLeaderboard: RequestHandler;
/**
 * Handler for opting a user back into the leaderboard
 * @param req
 * @param res
 */
export declare const OptInLeaderboard: RequestHandler;
export declare const DeleteUserHandler: RequestHandler;
export declare const GetUsersHandler: RequestHandler;
export declare const SetPostcodeHandler: RequestHandler;
export declare const VerifyUserHandler: RequestHandler;
export declare const DeclineUserHandler: RequestHandler;
/**
 * Updates the user's name
 * @param req
 * @param res
 */
export declare const UpdateUserName: RequestHandler;
export declare const UpdateUserEmail: RequestHandler;
export declare const PasswordEmailHandler: RequestHandler;
export declare const UpdatePasswordHandler: RequestHandler;
export declare const ResetPasswordHandler: RequestHandler;
export declare const GetUsers: RequestHandler;
