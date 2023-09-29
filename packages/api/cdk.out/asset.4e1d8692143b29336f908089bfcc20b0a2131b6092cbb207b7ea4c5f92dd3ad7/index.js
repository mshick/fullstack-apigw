"use strict";

// lib/functions/getPetsFunc/main.ts
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var import_util_dynamodb = require("@aws-sdk/util-dynamodb");
var { AWS_APPCONFIG_EXTENSION_PREFETCH_LIST: APPCONFIG } = process.env;
var client = new import_client_dynamodb.DynamoDBClient();
var params = {
  TableName: process.env.PETS_TABLE_NAME
};
async function scanAndUnmarshall() {
  try {
    const results = await client.send(new import_client_dynamodb.ScanCommand(params));
    console.log(results);
    if (results.Items) {
      return results.Items.map((item) => (0, import_util_dynamodb.unmarshall)(item));
    }
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getConfiguration() {
  const res = await fetch(`http://localhost:2772${APPCONFIG}`);
  return res.json();
}
exports.handler = async () => {
  const data = await scanAndUnmarshall();
  const config = await getConfiguration();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({
      config,
      data
    })
  };
};
