// Assumptions:
//    * Terms in the database are unique
//    * Entries into the database are correct

import express from "express";
import ewcDatabase from "./database.js";

const router = express.Router()

// GET request to retrieve all glossary information from the database
router.get('/the-ewc/glossary/all/', async (req, res) => {
  const glossary = await ewcDatabase.collection('Glossary');

  let result = await glossary.find().toArray();

  if (!result) {
    res.send("The glossary could not be found!").status(404)
  } else {
    res.send(result).status(200)
  }
});

// GET request to retrieve filtered glossary information from the database
router.get('/the-ewc/glossary/filter/', async (req, res) => {
  const glossary = await ewcDatabase.collection('Glossary');
  const category = req.query.category;
  let query = { category: category };

  let result = await glossary.find(query).toArray();

  if (!result) {
    res.send("The category you searched does not exist in the glossary!").status(404)
  } else {
    res.send(result).status(200)
  }
});

// GET request to retrieve a searched glossary term from the database
router.get('/the-ewc/glossary/search/', async (req, res) => {
  const glossary = await ewcDatabase.collection('Glossary');
  const term = req.query.term;
  let query = { term: term };

  let result = await glossary.findOne(query);

  if (!result) {
    res.send("The term you searched does not exist in the glossary. Maybe you can add it!").status(404)
  } else {
    res.send(result).status(200)
  }
});

// POST request to insert/update a glossary term in the database
router.post('/the-ewc/glossary/add/', async (req, res) => {
  const glossary = await ewcDatabase.collection('Glossary');
  const entry = req.body;

  let query = { term: entry.term };
  let info = { $set: entry };
  let ret = {};

  // If any of the information is missing, then we don't proceed
  if (!entry || !entry.term || !entry.definition || !entry.category) {
    ret['status'] = 400;
    ret['msg'] = "Entry is incomplete.";
    res.send(ret).status(400);
    return;
  }

  // Update the entry if it exists or insert a new entry if it doesn't exist
  let result = await glossary.updateOne(query, info, { upsert: true });

  // If there is a matched entry, then its an update, and if no match, then its an insert
  if (result.matchedCount === 0) {
    ret['status'] = 201
    ret['msg'] = `${entry.term} was added to the glossary.`;
  } else {
    ret['status'] = 200
    ret['msg'] = `${entry.term} was updated.`;
  }

  res.send(ret).status(ret['status']);
});

// DELETE request to delete an glossary term from the database
router.delete('/the-ewc/glossary/delete/', async (req, res) => {
  const glossary = await ewcDatabase.collection('Glossary');
  const query = req.body;

  let result = await glossary.deleteOne(query);

  let ret = {
    'status': 200,
    'msg': ""
  };

  if (result.deletedCount === 0) {
    ret['status'] = 404;
    ret['msg'] = `${entry.term} is not in the glossary!`;
  } else {
    ret['status'] = 200;
    ret['msg'] = `${entry.term} was deleted.`;
  }

  res.send(ret).status(ret['status']);
});

export default router;
