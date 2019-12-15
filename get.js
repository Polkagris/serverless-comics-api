import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export const main = async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            itemId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        if (result.Item) {
            // Return the retrieved item from the get call
            return success(result.Item);
        } else return failure({ status: 500, error: "Item not found." });
    } catch (err) {
        console.log(err);
        failure({ status: false });
    }
};