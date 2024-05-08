from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.binary import Binary
import os,base64

app = Flask(__name__)

# MongoDB configuration
client = MongoClient('localhost', 27017)
db = client['PatientEnrollment']
collection = db['Parent']


def save_base64_image(base64_string):
    # Split the base64 string to get the image data and format
    header, data = base64_string.split(",", 1)
    
    # Get the image format (e.g., 'png', 'jpeg')
    format = header.split(";")[0].split("/")[1]
    
    image_data = base64.b64decode(data)

    
    
    return image_data

# API route to store parent details
@app.route('/post', methods=['POST'])
def store_parent_details():
    
    form_data = request.json

    signature_parent = save_base64_image(form_data['signatureParent'])
    signature_doctor = save_base64_image(form_data['signatureDoctor'])
    # Create a new document to insert into MongoDB
    if form_data['sameAsResidential'] == 'false' or form_data['sameAsResidential'] == False:
        parent_doc = {
            'firstName': form_data['firstName'],
            'lastName': form_data['lastName'],
            'secondName': form_data.get('secondName'),
            'healthNumber': form_data['healthNumber'],
            'versionCode': form_data['versionCode'],
            'email': form_data['email'],
            'mailingAddress': form_data['mailingAddress'],
            'apartmentNo': form_data.get('apartmentNo'),
            'streetName': form_data.get('streetName'),
            'city': form_data['city'],
            'postalCode': form_data['postalCode'],
            'dob': form_data['dob'],
            'sex': form_data['sex'],
            'sameAsResidential': form_data['sameAsResidential'],
            'residentialAddress': form_data.get('residentialAddress'),
            'apartmentNoResidential': form_data.get('apartmentNoResidential'),
            'streetNameResidential': form_data.get('streetNameResidential'),
            'cityResidential': form_data.get('cityResidential'),
            'postalCodeResidential': form_data.get('postalCodeResidential'),
            'signatureParent': signature_parent,
            'signatureDoctor': signature_doctor,
            'doctorInfo': form_data.get('doctorInfo')
        }
    else:
        parent_doc = {
            'firstName': form_data['firstName'],
            'lastName': form_data['lastName'],
            'secondName': form_data.get('secondName'),
            'healthNumber': form_data['healthNumber'],
            'versionCode': form_data['versionCode'],
            'email': form_data['email'],
            'mailingAddress': form_data['mailingAddress'],
            'apartmentNo': form_data.get('apartmentNo'),
            'streetName': form_data.get('streetName'),
            'city': form_data['city'],
            'postalCode': form_data['postalCode'],
            'dob': form_data['dob'],
            'sex': form_data['sex'],
            'sameAsResidential': form_data['sameAsResidential'],
            'signatureParent': signature_parent,
            'signatureDoctor': signature_doctor,
            'doctorInfo': form_data.get('doctorInfo')
        }


    # Insert the document into MongoDB
    collection.insert_one(parent_doc)

    return jsonify({'message': 'Parent details stored successfully'})

if __name__ == '__main__':
    app.run(debug=True)
