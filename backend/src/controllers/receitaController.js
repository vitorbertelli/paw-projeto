import Receita from './../models/receitaModel.js';

class ReceitaController {

  static criarReceitas = async (req, res) => {
    try {
      const receita = await Receita.create(req.body);
      res.status(201).json({
        status: 'success',
        receita
      });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  static listarReceitas = async (req, res) => {
    try {
      const receitas = await Receita.find();
      res.status(200).json(receitas);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  static deletarReceita = async (req, res) => {
    try {
      const { id } = req.params;
      await Receita.findByIdAndDelete(id);
      res.status(200).json({ message: 'Receita deletada com sucesso.'});
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  static resumoReceitasMensal = async (req, res) => {
    try {
      const { ano, mes } = req.params;
      const dataInicio = new Date(`${ano}-${mes}`);
      const dataFim = new Date(`${ano}-${Number(mes) + 1}`);
      const receitas = await Receita.find({ data: { $gte: dataInicio, $lt:  dataFim } });
      const totalReceita = await Receita.aggregate([
        {
          $match: { data: { $gte: dataInicio, $lt:  dataFim } }
        },
        {
          $group: {
            _id: null,
            valorTotal: { $sum: '$valor' }
          }
        }
      ]);
      res.status(200).json({
        receitas: receitas,
        receitaTotal: totalReceita,
      });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

};

export default ReceitaController;