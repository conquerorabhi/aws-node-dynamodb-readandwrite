'use strict';
const awsSDK = require('aws-sdk')
const dynamoDBclient = new AWS.DynamoDB.DocumentClient()

module.exports = {
  readFromDynamoDB: (event,context,callback) => {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: event.pathParameters.id
      }
    }
    dynamoDBclient.get(params,(error,results) => {
      if(error){
        callback(null,{
          statusCode: error.statusCodeK||501,
          headers: {'Content-Type':'text/plain'},
          body: 'Could not fetch data.'
        });
        return;
      }
      const response = {
        statusCode: 200 ,
        body: JSON.stringify(results.item),
      };
      callback(null,response);
    })
  },
  writeToDynamoDB: (event,context,callback) => {

  }
}
