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
const userModel_1 = __importDefault(require("../models/userModel"));
const expenseModel_1 = __importDefault(require("../models/expenseModel"));
class UserAndExpenseController {
    // Ajouter un nouvel utilisateur
    static addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                yield userModel_1.default.insertUser(name, email, password);
                res.status(201).json({ message: 'Utilisateur créé avec succès' });
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
            }
        });
    }
    // Récupérer tous les utilisateurs
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.default.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
            }
        });
    }
    // Ajouter une nouvelle dépense
    static addExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, amount, date, comment, category, utilisateur_id } = req.body;
            try {
                yield expenseModel_1.default.insertExpense(name, amount, date, comment, category, utilisateur_id);
                res.status(201).json({ message: 'Dépense ajoutée avec succès' });
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de l’ajout de la dépense' });
            }
        });
    }
    // Supprimer une dépense par ID
    static deleteExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield expenseModel_1.default.deleteExpenseById(Number(id));
                res.status(200).json({ message: 'Dépense supprimée avec succès' });
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de la suppression de la dépense' });
            }
        });
    }
    // Récupérer une dépense par ID
    static getExpenseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expense = yield expenseModel_1.default.getExpenseById(Number());
                if (expense) {
                    res.status(200).json(expense);
                }
                else {
                    res.status(404).json({ message: 'Dépense non trouvée' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de la récupération de la dépense' });
            }
        });
    }
    // Récupérer toutes les dépenses
    static getAllExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expenses = yield expenseModel_1.default.getAllExpense();
                res.status(200).json(expenses);
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de la récupération des dépenses' });
            }
        });
    }
}
exports.default = UserAndExpenseController;
