from app import app
from flask import request, jsonify
from app import database
from datetime import datetime


@app.route('/')
def index():
    return "Hello World",200

@app.route('/get_posts', methods=['GET'])
def get_posts():
    print('Getting Posts')
    posts = database.get_posts()
    res=[]
    for post in posts:
        k = post.to_dict()
        k['_id'] = post.id
        res.append(k)
    return res

@app.route('/add_post',methods=['POST'])
def add_post():
    try:
        print('Adding Post')
        username = request.form.get('username')
        name = request.form.get('name')
        description = request.form.get('description')
        image = request.files['image']
        image.save("./app/images/"+image.filename)
        now = datetime.now()
        month_names = [
            "", "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ]
        month_name = month_names[now.month]
        time = f"{now.day} {month_name} {now.year} {now.strftime('%H:%M')}"
        '''We ar encoding the password, which actually converts string to bytes as bcrypt only accepts byte code'''
        res = database.add_post({'username':username,
                    'name':name,
                    'description':description,
                    'image': image.filename,
                    'time': time
        })
        return jsonify({'Successful':str(res)})
    except Exception as e:
        print(e)
        return jsonify({'message':'Adding Post Failed'})
