import json
import boto3
import uuid
from datetime import datetime

def lambda_handler(event, context):
    
    reviewId = str(uuid.uuid4())
    company = event["body"]["Company"]
    review = event["body"]["Review"]
    rating = event["body"]["Rating"]
    created_at = str(datetime.now())
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('DYNAMODB_TABLE')
    Item = {
        "reviewId": reviewId,
        "company": company,
        "review": review,
        "rating": rating,
        "created_at": created_at
    }
    table.put_item(Item)
    
    return ({
        "status_code": 200,
        "message": "Review posted successfully"
    })