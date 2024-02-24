const router = require('express').Router();
const clientController = require('../controllers/client.controller')
const {body} = require('express-validator');
const validate = require('../database/middleware/validate');
const errors = require('../const/errors');

router.get('/', clientController.getAll);
router.get('/:userId', clientController.getUser);
router.delete('/:userId', clientController.delete);

router.put('/:userId',[
    body('name').trim().notEmpty().withMessage(errors.EmptyNameField),
    body('email').trim().isEmail().withMessage(errors.EmptyEmailField)
], clientController.update);

router.post('/', [
    body('name').trim().notEmpty().withMessage(errors.EmptyNameField),
    body('email').trim().isEmail().withMessage(errors.EmptyEmailField)
], validate, clientController.create ),

module.exports = router;