// require in our database and our mongoDB model
const redis = require('redis');
const redisDb = redis.createClient()

// requirements for MongoDB

const DbController = {};

DbController.checkCache = (req, res, next) => {
  // get the id sent from the frontend endpoint
  // make a query for the Redis cache
  redisDb.get(`user:${req.params.id}`, (err, value) => {
    // if the id is found
    if (value) {
      // save the username to be used on the frontEnd
      res.locals.testData = value;
      next();
    } else if (err) {
      console.log('Could not get data from cache: ', err)
      next();
    }
  });
}

DbController.mongoDb = (req, res, next) => {
  // query mongoDB for the user id
  mongo.findOne({ name: req.body })
  // store the username in the redis cache and set expiration (SET user:3 super-programmer-navi EX 60)
    .then((entry) => {
      redisDb.set('name', entry, /* set expiration */ )
    })
    // send the username back for use in frontend
    .then(() => {
      console.log('Cached your entry:', req.body)
    })
    .catch((err) => {
      console.log('Could not find entry in Mongo:', err)
    })
}

module.exports = DbController;