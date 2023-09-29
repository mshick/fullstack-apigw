import { Alias, ILayerVersion } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
export interface NodeFunctionProps extends NodejsFunctionProps {
    layers: ILayerVersion[];
    environment: Record<string, string>;
}
export declare class NodeFunction extends NodejsFunction {
    readonly alias: Alias;
    constructor(scope: Construct, id: string, props: NodeFunctionProps);
}
