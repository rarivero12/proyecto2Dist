jQuery(document).ready(function(){



  $('.spinner .btn:first-of-type').on('click', function() {
      $('.spinner input').val( parseInt($('.spinner input').val(), 10) + 1);
    });
    $('.spinner .btn:last-of-type').on('click', function() {
      $('.spinner input').val( parseInt($('.spinner input').val(), 10) - 1);
    });


$('#pedir').click(function(){
  var p=$('#papas').val()* 1;
  var c=$('#cana').val() * 1;
  var t=$('#tomate').val() * 1;



  var url = "http://localhost:8000/"+p+"/"+c+"/"+t;



 $.get(url, function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
   });

});


});


//Aqui esta la hormiga reina.
var client = new Eureca.Client();
var server;



client.exports.recibirPedido = function (pedido)    {
  alert("LLego un pedido"+ "Papas: " +pedido.kPapas + " "+ "Cannbis: " +pedido.kCannabis+" "+ "Tomate: " +pedido.kTomate+" "+"Nro de Hormigas: "+pedido.llegaron);
}


client.ready(function (proxy) {
 server = proxy;
 server.holaReina();
});
