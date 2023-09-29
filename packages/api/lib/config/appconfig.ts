import { Fn } from 'aws-cdk-lib';
import * as appconfig from 'aws-cdk-lib/aws-appconfig';
import { Construct } from 'constructs';

export enum AppConfigExtensionDeploymentStrategy {
  AllAtOnce = 'AppConfig.AllAtOnce',
  Linear50PercentEvery30Seconds = 'AppConfig.Linear50PercentEvery30Seconds',
  Canary10Percent20Minutes = 'AppConfig.Canary10Percent20Minutes',
}

export interface SimpleConfigurationProps {
  deploymentStrategy?: keyof typeof AppConfigExtensionDeploymentStrategy;
  configurationName: string;
  configuration: Record<string, unknown>;
}

const defaultDeploymentStrategy = 'AppConfig.AllAtOnce';

export class AppConfig extends appconfig.CfnDeployment {
  public readonly deploymentUri: string;

  constructor(scope: Construct, id: string, props: SimpleConfigurationProps) {
    const { configuration, configurationName, deploymentStrategy } = props;

    const application = new appconfig.CfnApplication(
      scope,
      `${id}: Application`,
      {
        name: configurationName,
      }
    );

    const environment = new appconfig.CfnEnvironment(
      scope,
      `${id}: Environment`,
      {
        applicationId: application.ref,
        name: 'default',
      }
    );

    const configurationProfile = new appconfig.CfnConfigurationProfile(
      scope,
      `${id}: ConfigurationProfile`,
      {
        applicationId: application.ref,
        locationUri: 'hosted',
        name: 'config',
        type: 'AWS.Freeform',
      }
    );

    const configurationVersion = new appconfig.CfnHostedConfigurationVersion(
      scope,
      `${id}: ConfigurationProfileVersion`,
      {
        applicationId: application.ref,
        configurationProfileId: configurationProfile.ref,
        contentType: 'application/json',
        content: JSON.stringify(configuration),
      }
    );

    super(scope, id, {
      applicationId: application.ref,
      configurationProfileId: configurationProfile.ref,
      configurationVersion: configurationVersion.ref,
      deploymentStrategyId: deploymentStrategy || defaultDeploymentStrategy,
      environmentId: environment.ref,
    });

    this.deploymentUri = Fn.sub(
      '/applications/${applicationId}/environments/${environmentId}/configurations/${configurationId}',
      {
        applicationId: application.ref,
        environmentId: environment.ref,
        configurationId: configurationProfile.ref,
      }
    );
  }
}