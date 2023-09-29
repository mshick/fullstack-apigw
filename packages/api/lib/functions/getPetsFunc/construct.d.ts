import { Construct } from 'constructs';
import { NodeFunction } from '../function';
type getPetsFuncProps = {
    functionName: string;
    petsTableArn: string;
    appconfigUri: string;
    enviornmentVars: {
        petsTableName: string;
    };
};
export declare const createGetPetsFunc: (scope: Construct, props: getPetsFuncProps) => NodeFunction;
export {};
