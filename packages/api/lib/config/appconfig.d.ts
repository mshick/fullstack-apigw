import * as appconfig from 'aws-cdk-lib/aws-appconfig';
import { Construct } from 'constructs';
export declare enum AppConfigExtensionDeploymentStrategy {
    AllAtOnce = "AppConfig.AllAtOnce",
    Linear50PercentEvery30Seconds = "AppConfig.Linear50PercentEvery30Seconds",
    Canary10Percent20Minutes = "AppConfig.Canary10Percent20Minutes"
}
export interface SimpleConfigurationProps {
    deploymentStrategy?: keyof typeof AppConfigExtensionDeploymentStrategy;
    configurationName: string;
    configuration: Record<string, unknown>;
}
export declare class AppConfig extends appconfig.CfnDeployment {
    readonly deploymentUri: string;
    constructor(scope: Construct, id: string, props: SimpleConfigurationProps);
}
