"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeFunction = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
class NodeFunction extends aws_lambda_nodejs_1.NodejsFunction {
    constructor(scope, id, props) {
        const defaultProps = {
            ...props,
            timeout: aws_cdk_lib_1.Duration.seconds(300),
            runtime: aws_lambda_1.Runtime.NODEJS_18_X,
            environment: {
                NODE_OPTIONS: '--enable-source-maps',
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                ...props.environment
            },
            bundling: {
                externalModules: [],
                target: 'es2021',
                logLevel: aws_lambda_nodejs_1.LogLevel.ERROR,
                minify: true,
                keepNames: true,
                sourceMap: false,
            },
            architecture: aws_lambda_1.Architecture.X86_64,
            // logRetention: isProduction ? RetentionDays.ONE_YEAR : RetentionDays.ONE_WEEK,
            tracing: aws_lambda_1.Tracing.ACTIVE,
            layers: [...props.layers]
        };
        super(scope, id, defaultProps);
        this.alias = new aws_lambda_1.Alias(this, id.concat('alias'), {
            version: this.currentVersion,
            aliasName: 'current',
        });
    }
}
exports.NodeFunction = NodeFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBdUM7QUFDdkMsdURBQThGO0FBQzlGLHFFQUE4RjtBQVE5RixNQUFhLFlBQWEsU0FBUSxrQ0FBYztJQUc5QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXdCO1FBQ2hFLE1BQU0sWUFBWSxHQUF3QjtZQUN4QyxHQUFHLEtBQUs7WUFDUixPQUFPLEVBQUUsc0JBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQzlCLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsV0FBVyxFQUFFO2dCQUNYLFlBQVksRUFBRSxzQkFBc0I7Z0JBQ3BDLG1DQUFtQyxFQUFFLEdBQUc7Z0JBQ3hDLEdBQUcsS0FBSyxDQUFDLFdBQVc7YUFDckI7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsZUFBZSxFQUFFLEVBQUU7Z0JBQ25CLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixRQUFRLEVBQUUsNEJBQVEsQ0FBQyxLQUFLO2dCQUN4QixNQUFNLEVBQUUsSUFBSTtnQkFDWixTQUFTLEVBQUUsSUFBSTtnQkFDZixTQUFTLEVBQUUsS0FBSzthQUNqQjtZQUNELFlBQVksRUFBRSx5QkFBWSxDQUFDLE1BQU07WUFDakMsZ0ZBQWdGO1lBQ2hGLE9BQU8sRUFBRSxvQkFBTyxDQUFDLE1BQU07WUFDdkIsTUFBTSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQzFCLENBQUE7UUFFRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQTtRQUU5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksa0JBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMvQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDNUIsU0FBUyxFQUFFLFNBQVM7U0FDckIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBbENELG9DQWtDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER1cmF0aW9uIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQWxpYXMsIEFyY2hpdGVjdHVyZSwgSUxheWVyVmVyc2lvbiwgUnVudGltZSwgVHJhY2luZyB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgTG9nTGV2ZWwsIE5vZGVqc0Z1bmN0aW9uLCBOb2RlanNGdW5jdGlvblByb3BzIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYS1ub2RlanMnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZUZ1bmN0aW9uUHJvcHMgZXh0ZW5kcyBOb2RlanNGdW5jdGlvblByb3BzIHtcbiAgbGF5ZXJzOiBJTGF5ZXJWZXJzaW9uW11cbiAgZW52aXJvbm1lbnQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbn1cblxuZXhwb3J0IGNsYXNzIE5vZGVGdW5jdGlvbiBleHRlbmRzIE5vZGVqc0Z1bmN0aW9uIHtcbiAgcmVhZG9ubHkgYWxpYXM6IEFsaWFzXG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IE5vZGVGdW5jdGlvblByb3BzKSB7XG4gICAgY29uc3QgZGVmYXVsdFByb3BzOiBOb2RlanNGdW5jdGlvblByb3BzID0ge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICB0aW1lb3V0OiBEdXJhdGlvbi5zZWNvbmRzKDMwMCksXG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xOF9YLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgTk9ERV9PUFRJT05TOiAnLS1lbmFibGUtc291cmNlLW1hcHMnLFxuICAgICAgICBBV1NfTk9ERUpTX0NPTk5FQ1RJT05fUkVVU0VfRU5BQkxFRDogJzEnLFxuICAgICAgICAuLi5wcm9wcy5lbnZpcm9ubWVudFxuICAgICAgfSxcbiAgICAgIGJ1bmRsaW5nOiB7XG4gICAgICAgIGV4dGVybmFsTW9kdWxlczogW10sXG4gICAgICAgIHRhcmdldDogJ2VzMjAyMScsXG4gICAgICAgIGxvZ0xldmVsOiBMb2dMZXZlbC5FUlJPUixcbiAgICAgICAgbWluaWZ5OiB0cnVlLFxuICAgICAgICBrZWVwTmFtZXM6IHRydWUsXG4gICAgICAgIHNvdXJjZU1hcDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgYXJjaGl0ZWN0dXJlOiBBcmNoaXRlY3R1cmUuWDg2XzY0LFxuICAgICAgLy8gbG9nUmV0ZW50aW9uOiBpc1Byb2R1Y3Rpb24gPyBSZXRlbnRpb25EYXlzLk9ORV9ZRUFSIDogUmV0ZW50aW9uRGF5cy5PTkVfV0VFSyxcbiAgICAgIHRyYWNpbmc6IFRyYWNpbmcuQUNUSVZFLFxuICAgICAgbGF5ZXJzOiBbLi4ucHJvcHMubGF5ZXJzXVxuICAgIH1cblxuICAgIHN1cGVyKHNjb3BlLCBpZCwgZGVmYXVsdFByb3BzKVxuXG4gICAgdGhpcy5hbGlhcyA9IG5ldyBBbGlhcyh0aGlzLCBpZC5jb25jYXQoJ2FsaWFzJyksIHtcbiAgICAgIHZlcnNpb246IHRoaXMuY3VycmVudFZlcnNpb24sXG4gICAgICBhbGlhc05hbWU6ICdjdXJyZW50JyxcbiAgICB9KVxuICB9XG59Il19