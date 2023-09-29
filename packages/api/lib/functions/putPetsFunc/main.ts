import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'

import { v4 as uuidv4 } from 'uuid'

const client = new DynamoDBClient()

async function lambdaHandler(event: any): Promise<any> {
	// Parse the body to get the item
	const itemData = JSON.parse(event.body)
	itemData.id = itemData.id ?? uuidv4()

	// Marshall the item data to match DynamoDB's format with a unique id
	const marshalledItem = marshall(itemData)

	const params = {
		TableName: process.env.PETS_TABLE_NAME,
		Item: marshalledItem,
	}

	try {
		await client.send(new PutItemCommand(params))
		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: {
				data: 'Item put successfully'
			}
		}
	} catch (error) {
		console.error(error)
		return {
			statusCode: 500,
			body: {
				error: 'Internal Server Error'
			}
		}
	}
}

exports.handler = lambdaHandler
