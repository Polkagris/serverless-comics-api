import uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
    // Request body is passed in as a JSON incoded string in event.body
    const data = JSON.parse(event.body);

    // Params must be sent to the DB
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            itemId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    dynamoDb.put(params, (error, data) => {
        // Set response headers to enable CORS
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        };
        // Status 500 if error
        if (error) {
            const response = {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({ status: false })
            };
            callback(null, response);
            // returns nothing if error
            return;
        }
        // Retur status code 200 and the created item
        const response = {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify({ body: params.Item })
        };
        callback(null, response);
    });
}