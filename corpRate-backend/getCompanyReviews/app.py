import boto3
import json
import os
from boto3.dynamodb.conditions import Key

table_name = os.environ.get('TABLE_NAME')
dynamodb = boto3.resource('dynamodb')
table =dynamodb.Table(table_name)

def lambda_handler(event, context):
    path_parameters = event.get('pathParameters', {})
    company_name = path_parameters.get('companyName').lower()
    if not company_name:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Company name is required'}),
        }
    try:
        response = table.query(
            KeyConditionExpression=Key('PK').eq(f'COMPANY#{company_name}'),
            ScanIndexForward=False,
            Limit=12
        )
        items = response.get('Items', [])
        print(f"Fetched {len(items)} reviews for company: {company_name}")
        if not items:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'No reviews found for this company'}),
            }
        
        return {
            'statusCode': 200,
            'body': json.dumps(items, default=str),
            }
    except Exception as e:
        print(f"Error fetching reviews: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Could not fetch reviews'}),
        }
    
