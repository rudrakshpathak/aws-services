# AWS Services [IN DEVELOPMENT - OPEN FOR CONTRIBUTIONS]
A streamlined process of using all AWS services at one place. 

[![version](https://img.shields.io/static/v1?label=version&message=v0.0.5&color=ff69b4)]()
[![license](https://img.shields.io/static/v1?label=license&message=Apache2.0&color=yellow)]()
[![status](https://img.shields.io/static/v1?label=status&message=development&color=orange)]()

### Requirements 
[![version](https://img.shields.io/static/v1?label=node&message=>v12.*&color=success)]()
[![version](https://img.shields.io/static/v1?label=npm&message=>v6.*&color=blue)]()

### Installation [A STABLE VERSION WILL BE PUBLISHED SOON. TILL THEN YOU CAN IMPORT THE FILES DIRECTLY
```npm
npm i aws-services-sdk-wrapper
```

### Import the package
```js
import aws from 'aws-services-sdk-wrapper'
```

### Supported services
#### Cognito
Create cognito instance
```js
let cognitoObj = new aws.Cognito("AWS_ACCESS_KEY", "AWS_SECRET_KEY", "AWS_REGION", {
  UserPoolId: "USER_POOL_ID",
  ClientId: "USER_POOL_CLIENT_ID",
});
```

Create user in cognito
```js
cognitoObj.createUser({
    email: STRING|REQUIRED,
    name: STRING|REQUIRED,
    gender: STRING|REQUIRED,
    birthdate: STRING|REQUIRED|YYYY-MM-DD,
    address: STRING|REQUIRED,
    phone_number: STRING|REQUIRED
}).then((response) => {})
.catch((error) => {});
```

Authenticate user in cognito
```js
cognitoObj.authenticateUser({
    username: STRING|REQUIRED,
    password: STRING|REQUIRED
}).then((response) => {})
.catch((error) => {});
```

Refresh user token in cognito
```js
cognitoObj.refreshSession({
    username: STRING|REQUIRED,
    refreshToken: STRING|REQUIRED
}).then((response) => {})
.catch((error) => {});
```

#### S3
```js
let s3Obj = new aws.S3("AWS_ACCESS_KEY", "AWS_SECRET_KEY", "AWS_REGION");
```
Create bucket in S3
```js
s3Obj.createBucket({
    bucket: STRING
}).then((response) => {})
.catch((error) => {});
```

Remove bucket in S3
```js
s3Obj.removeBucket({
    bucket: STRING
}).then((response) => {})
.catch((error) => {});
```

Upload file in S3
```js
s3Obj.uploadFile({
    bucket: STRING,
    objectKey: STRING,
    objectContent: STRING|BLOB|BINARY
}).then((response) => {})
.catch((error) => {});
```

Get file from S3
```js
s3Obj.getFile({
    bucket: STRING,
    objectKey: STRING
}).then((response) => {})
.catch((error) => {});
```

List files from S3
```js
s3Obj.listFiles({
    bucket: STRING
}).then((response) => {})
.catch((error) => {});
```

Delete file from S3
```js
s3Obj.deleteFile({
    bucket: STRING,
    objectKey: STRING
}).then((response) => {})
.catch((error) => {});
```

### Build using
<img src="http://blog.rudrakshpathak.com/wp-content/uploads/2020/04/typescript.png" width="200">

### Dependencies/References

* [aws-sdk](https://www.npmjs.com/package/aws-sdk)
* [amazon-cognito-identity-js](https://www.npmjs.com/package/amazon-cognito-identity-js)


:sunglasses:
:v:
