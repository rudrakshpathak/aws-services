import AwsCore from '../../core/aws-core';

export default class AwsSNS extends AwsCore
{
    constructor(accessKey: string, secretKey: string, region: string) {
        super(accessKey, secretKey, region);
    }
}