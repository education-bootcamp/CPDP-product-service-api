const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId:'',
    secretAccessKey:'',
    region:''
});
const s3 =  new AWS.S3();
module.exports= s3;