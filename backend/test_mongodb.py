
import asyncio

from app.database.connection import (
    check_database_connection,
    close_database_connection,
)


async def main():
    try:
        await check_database_connection()
        print("MongoDB connection successful!")
    except Exception as error:
        print(f"MongoDB connection failed: {error}")
    finally:
        await close_database_connection()


if __name__ == "__main__":
    asyncio.run(main())

