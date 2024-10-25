import receita from './receitaRoute.js';
import despesa from './despesaRoute.js';
import resumo from './resumoRoute.js';

const routes = (app) => {
  app.use(
    receita,
    despesa,
    resumo
  );
};

export default routes;