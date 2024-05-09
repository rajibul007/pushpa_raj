import json

import boto3
from botocore.exceptions import ClientError


def download_json_from_s3(bucket_name, key, local_file_path):
    """Download JSON file from S3"""
    s3 = boto3.client("s3")
    try:
        s3.download_file(bucket_name, key, local_file_path)
        print(f"Downloaded {key} from S3 to {local_file_path}")
    except ClientError as e:
        print(f"Error downloading file from S3: {e}")
        raise e


def upload_json_to_s3(bucket_name, key, local_file_path):
    """Upload JSON file to S3"""
    s3 = boto3.client("s3")
    try:
        s3.upload_file(local_file_path, bucket_name, key)
        print(f"Uploaded {local_file_path} to S3 as {key}")
    except ClientError as e:
        print(f"Error uploading file to S3: {e}")
        raise e


def process_json_file(local_file_path):
    """Process JSON file"""
    # Open the JSON file and load its contents into a dictionary
    with open(local_file_path, "r") as file:
        data = json.load(file)

    # Perform some operation on the data
    # For example, let's add a new key-value pair
    data["new_key"] = "new_value"

    # Save the modified data back to the file
    with open(local_file_path, "w") as file:
        json.dump(data, file)

    print("Processed JSON file")


def lambda_handler(event, context):
    # Define S3 bucket and file information
    bucket_name = "your_bucket_name"
    key = "your_json_file.json"
    local_file_path = "/tmp/file.json"

    try:
        # Download JSON file from S3
        download_json_from_s3(bucket_name, key, local_file_path)

        # Process JSON file
        process_json_file(local_file_path)

        # Upload modified JSON file back to S3
        upload_json_to_s3(bucket_name, key, local_file_path)

        return {
            "statusCode": 200,
            "body": json.dumps("JSON file processed and uploaded successfully!"),
        }
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"statusCode": 500, "body": json.dumps("Error processing JSON file!")}
