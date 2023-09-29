"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCRUDAPIGateway = void 0;
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const createCRUDAPIGateway = (scope, props) => {
    const api = new aws_apigateway_1.RestApi(scope, props.apiName, {
        restApiName: props.apiName,
    });
    // Create the API resources
    // /pets
    const baseResource = api.root.addResource(props.baseResourceName);
    // // /pets/{petId}
    const leafResource = baseResource.addResource(`{${props.leafResourceName}}`);
    // Allow CORS for all methods on the API
    baseResource.addCorsPreflight({
        allowOrigins: aws_apigateway_1.Cors.ALL_ORIGINS,
        allowMethods: aws_apigateway_1.Cors.ALL_METHODS,
    });
    leafResource.addCorsPreflight({
        allowOrigins: aws_apigateway_1.Cors.ALL_ORIGINS,
        allowMethods: aws_apigateway_1.Cors.ALL_METHODS,
    });
    // Allow a user to GET all the pets via a Lambda function
    const getAllBaseIntegration = new aws_apigateway_1.LambdaIntegration(props.getAllBaseFunc);
    const putItemBaseIntegration = new aws_apigateway_1.LambdaIntegration(props.putItemBaseFunc);
    const deleteItemBaseIntegration = new aws_apigateway_1.LambdaIntegration(props.deleteItemBaseFunc);
    const getItemLeafIntegration = new aws_apigateway_1.LambdaIntegration(props.getItemLeafFunc);
    baseResource.addMethod('GET', getAllBaseIntegration);
    baseResource.addMethod('POST', putItemBaseIntegration);
    baseResource.addMethod('PUT', putItemBaseIntegration);
    baseResource.addMethod('DELETE', deleteItemBaseIntegration);
    leafResource.addMethod('GET', getItemLeafIntegration);
    return api;
};
exports.createCRUDAPIGateway = createCRUDAPIGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpZ2F0ZXdheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwaWdhdGV3YXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0RBQTZFO0FBYXRFLE1BQU0sb0JBQW9CLEdBQUcsQ0FDbkMsS0FBZ0IsRUFDaEIsS0FBc0IsRUFDckIsRUFBRTtJQUNILE1BQU0sR0FBRyxHQUFHLElBQUksd0JBQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRTtRQUM3QyxXQUFXLEVBQUUsS0FBSyxDQUFDLE9BQU87S0FDMUIsQ0FBQyxDQUFBO0lBRUYsMkJBQTJCO0lBQzNCLFFBQVE7SUFDUixNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUVqRSxtQkFBbUI7SUFDbkIsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUE7SUFFNUUsd0NBQXdDO0lBQ3hDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztRQUM3QixZQUFZLEVBQUUscUJBQUksQ0FBQyxXQUFXO1FBQzlCLFlBQVksRUFBRSxxQkFBSSxDQUFDLFdBQVc7S0FDOUIsQ0FBQyxDQUFBO0lBRUYsWUFBWSxDQUFDLGdCQUFnQixDQUFDO1FBQzdCLFlBQVksRUFBRSxxQkFBSSxDQUFDLFdBQVc7UUFDOUIsWUFBWSxFQUFFLHFCQUFJLENBQUMsV0FBVztLQUM5QixDQUFDLENBQUE7SUFFRix5REFBeUQ7SUFDekQsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLGtDQUFpQixDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUN6RSxNQUFNLHNCQUFzQixHQUFHLElBQUksa0NBQWlCLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQzNFLE1BQU0seUJBQXlCLEdBQUcsSUFBSSxrQ0FBaUIsQ0FDdEQsS0FBSyxDQUFDLGtCQUFrQixDQUN4QixDQUFBO0lBQ0QsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLGtDQUFpQixDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUUzRSxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxDQUFBO0lBQ3BELFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLHNCQUFzQixDQUFDLENBQUE7SUFDdEQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLENBQUMsQ0FBQTtJQUNyRCxZQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxDQUFBO0lBQzNELFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLHNCQUFzQixDQUFDLENBQUE7SUFFckQsT0FBTyxHQUFHLENBQUE7QUFDWCxDQUFDLENBQUE7QUF6Q1ksUUFBQSxvQkFBb0Isd0JBeUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnXG5pbXBvcnQgeyBDb3JzLCBMYW1iZGFJbnRlZ3JhdGlvbiwgUmVzdEFwaSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5J1xuaW1wb3J0IHsgSUZ1bmN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSdcblxudHlwZSBBUElHYXRld2F5UHJvcHMgPSB7XG5cdGdldEFsbEJhc2VGdW5jOiBJRnVuY3Rpb25cblx0cHV0SXRlbUJhc2VGdW5jOiBJRnVuY3Rpb25cblx0ZGVsZXRlSXRlbUJhc2VGdW5jOiBJRnVuY3Rpb25cblx0Z2V0SXRlbUxlYWZGdW5jOiBJRnVuY3Rpb25cblx0YXBpTmFtZTogc3RyaW5nXG5cdGJhc2VSZXNvdXJjZU5hbWU6IHN0cmluZ1xuXHRsZWFmUmVzb3VyY2VOYW1lOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNSVURBUElHYXRld2F5ID0gKFxuXHRzY29wZTogQ29uc3RydWN0LFxuXHRwcm9wczogQVBJR2F0ZXdheVByb3BzXG4pID0+IHtcblx0Y29uc3QgYXBpID0gbmV3IFJlc3RBcGkoc2NvcGUsIHByb3BzLmFwaU5hbWUsIHtcblx0XHRyZXN0QXBpTmFtZTogcHJvcHMuYXBpTmFtZSxcblx0fSlcblxuXHQvLyBDcmVhdGUgdGhlIEFQSSByZXNvdXJjZXNcblx0Ly8gL3BldHNcblx0Y29uc3QgYmFzZVJlc291cmNlID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UocHJvcHMuYmFzZVJlc291cmNlTmFtZSlcblxuXHQvLyAvLyAvcGV0cy97cGV0SWR9XG5cdGNvbnN0IGxlYWZSZXNvdXJjZSA9IGJhc2VSZXNvdXJjZS5hZGRSZXNvdXJjZShgeyR7cHJvcHMubGVhZlJlc291cmNlTmFtZX19YClcblxuXHQvLyBBbGxvdyBDT1JTIGZvciBhbGwgbWV0aG9kcyBvbiB0aGUgQVBJXG5cdGJhc2VSZXNvdXJjZS5hZGRDb3JzUHJlZmxpZ2h0KHtcblx0XHRhbGxvd09yaWdpbnM6IENvcnMuQUxMX09SSUdJTlMsXG5cdFx0YWxsb3dNZXRob2RzOiBDb3JzLkFMTF9NRVRIT0RTLFxuXHR9KVxuXG5cdGxlYWZSZXNvdXJjZS5hZGRDb3JzUHJlZmxpZ2h0KHtcblx0XHRhbGxvd09yaWdpbnM6IENvcnMuQUxMX09SSUdJTlMsXG5cdFx0YWxsb3dNZXRob2RzOiBDb3JzLkFMTF9NRVRIT0RTLFxuXHR9KVxuXG5cdC8vIEFsbG93IGEgdXNlciB0byBHRVQgYWxsIHRoZSBwZXRzIHZpYSBhIExhbWJkYSBmdW5jdGlvblxuXHRjb25zdCBnZXRBbGxCYXNlSW50ZWdyYXRpb24gPSBuZXcgTGFtYmRhSW50ZWdyYXRpb24ocHJvcHMuZ2V0QWxsQmFzZUZ1bmMpXG5cdGNvbnN0IHB1dEl0ZW1CYXNlSW50ZWdyYXRpb24gPSBuZXcgTGFtYmRhSW50ZWdyYXRpb24ocHJvcHMucHV0SXRlbUJhc2VGdW5jKVxuXHRjb25zdCBkZWxldGVJdGVtQmFzZUludGVncmF0aW9uID0gbmV3IExhbWJkYUludGVncmF0aW9uKFxuXHRcdHByb3BzLmRlbGV0ZUl0ZW1CYXNlRnVuY1xuXHQpXG5cdGNvbnN0IGdldEl0ZW1MZWFmSW50ZWdyYXRpb24gPSBuZXcgTGFtYmRhSW50ZWdyYXRpb24ocHJvcHMuZ2V0SXRlbUxlYWZGdW5jKVxuXG5cdGJhc2VSZXNvdXJjZS5hZGRNZXRob2QoJ0dFVCcsIGdldEFsbEJhc2VJbnRlZ3JhdGlvbilcblx0YmFzZVJlc291cmNlLmFkZE1ldGhvZCgnUE9TVCcsIHB1dEl0ZW1CYXNlSW50ZWdyYXRpb24pXG5cdGJhc2VSZXNvdXJjZS5hZGRNZXRob2QoJ1BVVCcsIHB1dEl0ZW1CYXNlSW50ZWdyYXRpb24pXG5cdGJhc2VSZXNvdXJjZS5hZGRNZXRob2QoJ0RFTEVURScsIGRlbGV0ZUl0ZW1CYXNlSW50ZWdyYXRpb24pXG5cdGxlYWZSZXNvdXJjZS5hZGRNZXRob2QoJ0dFVCcsIGdldEl0ZW1MZWFmSW50ZWdyYXRpb24pXG5cblx0cmV0dXJuIGFwaVxufVxuIl19