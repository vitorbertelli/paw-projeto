import mongoose from 'mongoose';

const despesaSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: [true, 'Despesa deve conter uma descricao.']
  },
  valor: {
    type: Number,
    required: [true, 'Despesa deve conter um valor.']
  },
  data: {
    type: Date,
    required: [true, 'Despesa deve conter uma data.']
  }
});

const Despesa = mongoose.model('Despesa', despesaSchema);
export default Despesa;