import { CognitoAccessToken, CognitoIdToken } from "amazon-cognito-identity-js";
import { userStatusType } from '../../core/aws-types';

/**
 * Cognito create user data type
 */
export type CognitoCreateUserProps = {
    [key: string]: string;
    email: string;
    name: string;
    gender: string;
    birthdate: string;
    address: string;
    phone_number: string;
}

/**
 * Cognito authenticate user data type
 */
export type CognitoAuthenticateUserProps = {
    username: string;
    password: string;
}

/**
 * Cognito update user data type
 */
export type CognitoUpdateUserProps = {
    username: string;
    [key: string]: string;
    email: string;
    password: string;
    name: string;
    gender: string;
    birthdate: string;
    address: string;
    phone_number: string;
    accessToken: string;
    idToken: string;
    refreshToken: string;
}

/**
 * Cognito refresh token data type
 */
export type CognitoRefreshTokenProps = {
    username: string;
    refreshToken: string;
}

/**
 * Cognito user data type
 */
export type CognitoDeleteUserProps = {
    username: string;
    password: string;
    accessToken: string;
    idToken: string;
    refreshToken: string;
}

/**
 * Cognito user data type
 */
export type CognitoDeleteUserAttributesProps = {
    username: string;
    name: string;
    gender: string;
    birthdate: string;
    address: string;
    phone_number: string;
    accessToken: string;
    idToken: string;
    refreshToken: string;
}

/**
 * Cognito user change password data type
 */
export type CognitoUserChangePassword = {
    username: string;
    password: string;
    newPassword: string;
    accessToken: string;
    idToken: string;
    refreshToken: string;
}

/**
 * Cognito user change password data type
 */
export type CognitoConfirmUserProps = {
    username: string;
    code: string;
}

/**
 * Cognito user change password data type
 */
export type CognitoSignOutUserProps = {
    username: string;
}

/**
 * Cognito user change password data type
 */
export type CognitoResendConfirmationProps = {
    username: string;
}

/**
 * Cognito get user data type
 */
export type CognitoGetUserDataProps = {
    username: string;
    accessToken: string;
    idToken: string;
    refreshToken: string;
}

/**
 * Cognito change user status type
 */
export type CognitChangeUserStatusProps = {
    username: string;
    status: userStatusType;
}