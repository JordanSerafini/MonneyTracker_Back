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
exports.UserModel = void 0;
const pool_1 = require("../database/pool");
const models_1 = __importDefault(require("./models"));
class UserModel extends models_1.default {
    constructor(id, name, email, password) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    // Méthode pour insérer un utilisateur
    static insertUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO "utilisateur" (name, email, password) VALUES ($1, $2, $3)';
            try {
                yield pool_1.pool.query(sql, [name, email, password]);
                console.log('Utilisateur inséré avec succès.');
            }
            catch (error) { // Annoter l'erreur avec le type unknown
                if (error instanceof Error) {
                    console.error('Erreur lors de l\'insertion de l\'utilisateur:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de l\'insertion de l\'utilisateur');
                }
                throw error;
            }
        });
    }
    // Méthode pour supprimer un utilisateur par son ID
    static deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM "utilisateur" WHERE id = $1';
            try {
                yield pool_1.pool.query(sql, [id]);
                console.log(`Utilisateur avec l'ID ${id} supprimé avec succès.`);
            }
            catch (error) { // Annoter l'erreur avec le type unknown
                if (error instanceof Error) {
                    console.error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${id}:`, error.message);
                }
                else {
                    console.error(`Une erreur inconnue est survenue lors de la suppression de l'utilisateur avec l'ID ${id}`);
                }
                throw error;
            }
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM "utilisateur" WHERE id = $1';
            try {
                const result = yield pool_1.pool.query(sql, [id]);
                const user = result.rows[0] || null;
                return user;
            }
            catch (error) { // Annoter l'erreur avec le type unknown
                if (error instanceof Error) {
                    console.error('Erreur lors de la récupération de l\'utilisateur:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de la récupération de l\'utilisateur');
                }
                throw error;
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM "utilisateur"';
            try {
                const result = yield pool_1.pool.query(sql);
                const users = result.rows;
                return users;
            }
            catch (error) { // Annoter l'erreur avec le type unknown
                if (error instanceof Error) {
                    console.error('Erreur lors de la récupération des utilisateurs:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de la récupération des utilisateurs');
                }
                throw error;
            }
        });
    }
}
exports.UserModel = UserModel;
exports.default = UserModel;
