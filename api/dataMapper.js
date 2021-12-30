const db = require('./db');

module.exports = {
  getAllMembers: async (req, res) => {
      try {
        const members = await db.query('SELECT * FROM member')
        console.log('members : ', members);
        res.json(members);

    } catch (error) {
        console.trace(error);
        res.status(500).json(error);
    }
  }

//   (callback) => {
//     database.query('SELECT * FROM pokemon', callback);
// },
}