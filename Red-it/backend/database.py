from pymongo import MongoClient
from model import User
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient('mongodb+srv://SE_Project_User:SE_Project2024@mycluster.f64jook.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster')
db = client['SE_Project']
collection = db['User Account']


async def add_user(username, email, password):
    usernameCheck = await collection.find_one({'username': username})
    if usernameCheck == None:
        emailCheck = await collection.find_one({'email': email})
        if emailCheck == None:
            user = {'username': username, 'email': email,'password': password}
            await collection.insert_one(user)
            return {"status":True, "error": "None"}
        else:
            return {"status":False, "error": "Email"}
    else:
        return {"status":False, "error": "Username"}


async def get_user(username):
    result = await collection.find_one({'username': username})
    return result

async def autheticate_user(email, password):
    result = await collection.find_one({'email': email, 'password': password})
    if result == None:
        return False
    return True

# async def main():
#     get1 = await get_user('SyedKabir')
#     print(get1)
#     get2 = await get_user('Syed')
#     print(get2)
#     auth1 = await autheticate_user('24100249@lums.edu.pk', 'myssword')
#     print(auth1)

# asyncio.run(main())
