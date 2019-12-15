import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export const main = async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            itemId: event.pathParameters.id
        }
    };

    try {
        await dynamoDbLib.call("delete", params);
        return success({ status: true });
    } catch (e) {
        console.log("Error with deleting comic:", e);
        return failure({ status: false });
    }
};