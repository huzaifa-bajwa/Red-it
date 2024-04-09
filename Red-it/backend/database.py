from pymongo import MongoClient
from model import User
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient('mongodb+srv://SE_Project_User:SE_Project2024@mycluster.f64jook.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster')
db = client['SE_Project']
collection = db['User Account']
collection_history = db['History']

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
async def add_history(email, content, identifier):
    user = await collection.find_one({'email': email})
    if user:
        try:
            current_content = await collection_history.find_one({'email': email})
            if current_content:
                # If the history exists, update the contents field
                data = current_content.get('contents', [[], []])
                
                # Updating the first list with content, keeping max 3 elements
                if len(data[0]) >= 3:
                    data[0].pop(0)  
                data[0].append(content) 

                # Updating the second list with identifier, keeping max 3 elements
                if len(data[1]) >= 3:
                    data[1].pop(0)  
                data[1].append(identifier)  
                await collection_history.update_one({'_id': current_content['_id']}, {'$set': {'contents': data}})
            else:
                # If the content does not exist, create a new history
                data = [[content], [identifier]]
                await collection_history.insert_one({'email': email, 'contents': data})
            print("History added successfully")
            return True  # Confirm the operation was successful
        except Exception as e:
            print(f"An error occurred: {e}")
            return False  # Indicate the operation failed

async def get_history(email):
    user = await collection.find_one({'email': email})
    if user:
        history = await collection_history.find_one({'email': email})
        if history:
            data = history['contents']
            for i in range(len(data[0])):
                data[1][i] = data[1][i].lower()    # Convert the identifier to lowercase
            return data
        else:
            return []

# async def main():
#     get1 = await get_user('SyedKabir')
#     print(get1)
#     get2 = await get_user('Syed')
#     print(get2)
#     auth1 = await autheticate_user('24100249@lums.edu.pk', 'myssword')
#     print(auth1)

# asyncio.run(main())
