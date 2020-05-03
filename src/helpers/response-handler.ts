import { successResponseType, failureResponseType, errorResponseType } from '../core/aws-types';
import {IAwsResponse} from '../core/aws-interfaces';

export default class AwsResponse implements IAwsResponse {
    /**
     * Success response from AWS service
     * @param response object|any
     * @param responseCode successResponseType
     * @returns object
     */
    success(response: Object | any, responseCode: successResponseType) {
        return {
            status: responseCode,
            response: response
        }
    }

    /**
     * Failure response from AWS service
     * @param response object|any
     * @param responseCode failureResponseType
     * @returns object
     */
    fail(response: Object | any, responseCode: failureResponseType) {
        return {
            status: responseCode,
            response: response
        }
    }

    /**
     * Error response from AWS service
     * @param response object|any
     * @param responseCode errorResponseType
     * @returns object
     */
    error(response: Object | any, responseCode: errorResponseType) {
        return {
            status: responseCode,
            response: response
        }
    }
}