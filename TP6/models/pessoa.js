var mongoose = require("mongoose");

var moradaSchema = new mongoose.Schema({
  cidade: String,
  distrito: String,
});

var atributoSchema = new mongoose.Schema({
  fumador: Boolean,
  gosta_cinema: Boolean,
  gosta_viajar: Boolean,
  acorda_cedo: Boolean,
  gosta_ler: Boolean,
  gosta_musica: Boolean,
  gosta_comer: Boolean,
  gosta_animais_estimacao: Boolean,
  gosta_dancar: Boolean,
  comida_favorita: String,
});

var pessoaSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  sexo: String,
  morada: moradaSchema,
  BI: String,
  CC: String,
  religiao: String,
  partido_politico: { party_abbr: String, party_name: String },
  profissao: String,
  marca_carro: String,
  figura_publica_pt: [String],
  animais: [String],
  destinos_favoritos: [String],
  desportos: [String],
  atributos: atributoSchema,
  id: String,
});

module.exports = mongoose.model("pessoa", pessoaSchema);
