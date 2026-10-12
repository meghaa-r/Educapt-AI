
import os

from dotenv import load_dotenv
from pymongo import AsyncMongoClient

# Load configuration from the backend .env file
load_dotenv()

MONGODB_URL = os.getenv(
    "MONGODB_URL",
    "mongodb://127.0.0.1:27017",
)

MONGODB_DATABASE = os.getenv(
    "MONGODB_DATABASE",
    "educapt_ai",
)

# Create the MongoDB client and select the database
client = AsyncMongoClient(MONGODB_URL)
database = client[MONGODB_DATABASE]


async def check_database_connection():
    """Check whether MongoDB is reachable."""
    await client.admin.command("ping")
    return True


async def close_database_connection():
    """Close the MongoDB client."""
    await client.close()
