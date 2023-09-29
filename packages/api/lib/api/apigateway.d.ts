import { Construct } from 'constructs';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
type APIGatewayProps = {
    getAllBaseFunc: IFunction;
    putItemBaseFunc: IFunction;
    deleteItemBaseFunc: IFunction;
    getItemLeafFunc: IFunction;
    apiName: string;
    baseResourceName: string;
    leafResourceName: string;
};
export declare const createCRUDAPIGateway: (scope: Construct, props: APIGatewayProps) => RestApi;
export {};
