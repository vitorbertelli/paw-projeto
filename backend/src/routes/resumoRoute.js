import { Router } from 'express';
import ResumoController from '../controllers/resumoController.js';

const router = Router();

router.get('/resumo/:ano/:mes', ResumoController.listarResumo);

export default router;
