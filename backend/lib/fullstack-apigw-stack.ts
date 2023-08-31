import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { createGetPetsFunc } from './functions/getPetsFunc/construct'
import { createCRUDAPIGateway } from './api/apigateway'
import { createPetsTable } from './database/petsTable'
import { createPutPetsFunc } from './functions/putPetsFunc/construct'
import { createDeletePetsFunc } from './functions/deletePetsFunc/construct'

export class FullstackApigwStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)

		const petsTable = createPetsTable(this, {
			tableName: 'petsTable',
		})

		const getPetsFunc = createGetPetsFunc(this, {
			functionName: 'getPetsFunc',
			petsTableArn: petsTable.tableArn,
			enviornmentVars: { petsTableName: petsTable.tableName },
		})

		const putPetFunc = createPutPetsFunc(this, {
			functionName: 'putPetFunc',
			petsTableArn: petsTable.tableArn,
			enviornmentVars: { petsTableName: petsTable.tableName },
		})

		const deletePetFunc = createDeletePetsFunc(this, {
			functionName: 'deletePetFunc',
			petsTableArn: petsTable.tableArn,
			enviornmentVars: { petsTableName: petsTable.tableName },
		})

		const petsAPI = createCRUDAPIGateway(this, {
			apiName: 'petsAPI',
			baseResourceName: 'pets',
			leafResourceName: 'petId',
			getAllBaseFunc: getPetsFunc,
			putItemBaseFunc: putPetFunc,
			deleteItemLeafFunc: putPetFunc,
		})

		new cdk.CfnOutput(this, 'petsAPIURL', {
			value: petsAPI.url,
		})
	}
}
