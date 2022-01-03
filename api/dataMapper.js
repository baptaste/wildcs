const db = require('./db');

module.exports = {
  getAllMembers: async (req, res) => {
      try {
        const members = await db.query('SELECT * FROM member')
        res.json(members);
    } catch (error) {
        console.trace(error);
        res.status(500).json(error);
    }
  },
  createMember: async (req, res) => {
    const { value } = req.body;

    try {
      const foundMember = await db.query('SELECT name FROM member WHERE name=$1', [value]);
      if (foundMember.rows.length !== 0) {
        console.log('Ce membre existe déjà. foundMember : ', foundMember);
        return res.json({
            error: 'Ce membre existe déjà. Veuillez choisir un autre nom pour ajouter un(e) Argonaute à l\'equipage.'
        });
      }

      const result = await db.query('INSERT INTO "member" (name) VALUES($1) RETURNING id', [value]);

      if (result.rows.length === 0) {
        return res.json({
            error: 'Erreur lors de l\'enregistrement en BDD.'
        });
      } else {
        console.log('Enregistrement réussi.');
      }

      const newMember = await db.query(`SELECT * FROM member WHERE id=${result.rows[0].id}`);

      res.json(newMember.rows[0]);

    } catch (error) {
        console.trace(error);
        res.status(500).json({
          error: `Une erreur est survenue ${error.message}`
      });
    }
  }
}