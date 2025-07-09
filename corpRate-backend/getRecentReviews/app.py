import boto3
import os
from datetime import datetime,timedelta,timezone
import json
from boto3.dynamodb.types import TypeDeserializer
from decimal import Decimal

dynamodb = boto3.client('dynamodb')
table_name = os.environ.get('TABLE_NAME')
gsi_index = os.environ.get('GSI_NAME')
deserializer = TypeDeserializer()

def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError
def deserialize_dynamodb_item(item):
    return {k: deserializer.deserialize(v) for k, v in item.items()}
 

def lambda_handler(event, context):
    # ISO stamp for 3 days ago?
    three_days_ago = (datetime.now(timezone.utc) - timedelta(days=3)).isoformat()
    print("Incoming event:",json.dumps(event))
    try:
        response = dynamodb.query(
        TableName = table_name,
        IndexName = gsi_index,
        KeyConditionExpression="GSI1PK = :pk AND GSI1SK > :since",
        ExpressionAttributeValues={
            ":pk": {"S": "REVIEW"},
            ":since": {"S": three_days_ago}
        },
        ScanIndexForward=False
    )
        # parse the items from dynamodb json to flat dict
        items = [deserialize_dynamodb_item(item) for item in response['Items']]
        print(items)   
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': 'http://localhost:5173',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps(items, default=decimal_default)
    }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error querying GSI: {str(e)}')
        }
    
    
    
    