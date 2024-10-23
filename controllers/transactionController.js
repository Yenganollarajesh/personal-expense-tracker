const Transaction = require('../models/transaction');

// Create a new transaction
exports.createTransaction = async (req, res) => {
  const { type, category, amount, date, description } = req.body;
  const userId = req.user.id;

  console.log("Request Body:", req.body);  
  console.log("User ID:", userId);  

  try {
    const newTransaction = await Transaction.create({
      type,
      category,
      amount,
      date,
      description,
      userId
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error:", error);  
    res.status(400).json({ error: 'Error creating transaction' });
  }
};

// Get all transactions for the logged-in user with pagination
exports.getTransactions = async (req, res) => {
  const userId = req.user.id;
  const limit = parseInt(req.query.limit, 10) || 10;  // Default limit to 10 if not provided
  const offset = parseInt(req.query.offset, 10) || 0;  // Default offset to 0 if not provided
  
  try {
    // Fetch transactions with pagination
    const transactions = await Transaction.findAndCountAll({
      where: { userId },
      limit,
      offset
    });
    
    // Return transactions and total count
    res.json({
      transactions: transactions.rows,
      totalCount: transactions.count,
      currentPage: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(transactions.count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving transactions' });
  }
};

// Get a transaction by ID
exports.getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction || transaction.userId !== req.user.id) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving transaction' });
  }
};

// Update a transaction by ID
exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description } = req.body;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction || transaction.userId !== req.user.id) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    transaction.type = type;
    transaction.category = category;
    transaction.amount = amount;
    transaction.date = date;
    transaction.description = description;
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error updating transaction' });
  }
};

// Delete a transaction by ID
exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction || transaction.userId !== req.user.id) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    await transaction.destroy();
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting transaction' });
  }
};
