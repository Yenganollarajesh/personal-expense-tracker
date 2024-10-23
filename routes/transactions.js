// routes/transactions.js
const express = require('express');
const {
  createTransaction, getTransactions, getTransactionById, updateTransaction, deleteTransaction
} = require('../controllers/transactionController');
const auth = require('../middleware/auth');
const router = express.Router();
console.log(auth)

router.post('/transactions',createTransaction);
router.get('/transactions' ,getTransactions);
router.get('/transactions/:id',getTransactionById);
router.put('/transactions/:id',updateTransaction);
router.delete('/transactions/:id',deleteTransaction);

module.exports = router;
