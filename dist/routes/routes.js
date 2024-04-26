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
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controllers/controller"));
const pool_1 = require("../database/pool");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Route login
router.post('/expense', controller_1.default.addExpense);
router.get('/expense', controller_1.default.getAllExpense);
router.delete('/expense/:id', controller_1.default.deleteExpense);
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
      SELECT 
        column_name, 
        data_type, 
        is_nullable 
      FROM 
        information_schema.columns 
      WHERE 
        table_name = 'expense';
    `;
        const result = yield pool_1.pool.query(query);
        res.json(result.rows); // Envoie le résultat au client
    }
    catch (error) {
        console.error('Erreur lors de la récupération des colonnes:', error); // Log d'erreur pour débogage
        res.status(500).json({ error: 'Erreur interne du serveur' }); // Réponse d'erreur avec code 500
    }
}));
exports.default = router;
