import json
import boto3
import os

dynamodb = boto3.resource('dynamodb', endpoint_url='http://dynamodb-local:8000')
table_name = os.environ.get('DYNAMODB_TABLE')
table = dynamodb.Table(table_name) # type: ignore

def lambda_handler(event, context):
    try:
        request_body = json.loads(event["body"])
    except json.JSONDecodeError:
        return {
            'status_code': 400,
            'body': json.dumps({"errorMessage": "Invalid JSON in request body"})
        }
    