//dependencias
var express = require('express')
  , app = express(app)
  , server = require('http').createServer(app);
var Eureca = require('eureca.io');
var Hormiga = require('./clases/hormiga');
var Comida = require('./clases/comida');
var Pedido = require('./clases/pedido');


//var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//Variables
var nroHormigas=0;
var nroPedido=0;
var pedidos = new Array();
var inventarios=new Array();
var inventario1= new Array();
var inventario2= new Array();
var inventario3= new Array();
var ultimaAct= new Array();


ultimaAct[0]=-1;
ultimaAct[1]=-1;
ultimaAct[2]=-1;

inventario1[0]=50;
inventario1[1]=50;
inventario1[2]=50;

inventario2[0]=50;
inventario2[1]=50;
inventario2[2]=50;

inventario3[0]=50;
inventario3[1]=50;
inventario3[2]=50;

inventarios[0]=inventario1;
inventarios[1]=inventario2;
inventarios[2]=inventario3;



//Express

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//Eureca almacenes.

var serverP=new Array();
var client1 = new Eureca.Client({ uri: 'http://localhost:8080' });

var client2 = new Eureca.Client({ uri: 'http://localhost:8070' });

var client3 = new Eureca.Client({ uri: 'http://localhost:8060' });


client1.ready(function (serverProxy) {

    serverP[0]=serverProxy;

});
client2.ready(function (serverProxy) {

    serverP[1]=serverProxy;
  //  var inven =new Array();
  //  inven[0]=0;
  //  inven[1]=0;
  //  inven[2]=0;
//var hormiga=generarHormiga(0,50,50,inven,null,0);
  //  serverProxy.recibirHormiga(hormiga);
});
client3.ready(function (serverProxy) {

    serverP[2]=serverProxy;
  //  var inven =new Array();
  //  inven[0]=0;
  //  inven[1]=0;
  //  inven[2]=0;
//var hormiga=generarHormiga(0,50,50,inven,null,0);
  //  serverProxy.recibirHormiga(hormiga);
});

//Eureca Servidor

var eurecaServer = new Eureca.Server();

eurecaServer.attach(server);



eurecaServer.exports.peticionComida = function (peso,tipo,alma){

  var hormis=new Array();
  hormis=generar(hormis,tipo,peso,-1,alma);



  for(var i=0;i<hormis.length;i++){
   enviarHormiga(hormis[i],0);
  }


}
eurecaServer.exports.hormigasGeneradoras = function (hormi){
  var hor=new Hormiga(hormi.idPedido,hormi.pesoMaximo,hormi.comida,hormi.inventarios,hormi.almacen,hormi.tipoReq);
  var inven=hor.getInventarios();//Obtengo el inventario
  nroHormigas=nroHormigas-1;
  if(inven[0]!=0){//Actualizo mis inventarios.
      inventarios[0]=inven[0];
  }
  if(inven[1]!=0){
      inventarios[1]=inven[1];
  }
  if(inven[2]!=0){
      inventarios[2]=inven[2];
  }

console.log(inventarios);

}

eurecaServer.exports.hormigasPedido = function (hormi)
{
   var hor=new Hormiga(hormi.idPedido,hormi.pesoMaximo,hormi.comida,hormi.inventarios,hormi.almacen,hormi.tipoReq,hormi.nroLlegada);
   var id=hor.getId();

   //Actualizo mis inventarios
   var inven=hor.getInventarios();
   var nros= hor.getNroLlegada();

   if(inven[0]!=0 && nros[0]>ultimaAct[0]){
       inventarios[0]=inven[0];
       ultimaAct[0]=nros[0];
   }
   if(inven[1]!=0 && nros[1]>ultimaAct[1]){
       inventarios[1]=inven[1];
       ultimaAct[1]=nros[1];
   }
   if(inven[2]!=0 && nros[2]>ultimaAct[2]){
       inventarios[2]=inven[2];
       ultimaAct[2]=nros[2];
   }

if(id<0){


console.log(inventarios);

}else{



   if(hor.lista()){//Si la hormiga esta lista
     nroHormigas=nroHormigas-1;

   //La guardo en el pedido
   pedidos[id].agregarHormiga(hor);
   //si el pedido esta listo
   if(pedidos[id].listo()){
     //LLamo a la funcion que le avisa al client
     console.log("El pedido esta listo.");
     console.log(pedidos[id].getLlegaron());
     console.log(nroHormigas);
     console.log(inventarios);

   }


   }else{
     //Si la hormiga no esta lista

     //Veo mis inventarios y la mando a los almacenes que tengan comida
     var inv = inventarios;
     var tipo=hor.getTipoReq();
     var req= hor.getRequerido();
     var itinerario= new Array();

     if(inv[0][tipo]>req){
       itinerario[0]=1;
     }

     if(inv[1][tipo]>req){
       itinerario[1]=1;
     }

     if(inv[2][tipo]>req){
      itinerario[2]=1;
     }
     hor.setItirenario(itinerario);


        enviarHormiga(hor,1);


   }
}

}

//Eureca Generadores
var generadores=new Array();
var generador1 = new Eureca.Client({ uri: 'http://localhost:8081' });
var generador2 = new Eureca.Client({ uri: 'http://localhost:8082' });
var generador3 = new Eureca.Client({ uri: 'http://localhost:8083' });


generador1.ready(function (serverProxy) {
 generadores[0]=serverProxy;
});
generador2.ready(function (serverProxy) {
 generadores[1]=serverProxy;
});
generador3.ready(function (serverProxy) {
 generadores[2]=serverProxy;
});


//mongoDB
//mongoose.connect('mongodb://localhost/rest_test');




//Routes
//app.use('/api', require('./routes/api'));

app.get('/:papas/:cannabis/:tomate', function (req, res, next) {


    console.log("inventarios");
    console.log(inventarios);
    var papas=req.params.papas;
    var cannabis=req.params.cannabis;
    var tomate= req.params.tomate;

    crearPedido(papas*1,cannabis*1,tomate*1,function(hormigas){
      //Envio las hormigas
          console.log("Envia hormigas.");
      for(var i=0;i<hormigas.length;i++){
       enviarHormiga(hormigas[i],1);
      }
     res.send(hormigas[0].getId());
     console.log(hormigas);

    });


});


app.get('/', function (req, res, next) {
   res.sendfile('index.html');
});

//Funciones

function generarHormiga(id,pesoMaximo,comida,inventarios,almacen,tipoReq,llegada){
  var hor=new Hormiga(id,pesoMaximo,comida,inventarios,almacen,tipoReq,llegada);
  return hor;
}

function crearPedido(papas,cannabis,tomate,callback){

   var hormis=new Array();



   hormis=generar(hormis,0,papas,nroPedido,0);
   hormis=generar(hormis,1,cannabis,nroPedido,0);
   hormis=generar(hormis,2,tomate,nroPedido,0);


   var pedido = new Pedido(papas,cannabis,tomate,nroPedido);
   pedido.setFueron(hormis.length);
   pedidos.push(pedido);
   nroPedido++;
   console.log(pedido);


  callback(hormis);
}


function aleatorio(inferior,superior){
       var resAleatorio = Math.floor((Math.random() * (superior - inferior + 1)) + inferior);
      return resAleatorio;
}

function generar(hormigas, tipo, p,id,alma){
  var h = hormigas;
  var itinerario= new Array();
  var inv=inventarios;
  itinerario[0]=0;
  itinerario[1]=0;
  itinerario[2]=0;
  var inven = new Array();
  inven[0]=0;
  inven[1]=0;
  inven[2]=0;
  var llegada = new Array();
  llegada[0]=-1;
  llegada[1]=-1;
  llegada[2]=-1;

  while(p>0){
   if(nroHormigas){
       var peso=aleatorio(1,nroHormigas);
   }else{
       var peso=1;
   }

   if(peso>p){
     peso=p*1;
   }


if(alma==0){
   if(inv[0][tipo]>peso){
     itinerario[0]=1;
   }

   if(inv[1][tipo]>peso){
     itinerario[1]=1;
   }

   if(inv[2][tipo]>peso){
    itinerario[2]=1;
   }
 }else{
   itinerario[alma-1]=1;
 }

   p=p-peso;
   var hormiga=generarHormiga(id,peso,0,inven,itinerario,tipo,llegada);
   h.push(hormiga);
   nroHormigas++;

  }

  return h;
}

function enviarHormiga(hormiga,donde){
  if(donde){//Si va a un almacen
    var b=1;

    var itinenario=hormiga.getAlmacen();
    if(itinenario[0]==1){
      b=0;
      serverP[0].recibirHormiga(hormiga);
    }else{
      if(itinenario[1]==1){
          b=0;
        serverP[1].recibirHormiga(hormiga);
      }else{
        if(itinenario[2]==1){
            b=0;
          serverP[2].recibirHormiga(hormiga);
        }
      }
    }
  if(b){
    itinenario[0]=1;
    itinenario[1]=1;
    itinenario[2]=1;
    hormiga.setItirenario(itinenario);
    serverP[0].recibirHormiga(hormiga);

  }

  }else{//Si va a un generador
     var tipo=hormiga.getTipoReq();
     generadores[tipo].generar(hormiga);
  }
}




//Server Start
server.listen(8000);
