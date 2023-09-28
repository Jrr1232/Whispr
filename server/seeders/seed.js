const db = require('../config/connection');
const { User, Whispr } = require('../models');
const userSeeds = require('./userSeeds.json');
const whisprSeeds = require('./whisprSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Whispr', 'whisprs');
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < whisprSeeds.length; i++) {
      const { _id, whisprAuthor } = await Whispr.create(whisprSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: whisprAuthor },
        {
          $addToSet: {
            whisprs: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
