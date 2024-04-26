import express from "express";
import controller from "../controllers/controller";
import { pool } from "../database/pool";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, World!');
  });


// Route login
router.post('/expense', controller.addExpense);
router.get('/expense', controller.getAllExpense);
router.delete('/expense/:id', controller.deleteExpense);

router.get('/test', async (req, res) => {
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
    const result = await pool.query(query);
    res.json(result.rows); // Envoie le résultat au client
  } catch (error) { 
    console.error('Erreur lors de la récupération des colonnes:', error); // Log d'erreur pour débogage
    res.status(500).json({ error: 'Erreur interne du serveur' }); // Réponse d'erreur avec code 500
  }
});




export default router