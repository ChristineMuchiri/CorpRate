import boto3
import json
import os
from boto3.dynamodb.conditions import Key
from utils import with_cors

dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('TABLE_NAME')
table = dynamodb.Table(table_name)
@with_cors
def lambda_handler(event, context):
    print("Incoming event:", json.dumps(event)) 
    try:
        # Parse the request body
        body = json.loads(event['body'])
        print("Parsed body:", body) 

        pk = body['PK']
        sk = body['SK']

        # Query the table for the specific review
        response = table.update_item(
            Key={
                'PK': pk,
                'SK': sk
            },
            UpdateExpression="SET likes = if_not_exists(likes,  :start) + :inc",
            ExpressionAttributeValues={
                ':start': 0,
                ':inc': 1
            },
            ReturnValues="UPDATED_NEW"
        )
        print (f"Update response: {response}")
        updated_likes = int(response['Attributes']['likes'])
        # Return the review details
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Like updated successfully',
                'likes': updated_likes
            })
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
    