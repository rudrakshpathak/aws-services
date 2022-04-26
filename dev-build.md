# Document for developers

### Pre-requisites
1. NodeJS >v12.* (https://nodejs.org/en/)
2. NPM >v6.*
3. Microsoft TypeScript

### Dependencies
```json
"dependencies": {
    "@types/express": "^4.17.6",
    "@types/node-fetch": "^2.6.1",
    "amazon-cognito-identity-js": "^4.2.1",
    "aws-sdk": "^2.1121.0",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "node-fetch": "^2.6.7",
    "ts-node-dev": "^1.1.8",
    "typescript": "^3.8.3"
}
```

### Commands
`npm run dev` to build the files and initiate the development console.

`npm run tsc` to compile the TypeScript build and produce a JS compatible release.