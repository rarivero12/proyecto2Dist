jQuery(document).ready(function(){

	// Menu de seleccion


	//Numero de seleccion para ver si es multiplicacion sola o de n digitos
    var n=0;
	$('#panel2').css('display', 'none');

	var cont_correcto = 0;
	var cont_incorrecto = 0;

	$('#seleccion1').click(function(){
		$('#prueba').css('background-color','#d4e2ed');
		$('#panel1').css('display', 'block');
		$('#panel2').css('display', 'none');
		cont_correcto = 0;
		cont_incorrecto = 0;
		$('#contador_correcto').text(cont_incorrecto);
		$('#contador_incorrecto').text(cont_incorrecto);

		inicializarTabla();
	});



	$('#seleccion_2_Digitos').click(function(){
		$('#prueba').css('background-color','black');
		$('#panel1').css('display', 'none');
		$('#panel2').css('display', 'block');

		$('#titulo_2D').css('display', 'block');
		$('#titulo_3D').css('display', 'none');
		$('#titulo_4D').css('display', 'none');

		$('#Multi_2digitos').css('display', 'block');
		$('#Multi_3digitos').css('display', 'none');
		$('#Multi_4digitos').css('display', 'none');

		n=2;
		inicializarTabla_2D(n);  //Inicializo tabla 2D con n=3 que es multiplicacion de 2 digitos por dos digitos
	});
	$('#seleccion_3_Digitos').click(function(){
		$('#prueba').css('background-color','black');
		$('#panel1').css('display', 'none');
		$('#panel2').css('display', 'block');

		$('#titulo_2D').css('display', 'none');
		$('#titulo_3D').css('display', 'block');
		$('#titulo_4D').css('display', 'none');

		$('#Multi_2digitos').css('display', 'none');
		$('#Multi_3digitos').css('display', 'block');
		$('#Multi_4digitos').css('display', 'none');

		n=3;
		inicializarTabla_2D(n);
	});
	$('#seleccion_4_Digitos').click(function(){
		$('#prueba').css('background-color','black');
		$('#panel1').css('display', 'none');
		$('#panel2').css('display', 'block');
		
		$('#titulo_2D').css('display', 'none');
		$('#titulo_3D').css('display', 'none');
		$('#titulo_4D').css('display', 'block');

		$('#Multi_2digitos').css('display', 'none');
		$('#Multi_3digitos').css('display', 'none');
		$('#Multi_4digitos').css('display', 'block');

		n=4;
		inicializarTabla_2D(n);
	});




  // Seleccion de Tablas de Multiplicar

	inicializarTabla();

	$('#quitarRespuestas').css('display', 'none');
$('#boton_verResultados').click(function(){
	$('#quitarRespuestas').css('display', 'block');
	$('#boton_verResultados').css('display', 'none');
	    var num1 = $('#numero1').text() * 1;
		resultadosTabla(num1);
});

$('#quitarRespuestas').click(function(){
		$('#quitarRespuestas').css('display', 'none');
	$('#boton_verResultados').css('display', 'block');
	    inicializarTabla2();
	    for (var i = 1; i <= 10; i++) {
		  	$('#respuesta'+i).val('');
		
		};
});

	$('#respuesta1').bind('change keydown keyup',function(){
        var num1 = $('#numero1').text() * 1;
        var num2 = 1 * 1;
		var i = 1;
        var resultado = multiplicarTabla(num1, num2, i);
        if (this.value != '') {

	        if (resultado == this.value) {
	        	$('#imagenOK_1').css('display', 'block');
				$('#imagenMAL_1').css('display', 'none');
			//	$('#correcto1').css('display', 'block');
	        }else{
	        	$('#imagenOK_1').css('display', 'none');
				$('#imagenMAL_1').css('display', 'block');
			//	$('#correcto1').css('display', 'block');
	        }
        }else{

	        	$('#imagenOK_1').css('display', 'none');
				$('#imagenMAL_1').css('display', 'none');
			//	$('#correcto1').css('display', 'none');
        }
    });

	$('#respuesta2').bind('change keydown keyup',function(){
		var i = 2;
		console.log('Entro '+i);
        var num1 = $('#numero1').text() * 1;
        var num2 = i * 1;
        var resultado = multiplicarTabla(num1, num2, i); 
        if (this.value != '') {
	        if (resultado == this.value) {
	        	$('#imagenOK_'+i).css('display', 'block');
				$('#imagenMAL_'+i).css('display', 'none');
			//	$('#correcto'+i).css('display', 'block');
	        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'block');
				//$('#correcto'+i).css('display', 'block');
	        }
        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'none');
			//	$('#correcto'+i).css('display', 'none');
        }
    });

	$('#respuesta3').bind('change keydown keyup',function(){
		var i = 3;
		console.log('Entro '+i);
        var num1 = $('#numero1').text() * 1;
        var num2 = i * 1;
        var resultado = multiplicarTabla(num1, num2, i); 
        if (this.value != '') {
	        if (resultado == this.value) {
	        	$('#imagenOK_'+i).css('display', 'block');
				$('#imagenMAL_'+i).css('display', 'none');
				//$('#correcto'+i).css('display', 'block');
	        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'block');
			//	$('#correcto'+i).css('display', 'block');
	        }
        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'none');
			//	$('#correcto'+i).css('display', 'none');
        }
    });

	$('#respuesta4').bind('change keydown keyup',function(){
		var i = 4;
		console.log('Entro '+i);
        var num1 = $('#numero1').text() * 1;
        var num2 = i * 1;
        var resultado = multiplicarTabla(num1, num2, i); 
        if (this.value != '') {
	        if (resultado == this.value) {
	        	$('#imagenOK_'+i).css('display', 'block');
				$('#imagenMAL_'+i).css('display', 'none');
			//	$('#correcto'+i).css('display', 'block');
	        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'block');
				//$('#correcto'+i).css('display', 'block');
	        }
        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'none');
			//	$('#correcto'+i).css('display', 'none');
        }
    });

	$('#respuesta5').bind('change keydown keyup',function(){
		var i = 5;
		console.log('Entro '+i);
        var num1 = $('#numero1').text() * 1;
        var num2 = i * 1;
        var resultado = multiplicarTabla(num1, num2, i); 
        if (this.value != '') {
	        if (resultado == this.value) {
	        	$('#imagenOK_'+i).css('display', 'block');
				$('#imagenMAL_'+i).css('display', 'none');
				//$('#correcto'+i).css('display', 'block');
	        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'block');
				//$('#correcto'+i).css('display', 'block');
	        }
        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'none');
			//	$('#correcto'+i).css('display', 'none');
        }
    });

	$('#respuesta6').bind('change keydown keyup',function(){
		var i = 6;
		console.log('Entro '+i);
        var num1 = $('#numero1').text() * 1;
        var num2 = i * 1;
        var resultado = multiplicarTabla(num1, num2, i); 
        if (this.value != '') {
	        if (resultado == this.value) {
	        	$('#imagenOK_'+i).css('display', 'block');
				$('#imagenMAL_'+i).css('display', 'none');
				//$('#correcto'+i).css('display', 'block');
	        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'block');
			//	$('#correcto'+i).css('display', 'block');
	        }
        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'none');
			//	$('#correcto'+i).css('display', 'none');
        }
    });

	$('#respuesta7').bind('change keydown keyup',function(){
		var i = 7;
		console.log('Entro '+i);
        var num1 = $('#numero1').text() * 1;
        var num2 = i * 1;
        var resultado = multiplicarTabla(num1, num2, i); 
        if (this.value != '') {
	        if (resultado == this.value) {
	        	$('#imagenOK_'+i).css('display', 'block');
				$('#imagenMAL_'+i).css('display', 'none');
				//$('#correcto'+i).css('display', 'block');
	        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'block');
				//$('#correcto'+i).css('display', 'block');
	        }
        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'none');
			//	$('#correcto'+i).css('display', 'none');
        }
    });

	$('#respuesta8').bind('change keydown keyup',function(){
		var i = 8;
		console.log('Entro '+i);
        var num1 = $('#numero1').text() * 1;
        var num2 = i * 1;
        var resultado = multiplicarTabla(num1, num2, i); 
        if (this.value != '') {
	        if (resultado == this.value) {
	        	$('#imagenOK_'+i).css('display', 'block');
				$('#imagenMAL_'+i).css('display', 'none');
			//	$('#correcto'+i).css('display', 'block');
	        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'block');
			//	$('#correcto'+i).css('display', 'block');
	        }
        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'none');
				//$('#correcto'+i).css('display', 'none');
        }
    });

	$('#respuesta9').bind('change keydown keyup',function(){
		var i = 9;
		console.log('Entro '+i);
        var num1 = $('#numero1').text() * 1;
        var num2 = i * 1;
        var resultado = multiplicarTabla(num1, num2, i); 
        if (this.value != '') {
	        if (resultado == this.value) {
	        	$('#imagenOK_'+i).css('display', 'block');
				$('#imagenMAL_'+i).css('display', 'none');
			//	$('#correcto'+i).css('display', 'block');
	        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'block');
			//	$('#correcto'+i).css('display', 'block');
	        }
        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'none');
			//	$('#correcto'+i).css('display', 'none');
        }
    });

	$('#respuesta10').bind('change keydown keyup',function(){
		var i = 10;
		console.log('Entro '+i);
        var num1 = $('#numero1').text() * 1;
        var num2 = i * 1;
        var resultado = multiplicarTabla(num1, num2, i); 
        if (this.value != '') {
	        if (resultado == this.value) {
	        	$('#imagenOK_'+i).css('display', 'block');
				$('#imagenMAL_'+i).css('display', 'none');
			//	$('#correcto'+i).css('display', 'block');
	        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'block');
			//	$('#correcto'+i).css('display', 'block');
	        }
        }else{
	        	$('#imagenOK_'+i).css('display', 'none');
				$('#imagenMAL_'+i).css('display', 'none');
			//	$('#correcto'+i).css('display', 'none');
        }
    });

    $('#seleccion_tabla_1').click(function(){
		for (var i = 1; i <= 10; i++) {
			$('#numero'+i).text('1');
		};
		inicializarTabla();
	});

    $('#seleccion_tabla_2').click(function(){
		for (var i = 1; i <= 10; i++) {
			$('#numero'+i).text('2');
		};
		inicializarTabla();
	});

    $('#seleccion_tabla_3').click(function(){
		for (var i = 1; i <= 10; i++) {
			$('#numero'+i).text('3');
		};
		inicializarTabla();
	});

    $('#seleccion_tabla_4').click(function(){
		for (var i = 1; i <= 10; i++) {
			$('#numero'+i).text('4');
		};
		inicializarTabla();
	});

    $('#seleccion_tabla_5').click(function(){
		for (var i = 1; i <= 10; i++) {
			$('#numero'+i).text('5');
		};
		inicializarTabla();
	});

    $('#seleccion_tabla_6').click(function(){
		for (var i = 1; i <= 10; i++) {
			$('#numero'+i).text('6');
		};
		inicializarTabla();
	});

    $('#seleccion_tabla_7').click(function(){
		for (var i = 1; i <= 10; i++) {
			$('#numero'+i).text('7');
		};
		inicializarTabla();
	});

    $('#seleccion_tabla_8').click(function(){
		for (var i = 1; i <= 10; i++) {
			$('#numero'+i).text('8');
		};
		inicializarTabla();
	});

    $('#seleccion_tabla_9').click(function(){
		for (var i = 1; i <= 10; i++) {
			$('#numero'+i).text('9');
		};
		inicializarTabla();
	});

    $('#seleccion_tabla_10').click(function(){
		for (var i = 1; i <= 10; i++) {
			$('#numero'+i).text('10');
		};
		inicializarTabla();
	});

  // FIN Seleccion de Tablas de Multiplicar


  // Multiplicacion de Numeros de 2 Digitos


	$('#boton_ocultarResultado_2D').css('display', 'none');
	$('#mensaje_correcto').css('display', 'none');
	$('#mensaje_incorrecto').css('display', 'none');

	$('#respuesta2D').bind('change keydown keyup',function(){
		if (this.value == '') {
			$('#mensaje_blanco').css('display', 'block');
			$('#mensaje_correcto').css('display', 'none');
			$('#mensaje_incorrecto').css('display', 'none');
		}

    });

    $('#boton_verificar_2D').click(function(){
		//$('#boton_verificar_2D').css('display', 'none');

		// Llenar el Num1
		var Snum1 = '';
		for (var i = 0; i < n; i++) {
			Snum1 = Snum1 + $('#Num1'+'_'+n+'D_'+i).val();
		}

		// Llenar el Num2
		var Snum2 = '';
		for (var i = 0; i < n; i++) {
			Snum2 = Snum2 + $('#Num2'+'_'+n+'D_'+i).val();
		}

		// Llenar Respuesta
       	var Srespuesta = '';
		for (var i = 0; i < n*2; i++) {
			Srespuesta = Srespuesta + $('#Respuesta_'+n+'D_'+i).val();
		}

		var num1 = Number(Snum1);
		var num2 = Number(Snum2);
		var respuesta = Number(Srespuesta);
        var resultado = num1 * num2; 

        console.log('num1 '+num1)
        console.log('num2 '+num2)
        console.log('resultado '+resultado)
        console.log('respuesta '+respuesta)

        if (respuesta == resultado) {
        	cont_correcto++;
			$('#mensaje_blanco').css('display', 'none');
			$('#mensaje_correcto').css('display', 'block');
			$('#mensaje_incorrecto').css('display', 'none');
			$('#contador_correcto').text(cont_correcto);

        }else{
        	cont_incorrecto++;
			$('#mensaje_blanco').css('display', 'none');
			$('#mensaje_correcto').css('display', 'none');
			$('#mensaje_incorrecto').css('display', 'block');
			$('#contador_incorrecto').text(cont_incorrecto);
        }

	});

    $('#boton_siguiente_2D').click(function(){
		inicializarTabla_2D(n);
	
	});

    $('#boton_verResultado_2D').click(function(){
		$('#correcto_2D').css('display', 'block');
		$('#boton_verResultado_2D').css('display', 'none');
		$('#boton_ocultarResultado_2D').css('display', 'block');
	});

    $('#boton_ocultarResultado_2D').click(function(){
		$('#correcto_2D').css('display', 'none');
		$('#boton_verResultado_2D').css('display', 'block');
		$('#boton_ocultarResultado_2D').css('display', 'none');
	});



  // FIN Multiplicacion de Numeros de 2 Digitos


});	

function inicializarTabla(){
	$('#boton_verResultados').css('display', 'block');
    $('#quitarRespuestas').css('display', 'none');
	for (var i = 1; i <= 10; i++) {
		$('#correcto'+i).css('display', 'none');
		$('#imagenOK_'+i).css('display', 'none');
		$('#imagenMAL_'+i).css('display', 'none');
		$('#respuesta'+i).val('');

	};
}
function inicializarTabla2(){
	for (var i = 1; i <= 10; i++) {
		$('#correcto'+i).css('display', 'none');
		$('#imagenOK_'+i).css('display', 'none');
		$('#imagenMAL_'+i).css('display', 'none');
	

	};
}

function resultadosTabla(n){
	for (var i = 1; i <= 10; i++) {
        resultado= n*i;
	  	$('#correcto'+i).text(resultado);
		$('#correcto'+i).css('display', 'block');
	
	};
}


function inicializarTabla_2D(n){


   if(n==2){	// MULTIPICACION DE 2 DIGITOS

   	 num1 = aleatorio(10,99);
     num2 = aleatorio(10,99);
   }
      if(n==3){
  
     num1 = aleatorio(100,999);
     num2 = aleatorio(100,999);
   }
      if(n==4){

     num1 = aleatorio(1000,9999);
     num2 = aleatorio(1000,9999);
   }

	resultado =num1 * num2;
	var Snum1 = num1.toString(); 
	var Snum2 = num2.toString();
	var numero1_str = [];
	var numero2_str = [];

	for (var i = 0, len = Snum1.length; i < len; i += 1) {
	    numero1_str.push(+Snum1.charAt(i));
	}
	for (var i = 0, len = Snum2.length; i < len; i += 1) {
	    numero2_str.push(+Snum2.charAt(i));
	}

	// Llenar el Num1
	for (var i = 0; i < n; i++) {
		$('#Num1'+'_'+n+'D_'+i).val(numero1_str[i]);
	}
	// Llenar el Num2
	for (var i = 0; i < n; i++) {
		$('#Num2'+'_'+n+'D_'+i).val(numero2_str[i]);
	}


		$('#numero_2D_1').text(num1);
		$('#numero_2D_2').text(num2);
		$('#imagenOK_2D').css('display', 'none');
		$('#imagenMAL_2D').css('display', 'none');
		$('#correcto_2D').text(resultado);
		$('#correcto_2D').css('display', 'none');
		$('#respuesta2D').val('');
		$('#boton_verResultado_2D').css('display', 'block');
		$('#boton_ocultarResultado_2D').css('display', 'none');

			$('#mensaje_blanco').css('display', 'block');
		$('#mensaje_correcto').css('display', 'none');
		$('#mensaje_incorrecto').css('display', 'none');

}

function aleatorio(inferior,superior){ 
       var resAleatorio = Math.floor((Math.random() * (superior - inferior + 1)) + inferior);
      return resAleatorio;
}

function  multiplicarTabla(num1, num2, i)
{
    resultado = num1 * num2;
    $('#correcto'+i).text(resultado);
	return resultado;

}



function justNumbers(e)
{
var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) )
        console.log("Num");
    else   
        return /\d/.test(String.fromCharCode(keynum));
}