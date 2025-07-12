import boto3
import json
import os
from decimal import Decimal
from boto3.dynamodb.conditions import Key
from utils import with_cors

table_name = os.environ.get('TABLE_NAME')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(table_name)
@with_cors
def lambda_handler(event, context):
    try:
        response = table.scan()
        items = response.get('Items', [])
        
        company_data = {}
        
        for item in items:
            pk = item.get('PK', '')
            if not pk.startswith('COMPANY#'):
                continue
            
            company_key = pk.split('#')[1]
            ratings = item.get('ratings', {})
            
            if company_key not in company_data:
                company_data[company_key] = {
                    'total': {
                        "Overall Rating": 0,
                        "Management Quality": 0,
                        "Work-Life Balance": 0,
                        "Career Growth Opportunities": 0,
                        "Compensation & Benefits": 0,
                        "Diversity & Inclusion": 0
                    },
                    'count': 0
                }
                
            company_data[company_key]['count'] += 1
            for key in company_data[company_key]['total']:
                value = ratings.get(key, 0)
                if isinstance(value, Decimal):
                    value = float(value)
                company_data[company_key]['total'][key] += value
                
        result = []
        for company, data in company_data.items():
            count = data['count']
            averages = {k: round(v / count, 2) for k, v in data['total'].items()}
            result.append({
                'companyName': company,
                'reviewCount': count,
                'averageRatings': averages
            })
        print(result)   
        return {
            'statusCode': 200,
            'body': json.dumps(result)
        }
    except Exception as e:
        print("Error:", str(e))
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Could not retrieve company summaries'})
        }