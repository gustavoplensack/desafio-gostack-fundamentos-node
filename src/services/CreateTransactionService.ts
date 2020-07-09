import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface NewTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: NewTransactionDTO): Transaction {
    /**
     * Fetching for initial balance
     */
    const currentBalance = this.transactionsRepository.getBalance().total;

    if (type === 'outcome') {
      const futureBalance = currentBalance - value;
      if (futureBalance < 0) {
        throw Error('Insufficient funds for this transaction');
      }
    }

    const newTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return newTransaction;
  }
}

export default CreateTransactionService;
