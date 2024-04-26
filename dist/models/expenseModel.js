"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = require("../database/pool");
const models_1 = __importDefault(require("./models"));
class ExpenseModel extends models_1.default {
    constructor(name, amount, date, comment, category, utilisateur_id) {
        super();
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.comment = comment;
        this.category = category;
        this.utilisateur_id = utilisateur_id;
    }
    static insertExpense(name, amount, date, comment, category, utilisateur_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO "expense" (name, amount, date, comment, category, utilisateur_id) VALUES ($1, $2, $3, $4, $5, $6)';
            try {
                yield pool_1.pool.query(sql, [name, amount, date, comment, category, utilisateur_id]);
                console.log('Dépense insérée avec succès.');
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Erreur lors de l\'insertion de la dépense:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de l\'insertion de la dépense');
                }
                throw error;
            }
        });
    }
    static deleteExpenseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM "expense" WHERE id = $1';
            try {
                yield pool_1.pool.query(sql, [id]);
                console.log(`Dépense avec l'ID ${id} supprimée avec succès.`);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Erreur lors de la suppression de la dépense avec l'ID ${id}:`, error.message);
                }
                else {
                    console.error(`Une erreur inconnue est survenue lors de la suppression de la dépense avec l'ID ${id}`);
                }
                throw error;
            }
        });
    }
    static getExpenseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM "expense" WHERE id = $1';
            try {
                const result = yield pool_1.pool.query(sql, [id]);
                const expense = result.rows[0] || null;
                return expense;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Erreur lors de la récupération de la dépense:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de la récupération de la dépense');
                }
                throw error;
            }
        });
    }
    static getAllExpense() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM "expense"';
            try {
                const result = yield pool_1.pool.query(sql);
                const expenses = result.rows;
                return expenses;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Erreur lors de la récupération des dépenses:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de la récupération des dépenses');
                }
                throw error;
            }
        });
    }
}
exports.default = ExpenseModel;
