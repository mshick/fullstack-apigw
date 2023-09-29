import { Duration } from 'aws-cdk-lib';
import { Alias, Architecture, ILayerVersion, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { LogLevel, NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export interface NodeFunctionProps extends NodejsFunctionProps {
  layers: ILayerVersion[]
  environment: Record<string, string>
}

export class NodeFunction extends NodejsFunction {
  readonly alias: Alias

  constructor(scope: Construct, id: string, props: NodeFunctionProps) {
    const defaultProps: NodejsFunctionProps = {
      ...props,
      timeout: Duration.seconds(300),
      runtime: Runtime.NODEJS_18_X,
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        ...props.environment
      },
      bundling: {
        externalModules: [],
        target: 'es2021',
        logLevel: LogLevel.ERROR,
        minify: true,
        keepNames: true,
        sourceMap: false,
      },
      architecture: Architecture.X86_64,
      // logRetention: isProduction ? RetentionDays.ONE_YEAR : RetentionDays.ONE_WEEK,
      tracing: Tracing.ACTIVE,
      layers: [...props.layers]
    }

    super(scope, id, defaultProps)

    this.alias = new Alias(this, id.concat('alias'), {
      version: this.currentVersion,
      aliasName: 'current',
    })
  }
}