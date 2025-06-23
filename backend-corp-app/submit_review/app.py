import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('DYNAMODB_TABLE')
    table.put_item(event)
    
    return ({
        "status_code": 200,
        "message": "Review posted successfully"
    })