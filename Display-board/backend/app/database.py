import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./app/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def add_post(data):
    post_ref = db.collection('posts').document()
    post_ref.set(data)
    return post_ref.id

def get_posts():
    collection_ref = db.collection('posts')
    docs = collection_ref.stream()
    return docs
