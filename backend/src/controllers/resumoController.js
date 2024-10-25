import fetch from 'node-fetch';

class ResumoController {

  static listarResumo = async (req, res) => {
    try {
      const { ano, mes} = req.params;
      const url = "http://localhost:3000";

      const [requestReceita, requestDespesa] = await Promise.all([
        fetch(`${url}/receitas/${ano}/${mes}`),
        fetch(`${url}/despesas/${ano}/${mes}`)
      ]);

      const receita = await requestReceita.json();
      const despesa = await requestDespesa.json();

      const sumReceita = receita.receitaTotal[0].valorTotal;
      const sumDespesa = despesa.despesaTotal[0].valorTotal;

      const resumoMensal = sumReceita - sumDespesa;
      
      res.status(200).json({
        "Receitas": sumReceita,
        "Despesas": -sumDespesa,
        "ResumoMensal": resumoMensal
      });
    } catch (err) {
      res.status(400).json(err.message);
    };
  };

};

export default ResumoController;
