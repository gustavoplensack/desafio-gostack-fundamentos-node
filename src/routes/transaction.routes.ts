import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);

transactionRouter.get('/', (request, response) => {
  try {
    const transactionsArray = transactionsRepository.all();
    const transctionsBalance = transactionsRepository.getBalance();

    response.status(200).send({
      transactions: transactionsArray,
      balance: transctionsBalance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const newTransaction = createTransactionService.execute({
      title,
      value,
      type,
    });

    response.status(200).send(newTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
