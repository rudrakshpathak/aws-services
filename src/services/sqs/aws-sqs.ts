import AwsCore from '../../core/aws-core';

export default class AwsSQS extends AwsCore
{
    constructor(accessKey: string, secretKey: string, region: string) {
        super(accessKey, secretKey, region);
    }
}