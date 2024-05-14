import { Router } from 'express';
import DespesaController from '../controllers/despesaController.js';

const router = Router();

router
  .route('/despesas')
  .post(DespesaController.criarDespesa)
  .get(DespesaController.listarDespesas)

router
  .route('/despesas/:id')
  .get(DespesaController.listarDespesaPorId)
  .patch(DespesaController.atulizarDespesa)
  .delete(DespesaController.deletarDespesa)

router
  .get(
    '/despesas/:ano/:mes',
    DespesaController.resumoDespesasMensal
  );

export default router;