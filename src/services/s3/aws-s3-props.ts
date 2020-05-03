import { Body } from "aws-sdk/clients/s3";

/**
 * Create S3 bucket props
 */
export type S3CreateBucketProps = {
    bucket: string;
}

/**
 * Delete S3 bucket props
 */
export type S3DeleteBucketProps = {
    bucket: string;
}

/**
 * S3 upload file data type
 */
export type S3UploadFileProps = {
    bucket: string;
    objectKey: string;
    objectContent: Body
}

/**
 * S3 get file data type
 */
export type S3GetFileProps = {
    bucket: string;
    objectKey: string;
}

/**
 * S3 list files data type
 */
export type S3ListFilesProps = {
    bucket: string;
}

/**
 * S3 delete file data type
 */
export type S3DeleteFileProps = {
    bucket: string;
    objectKey: string;
}