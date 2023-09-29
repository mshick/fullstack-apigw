import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
type deletePetsFuncProps = {
    functionName: string;
    petsTableArn: string;
    enviornmentVars: {
        petsTableName: string;
    };
};
export declare const createDeletePetsFunc: (scope: Construct, props: deletePetsFuncProps) => NodejsFunction;
export {};
