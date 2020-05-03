import AwsCore from '../../core/aws-core';
import { IAwsResponse } from '../../core/aws-interfaces';
import AwsResponse from '../../helpers/response-handler';
import IAwsS3 from './aws-s3-interface';
import { S3UploadFileProps, S3GetFileProps, S3ListFilesProps, S3DeleteFileProps, S3CreateBucketProps, S3DeleteBucketProps } from './aws-s3-props';
import constants from '../../helpers/constants';

export default class AwsS3 extends AwsCore implements IAwsS3 {
    /**
     * Variable to hold Aws response handler class instance
     */
    private awsResponse: IAwsResponse;

    constructor(accessKey: string, secretKey: string, region: string) {
        super(accessKey, secretKey, region);

        this.awsResponse = new AwsResponse();
    }

    /**
     * Creating new bucket in S3
     * @param fileData S3CreateBucketProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    createBucket(fileData: S3CreateBucketProps): Promise<IAwsResponse | object> {
        try {
            return new Promise((resolve, reject) => {
                this.s3ServiceProvider.createBucket({
                    Bucket: fileData.bucket
                }, (error, result) => {
                    if (error) {
                        reject(this.awsResponse.fail(error, 400));
                    }
                    resolve(this.awsResponse.success(result, 200));
                });
            });

        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Deleting existing bucket in S3
     * @param fileData S3CreateBucketProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    removeBucket(fileData: S3DeleteBucketProps): Promise<IAwsResponse | object> {
        try {
            return new Promise((resolve, reject) => {
                this.s3ServiceProvider.deleteBucket({
                    Bucket: fileData.bucket
                }, (error, result) => {
                    if (error) {
                        reject(this.awsResponse.fail(error, 400));
                    }
                    resolve(this.awsResponse.success(result, 200));
                });
            });

        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Listing available buckets in S3
     * @param fileData S3CreateBucketProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    listBuckets(): Promise<IAwsResponse | object> {
        try {
            return new Promise((resolve, reject) => {
                this.s3ServiceProvider.listBuckets((error, result) => {
                    if (error) {
                        reject(this.awsResponse.fail(error, 400));
                    }
                    resolve(this.awsResponse.success(result, 200));
                });
            });

        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Uploading file to S3
     * @param fileData S3UploadFileProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    uploadFile(fileData: S3UploadFileProps): Promise<IAwsResponse | object> {
        try {
            return new Promise((resolve, reject) => {
                this.s3ServiceProvider.putObject({
                    Bucket: fileData.bucket,
                    Key: fileData.objectKey ?? this.generateGuid(constants.GUID_LENGTH),
                    Body: fileData.objectContent
                }, (error, result) => {
                    if (error) {
                        reject(this.awsResponse.fail(error, 400));
                    }
                    resolve(this.awsResponse.success(result, 200));
                });
            });

        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Fetching file from S3
     * @param fileData S3GetFileProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    getFile(fileData: S3GetFileProps): Promise<IAwsResponse | object> {
        try {
            return new Promise((resolve, reject) => {
                this.s3ServiceProvider.getObject({
                    Bucket: fileData.bucket,
                    Key: fileData.objectKey,
                }, (error, result) => {
                    if (error) {
                        reject(this.awsResponse.fail(error, 400));
                    }
                    resolve(this.awsResponse.success(result, 200));
                });
            });

        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
    * Listing files from S3
    * @param fileData S3ListFilesProps
    * @returns Promise<IAwsResponse | object>
    * @throws error
    */
    listFiles(fileData: S3ListFilesProps): Promise<IAwsResponse | object> {
        try {
            return new Promise((resolve, reject) => {
                this.s3ServiceProvider.listObjects({
                    Bucket: fileData.bucket,
                }, (error, result) => {
                    if (error) {
                        reject(this.awsResponse.fail(error, 400));
                    }
                    resolve(this.awsResponse.success(result, 200));
                });
            });

        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }

    /**
     * Deleting object from S3
     * @param fileData S3DeleteFileProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    deleteFile(fileData: S3DeleteFileProps): Promise<IAwsResponse | object> {
        try {
            return new Promise((resolve, reject) => {
                this.s3ServiceProvider.deleteObject({
                    Bucket: fileData.bucket,
                    Key: fileData.objectKey
                }, (error, result) => {
                    if (error) {
                        reject(this.awsResponse.fail(error, 400));
                    }
                    resolve(this.awsResponse.success(result, 200));
                });
            });

        } catch (error) {
            throw this.awsResponse.error(JSON.stringify(error), 500);
        }
    }
}