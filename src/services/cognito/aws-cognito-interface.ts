import { IAwsResponse } from "../../core/aws-interfaces";
import { CognitoDeleteUserAttributesProps, CognitoUserChangePassword, CognitoDeleteUserProps, CognitoRefreshTokenProps, CognitoAuthenticateUserProps, CognitoCreateUserProps, CognitoConfirmUserProps, CognitoSignOutUserProps, CognitoResendConfirmationProps, CognitoUpdateUserProps, CognitChangeUserStatusProps } from "./aws-cognito-props";

/**
 * AwsCognito class interface
 */
export default interface IAwsCognito {

    /**
     * Creating user in cognito user pool
     * @param userData CognitoCreateUserProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    createUser(userData: CognitoCreateUserProps): Promise<IAwsResponse | object>;

    /**
     * Authenticating user in cognito user pool
     * @param userData CognitoAuthenticateUserProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    authenticateUser(userData: CognitoAuthenticateUserProps): Promise<IAwsResponse | object>;

    /**
     * Updating user in cognito user pool
     * @param userData CognitoUpdateUserProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    updateUser(userData: CognitoUpdateUserProps): Promise<IAwsResponse | object>;

    /**
     * Refresh token in cognito user pool
     * @param userData CognitoRefreshTokenProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    refreshSession(userData: CognitoRefreshTokenProps): Promise<IAwsResponse | object>;

    /**
     * Delete user in cognito user pool
     * @param userData CognitoDeleteUserProps
     * @returns  Promise<IAwsResponse | object>
     * @throws error
     */
    deleteUser(userData: CognitoDeleteUserProps): Promise<IAwsResponse | object>;

    /**
     * Changing user password in cognito user pool
     * @param userData CognitoUserChangePassword
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    changeUserPassword(userData: CognitoUserChangePassword): Promise<IAwsResponse | object>;

    /**
     * Deleting user attribute from user in cognito user pool
     * @param userData CognitoDeleteUserAttributesProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    deleteUserAttributes(userData: CognitoDeleteUserAttributesProps): Promise<IAwsResponse | object>;

    /**
     * Confirming user registration in cognito user pool
     * @param userData CognitoConfirmUserProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    confirmNewUser(userData: CognitoConfirmUserProps): Promise<IAwsResponse | object>;

    /**
     * Logout user from cognito user pool
     * @param userData CognitoSignOutUserProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    signOutUser(userData: CognitoSignOutUserProps): Promise<IAwsResponse | object>;

    /**
     * Resend confirmation of user in cognito user pool
     * @param userData CognitoResendConfirmationProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    resendConfirmation(userData: CognitoResendConfirmationProps): Promise<IAwsResponse | object>;

    /**
     * Update account status of user in cognito user pool
     * @param userData CognitChangeUserStatusProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    changeUserStatus(userData: CognitChangeUserStatusProps): Promise<IAwsResponse | object>;
}