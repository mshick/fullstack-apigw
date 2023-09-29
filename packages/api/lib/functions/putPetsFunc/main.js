"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const uuid_1 = require("uuid");
const client = new client_dynamodb_1.DynamoDBClient();
async function lambdaHandler(event) {
    // Parse the body to get the item
    const itemData = JSON.parse(event.body);
    itemData.id = itemData.id ?? (0, uuid_1.v4)();
    // Marshall the item data to match DynamoDB's format with a unique id
    const marshalledItem = (0, util_dynamodb_1.marshall)(itemData);
    const params = {
        TableName: process.env.PETS_TABLE_NAME,
        Item: marshalledItem,
    };
    try {
        await client.send(new client_dynamodb_1.PutItemCommand(params));
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: {
                data: 'Item put successfully'
            }
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: {
                error: 'Internal Server Error'
            }
        };
    }
}
exports.handler = lambdaHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4REFBeUU7QUFDekUsMERBQWlEO0FBRWpELCtCQUFtQztBQUVuQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGdDQUFjLEVBQUUsQ0FBQTtBQUVuQyxLQUFLLFVBQVUsYUFBYSxDQUFDLEtBQVU7SUFDdEMsaUNBQWlDO0lBQ2pDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxJQUFBLFNBQU0sR0FBRSxDQUFBO0lBRXJDLHFFQUFxRTtJQUNyRSxNQUFNLGNBQWMsR0FBRyxJQUFBLHdCQUFRLEVBQUMsUUFBUSxDQUFDLENBQUE7SUFFekMsTUFBTSxNQUFNLEdBQUc7UUFDZCxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlO1FBQ3RDLElBQUksRUFBRSxjQUFjO0tBQ3BCLENBQUE7SUFFRCxJQUFJO1FBQ0gsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksZ0NBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQzdDLE9BQU87WUFDTixVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDUiw2QkFBNkIsRUFBRSxHQUFHO2dCQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO2FBQ3hDO1lBQ0QsSUFBSSxFQUFFO2dCQUNMLElBQUksRUFBRSx1QkFBdUI7YUFDN0I7U0FDRCxDQUFBO0tBQ0Q7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsT0FBTztZQUNOLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFO2dCQUNMLEtBQUssRUFBRSx1QkFBdUI7YUFDOUI7U0FDRCxDQUFBO0tBQ0Q7QUFDRixDQUFDO0FBRUQsT0FBTyxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEeW5hbW9EQkNsaWVudCwgUHV0SXRlbUNvbW1hbmQgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtZHluYW1vZGInXG5pbXBvcnQgeyBtYXJzaGFsbCB9IGZyb20gJ0Bhd3Mtc2RrL3V0aWwtZHluYW1vZGInXG5cbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnXG5cbmNvbnN0IGNsaWVudCA9IG5ldyBEeW5hbW9EQkNsaWVudCgpXG5cbmFzeW5jIGZ1bmN0aW9uIGxhbWJkYUhhbmRsZXIoZXZlbnQ6IGFueSk6IFByb21pc2U8YW55PiB7XG5cdC8vIFBhcnNlIHRoZSBib2R5IHRvIGdldCB0aGUgaXRlbVxuXHRjb25zdCBpdGVtRGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSlcblx0aXRlbURhdGEuaWQgPSBpdGVtRGF0YS5pZCA/PyB1dWlkdjQoKVxuXG5cdC8vIE1hcnNoYWxsIHRoZSBpdGVtIGRhdGEgdG8gbWF0Y2ggRHluYW1vREIncyBmb3JtYXQgd2l0aCBhIHVuaXF1ZSBpZFxuXHRjb25zdCBtYXJzaGFsbGVkSXRlbSA9IG1hcnNoYWxsKGl0ZW1EYXRhKVxuXG5cdGNvbnN0IHBhcmFtcyA9IHtcblx0XHRUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlBFVFNfVEFCTEVfTkFNRSxcblx0XHRJdGVtOiBtYXJzaGFsbGVkSXRlbSxcblx0fVxuXG5cdHRyeSB7XG5cdFx0YXdhaXQgY2xpZW50LnNlbmQobmV3IFB1dEl0ZW1Db21tYW5kKHBhcmFtcykpXG5cdFx0cmV0dXJuIHtcblx0XHRcdHN0YXR1c0NvZGU6IDIwMCxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcblx0XHRcdFx0J0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJzogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHRib2R5OiB7XG5cdFx0XHRcdGRhdGE6ICdJdGVtIHB1dCBzdWNjZXNzZnVsbHknXG5cdFx0XHR9XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpXG5cdFx0cmV0dXJuIHtcblx0XHRcdHN0YXR1c0NvZGU6IDUwMCxcblx0XHRcdGJvZHk6IHtcblx0XHRcdFx0ZXJyb3I6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydHMuaGFuZGxlciA9IGxhbWJkYUhhbmRsZXJcbiJdfQ==