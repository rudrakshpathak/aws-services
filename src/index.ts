import Cognito from './services/cognito/aws-cognito';
import Elasticache from './services/elasticache/aws-elasticache';
import S3 from './services/s3/aws-s3';
import SNS from './services/sns/aws-sns';
import SQS from './services/sqs/aws-sqs';

/**
 * Exporting the services available in package
 */
export default {
    /**
     * Amazon Cognito lets you add user sign-up, sign-in, and access control to your web and mobile apps quickly and easily.
     */
    Cognito, 
    
    /**
     * Fully managed in-memory data store, compatible with Redis or Memcached.
     */
    Elasticache, 
    
    /**
     * Object storage built to store and retrieve any amount of data from anywhere
     */
    S3, 
    
    /**
     * Fully managed pub/sub messaging for microservices, distributed systems, and serverless applications
     */
    SNS, 
    
    /**
     * (Amazon SQS) offers a secure, durable, and available hosted queue that lets you integrate and decouple distributed software systems and components.
     */
    SQS
}