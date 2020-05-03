import AwsCore from '../../core/aws-core';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import nodeFetch from 'node-fetch';
import IAwsCognito from './aws-cognito-interface';
import AwsResponse from '../../helpers/response-handler';
import Literals from '../../helpers/literals';
import { IAwsResponse } from '../../core/aws-interfaces';
import { CognitoConfirmUserProps, CognitoDeleteUserAttributesProps, CognitoUserChangePassword, CognitoDeleteUserProps, CognitoRefreshTokenProps, CognitoAuthenticateUserProps, CognitoCreateUserProps, CognitoSignOutUserProps, CognitoResendConfirmationProps, CognitoGetUserDataProps, CognitoUpdateUserProps, CognitChangeUserStatusProps } from './aws-cognito-props';
import { AdminCreateUserRequest, AttributeType, DeliveryMediumType, DeliveryMediumListType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import constants from '../../helpers/constants';
const globalConst: any = global;

export default class AwsCognito extends AwsCore implements IAwsCognito {

    /**
     * Variable for cognito user pool data
     */
    private cognitoUserPool: AmazonCognitoIdentity.CognitoUserPool;

    /**
     * Variable to hold Aws response handler class instance
     */
    private awsResponse: IAwsResponse;

    /**
     * Setting user pool Id
     */
    private userPoolId: string;

    /**
     * Instantiating and initializing cognito services
     * @param accessKey string
     * @param secretKey string
     * @param userPoolInfo AmazonCognitoIdentity.ICognitoUserPoolData
     */
    constructor(accessKey: string, secretKey: string, region: string, userPoolInfo: AmazonCognitoIdentity.ICognitoUserPoolData) {
        super(accessKey, secretKey, region);
        globalConst.fetch = nodeFetch;

        this.userPoolId = userPoolInfo.UserPoolId;
        this.cognitoUserPool = new AmazonCognitoIdentity.CognitoUserPool(userPoolInfo);
        this.awsResponse = new AwsResponse();
    }

    /**
     * Creating user in cognito user pool
     * @param userData CognitoCreateUserProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    createUser(userData: CognitoCreateUserProps): Promise<IAwsResponse | object> {
        try {
            let attributeList = Array<AttributeType>();

            for (let key in userData) {
                attributeList.push({ Name: key, Value: userData[key] });
            }

            let deliveryMediumList: DeliveryMediumListType = [];
            let deliveryMediumType: DeliveryMediumType = Literals.DELIVERY_MEDIUM_TYPE.EMAIL;
            deliveryMediumList.push(deliveryMediumType);

            let cognitoUserData: AdminCreateUserRequest = {
                UserPoolId: this.cognitoUserPool.getUserPoolId(),
                Username: userData.email,
                UserAttributes: attributeList,
                TemporaryPassword: this.generatePassword(constants.COGNITO.TEMP_PASSWORD_LENGTH),
                DesiredDeliveryMediums: deliveryMediumList
            }

            return new Promise((resolve, reject) => {
                this.cognitoIdentityServiceProvider.adminCreateUser(cognitoUserData, (err, result) => {
                    if (err) {
                        reject(this.awsResponse.fail(err, 400));
                    }
                    resolve(this.awsResponse.success(result, 200));
                });
            });
        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Authenticating user in cognito user pool
     * @param userData CognitoAuthenticateUserProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    authenticateUser(userData: CognitoAuthenticateUserProps): Promise<IAwsResponse | object> {
        try {
            let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
                Username: userData.username,
                Password: userData.password,
            });

            let cognitoData = {
                Username: userData.username,
                Pool: this.cognitoUserPool
            };
            let cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoData);
            return new Promise((resolve, reject) => {
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: (result) => {
                        resolve(this.awsResponse.success({
                            accessToken: result.getAccessToken().getJwtToken(),
                            idToken: result.getIdToken().getJwtToken(),
                            refreshToken: result.getRefreshToken().getToken()
                        }, 200));
                    },
                    onFailure: (err) => {
                        reject(this.awsResponse.fail(err, 400));
                    }
                });
            });
        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Updating user in cognito user pool
     * @param userData CognitoUpdateUserProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    updateUser(userData: CognitoUpdateUserProps): Promise<IAwsResponse | object> {
        try {
            let attributeList = Array<AmazonCognitoIdentity.ICognitoUserAttributeData>();

            let userIdToken = new AmazonCognitoIdentity.CognitoIdToken({
                IdToken: userData.idToken
            });
            let userAccessToken = new AmazonCognitoIdentity.CognitoAccessToken({
                AccessToken: userData.accessToken
            });
            let userRefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
                RefreshToken: userData.refreshToken
            });

            let authenticationDetails = new AmazonCognitoIdentity.CognitoUserSession({
                AccessToken: userAccessToken,
                IdToken: userIdToken,
                RefreshToken: userRefreshToken
            });

            let cognitoData = {
                Username: userData.username,
                Pool: this.cognitoUserPool
            };
            let cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoData);
            cognitoUser.setSignInUserSession(authenticationDetails);

            return new Promise((resolve, reject) => {
                cognitoUser.updateAttributes(attributeList, (err, result) => {
                    if (err) {
                        reject(this.awsResponse.fail(err, 400));
                    } else {
                        resolve(this.awsResponse.success(result, 200));
                    }
                });
            });
        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Refresh token in cognito user pool
     * @param userData CognitoRefreshTokenProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    refreshSession(userData: CognitoRefreshTokenProps): Promise<IAwsResponse | object> {
        try {
            const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: userData.refreshToken });

            const cognitoData = {
                Username: userData.username,
                Pool: this.cognitoUserPool
            };

            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoData);

            return new Promise((resolve, reject) => {
                cognitoUser.refreshSession(RefreshToken, (err, session) => {
                    if (err) {
                        reject(this.awsResponse.fail(err, 400));
                    } else {
                        resolve(this.awsResponse.success({
                            accessToken: session.accessToken.jwtToken,
                            idToken: session.idToken.jwtToken,
                            refreshToken: session.refreshToken.token
                        }, 200));
                    }
                });
            });
        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Delete user in cognito user pool
     * @param userData CognitoDeleteUserProps
     * @returns  Promise<IAwsResponse | object>
     * @throws error
     */
    deleteUser(userData: CognitoDeleteUserProps): Promise<IAwsResponse | object> {
        try {
            let userIdToken = new AmazonCognitoIdentity.CognitoIdToken({
                IdToken: userData.idToken
            });
            let userAccessToken = new AmazonCognitoIdentity.CognitoAccessToken({
                AccessToken: userData.accessToken
            });
            let userRefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
                RefreshToken: userData.refreshToken
            });

            let authenticationDetails = new AmazonCognitoIdentity.CognitoUserSession({
                AccessToken: userAccessToken,
                IdToken: userIdToken,
                RefreshToken: userRefreshToken
            });

            let cognitoData = {
                Username: userData.username,
                Pool: this.cognitoUserPool
            };
            let cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoData);
            cognitoUser.setSignInUserSession(authenticationDetails);

            return new Promise((resolve, reject) => {
                cognitoUser.deleteUser((err, result) => {
                    if (err) {
                        reject(this.awsResponse.fail(err, 400));
                    } else {
                        resolve(this.awsResponse.success({
                            data: "Successfully deleted the user."
                        }, 200));
                    }
                });
            });
        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Changing user password in cognito user pool
     * @param userData CognitoUserChangePassword
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    changeUserPassword(userData: CognitoUserChangePassword): Promise<IAwsResponse | object> {
        try {
            let userIdToken = new AmazonCognitoIdentity.CognitoIdToken({
                IdToken: userData.idToken
            });
            let userAccessToken = new AmazonCognitoIdentity.CognitoAccessToken({
                AccessToken: userData.accessToken
            });
            let userRefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
                RefreshToken: userData.refreshToken
            });

            let authenticationDetails = new AmazonCognitoIdentity.CognitoUserSession({
                AccessToken: userAccessToken,
                IdToken: userIdToken,
                RefreshToken: userRefreshToken
            });

            let cognitoData = {
                Username: userData.username,
                Pool: this.cognitoUserPool
            };
            let cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoData);
            cognitoUser.setSignInUserSession(authenticationDetails);

            return new Promise((resolve, reject) => {
                cognitoUser.changePassword(userData.password, userData.newPassword, (err, result) => {
                    if (err) {
                        reject(this.awsResponse.fail(err, 400));
                    } else {
                        resolve(this.awsResponse.success({
                            data: Literals.SUCCESS_PASSWORD_CHANGE,
                            result
                        }, 200));
                    }
                });
            });
        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Deleting user attribute from user in cognito user pool
     * @param userData CognitoDeleteUserAttributesProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    deleteUserAttributes(userData: CognitoDeleteUserAttributesProps): Promise<IAwsResponse | object> {
        try {
            let userIdToken = new AmazonCognitoIdentity.CognitoIdToken({
                IdToken: userData.idToken
            });
            let userAccessToken = new AmazonCognitoIdentity.CognitoAccessToken({
                AccessToken: userData.accessToken
            });
            let userRefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
                RefreshToken: userData.refreshToken
            });

            let authenticationDetails = new AmazonCognitoIdentity.CognitoUserSession({
                AccessToken: userAccessToken,
                IdToken: userIdToken,
                RefreshToken: userRefreshToken
            });

            let attributeList = Array<string>();

            for (let key in userData) {
                if (key !== "username") {
                    attributeList.push(key);
                }
            }


            let cognitoData = {
                Username: userData.username,
                Pool: this.cognitoUserPool
            };
            let cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoData);
            cognitoUser.setSignInUserSession(authenticationDetails);

            return new Promise((resolve, reject) => {
                cognitoUser.deleteAttributes(attributeList, (err, result) => {
                    if (err) {
                        reject(this.awsResponse.fail(err, 400));
                    } else {
                        resolve(this.awsResponse.success({
                            data: Literals.SUCCESS_USER_ATTRIBUTED_DELETED,
                            result
                        }, 200));
                    }
                });
            });
        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Confirming user registration in cognito user pool
     * @param userData CognitoConfirmUserProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    confirmNewUser(userData: CognitoConfirmUserProps): Promise<IAwsResponse | object> {
        try {
            const cognitoData = {
                Username: userData.username,
                Pool: this.cognitoUserPool
            };

            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoData);

            return new Promise((resolve, reject) => {
                cognitoUser.confirmRegistration(userData.code, true, (err, result) => {
                    if (err) {
                        reject(this.awsResponse.fail(err, 400));
                    } else {
                        resolve(this.awsResponse.success(result, 200));
                    }
                });
            });
        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Logout user from cognito user pool
     * @param userData CognitoSignOutUserProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    signOutUser(userData: CognitoSignOutUserProps): Promise<IAwsResponse | object> {
        try {
            const cognitoData = {
                Username: userData.username,
                Pool: this.cognitoUserPool
            };

            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoData);

            return new Promise((resolve, reject) => {
                cognitoUser.signOut();
                resolve(this.awsResponse.success({
                    data: Literals.SUCCESS_LOGOUT
                }, 200));
            });
        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Resend confirmation of user in cognito user pool
     * @param userData CognitoResendConfirmationProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    resendConfirmation(userData: CognitoResendConfirmationProps): Promise<IAwsResponse | object> {
        try {
            const cognitoData = {
                Username: userData.username,
                Pool: this.cognitoUserPool
            };

            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoData);

            return new Promise((resolve, reject) => {
                cognitoUser.resendConfirmationCode((error, success) => {
                    if (error) {
                        throw this.awsResponse.fail(error, 400);
                    }
                    resolve(this.awsResponse.success(success, 200));
                });
            });
        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
    * Resend confirmation of user in cognito user pool
    * @param userData CognitoGetUserDataProps
    * @returns Promise<IAwsResponse | object>
    * @throws error
    */
    getUserData(userData: CognitoGetUserDataProps): Promise<IAwsResponse | object> {
        try {
            let userIdToken = new AmazonCognitoIdentity.CognitoIdToken({
                IdToken: userData.idToken
            });
            let userAccessToken = new AmazonCognitoIdentity.CognitoAccessToken({
                AccessToken: userData.accessToken
            });
            let userRefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
                RefreshToken: userData.refreshToken
            });

            let authenticationDetails = new AmazonCognitoIdentity.CognitoUserSession({
                AccessToken: userAccessToken,
                IdToken: userIdToken,
                RefreshToken: userRefreshToken
            });

            const cognitoData = {
                Username: userData.username,
                Pool: this.cognitoUserPool
            };

            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoData);
            cognitoUser.setSignInUserSession(authenticationDetails);

            return new Promise((resolve, reject) => {
                cognitoUser.getUserData((error, success) => {
                    if (error) {
                        throw this.awsResponse.fail(error, 400);
                    }
                    resolve(this.awsResponse.success(success, 200));
                });
            });
        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Update account status of user in cognito user pool
     * @param userData CognitChangeUserStatusProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    changeUserStatus(userData: CognitChangeUserStatusProps): Promise<IAwsResponse | object> {
        try {
            const cognitoData = {
                UserPoolId: this.userPoolId,
                Username: userData.username
            };

            return new Promise((resolve, reject) => {
                switch (userData.status) {
                    case Literals.USER_STATUS.ENABLE:
                        this.cognitoIdentityServiceProvider.adminEnableUser(cognitoData, (error, result) => {
                            if (error) {
                                throw this.awsResponse.fail(error, 400);
                            }
                            resolve(this.awsResponse.success(result, 200));
                        });
                        break;

                    case Literals.USER_STATUS.DISABLE:
                        this.cognitoIdentityServiceProvider.adminDisableUser(cognitoData, (error, result) => {
                            if (error) {
                                throw this.awsResponse.fail(error, 400);
                            }
                            resolve(this.awsResponse.success(result, 200));
                        });
                        break;

                    default:
                        break;
                }
            });
        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }
}