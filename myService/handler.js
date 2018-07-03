'use strict';
var aws = require('aws-sdk');

module.exports.invoke_hello = (event, context, callback) => {
  var lambda = new aws.Lambda();
  var lambdaFunc = function(params){
    lambda.invoke(params, function(err, data){
      if(err) {
        console.log(`invoke error(${params.Payload})`)
        context.done(err, err);
      } else {
        console.log(`invoke done(${params.Payload})`)
        context.done(null, '');
      }
    });
  };

  var params = {
    FunctionName: "myServiceTokinaga-dev-hello",
    InvocationType: "Event",
  };

  for (var i = 0; i < 10; i++) {
    params.Payload = JSON.stringify({item_no: i});
    lambdaFunc(params);
  }
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
