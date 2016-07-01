//dependencias
var express = require('express')
  , app = express(app)
  , server = require('http').createServer(app);
var Eureca = require('eureca.io');
var Hormiga = require('./clases/hormiga');
var ComidaAlmacen = require('./clases/comidaAlmacen');
var Comida = require('./clases/comida');
var net = require('net');
var fs = require('fs');



//Variables
var ids = new Array();
var inventario = new Array();
var maxi = new Array();
var minimo = new Array();
var respuestaSocket=null;
var bandera=new Array();
bandera[0]=1;
bandera[1]=1;
bandera[2]=1;
var miNumero=1;
var nroHormiga=0;



//Codigo inicio sockets

//var HOST = '127.0.0.1';
//var PORT = 4000;


//var client = new net.Socket();


papas = new ComidaAlmacen("Papa",50,50,8);
cannabis = new ComidaAlmacen("Cannabis",50,50,8);
tomate = new ComidaAlmacen("Tomate",50,50,8);//Esto se manda con los sockets y
                                         //el id que se retorna se guarda en ids
inventario[0] = papas.getPeso();
inventario[1] = cannabis.getPeso();
inventario[2] = tomate.getPeso();

minimo[0] = papas.getMin();
minimo[1] = cannabis.getMin();
minimo[2] = tomate.getMin();

maxi[0] = papas.getMax();
maxi[1] = cannabis.getMax();
maxi[2] = tomate.getMax();





/*
client.connect(PORT, HOST, function() {

    console.log('Conectado a: ' + HOST + ':' + PORT);
     client.write("1"+JSON.stringify(papas));
    client.write("1"+JSON.stringify(cannabis));
     client.write("1"+JSON.stringify(tomate));



     ids[0]="001";
      ids[1]="002";
       ids[2]="003";



});



// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {


    console.log('DATA 1: ' + data);
    client.destroy();


});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Almacen 1 desconectado client 1');
});
?
*/

//Eureca cliente servidor principal
var principal;
var ser = new Eureca.Client({ uri: 'http://localhost:8000' });


ser.ready(function (serverProxy) {

     principal=serverProxy;

});;

//Eureca cliente de los otros almacenes

var almacen1;
var almacen3;
var alma1 = new Eureca.Client({ uri: 'http://localhost:8080' });
var alma3 = new Eureca.Client({ uri: 'http://localhost:8060' });

alma1.ready(function (serverProxy) {

     almacen1=serverProxy;

});
alma3.ready(function (serverProxy) {

     almacen3=serverProxy;

});

//Eureca server



var eurecaServer = new Eureca.Server();

eurecaServer.attach(server);



eurecaServer.exports.recibirHormiga = function (hormi) {
  var hor=new Hormiga(hormi.idPedido,hormi.pesoMaximo,hormi.comida,hormi.inventarios,hormi.almacen,hormi.tipoReq,hormi.nroLlegada);

  var tipo=hor.getTipoReq();
  var c=hor.getComida();
  var t=hor.getTipoReq();
  var almacen = hor.getAlmacen();

     var requ =hor.getRequerido();
     hor.setNroLlegada(nroHormiga,miNumero);
     nroHormiga++;

console.log(hor);




    if(requ!=0){


     var cliente = new net.Socket();

  //  cliente.connect(PORT, HOST, function() {

  //   cliente.write("2"+ids[tipo]);
//});


    //getRespuestas(cliente,function(data){
      /// respuestaSocket=data;



          //var json = JSON.parse(respuestaSocket);

          //Tengo ya el objeto del tipo de comida.
      //  var comidaAlma = new ComidaAlmacen(json.tipo,json.peso,json.max,json.min);

            //Le resto lo requerido aqui se supone que lo tengo que restar al json

            if(inventario[tipo]>=requ){


            inventario[tipo]=inventario[tipo]-requ;
          // comidaAlma.quitarKilos(requ);
         console.log("Una hormiga se llevo. "+ requ);


            //Le sumo los kilos a la hormiga
            hor.agarrarComida(requ);
            //Guardo mi inventario en la hormiga.
            hor.setInventario(inventario,miNumero);
            //Actualizo el json en el almacen




            //Mando la hormiga al servidor principal con la informacion actualizada
            principal.hormigasPedido(hor);

          }else{

            // Si no tengo lo requerido hago esto
               //Si no puedo satisfacer a la hormiga la mando a el servidor siguiente en el itinerario.
                  almacen[miNumero]=0;//Me borro del itinerario

              //   comidaAlma.quitarKilos(requ);
               console.log("Una hormiga se llevo. "+ inventario[tipo]);
                  hor.setItirenario(almacen);// Actualizo
                  hor.agarrarComida(inventario[tipo]);
                  inventario[tipo]=0;
                 hor.setInventario(inventario,miNumero);//Actualizo mi inventario.

                  if(almacen[0]){ // Si en el itinierario esta el almacen 1
                      almacen1.recibirHormiga(hor);
                  }else{
                    if(almacen[2]){// Si en el itinierario esta el almacen 3
                          //La mando al almacen 3

                          almacen3.recibirHormiga(hor);
                    }else{ // Si ya los recorrio todos
                        principal.hormigasPedido(hor);// La mando para el servidor
                    }
                  }
          }
            //Reviso mi inventario si tengo falta de comida mando la se;al al servidor
          /////var min = comidaAlma.getMin();
        //  var max = comidaAlma.getMax();
          // var kilos= comidaAlma.getPeso();
          var min = minimo[tipo];
          var max = maxi[tipo];
         var kilos= inventario[tipo];

            if(kilos<=min && bandera[tipo]){
            bandera[tipo]=0;
            console.log("Se mando a pedir. comida de tipo "+ tipo);
           principal.peticionComida(max-kilos,tipo,miNumero+1);
            }

        //    var response =new Array();
          //  response[0]=comidaAlma;
            // response[1]=tipo;



           //return response;



   ///});




}else{

  //Busco el json y lo guardo en una varibale
//  var cliente = new net.Socket();

//  cliente.connect(PORT, HOST, function() {

  // cliente.write("2"+ids[t]);
 //});

// getRespuestas(cliente,function(data){
  //  respuestaSocket=data;


  //  var json = JSON.parse(respuestaSocket);

    //Tengo ya el objeto del tipo de comida.
  //  var comidaAlma = new ComidaAlmacen(json.tipo,json.peso,json.max,json.min);

  //   var limitee = comidaAlma.getMax(); // Saco esta variable del json
  //   var kilos=comidaAlma.getPeso();
  var limitee= maxi[t];
  var kilos=inventario[t];
  bandera[tipo]=1;

console.log("Una hormiga dejo "+ com);

  if(c+kilos<=limitee){ //Si no sobrepaso mi limite de almacenaje
    var com=hor.soltarComida();
    //comidaAlma.sumarKilos(com);
  //  inventario[t]=comidaAlma.getPeso();//Esta suma se hace en el json
    inventario[t]+=com;

  }else{//Si lo sobrepaso
    //   comidaAlma.setKilos(limitee);
       inventario[t]=limitee; //Esto se hace en el json tmbn
       hor.soltarComida();
                console.log("limite");
  }
    hor.setInventario(inventario,miNumero);//Guardo mi inventario en la hormiga.


    //Envio la hormiga a la funcion del servidor con la informacion actualizada
    principal.hormigasPedido(hor);

  // var response =new Array();
  //  response[0]=comidaAlma;
  //  response[1]=t;
    //return response;
//});



}

    console.log(hor);
console.log(inventario);


}

//Funciones


/*
function getRespuestas(cliente,callback){

      cliente.on('data', function(data) {

            var response=[];
             response  = callback(data);

            cliente.write("4"+ids[response[1]]+JSON.stringify(response[0]));
            cliente.destroy();

      });

}




*/

server.listen(8070);
