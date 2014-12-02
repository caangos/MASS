function tabla2() {

	/* numbers only */

	var meses5 = $("input[name=meses2]").val();

	var ea2 = $("input[name=ea2]").val();

	var ea3 = $("input[name=ea3]").val();

	var ahorroo = $("input[name=ahorro]").val();
	
	var ahorro = parseInt(ahorroo.replace(/[^0-9-.]/g, ''));
	
	var anos = parseFloat(meses5/12);
	
	var meses =  $("input[name=meses2]").val();

	var potencia3 = parseFloat(1 / 12);
	
	var porcentaje2 = parseFloat(ea2 / 100);

	var porcentaje3 = parseFloat(ea3 / 100);

	var ea2Mes = (parseFloat(Math.pow(1 + parseFloat(porcentaje2), potencia3) - 1));

	var ea3Mes = (parseFloat(Math.pow(1 + parseFloat(porcentaje3), potencia3) - 1));

	var potencia1 = parseFloat(Math.pow(1 + ea2Mes, 12));

	var potencia2 = parseFloat(Math.pow(1 + ea3Mes), 12);

	var potencia4 = parseFloat(Math.pow(1 + (ea2 / 100), anos));

	var potencia6 = parseFloat(Math.pow(1 + (ea3 / 100), anos));

	var total = '';
	var granTotal = '';
	var totalFinal = '';

	total = (parseFloat((ahorro / (Math.pow(((1 - (1 - ea2Mes)) / ea2Mes), (-anos)))))).toFixed(0);
	totalFinal = (parseFloat(total * ((potencia1 - 1) / ea2Mes))).toFixed(0);
	granTotal = (parseFloat(totalFinal * ((potencia4 - potencia6) / ((ea2 / 100) - (ea3 / 100))))).toFixed(0);
	granTotalFinal=0;

	var resultadoFinal = '';
	var proyeccion2 = Array(meses + 1);
	proyeccion2.join('');
	var acumulado = 1;
	var contador = 1;
	var mes = $('input[name=datepicker2]').datepicker('getDate').getMonth()+1; 
	var year = $('input[name=datepicker2]').datepicker('getDate').getYear()+ 1900; 
	var mesReal;

	proyeccion2[0] = '<tr class="head_table"> <td align="center"><b>Nº</b></td> <td align="center"><b>MES</b></td> <td align="center"><b>CUOTA MES</b></td> </tr>';

	for ( i = 1; i <= meses5; i++) {
	
	
		if(mes == 1){
			 
			mesReal="Enero";
			
		}
		
		else if(mes == 2){
			
			mesReal="Febrero";
			
		}
		
		else if(mes == 3){
			
			mesReal="Marzo";
			
		}
		else if(mes == 4){
			
			mesReal="Abril";
			
		}
		else if(mes == 5){
			
			mesReal="Mayo";
			
		}
		else if(mes == 6){
			
			mesReal="Junio";
			
		}
		else if(mes == 7){
			
			mesReal="Julio";
			
		}
		else if(mes == 8){
			
			mesReal="Agosto";
			
		}
		else if(mes == 9){
			
			mesReal="Septiembre";
			
		}
		else if(mes == 10){
			
			mesReal="Octubre";
			
		}
		else if(mes == 11){
			
			mesReal="Noviembre";
			
		}
		else if(mes == 12){
			
			mesReal="Diciembre";
			mes=0;
		}																					
		
		if( acumulado == 1  ){

			totalFinal = (parseFloat(((Math.pow(1 + (ea3 / 100), (contador - 1))) * ahorro) * ((potencia1 - 1) / ea2Mes))).toFixed(0);
			resultadoFinal = (parseFloat(-totalFinal / ((1 - Math.pow(1 + (parseFloat(ea2Mes)), 12)) / (parseFloat(ea2Mes))))).toFixed(0);
			contador++;
		}
		
		
		else if(acumulado == 12 ){
			
			
			acumulado = 0;
		}
		
		granTotalFinal = resultadoFinal;
		
		
		var resultado = '';
		var resultado2 = '';
		var tabla2 = '';

		while (totalFinal.length > 3) {

			resultado = ',' + totalFinal.substr(totalFinal.length - 3) + resultado;

			totalFinal = totalFinal.substring(0, totalFinal.length - 3);

		}

		resultado = totalFinal + resultado;

		while (granTotalFinal.length > 3) {

			resultado2 = ',' + granTotalFinal.substr(granTotalFinal.length - 3) + resultado2;

			granTotalFinal = granTotalFinal.substring(0, granTotalFinal.length - 3);

		}

		resultado2 = granTotalFinal + resultado2;

		tabla2 = '<tr > <td  align="center">' + i + '</td> <td align="center">' + mesReal + "-" + year + '</td> <td align="center">' + '$' + resultado2 + '</td></tr>';

		proyeccion2[i] = tabla2;
		acumulado++;
		mes++;
		
		if (mesReal == "Diciembre"){
			
			year++;
			
		}		

	}

	document.getElementById('tabla2').innerHTML = proyeccion2.join(" ");

}

