var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => res.json({ transaction: {} }));

module.exports = router;
