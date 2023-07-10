<p align="center"><img src="logo.png" width="150"></a></p> 
<h2 align="center"><b>The EWC Backend</b></h2>
<h4 align="center">The backend database and API for <a href="https://github.com/christopherlam888/the-ewc">The EWC app.</a></h4>

<p align="center">
<img src="https://img.shields.io/github/languages/top/christopherlam888/the-ewc-backend.svg" >
<a href="https://www.gnu.org/licenses/gpl-3.0" alt="License: GPLv3"><img src="https://img.shields.io/badge/License-GPL%20v3-blue.svg"></a>
</p>

# API Documentation

## Overview

The EWC backend is used to perform CRUD operations on the MongoDB database containing the glossary terms (and videos too at some point later) from The EWC YouTube channel via the Express API. The 'create,' 'update,' and 'delete' operations are primarily used by The EWC Contributions Page and the 'read' operation is used by the app.

## Endpoints

Base URL: https://drab-rose-yak-gear.cyclic.app/the-ewc/api/

Or if you are running the database locally:

Base URL: http://localhost:5050/the-ewc/api/

### **All Glossary Terms**

This endpoint allows users to access all glossary terms.

**URL:** /glossary/all/  
**Method:** GET  
**Parameters:**
* None.  

**Response:**
* 200 OK - the glossary is found, the response body will contain all the glossary entries.
* 404 Not Found - the glossary is not found, the response body will contain a message indicating that it doesn't exist.

**Example:**  
Request:
```javascript
fetch(`http://localhost:5050/the-ewc/api/glossary/all/`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
Response (200 OK):
```javascript
...
{
  term: 'Tissot',
  definition: 'A Swiss watch brand with a long history of making quality timepieces and continuing to innovate in its mechanisms.',
  category: 'brand',
  img: ''
}
...
```

### **Filter Glossary**

This endpoint allows users to filter glossary terms by a specific category.

**URL:** /glossary/filter/  
**Method:** GET  
**Parameters:**
* (str) category (required): the category that will be applied as the filter.  

**Response:**
* 200 OK - the category is found, the response body will contain all the glossary entries for the category.
* 404 Not Found - the category is not found, the response body will contain a message indicating that it doesn't exist.

**Example:**  
Request:
```javascript
const category = 'brand';
fetch(`http://localhost:5050/the-ewc/api/glossary/filter/?category=${category}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
Response (200 OK):
```javascript
...
{
  term: 'Tissot',
  definition: 'A Swiss watch brand with a long history of making quality timepieces and continuing to innovate in its mechanisms.',
  category: 'brand',
  img: ''
}
...
```

### **Search Glossary**

This endpoint allows users to query a specific term.

**URL:** /glossary/search/  
**Method:** GET  
**Parameters:**
* (str) term (required): the term that will be searched.  

**Response:**
* 200 OK - the term is found, the response body will contain the glossary entry for the term.
* 404 Not Found - the term is not found, the response body will contain a message indicating that it doesn't exist.

**Example:**  
Request:
```javascript
const term = 'Tissot';
fetch(`http://localhost:5050/the-ewc/api/glossary/search/?term=${term}`)
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

### **Add Term**

This endpoint allows users to add a new term or update a term if it already exists in the glossary.  

**URL:** /glossary/add/  
**Method:** POST  
**Request Body:**
The request body should contain a JSON object representing the glossary entry to be inserted or updated in the database.  
The object should have the following properties:  
* (str) term (required): the term for the entry
* (str) definition (required): the definition for the entry
* (str) category (required): the category of the term, either "general" or "brand"  
(img option will be added later)

**Response:**  
* 200 OK - the entry was updated successfully, the response body will contain the status code and a message indicating success.
* 201 Created - the entry was newly added, the response body will contain the status code and a message indicating success.
* 400 Bad Request - the request body was not formatted properly/is missing required information, the response body will contain the status code and a message indicating the information is incomplete.
  
**Example:**  
Request:
```javascript
const entry = {
  term: 'Accutron',
  definition: "A sub-brand of Bulova known for producing the world's first electric-powered watch with its unique hum.",
  category: 'brand'
};
fetch('http://localhost:5050/the-ewc/api/glossary/add/', {
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
    msg: 'Accutron was updated.'
}
```

### **Delete Term**

This endpoint allows users to delete an entry from the glossary.

**URL:** /glossary/delete/  
**Method:** DELETE  
**Request Body:**  
The request body should contain a JSON object that is able to specify the entry enough to locate it within the database. This will usually be the term, which is assumed to be unique.  
The object should have the following proerties:
* (str) term (optional): the term for the entry
* (str) definition (optional): the definition for the entry
* (str) category (optional): the category of the term, either "general" or "brand"
(img option will be added later)

**Response:**
* 200 OK - the entry was deleted successfull, the response body will contain the status code and a message indicating success.
* 404 Not Found - the entry was not found, and so could not be deleted, the response body will containg a message indicating so.

**Example:**
Request:
```javascript
const entry = {
  term: 'Rolex'
};
fetch('http://localhost:5050/the-ewc/api/glossary/delete/', {
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

# Project

## Features to Implement

- Allow for CRUD operations on the Videos collection in the EWCDatabase

## License
[![GNU GPLv3 Image](https://www.gnu.org/graphics/gplv3-127x51.png)](https://www.gnu.org/licenses/gpl-3.0.en.html)  

This project is licensed under the GNU General Public License v3.0.
