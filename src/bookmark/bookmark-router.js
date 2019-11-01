const express = require('express');
const uuid = require('uuid/v4');
const logger = require('../logger');
const { bookmarks, lists } = require('../store');

const bookmarkRouter = express.Router();
const bodyParser = express.json();

bookmarkRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { title, rating, url, desc } = req.body;
    if (!title) {
      logger.error(`A Title is Required`);
      return res
        .status(400)
        .send('Invalid data');
    }

    if (!rating) {
      logger.error(`A Rating is Required`);
      return res
        .status(400)
        .send('Invalid data');
    } 

    if (!url) {
      logger.error(`A URL is Required`);
      return res
        .status(400)
        .send('Invalid data');
    }

    if (!desc) {
      logger.error(`A Description is Required`);
      return res
        .status(400)
        .send('Invalid data');
    }    
    let id = uuid();
    let bookmark = {
      id: id,
      title: title,
      rating: rating,
      url: url,
      desc: desc 
    }
    bookmarks.push(bookmark);
    logger.info(`Bookmark with id ${id} created`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(bookmark);
 
  })

bookmarkRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find(b => b.id == id);
    if (!bookmark) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res
        .status(404)
        .send('404 Not Found');
    }

    res.json(bookmark);
  })
/*  .delete((req, res) => {
    const { id } = req.params;

    const cardIndex = cards.findIndex(c => c.id == id);
    if (cardIndex === -1) {
      logger.error(`Card with id ${id} not found.`);
      return res
        .status(404)
        .send('Not found');
    }

    //remove card from lists
    //assume cardIds are not duplicated in the cardIds array
    lists.forEach(list => {
      const cardIds = list.cardIds.filter(cid => cid !== id);
      list.cardIds = cardIds;
    });

    cards.splice(cardIndex, 1);

    logger.info(`Card with id ${id} deleted.`);

    res
      .status(204)
      .end();
  }) */

module.exports = bookmarkRouter
