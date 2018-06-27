'use strict';
var aws = require('aws-sdk');

module.exports.invoke_hello = (event, context, callback) => {
  var innerEvent = {};
  innerEvent.item_no = 246

  var lambda = new aws.Lambda();
  var params = {
    FunctionName: "myServiceTokinaga-dev-hello",
    InvocationType: "Event",
    Payload: JSON.stringify(innerEvent),
  };

  lambda.invoke(params, function(err, data){
    if(err) {
      console.log("invoke error")
      context.done(err, err);
    } else {
      console.log("invoke done")
      context.done(null, '');
    }
  });
};

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!(hello)',
      input: event,
    }),
  };

  console.log("hello!")
  console.log(event)
  console.log(event.item_no)
  console.log("hello! end")
  callback(null, response);
};
