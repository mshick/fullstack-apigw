import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
type getitemPetsFuncProps = {
    functionName: string;
    petsTableArn: string;
    enviornmentVars: {
        petsTableName: string;
    };
};
export declare const createGetItemPetsFunc: (scope: Construct, props: getitemPetsFuncProps) => NodejsFunction;
export {};
