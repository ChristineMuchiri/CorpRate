# utils.py

# utils.py

def cors_response(status_code=200, body=None):
    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Origin": "https://www.corprate.xyz",
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        },
        "body": body or ""
    }


def with_cors(handler_fn):
    def wrapper(event, context):
        if event["requestContext"]["http"]["method"] == "OPTIONS":
            return cors_response()
        response = handler_fn(event, context)
        if "headers" not in response:
            response["headers"] = {}
        response["headers"].update({
            "Access-Control-Allow-Origin": "https://www.corprate.xyz",
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
        })
        return response
    return wrapper
