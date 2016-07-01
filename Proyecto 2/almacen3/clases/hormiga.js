function Hormiga(id,pesoMaximo,comida,inventarios,almacen,tipoReq,nroLlegada) {
  this.idPedido= id;
  this.comida = comida;
  this.pesoMaximo = pesoMaximo;
  this.inventarios = new Array();
  this.inventarios = inventarios;
  this.nroLlegada = new Array();
  this.nroLlegada = nroLlegada;
  this.almacen = almacen;
  this.tipoReq = tipoReq;
}

Hormiga.prototype.getId = function(){
  return this.idPedido;
}

Hormiga.prototype.getRequerido = function(){
  return this.pesoMaximo-this.comida;
}

Hormiga.prototype.getInventarios = function(){
  return this.inventarios;
}

Hormiga.prototype.getNroLlegada = function(){
  return this.nroLlegada;
}


Hormiga.prototype.setInventario = function(inv,i){

  this.inventarios[i] = inv;
  return 1;
}

Hormiga.prototype.setNroLlegada = function(nro,i){

  this.nroLlegada[i] = nro;
  return 1;
}

Hormiga.prototype.setItirenario = function(it){

  this.almacen = it;
  return 1;
}

Hormiga.prototype.soltarComida = function(){
  var comi = this.comida;
  this.comida = 0;
  return comi;
}


Hormiga.prototype.agarrarComida = function(comid){
  this.comida=this.comida+comid;
  return 1;
}


Hormiga.prototype.getAlmacen = function(){
  return this.almacen;
}

Hormiga.prototype.getPesoMaximo = function() {

  return this.pesoMaximo;
}

Hormiga.prototype.getComida = function() {

  return this.comida;
}

Hormiga.prototype.getTipoReq = function() {

  return this.tipoReq;
}

Hormiga.prototype.lista = function() {
  if(this.comida==this.pesoMaximo){
    return 1;
  }else{
    return 0;
  }
}

module.exports = Hormiga;
