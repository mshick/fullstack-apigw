import { PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import path = require('path')

type putPetsFuncProps = {
	functionName: string
	petsTableArn: string
	enviornmentVars: { petsTableName: string }
}

export const createPutPetsFunc = (
	scope: Construct,
	props: putPetsFuncProps
) => {
	const putPetsFunc = new NodejsFunction(scope, `${props.functionName}`, {
		functionName: `${props.functionName}`,
		runtime: Runtime.NODEJS_18_X,
		handler: 'handler',
		entry: path.join(__dirname, `./main.ts`),
		environment: {
			PETS_TABLE_NAME: props.enviornmentVars.petsTableName,
		},
	})

	putPetsFunc.addToRolePolicy(
		new PolicyStatement({
			actions: ['dynamodb:PutItem', 'dynamodb:UpdateItem'],
			resources: [props.petsTableArn],
		})
	)

	return putPetsFunc
}
