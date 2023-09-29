import { PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'
import * as path from 'path'
import { NodeFunction } from '../function'

type getPetsFuncProps = {
	functionName: string
	petsTableArn: string
	appconfigUri: string
	enviornmentVars: { 
		petsTableName: string 
	}
}

export const createGetPetsFunc = (
	scope: Construct,
	props: getPetsFuncProps
) => {
	const appConfig = LayerVersion.fromLayerVersionArn(
		scope,
		`my-first-app-config-layer`,
		'arn:aws:lambda:us-east-1:027255383542:layer:AWS-AppConfig-Extension:113',
	)

	const getPetsFunc = new NodeFunction(scope, `${props.functionName}`, {
		functionName: `${props.functionName}`,
		runtime: Runtime.NODEJS_18_X,
		handler: 'handler',
		entry: path.join(__dirname, `./main.ts`),
		environment: {
			AWS_APPCONFIG_EXTENSION_PREFETCH_LIST: props.appconfigUri,
			PETS_TABLE_NAME: props.enviornmentVars.petsTableName,
		},
		layers: []
	})

	getPetsFunc.addToRolePolicy(
		new PolicyStatement({
			actions: ['dynamodb:Scan'],
			resources: [props.petsTableArn],
		})
	)

	return getPetsFunc
}
