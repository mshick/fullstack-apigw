"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient();
async function deleteItem(id) {
    const params = {
        TableName: process.env.BOOKS_TABLE_NAME,
        Key: {
            id: { S: id }, // Assuming ID is the primary key and is of type string. Adjust if needed.
        },
    };
    try {
        const results = await client.send(new client_dynamodb_1.DeleteItemCommand(params));
        console.log(`Deleted item with ID: ${id}`);
        return results;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
exports.handler = async (event) => {
    // Assuming the ID is sent in the body as: { "id": "someValue" }
    console.log('Received event:', JSON.parse(event.body));
    const { id } = JSON.parse(event.body);
    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'id is missing in the request body.',
            }),
        };
    }
    await deleteItem(id);
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            message: `Successfully deleted item with id: ${id}`,
        }),
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4REFBNEU7QUFFNUUsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQ0FBYyxFQUFFLENBQUE7QUFFbkMsS0FBSyxVQUFVLFVBQVUsQ0FBQyxFQUFVO0lBQ25DLE1BQU0sTUFBTSxHQUFHO1FBQ2QsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCO1FBQ3ZDLEdBQUcsRUFBRTtZQUNKLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSwwRUFBMEU7U0FDekY7S0FDRCxDQUFBO0lBRUQsSUFBSTtRQUNILE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLG1DQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUMxQyxPQUFPLE9BQU8sQ0FBQTtLQUNkO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLE1BQU0sS0FBSyxDQUFBO0tBQ1g7QUFDRixDQUFDO0FBRUQsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDdEMsZ0VBQWdFO0lBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUN0RCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFckMsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNSLE9BQU87WUFDTixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNwQixPQUFPLEVBQUUsb0NBQW9DO2FBQzdDLENBQUM7U0FDRixDQUFBO0tBQ0Q7SUFFRCxNQUFNLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVwQixPQUFPO1FBQ04sVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUU7WUFDUiw2QkFBNkIsRUFBRSxHQUFHO1lBQ2xDLGtDQUFrQyxFQUFFLElBQUk7U0FDeEM7UUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNwQixPQUFPLEVBQUUsc0NBQXNDLEVBQUUsRUFBRTtTQUNuRCxDQUFDO0tBQ0YsQ0FBQTtBQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCQ2xpZW50LCBEZWxldGVJdGVtQ29tbWFuZCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1keW5hbW9kYidcblxuY29uc3QgY2xpZW50ID0gbmV3IER5bmFtb0RCQ2xpZW50KClcblxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlSXRlbShpZDogc3RyaW5nKSB7XG5cdGNvbnN0IHBhcmFtcyA9IHtcblx0XHRUYWJsZU5hbWU6IHByb2Nlc3MuZW52LkJPT0tTX1RBQkxFX05BTUUsXG5cdFx0S2V5OiB7XG5cdFx0XHRpZDogeyBTOiBpZCB9LCAvLyBBc3N1bWluZyBJRCBpcyB0aGUgcHJpbWFyeSBrZXkgYW5kIGlzIG9mIHR5cGUgc3RyaW5nLiBBZGp1c3QgaWYgbmVlZGVkLlxuXHRcdH0sXG5cdH1cblxuXHR0cnkge1xuXHRcdGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBjbGllbnQuc2VuZChuZXcgRGVsZXRlSXRlbUNvbW1hbmQocGFyYW1zKSlcblx0XHRjb25zb2xlLmxvZyhgRGVsZXRlZCBpdGVtIHdpdGggSUQ6ICR7aWR9YClcblx0XHRyZXR1cm4gcmVzdWx0c1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpXG5cdFx0dGhyb3cgZXJyb3Jcblx0fVxufVxuXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuXHQvLyBBc3N1bWluZyB0aGUgSUQgaXMgc2VudCBpbiB0aGUgYm9keSBhczogeyBcImlkXCI6IFwic29tZVZhbHVlXCIgfVxuXHRjb25zb2xlLmxvZygnUmVjZWl2ZWQgZXZlbnQ6JywgSlNPTi5wYXJzZShldmVudC5ib2R5KSlcblx0Y29uc3QgeyBpZCB9ID0gSlNPTi5wYXJzZShldmVudC5ib2R5KVxuXG5cdGlmICghaWQpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c3RhdHVzQ29kZTogNDAwLFxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRtZXNzYWdlOiAnaWQgaXMgbWlzc2luZyBpbiB0aGUgcmVxdWVzdCBib2R5LicsXG5cdFx0XHR9KSxcblx0XHR9XG5cdH1cblxuXHRhd2FpdCBkZWxldGVJdGVtKGlkKVxuXG5cdHJldHVybiB7XG5cdFx0c3RhdHVzQ29kZTogMjAwLFxuXHRcdGhlYWRlcnM6IHtcblx0XHRcdCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG5cdFx0XHQnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlLFxuXHRcdH0sXG5cdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0bWVzc2FnZTogYFN1Y2Nlc3NmdWxseSBkZWxldGVkIGl0ZW0gd2l0aCBpZDogJHtpZH1gLFxuXHRcdH0pLFxuXHR9XG59XG4iXX0=