'use strict';

const crypto = require('crypto');
const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient();

module.exports.debug = async (event, context, callback) => {
  callback(null, json({
    event: event,
    context: context
  }));
};

module.exports.tasks_get = async (event, context, callback) => {
  var response = {};

  if (event.pathParameters && event.pathParameters.id) {
    response = await client.get({
      TableName: 'aws-sls-todo-dev',
      Key: {
        'uid': event["requestContext"]["authorizer"]["claims"]["cognito:username"],
        'id': event.pathParameters.id
      }
    }).promise();
  } else {
    response = await client.query({
      TableName: 'aws-sls-todo-dev',
      KeyConditionExpression: 'uid = :uid',
      ExpressionAttributeValues: {
        ':uid': event["requestContext"]["authorizer"]["claims"]["cognito:username"]
      }    
    }).promise();
  };

  callback(null, json(response));
};

module.exports.tasks_post = async (event, context, callback) => {
  var request = {};
  var response = {};

  if (event.body) request = JSON.parse(event.body);
  if (request.name) {
    response = await client.put({
      TableName: 'aws-sls-todo-dev',
      Item: {
          'uid': event["requestContext"]["authorizer"]["claims"]["cognito:username"],
          'id': crypto.randomBytes(16).toString("hex"),
          'name': request.name,
          'status': 'pending'
      },
      ReturnValues: 'ALL_OLD'
    }).promise();
  };

  callback(null, json(response));
};

module.exports.tasks_put = async (event, context, callback) => {
  var request = {};
  var response = {};

  if (event.pathParameters && event.pathParameters.id) {
    if (event.body) request = JSON.parse(event.body);
    if (request.status) {
      response = await client.update({
        TableName: 'aws-sls-todo-dev',
        Key: {
          'uid': event["requestContext"]["authorizer"]["claims"]["cognito:username"],
          'id': event.pathParameters.id
        },
        UpdateExpression: "SET #status = :status",
        ExpressionAttributeNames: {
          '#status': 'status'
        },
        ExpressionAttributeValues: {
          ':status': request.status
        },
        ReturnValues: 'ALL_NEW'
      }).promise();
    }
  };

  callback(null, json(response));
};

module.exports.tasks_delete = async (event, context, callback) => {
  var response = {};

  if (event.pathParameters && event.pathParameters.id) {
    response = await client.delete({
      TableName: 'aws-sls-todo-dev',
      Key: {
        'uid': event["requestContext"]["authorizer"]["claims"]["cognito:username"],
        'id': event.pathParameters.id
      },
      ReturnValues: 'ALL_OLD'
    }).promise();
  };

  callback(null, json(response));
}

function json(data) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data)    
  }
}
