import boto3
import os
from datetime import datetime,timedelta,timezone
import json

dynamodb = boto3.client('dynamodb')
table_name = os.environ.get('TABLE_NAME')
gsi_index = os.environ.get('GSI_NAME')


 

def lambda_handler(event, context):
    # ISO stamp for 3 days ago?
    three_days_ago = (datetime.now(timezone.utc) - timedelta(days=3)).isoformat()
    
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
        items = response['Items']
        for item in items:
            print({k: list(v.values())[0] for k, v in item.items()})
           
        return {
        'statusCode': 200,
        'body': json.dumps(items)
    }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error querying GSI: {str(e)}')
        }
    
    
    
    