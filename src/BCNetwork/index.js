"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Wallet_1 = __importDefault(require("./Components/Wallet"));
const Ledger_1 = __importDefault(require("./Components/Ledger"));
// Example usage
const suraj = new Wallet_1.default();
const ugi = new Wallet_1.default();
const muri = new Wallet_1.default();
suraj.sendMoney(50, ugi.publicKey);
ugi.sendMoney(23, muri.publicKey);
muri.sendMoney(5, suraj.publicKey);
console.log(Ledger_1.default.instance);
