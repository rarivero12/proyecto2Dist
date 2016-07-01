function Pedido(papas,cannabis,tomate,id) {
this.kPapas=papas;
this.kCannabis=cannabis;
this.kTomate=tomate;
this.fueron=0;
this.hormigas= new Array();
this.llegaron=0;

}
Pedido.prototype.getP = function(){
    return this.kPapas;
}
Pedido.prototype.getC = function(){
  return this.kCannabis;
}
Pedido.prototype.getT = function(){
  return this.kTomate;
}

Pedido.prototype.setFueron = function(fuer){
   this.fueron=fuer;
   return 1;
}

Pedido.prototype.getFueron = function(){
  return this.fueron;
}

Pedido.prototype.getLlegaron = function(){
  return this.llegaron;
}

Pedido.prototype.getHormigas = function(){
  return this.hormigas;
}

Pedido.prototype.agregarHormiga = function(hormiga){
  this.hormigas[this.llegaron]=hormiga;
  this.llegaron++;
  return 1;
}

Pedido.prototype.listo = function(){
  if(this.llegaron==this.fueron){
    return 1;
  }else{
    return 0;
  }

}





module.exports = Pedido;
