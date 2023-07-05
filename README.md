# Everyday Watch Collector Backend

This is the backend for the Everday Watch Collector applications, including the contributions page and the app. It includes the MongoDB server and the API written in Express.

## API Documentation
### Overview
The EWC API is used to perform CRUD operations on the MongoDB database containing the glossary terms (and videos too at some point later) from the EWC Youtube Channel. The 'create', 'update', and 'delete' operations is primarily used by the EWC contributions page and the 'read' operation will be used by the app.

### Endpoints
Base url: http://localhost:5050/api

#### **Search Glossary**
This endpoint (currently only supports) querying EWCDatabase for specific terms in the Glossary.  
**url:** /search/glossary/  
**Method:** GET  
**Parameters:**
* (str) term (required): the term that will be searched.  
**Response:**
* 200 OK - the term is found, the response body will contain the Glossary entry for the term
* 404 Not Found - the term is not found, the response body will contain a message indicating that it doesn't exist
**Example:**
Request:
```javascript
const term = 'Tissot';
fetch(`http://localhost:5050/api/search/glossary/?term=${term}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
Response (200 OK):
```javascript
{
  term: 'Tissot',
  definition: 'A Swiss watch brand with a long history of making quality timepieces and continuing to innovate in its mechanisms.',
  category: 'brand',
  img: ''
}
```

#### **Add Term**
This endpoint allows users to add a new term or update a term if it already exists in the Glossary.
**url:** /add/glossary/
**Method:** POST
**Request Body:**
The request body should contain a JSON object representing the Glossary entry to be inserted or updated in the database.  
The object should have the following properties:
* (str) term (required): the term for the entry
* (str) definition (required): the definition for the entry
* (str) category (required): the category of the term, either "general" or "brand"
(img option will be added later)
**Response:**
* 200 OK - the entry was updated successfully, the response body will contain the status code and a message indicating success
* 201 Created - the entry was newly added, the response body will contain the status code and a message indicating success
* 400 Bad Request - the request body was not formatted properly / is missing required information, the response body will contain the status code and  
                    a message indicating the information is incomplete
**Example:**
Request:
```javascript
const entry = {
  term: 'Accutron',
  definition: "A sub-brand of Bulova known for producing the world's first electric-powered watch with its unique hum.",
  category: 'brand'
};
fetch('http://localhost:5050/api/add/glossary/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(entry)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
Response (200 OK):
```javascript
{
    status: 200,
    msg: 'Accutron was updated'
}
```

#### **Delete Term**
This endpoint allows users to delete an entry from the Glossary
**url:** /delete/glossary/
**Method:** DELETE
**Request Body:**
The request body should contain a JSON object that is able to specify the entry enough to locate it within the database. This will usually be the term, which is assumed to be unique.  
The object should have the following proerties:
* (str) term (optional): the term for the entry
* (str) definition (optional): the definition for the entry
* (str) category (optional): the category of the term, either "general" or "brand"
**Response:**
* 200 OK - the entry was deleted successfull, the response body will contain the status code and a message indicating success.
* 404 Not Found - the entry was not found, and so could not be deleted, the response body will containg a message indicating so.
**Example:**
Request:
```javascript
const entry = {
  term: 'Rolex'
};
fetch('http://localhost:5050/api/delete/glossary/', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(entry)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
Response (200 OK):
```javascript
{
  status: 200,
  msg: 'Rolex was deleted.'
}
```

## Features to Implement
* Implement GET request for search glossary based on term category
* Allow for CRUD operations on the Videos collection in the EWCDatabase

## License
[![GNU GPLv3 Image](https://www.gnu.org/graphics/gplv3-127x51.png)](https://www.gnu.org/licenses/gpl-3.0.en.html)  

This project is licensed under the GNU General Public License v3.0.
