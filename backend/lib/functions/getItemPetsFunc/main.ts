import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

const client = new DynamoDBClient()

async function getItem(id: string) {
	const params = {
		TableName: process.env.PETS_TABLE_NAME,
		Key: {
			id: { S: id }, // Assuming id is the primary key and is of type string. Adjust if needed.
		},
	}

	try {
		const results = await client.send(new GetItemCommand(params))
		if (results.Item) {
			return unmarshall(results.Item)
		} else {
			return null // or throw an error if the item doesn't exist
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}

exports.handler = async (event: any) => {
	// Assuming the id is sent in the body as: { "id": "someValue" }
	const id = event.pathParameters?.petId

	if (!id) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: 'id is missing in the request body.',
			}),
		}
	}

	const item = await getItem(id)

	if (!item) {
		return {
			statusCode: 404,
			body: JSON.stringify({ message: `Item with id: ${id} not found.` }),
		}
	}

	return {
		statusCode: 200,
		body: JSON.stringify(item),
	}
}
