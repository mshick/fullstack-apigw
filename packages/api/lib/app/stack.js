"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStack = void 0;
const cdk = require("aws-cdk-lib");
const apigateway_1 = require("../api/apigateway");
const appconfig_1 = require("../config/appconfig");
const petsTable_1 = require("../database/petsTable");
const construct_1 = require("../functions/deletePetsFunc/construct");
const construct_2 = require("../functions/getItemPetsFunc/construct");
const construct_3 = require("../functions/getPetsFunc/construct");
const construct_4 = require("../functions/putPetsFunc/construct");
class AppStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const appconfig = new appconfig_1.AppConfig(this, id, { configurationName: 'test', configuration: { foo: 'FOOBAR' } });
        const petsTable = (0, petsTable_1.createPetsTable)(this, {
            tableName: 'petTable',
        });
        const getPetsFunc = (0, construct_3.createGetPetsFunc)(this, {
            functionName: 'getPetsFunc',
            petsTableArn: petsTable.tableArn,
            appconfigUri: appconfig.deploymentUri,
            enviornmentVars: { petsTableName: petsTable.tableName },
        });
        const getItemPetsFunc = (0, construct_2.createGetItemPetsFunc)(this, {
            functionName: 'getItemPetsFunc',
            petsTableArn: petsTable.tableArn,
            enviornmentVars: { petsTableName: petsTable.tableName },
        });
        const putPetFunc = (0, construct_4.createPutPetsFunc)(this, {
            functionName: 'putPetFunc',
            petsTableArn: petsTable.tableArn,
            enviornmentVars: { petsTableName: petsTable.tableName },
        });
        const deletePetFunc = (0, construct_1.createDeletePetsFunc)(this, {
            functionName: 'deletePetFunc',
            petsTableArn: petsTable.tableArn,
            enviornmentVars: { petsTableName: petsTable.tableName },
        });
        const petsAPI = (0, apigateway_1.createCRUDAPIGateway)(this, {
            apiName: 'petsAPI',
            baseResourceName: 'pets',
            leafResourceName: 'petId',
            getAllBaseFunc: getPetsFunc,
            getItemLeafFunc: getItemPetsFunc,
            putItemBaseFunc: putPetFunc,
            deleteItemBaseFunc: deletePetFunc,
        });
        new cdk.CfnOutput(this, 'petsAPIURL', {
            value: petsAPI.url,
        });
    }
}
exports.AppStack = AppStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBa0M7QUFFbEMsa0RBQXdEO0FBQ3hELG1EQUErQztBQUMvQyxxREFBdUQ7QUFDdkQscUVBQTRFO0FBQzVFLHNFQUE4RTtBQUM5RSxrRUFBc0U7QUFDdEUsa0VBQXNFO0FBR3RFLE1BQWEsUUFBUyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3RDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBcUI7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFFdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxxQkFBUyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBQyxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUMsR0FBRyxFQUFFLFFBQVEsRUFBQyxFQUFDLENBQUMsQ0FBQTtRQUV0RyxNQUFNLFNBQVMsR0FBRyxJQUFBLDJCQUFlLEVBQUMsSUFBSSxFQUFFO1lBQ3ZDLFNBQVMsRUFBRSxVQUFVO1NBQ3JCLENBQUMsQ0FBQTtRQUVGLE1BQU0sV0FBVyxHQUFHLElBQUEsNkJBQWlCLEVBQUMsSUFBSSxFQUFFO1lBQzNDLFlBQVksRUFBRSxhQUFhO1lBQzNCLFlBQVksRUFBRSxTQUFTLENBQUMsUUFBUTtZQUNoQyxZQUFZLEVBQUUsU0FBUyxDQUFDLGFBQWE7WUFDckMsZUFBZSxFQUFFLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxTQUFTLEVBQUU7U0FDdkQsQ0FBQyxDQUFBO1FBRUYsTUFBTSxlQUFlLEdBQUcsSUFBQSxpQ0FBcUIsRUFBQyxJQUFJLEVBQUU7WUFDbkQsWUFBWSxFQUFFLGlCQUFpQjtZQUMvQixZQUFZLEVBQUUsU0FBUyxDQUFDLFFBQVE7WUFDaEMsZUFBZSxFQUFFLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxTQUFTLEVBQUU7U0FDdkQsQ0FBQyxDQUFBO1FBRUYsTUFBTSxVQUFVLEdBQUcsSUFBQSw2QkFBaUIsRUFBQyxJQUFJLEVBQUU7WUFDMUMsWUFBWSxFQUFFLFlBQVk7WUFDMUIsWUFBWSxFQUFFLFNBQVMsQ0FBQyxRQUFRO1lBQ2hDLGVBQWUsRUFBRSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsU0FBUyxFQUFFO1NBQ3ZELENBQUMsQ0FBQTtRQUVGLE1BQU0sYUFBYSxHQUFHLElBQUEsZ0NBQW9CLEVBQUMsSUFBSSxFQUFFO1lBQ2hELFlBQVksRUFBRSxlQUFlO1lBQzdCLFlBQVksRUFBRSxTQUFTLENBQUMsUUFBUTtZQUNoQyxlQUFlLEVBQUUsRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLFNBQVMsRUFBRTtTQUN2RCxDQUFDLENBQUE7UUFFRixNQUFNLE9BQU8sR0FBRyxJQUFBLGlDQUFvQixFQUFDLElBQUksRUFBRTtZQUMxQyxPQUFPLEVBQUUsU0FBUztZQUNsQixnQkFBZ0IsRUFBRSxNQUFNO1lBQ3hCLGdCQUFnQixFQUFFLE9BQU87WUFDekIsY0FBYyxFQUFFLFdBQVc7WUFDM0IsZUFBZSxFQUFFLGVBQWU7WUFDaEMsZUFBZSxFQUFFLFVBQVU7WUFDM0Isa0JBQWtCLEVBQUUsYUFBYTtTQUNqQyxDQUFDLENBQUE7UUFFRixJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNyQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUc7U0FDbEIsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztDQUNEO0FBakRELDRCQWlEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYidcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnXG5pbXBvcnQgeyBjcmVhdGVDUlVEQVBJR2F0ZXdheSB9IGZyb20gJy4uL2FwaS9hcGlnYXRld2F5J1xuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2FwcGNvbmZpZydcbmltcG9ydCB7IGNyZWF0ZVBldHNUYWJsZSB9IGZyb20gJy4uL2RhdGFiYXNlL3BldHNUYWJsZSdcbmltcG9ydCB7IGNyZWF0ZURlbGV0ZVBldHNGdW5jIH0gZnJvbSAnLi4vZnVuY3Rpb25zL2RlbGV0ZVBldHNGdW5jL2NvbnN0cnVjdCdcbmltcG9ydCB7IGNyZWF0ZUdldEl0ZW1QZXRzRnVuYyB9IGZyb20gJy4uL2Z1bmN0aW9ucy9nZXRJdGVtUGV0c0Z1bmMvY29uc3RydWN0J1xuaW1wb3J0IHsgY3JlYXRlR2V0UGV0c0Z1bmMgfSBmcm9tICcuLi9mdW5jdGlvbnMvZ2V0UGV0c0Z1bmMvY29uc3RydWN0J1xuaW1wb3J0IHsgY3JlYXRlUHV0UGV0c0Z1bmMgfSBmcm9tICcuLi9mdW5jdGlvbnMvcHV0UGV0c0Z1bmMvY29uc3RydWN0J1xuXG5cbmV4cG9ydCBjbGFzcyBBcHBTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG5cdGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBjZGsuU3RhY2tQcm9wcykge1xuXHRcdHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpXG5cblx0XHRjb25zdCBhcHBjb25maWcgPSBuZXcgQXBwQ29uZmlnKHRoaXMsIGlkLCB7Y29uZmlndXJhdGlvbk5hbWU6ICd0ZXN0JywgY29uZmlndXJhdGlvbjoge2ZvbzogJ0ZPT0JBUid9fSlcblxuXHRcdGNvbnN0IHBldHNUYWJsZSA9IGNyZWF0ZVBldHNUYWJsZSh0aGlzLCB7XG5cdFx0XHR0YWJsZU5hbWU6ICdwZXRUYWJsZScsXG5cdFx0fSlcblxuXHRcdGNvbnN0IGdldFBldHNGdW5jID0gY3JlYXRlR2V0UGV0c0Z1bmModGhpcywge1xuXHRcdFx0ZnVuY3Rpb25OYW1lOiAnZ2V0UGV0c0Z1bmMnLFxuXHRcdFx0cGV0c1RhYmxlQXJuOiBwZXRzVGFibGUudGFibGVBcm4sXG5cdFx0XHRhcHBjb25maWdVcmk6IGFwcGNvbmZpZy5kZXBsb3ltZW50VXJpLFxuXHRcdFx0ZW52aW9ybm1lbnRWYXJzOiB7IHBldHNUYWJsZU5hbWU6IHBldHNUYWJsZS50YWJsZU5hbWUgfSxcblx0XHR9KVxuXG5cdFx0Y29uc3QgZ2V0SXRlbVBldHNGdW5jID0gY3JlYXRlR2V0SXRlbVBldHNGdW5jKHRoaXMsIHtcblx0XHRcdGZ1bmN0aW9uTmFtZTogJ2dldEl0ZW1QZXRzRnVuYycsXG5cdFx0XHRwZXRzVGFibGVBcm46IHBldHNUYWJsZS50YWJsZUFybixcblx0XHRcdGVudmlvcm5tZW50VmFyczogeyBwZXRzVGFibGVOYW1lOiBwZXRzVGFibGUudGFibGVOYW1lIH0sXG5cdFx0fSlcblxuXHRcdGNvbnN0IHB1dFBldEZ1bmMgPSBjcmVhdGVQdXRQZXRzRnVuYyh0aGlzLCB7XG5cdFx0XHRmdW5jdGlvbk5hbWU6ICdwdXRQZXRGdW5jJyxcblx0XHRcdHBldHNUYWJsZUFybjogcGV0c1RhYmxlLnRhYmxlQXJuLFxuXHRcdFx0ZW52aW9ybm1lbnRWYXJzOiB7IHBldHNUYWJsZU5hbWU6IHBldHNUYWJsZS50YWJsZU5hbWUgfSxcblx0XHR9KVxuXG5cdFx0Y29uc3QgZGVsZXRlUGV0RnVuYyA9IGNyZWF0ZURlbGV0ZVBldHNGdW5jKHRoaXMsIHtcblx0XHRcdGZ1bmN0aW9uTmFtZTogJ2RlbGV0ZVBldEZ1bmMnLFxuXHRcdFx0cGV0c1RhYmxlQXJuOiBwZXRzVGFibGUudGFibGVBcm4sXG5cdFx0XHRlbnZpb3JubWVudFZhcnM6IHsgcGV0c1RhYmxlTmFtZTogcGV0c1RhYmxlLnRhYmxlTmFtZSB9LFxuXHRcdH0pXG5cblx0XHRjb25zdCBwZXRzQVBJID0gY3JlYXRlQ1JVREFQSUdhdGV3YXkodGhpcywge1xuXHRcdFx0YXBpTmFtZTogJ3BldHNBUEknLFxuXHRcdFx0YmFzZVJlc291cmNlTmFtZTogJ3BldHMnLFxuXHRcdFx0bGVhZlJlc291cmNlTmFtZTogJ3BldElkJyxcblx0XHRcdGdldEFsbEJhc2VGdW5jOiBnZXRQZXRzRnVuYyxcblx0XHRcdGdldEl0ZW1MZWFmRnVuYzogZ2V0SXRlbVBldHNGdW5jLFxuXHRcdFx0cHV0SXRlbUJhc2VGdW5jOiBwdXRQZXRGdW5jLFxuXHRcdFx0ZGVsZXRlSXRlbUJhc2VGdW5jOiBkZWxldGVQZXRGdW5jLFxuXHRcdH0pXG5cblx0XHRuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAncGV0c0FQSVVSTCcsIHtcblx0XHRcdHZhbHVlOiBwZXRzQVBJLnVybCxcblx0XHR9KVxuXHR9XG59XG4iXX0=