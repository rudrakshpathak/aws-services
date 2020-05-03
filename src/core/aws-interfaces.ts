import { successResponseType, failureResponseType, errorResponseType } from './aws-types';

export interface IAwsResponse {
    
    /**
     * Success response from AWS service
     * @param response object|any
     * @param responseCode successResponseType
     * @returns object
     */
    success(response: Object | any, responseCode: successResponseType): object;

    /**
     * Failure response from AWS service
     * @param response object|any
     * @param responseCode failureResponseType
     * @returns object
     */
    fail(response: Object | any, responseCode: failureResponseType): object;

    /**
     * Error response from AWS service
     * @param response object|any
     * @param responseCode errorResponseType
     * @returns object
     */
    error(response: Object | any, responseCode: errorResponseType): object;
}