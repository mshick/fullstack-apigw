"use strict";

// lib/functions/getItemPetsFunc/main.ts
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var import_util_dynamodb = require("@aws-sdk/util-dynamodb");
var client = new import_client_dynamodb.DynamoDBClient();
async function getItem(id) {
  const params = {
    TableName: process.env.BOOKS_TABLE_NAME,
    Key: {
      id: { S: id }
      // Assuming id is the primary key and is of type string. Adjust if needed.
    }
  };
  try {
    const results = await client.send(new import_client_dynamodb.GetItemCommand(params));
    if (results.Item) {
      return (0, import_util_dynamodb.unmarshall)(results.Item);
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
exports.handler = async (event) => {
  const id = event.pathParameters?.bookId;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "id is missing in the request body."
      })
    };
  }
  const item = await getItem(id);
  if (!item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: `Item with id: ${id} not found.` })
    };
  }
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(item)
  };
};
