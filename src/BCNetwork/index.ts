import Wallet from "./Components/Wallet";
import Ledger from "./Components/Ledger";
// Example usage

const suraj = new Wallet();
const ugi = new Wallet();
const muri = new Wallet();
-suraj.sendMoney(50, ugi.publicKey);
ugi.sendMoney(23, muri.publicKey);
muri.sendMoney(5, suraj.publicKey);

console.log(Ledger.instance);
