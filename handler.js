'use strict';

const crypto = require('crypto');
const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.tableName;   

module.exports.debug = async (event, context, callback) => {
  callback(null, json({
    event: event,
    context: context
  }));
};

module.exports.tasks_get = async (event, context, callback) => {
  var response = {};

  if (event.pathParameters && getId(event)) {
    response = await client.get({
      TableName: tableName,
      Key: {
        'uid': getUid(event),
        'id': getId(event)
      }
    }).promise();
  } else {
    response = await client.query({
      TableName: tableName,
      KeyConditionExpression: 'uid = :uid',
      ExpressionAttributeValues: {
        ':uid': getUid(event)
      }    
    }).promise();
  };

  callback(null, json(response));
};

module.exports.tasks_post = async (event, context, callback) => {
  var request = {};
  var data = null;

  if (event.body) request = JSON.parse(event.body);
  if (request.title && request.detail && request.due) {
    data = {
      'uid': getUid(event),
      'id': crypto.randomBytes(16).toString("hex"),
      'title': request.title,
      'detail': request.detail,
      'due': request.due,
      'status': false
    };
    await client.put({
      TableName: tableName,
      Item: data,
      ReturnValues: 'ALL_OLD'
    }).promise();
  };

  if (data)
    callback(null, json(data));
  else
    callback(null, error(500));
};

module.exports.tasks_put = async (event, context, callback) => {
  var request = {};
  var response = {};

  if (event.pathParameters && getId(event)) {
    if (event.body) request = JSON.parse(event.body);
    // if ('status' in request) {
    //   response = await client.update({
    //     TableName: tableName,
    //     Key: {
    //       'uid': getUid(event),
    //       'id': getId(event)
    //     },
    //     UpdateExpression: "SET #status = :status",
    //     ExpressionAttributeNames: {
    //       '#status': 'status'
    //     },
    //     ExpressionAttributeValues: {
    //       ':status': request.status
    //     },
    //     ReturnValues: 'ALL_NEW'
    //   }).promise();
    // }
    if ('id' in request) {
      response = await client.put({
        TableName: tableName,
        Item: request,
        ReturnValues: 'ALL_OLD'
      }).promise();
    }
  };

  callback(null, json(response));
};

module.exports.tasks_delete = async (event, context, callback) => {
  var response = {};

  if (event.pathParameters && getId(event)) {
    response = await client.delete({
      TableName: tableName,
      Key: {
        'uid': getUid(event),
        'id': getId(event)
      },
      ReturnValues: 'ALL_OLD'
    }).promise();
  };

  callback(null, json(response));
}

function getUid(event) {
 return event["requestContext"]["authorizer"]["claims"]["username"];
}

function getId(event) {
  return event.pathParameters.id;
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

function error(code) {
  return {
    statusCode: code,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }    
  }
}
