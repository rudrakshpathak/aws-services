import { IAwsResponse } from "../../core/aws-interfaces";
import { S3UploadFileProps, S3GetFileProps, S3ListFilesProps, S3DeleteFileProps } from "./aws-s3-props";

/**
 * AwsCognito class interface
 */
export default interface IAwsS3 {

    /**
     * Uploading file to S3
     * @param fileData S3UploadFileProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    uploadFile(fileData: S3UploadFileProps): Promise<IAwsResponse | object>;

    /**
     * Fetching file from S3
     * @param fileData S3GetFileProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    getFile(fileData: S3GetFileProps): Promise<IAwsResponse | object>;

    /**
    * Listing files from S3
    * @param fileData S3ListFilesProps
    * @returns Promise<IAwsResponse | object>
    * @throws error
    */
   listFiles(fileData: S3ListFilesProps): Promise<IAwsResponse | object>;

   /**
     * Deleting object from S3
     * @param fileData S3DeleteFileProps
     * @returns Promise<IAwsResponse | object>
     * @throws error
     */
    deleteFile(fileData: S3DeleteFileProps): Promise<IAwsResponse | object>;
}