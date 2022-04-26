import AWS, { Config, CognitoIdentityServiceProvider, S3 } from 'aws-sdk';
import constants from '../helpers/constants';

/**
 * AWS core abstract class defining the base methods and instantiating AWS SDK
 */
export default abstract class AwsCore {

    /**
     * Cognito services provider
     */
    protected cognitoIdentityServiceProvider: CognitoIdentityServiceProvider;

    protected s3ServiceProvider: S3;


    /**
     * Initializing basic AWS properties
     */
    constructor(accessKey: string, secretKey: string, region: string) {
        this.cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
            region: region,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey
            }
        });

        this.s3ServiceProvider = new AWS.S3({
            region: region,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey
            }
        });
    }
}