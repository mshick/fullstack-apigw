"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient();
async function getItem(id) {
    const params = {
        TableName: process.env.BOOKS_TABLE_NAME,
        Key: {
            id: { S: id }, // Assuming id is the primary key and is of type string. Adjust if needed.
        },
    };
    try {
        const results = await client.send(new client_dynamodb_1.GetItemCommand(params));
        if (results.Item) {
            return (0, util_dynamodb_1.unmarshall)(results.Item);
        }
        else {
            return null; // or throw an error if the item doesn't exist
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
exports.handler = async (event) => {
    // Assuming the id is sent in the body as: { "id": "someValue" }
    const id = event.pathParameters?.bookId;
    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'id is missing in the request body.',
            }),
        };
    }
    const item = await getItem(id);
    if (!item) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: `Item with id: ${id} not found.` }),
        };
    }
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(item),
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4REFBeUU7QUFDekUsMERBQW1EO0FBRW5ELE1BQU0sTUFBTSxHQUFHLElBQUksZ0NBQWMsRUFBRSxDQUFBO0FBRW5DLEtBQUssVUFBVSxPQUFPLENBQUMsRUFBVTtJQUNoQyxNQUFNLE1BQU0sR0FBRztRQUNkLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQjtRQUN2QyxHQUFHLEVBQUU7WUFDSixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsMEVBQTBFO1NBQ3pGO0tBQ0QsQ0FBQTtJQUVELElBQUk7UUFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxnQ0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDN0QsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2pCLE9BQU8sSUFBQSwwQkFBVSxFQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMvQjthQUFNO1lBQ04sT0FBTyxJQUFJLENBQUEsQ0FBQyw4Q0FBOEM7U0FDMUQ7S0FDRDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwQixNQUFNLEtBQUssQ0FBQTtLQUNYO0FBQ0YsQ0FBQztBQUVELE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ3RDLGdFQUFnRTtJQUNoRSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQTtJQUV2QyxJQUFJLENBQUMsRUFBRSxFQUFFO1FBQ1IsT0FBTztZQUNOLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ3BCLE9BQU8sRUFBRSxvQ0FBb0M7YUFDN0MsQ0FBQztTQUNGLENBQUE7S0FDRDtJQUVELE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRTlCLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVixPQUFPO1lBQ04sVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsQ0FBQztTQUNuRSxDQUFBO0tBQ0Q7SUFFRCxPQUFPO1FBQ04sVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUU7WUFDUiw2QkFBNkIsRUFBRSxHQUFHO1lBQ2xDLGtDQUFrQyxFQUFFLElBQUk7U0FDeEM7UUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7S0FDMUIsQ0FBQTtBQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCQ2xpZW50LCBHZXRJdGVtQ29tbWFuZCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1keW5hbW9kYidcbmltcG9ydCB7IHVubWFyc2hhbGwgfSBmcm9tICdAYXdzLXNkay91dGlsLWR5bmFtb2RiJ1xuXG5jb25zdCBjbGllbnQgPSBuZXcgRHluYW1vREJDbGllbnQoKVxuXG5hc3luYyBmdW5jdGlvbiBnZXRJdGVtKGlkOiBzdHJpbmcpIHtcblx0Y29uc3QgcGFyYW1zID0ge1xuXHRcdFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuQk9PS1NfVEFCTEVfTkFNRSxcblx0XHRLZXk6IHtcblx0XHRcdGlkOiB7IFM6IGlkIH0sIC8vIEFzc3VtaW5nIGlkIGlzIHRoZSBwcmltYXJ5IGtleSBhbmQgaXMgb2YgdHlwZSBzdHJpbmcuIEFkanVzdCBpZiBuZWVkZWQuXG5cdFx0fSxcblx0fVxuXG5cdHRyeSB7XG5cdFx0Y29uc3QgcmVzdWx0cyA9IGF3YWl0IGNsaWVudC5zZW5kKG5ldyBHZXRJdGVtQ29tbWFuZChwYXJhbXMpKVxuXHRcdGlmIChyZXN1bHRzLkl0ZW0pIHtcblx0XHRcdHJldHVybiB1bm1hcnNoYWxsKHJlc3VsdHMuSXRlbSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGwgLy8gb3IgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGl0ZW0gZG9lc24ndCBleGlzdFxuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKGVycm9yKVxuXHRcdHRocm93IGVycm9yXG5cdH1cbn1cblxuZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcblx0Ly8gQXNzdW1pbmcgdGhlIGlkIGlzIHNlbnQgaW4gdGhlIGJvZHkgYXM6IHsgXCJpZFwiOiBcInNvbWVWYWx1ZVwiIH1cblx0Y29uc3QgaWQgPSBldmVudC5wYXRoUGFyYW1ldGVycz8uYm9va0lkXG5cblx0aWYgKCFpZCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRzdGF0dXNDb2RlOiA0MDAsXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdG1lc3NhZ2U6ICdpZCBpcyBtaXNzaW5nIGluIHRoZSByZXF1ZXN0IGJvZHkuJyxcblx0XHRcdH0pLFxuXHRcdH1cblx0fVxuXG5cdGNvbnN0IGl0ZW0gPSBhd2FpdCBnZXRJdGVtKGlkKVxuXG5cdGlmICghaXRlbSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRzdGF0dXNDb2RlOiA0MDQsXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6IGBJdGVtIHdpdGggaWQ6ICR7aWR9IG5vdCBmb3VuZC5gIH0pLFxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0c3RhdHVzQ29kZTogMjAwLFxuXHRcdGhlYWRlcnM6IHtcblx0XHRcdCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG5cdFx0XHQnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlLFxuXHRcdH0sXG5cdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG5cdH1cbn1cbiJdfQ==