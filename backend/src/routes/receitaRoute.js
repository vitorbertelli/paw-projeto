import { Router } from 'express';
import ReceitaController from './../controllers/receitaController.js';

const router = Router();

router
  .route('/receitas')
  .post(ReceitaController.criarReceitas)
  .get(ReceitaController.listarReceitas)

router
  .route('/receitas/:id')
  .delete(ReceitaController.deletarReceita)

router
  .get(
    '/receitas/:ano/:mes',
    ReceitaController.resumoReceitasMensal
  );

export default router;