const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId:'',
    secretAccessKey:'',
    region:''
});
const s3 =  new AWS.s3();
module.exports= s3;