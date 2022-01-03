const express = require('express');
const router = express.Router();
const controller =  require('./dataMapper');

router.get('/members', controller.getAllMembers);
router.post('/member/add', controller.createMember);

module.exports = router;