'use strict';
var aws = require('aws-sdk');

module.exports.invoke_hello = (event, context, callback) => {
  var innerEvent = {};
  // 親イベントが受け取った情報をそのまま子に渡す（eventをそのまま渡すとコケる場合がある）※詳細は未調査
  // innerEvent.body = event.body || {};
  // innerEvent.headers = event.headers || {};
  // innerEvent.queryStringParameters = event.queryStringParameters || null;
  // innerEvent.pathParameters = event.pathParameters || null;
  // innerEvent.requestContext = event.requestContext || null;
  // innerEvent.body = event.body || {};
  // innerEvent.exampleData = { "var1" : "data001" };   // 親が受け取ったデータ以外の情報を追加で渡す場合
  // innerEvent = JSON.stringify(innerEvent);

  var lambda = new aws.Lambda();
  var params = {
    FunctionName: "myServiceTokinaga-dev-hello",
    InvokeArgs: JSON.stringify(event),
    // InvocationType: "RequestResponse",   //同期呼出
    // Payload: innerEvent
  };

  // lambda.invoke(params, function(err, data){
  lambda.invokeAsync(params, function(err, data){
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
  callback(null, response);
};
