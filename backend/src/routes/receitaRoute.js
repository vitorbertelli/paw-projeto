import { Router } from 'express';
import ReceitaController from './../controllers/receitaController.js';

const router = Router();

router
  .route('/receitas')
  .post(ReceitaController.criarReceitas)
  .get(ReceitaController.listarReceitas)

router
  .route('/receitas/:id')
  .get(ReceitaController.listarReceitaPorId)
  .patch(ReceitaController.atulizarReceita)
  .delete(ReceitaController.deletarReceita)

router
  .get(
    '/receitas/:ano/:mes',
    ReceitaController.resumoReceitasMensal
  );

export default router;