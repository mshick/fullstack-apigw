import { RemovalPolicy } from 'aws-cdk-lib'
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'

type PetsTableProps = {
	tableName: string
}
export const createPetsTable = (scope: Construct, props: PetsTableProps) => {
	const petsTable = new Table(scope, props.tableName, {
		tableName: props.tableName,
		billingMode: BillingMode.PAY_PER_REQUEST,
		removalPolicy: RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
		partitionKey: {
			name: 'id',
			type: AttributeType.STRING,
		},
	})

	return petsTable
}
