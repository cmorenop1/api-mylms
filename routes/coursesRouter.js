var express = require('express');
var router = express.Router();
const coursesController = require('../controllers/coursesController')

router.get('/', coursesController.list);

module.exports = router;
