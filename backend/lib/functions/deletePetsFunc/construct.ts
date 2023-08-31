import { PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import path = require('path')

type deletePetsFuncProps = {
	functionName: string
	petsTableArn: string
	enviornmentVars: { petsTableName: string }
}

export const createDeletePetsFunc = (
	scope: Construct,
	props: deletePetsFuncProps
) => {
	const deletePetsFunc = new NodejsFunction(scope, `${props.functionName}`, {
		functionName: `${props.functionName}`,
		runtime: Runtime.NODEJS_18_X,
		handler: 'handler',
		entry: path.join(__dirname, `./main.ts`),
		environment: {
			PETS_TABLE_NAME: props.enviornmentVars.petsTableName,
		},
	})

	deletePetsFunc.addToRolePolicy(
		new PolicyStatement({
			actions: ['dynamodb:DeleteItem'],
			resources: [props.petsTableArn],
		})
	)

	return deletePetsFunc
}
