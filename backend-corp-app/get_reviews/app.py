import json
import boto3
import os

#dynamodb = boto3.resource('dynamodb', endpoint_url='http://dynamodb-local:8000')
table_name = os.environ.get('DYNAMODB_TABLE')
#table = dynamodb.Table(table_name) # type: ignore
client = boto3.client('dynamodb')

def lambda_handler(event, context):
    try:
        path_parameters = event.get('pathParameters', {})
        company_name = path_parameters.get('company')
        
        if not company_name:
            return {
                'status_code': 400,
                'body': json.dumps({'errorMessage': "Comapny name not provided in the path."})
            }
    except Exception as e:
        print(f"error extracting namme from path: {e}")
        return {
            'status_code': 400,
            'body': json.dumps({"errorMessage": f"Bad request format: {e}"})
        }
        
    try:
        response = client.query(
            TableName=table_name,
            KeyConditionExpression='PK = :pkval',
            ExpressionAttributeValues={
                ':pkval': {'S': f"COMPANY#{company_name}"}
            }, 
            Select='ALL_ATTRIBUTES'
        )
        print(f"Query response: {json.dumps(response, indent=2)}")
        items = response.get('Items', [])
        
        return {
            'statusCode': 200,
            'body': json.dumps(items)
        }
    except Exception as e:
        print(f"error querying item: {e}")
        return {
            "status_code": 500,
            "body": json.dumps({"errorMessage": str(e)})
        }
        