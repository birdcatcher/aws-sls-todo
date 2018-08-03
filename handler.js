'use strict';

module.exports.tasks_get = (event, context, callback) => {
  var request = {};
  if (event.body != null) request = JSON.parse(event.body);

  if (request.pool_id != null
    && request.client_id != null
  ) {
  }
  callback(null, {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      id: 123,
      name: 'laundry'
    })
  });  
};

module.exports.tasks_post = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      id: 123,
      name: 'laundry'
    })
  });    
};

module.exports.tasks_put = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      id: 123,
      name: 'laundry'
    })
  });    
};

module.exports.tasks_delete = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      id: 123,
      name: 'laundry'
    })
  });    
}
