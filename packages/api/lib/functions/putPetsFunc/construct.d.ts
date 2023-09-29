import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
type putPetsFuncProps = {
    functionName: string;
    petsTableArn: string;
    enviornmentVars: {
        petsTableName: string;
    };
};
export declare const createPutPetsFunc: (scope: Construct, props: putPetsFuncProps) => NodejsFunction;
export {};
