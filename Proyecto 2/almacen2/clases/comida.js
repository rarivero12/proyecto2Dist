function Comida(tipo,peso) {
  this.peso = peso;
  this.tipo = tipo;

}

Comida.prototype.getPeso = function() {
  console.log(this.peso);
}

Comida.prototype.getTipo = function() {
  console.log(this.tipo);
}


module.exports = Comida;
