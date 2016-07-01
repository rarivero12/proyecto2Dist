function ComidaAlmacen(tipo,peso,max,min) {
  this.peso = peso;
  this.tipo = tipo;
  this.max = max;
  this.min = min;
}

ComidaAlmacen.prototype.getPeso = function() {

  return this.peso;
}

ComidaAlmacen.prototype.getTipo = function() {

    return this.tipo;
}

ComidaAlmacen.prototype.getMax = function(m) {

    return this.max;
}

ComidaAlmacen.prototype.getMin = function(m) {

    return this.min;
}

ComidaAlmacen.prototype.setMax = function(m) {
  this.max = m;
  return 1;
}

ComidaAlmacen.prototype.setMin = function(m) {
  this.min = m;
  return 1;
}

ComidaAlmacen.prototype.setKilos = function(kilos) {
  this.peso = kilos;
  return 1;
}

ComidaAlmacen.prototype.quitarKilos = function(kilos) {
  if(kilos <= this.peso){
    this.peso = this.peso-kilos;
    console.log("Resto: "+kilos);
    return 1;
  }
  this.peso=0;
  return 0;
}

ComidaAlmacen.prototype.sumarKilos = function(kilos) {
  if((kilos + this.peso) <= this.max){
    this.peso = this.peso+kilos;
    console.log("Sumo: "+kilos);
    return 1;
  }

  return 0;
}


module.exports = ComidaAlmacen;
