import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const { AWS_APPCONFIG_EXTENSION_PREFETCH_LIST: APPCONFIG } = process.env;

const client = new DynamoDBClient()

const params = {
	TableName: process.env.PETS_TABLE_NAME,
}

async function scanAndUnmarshall() {
	try {
		const results = await client.send(new ScanCommand(params))
		console.log(results)
		if (results.Items) {
			return results.Items.map((item) => unmarshall(item))
		}
		return results
	} catch (error) {
		console.error(error)
		throw error
	}
}

async function getConfiguration() {
	const res = await fetch(`http://localhost:2772${APPCONFIG}`)
	return res.json();
}

exports.handler = async () => {
	const data = await scanAndUnmarshall()
	const config = await getConfiguration();
	return {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
		},
		body: JSON.stringify({
			config,
			data
		}),
	}
}
