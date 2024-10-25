import mongoose from 'mongoose';

const receitaSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: [true, 'Receita deve conter uma descricao.']
  },
  valor: {
    type: Number,
    required: [true, 'Receita deve conter um valor.']
  },
  data: {
    type: Date,
    required: [true, 'Receita deve conter uma data.']
  }
});

const Receita = mongoose.model('Receita', receitaSchema);
export default Receita;
