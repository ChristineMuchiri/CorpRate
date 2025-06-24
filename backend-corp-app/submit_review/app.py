import json
import boto3
import uuid
from datetime import datetime
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
    
    review_id = str(uuid.uuid4())
    company = request_body["Company"]
    review = request_body["Review"]
    rating = request_body["Rating"]
    created_at = datetime.utcnow().isoformat()
    
    
    new_item = {
        "PK": f"COMPANY#{company}",
        "SK": f"REVIEW#{review_id}",
        "company": company,
        "review": review,
        "rating": rating,
        "created_at": created_at
    }
    
    try:
        table.put_item(Item=new_item)
        
        response_message = f"Review for {company} submitted successfully!"
        return {
            'status_code': 201,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({"message":response_message})
        }
    except Exception as e:
        print(f"Error putting item into DynamoDB: {e}")
        return {
            'status_code': 500,
            'body': json.dumps({"errorMessage": str(e)})
        }
    
    return ({
        "status_code": 200,
        "message": "Review posted successfully"
    })