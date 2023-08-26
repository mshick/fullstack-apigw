import { Construct } from 'constructs'
import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { IFunction } from 'aws-cdk-lib/aws-lambda'

type APIGatewayProps = {
	getAllBaseFunc: IFunction
	putItemBaseFunc: IFunction
	apiName: string
	baseResourceName: string
	leafResourceName: string
}

export const createCRUDAPIGateway = (
	scope: Construct,
	props: APIGatewayProps
) => {
	const api = new RestApi(scope, props.apiName, {
		restApiName: props.apiName,
	})

	// Create the API resources
	const baseResource = api.root.addResource(props.baseResourceName)
	// const leafResource = baseResource.addResource(`{${props.leafResourceName}}`)

	// Allow CORS for all methods on the API
	baseResource.addCorsPreflight({
		allowOrigins: Cors.ALL_ORIGINS,
		allowMethods: Cors.ALL_METHODS,
	})

	// leafResource.addCorsPreflight({
	// 	allowOrigins: Cors.ALL_ORIGINS,
	// 	allowMethods: Cors.ALL_METHODS,
	// })

	// Allow a user to GET all the pets via a Lambda function
	const getAllBaseIntegration = new LambdaIntegration(props.getAllBaseFunc)
	const putItemBaseIntegration = new LambdaIntegration(props.putItemBaseFunc)
	baseResource.addMethod('GET', getAllBaseIntegration)
	baseResource.addMethod('POST', putItemBaseIntegration)

	return api
}
