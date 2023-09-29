"use strict";

// lib/functions/deletePetsFunc/main.ts
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var client = new import_client_dynamodb.DynamoDBClient();
async function deleteItem(id) {
  const params = {
    TableName: process.env.BOOKS_TABLE_NAME,
    Key: {
      id: { S: id }
      // Assuming ID is the primary key and is of type string. Adjust if needed.
    }
  };
  try {
    const results = await client.send(new import_client_dynamodb.DeleteItemCommand(params));
    console.log(`Deleted item with ID: ${id}`);
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
exports.handler = async (event) => {
  console.log("Received event:", JSON.parse(event.body));
  const { id } = JSON.parse(event.body);
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "id is missing in the request body."
      })
    };
  }
  await deleteItem(id);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({
      message: `Successfully deleted item with id: ${id}`
    })
  };
};
