import boto3
import json
import os
from datetime import datetime, timezone
from utils import with_cors

dynamodb = boto3.resource('dynamodb')
@with_cors
def lambda_handler(event, context):
    # Get the table name from environment variables
    table_name = os.environ.get('TABLE_NAME')
    if not table_name:
        return {
            'statusCode': 500,
            'body': json.dumps('Table name not set in environment variables.')
        }

    # Get the DynamoDB table
    table = dynamodb.Table(table_name)

    # Parse the request body
    try:
        body = json.loads(event['body'])
        companyName = body.get('companyName')
        jobTitle = body.get('jobTitle')
        department = body.get('department')
        jobDuration = body.get('jobDuration')
        location = body.get('location')
        pros = body.get('pros')
        cons = body.get('cons')
        advice = body.get('advice')
        recommendation = body.get('recommendation')
        employmentStatus = body.get('employmentStatus')
        ratings = body.get('ratings', {})
        date = body.get('date')
        timestamp = body.get('timestamp')

    except (json.JSONDecodeError, KeyError) as e:
        return {
            'statusCode': 400,
            'body': json.dumps(f'Invalid request body: {str(e)}')
        }

    # Store the review in DynamoDB
    gsi1sk = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    try:
        response = table.put_item(
            Item={
                'PK': f'COMPANY#{companyName}',
                'SK': f'REVIEW#{gsi1sk}',
                'GSI1PK': 'REVIEW',
                'GSI1SK': gsi1sk,
                'companyName': companyName,
                'jobTitle': jobTitle,
                'department': department,
                'jobDuration': jobDuration,
                "location": location,
                'pros': pros,
                'cons': cons,
                'advice': advice,
                'recommendation': recommendation,
                'employmentStatus': employmentStatus,
                'ratings': ratings,
                'date': date,
            }
        )
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error storing review: {str(e)}')
        }

    return {
        "statusCode": 200,
        "body": json.dumps({ "message": "ok" })
    }