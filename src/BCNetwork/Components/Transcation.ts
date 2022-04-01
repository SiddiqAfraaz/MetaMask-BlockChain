// Transfer of funds between two wallets
class Transaction {
  constructor(
    public amount: number,
    public payer: string, // public key
    public payee: string // public key
  ) {}

  toString() {
    return JSON.stringify(this);
  }
}

export default Transaction;
