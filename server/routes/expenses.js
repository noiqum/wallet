const router = require('express').Router();
const expenseController = require('../controllers/expenses.controller');
const authMiddleware = require('../middleware/authMiddleware')
router.route('/').post(authMiddleware, expenseController.save)
router.route('/:id').get(expenseController.findById)
router.route('/list').post(authMiddleware, expenseController.find)
router.route('/:id').post(expenseController.delete)

module.exports = router;