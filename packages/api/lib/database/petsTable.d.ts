import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
type PetsTableProps = {
    tableName: string;
};
export declare const createPetsTable: (scope: Construct, props: PetsTableProps) => Table;
export {};
