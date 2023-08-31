import { PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import * as path from 'path'

type getitemPetsFuncProps = {
	functionName: string
	petsTableArn: string
	enviornmentVars: { petsTableName: string }
}

export const createGetItemPetsFunc = (
	scope: Construct,
	props: getitemPetsFuncProps
) => {
	const getitemPetsFunc = new NodejsFunction(scope, `${props.functionName}`, {
		functionName: `${props.functionName}`,
		runtime: Runtime.NODEJS_18_X,
		handler: 'handler',
		entry: path.join(__dirname, `./main.ts`),
		environment: {
			PETS_TABLE_NAME: props.enviornmentVars.petsTableName,
		},
	})

	getitemPetsFunc.addToRolePolicy(
		new PolicyStatement({
			actions: ['dynamodb:GetItem'],
			resources: [props.petsTableArn],
		})
	)

	return getitemPetsFunc
}
