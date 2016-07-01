//dependencias
var express = require('express')
  , app = express(app)
  , server = require('http').createServer(app);
var Eureca = require('eureca.io');
var Hormiga = require('./clases/hormiga');
var Papa = require('./clases/comida');



//Eureca
//Servidor
var eurecaServer = new Eureca.Server();

eurecaServer.attach(server);


//functions under "exports" namespace will be exposed to client side
eurecaServer.exports.generar = function (hormi) {
  var hor=new Hormiga(hormi.idPedido,hormi.pesoMaximo,hormi.comida,hormi.inventarios,hormi.almacen,hormi.tipoReq,hormi.nroLlegada);

  console.log("Se hizo una peticion");
  var rq= hor.getPesoMaximo();//VEo lo que requiere
  var almacen= hor.getAlmacen();


  hor.agarrarComida(rq);//Aqui le doy la comida, se supone que la genero.

  if(almacen[0] == 1){
    //La mando al almacen 1
    almacenes[0].recibirHormiga(hor);
  }
  if(almacen[1] == 1){
    //La mando al almacen 2
    almacenes[1].recibirHormiga(hor);
  }
  if(almacen[2] == 1){
    //La mando al almacen 3
    almacenes[2].recibirHormiga(hor);
  }






}

//Cliente del almacen 1.
var almacenes= new Array();
var client1 = new Eureca.Client({ uri: 'http://localhost:8080' });
var client2 = new Eureca.Client({ uri: 'http://localhost:8070' });
var client3 = new Eureca.Client({ uri: 'http://localhost:8060' });


client1.ready(function (serverProxy) {

     almacenes[0]=serverProxy;

});

client2.ready(function (serverProxy) {

     almacenes[1]=serverProxy;

});

client3.ready(function (serverProxy) {

     almacenes[2]=serverProxy;

});



server.listen(8082);
