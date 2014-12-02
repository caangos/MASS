function tabla() {

	/* numbers only */

	var meses4 = $("input[name=meses]").val();

	var ea = $("input[name=ea]").val();

	var vff = $("input[name=vf]").val();
	
	var vf = parseInt(vff.replace(/[^0-9-.]/g, ''));

	var incr = $("input[name=incremento]").val();
	
	var anos = parseFloat(meses4/12);

	var tabla = '';

	var meses = $("input[name=meses]").val();

	var potencia3 = parseFloat(1 / 12);
	/* Años */
	var porcentaje = parseFloat(ea / 100);

	var eaMes = (parseFloat(Math.pow(1 + parseFloat(porcentaje), potencia3) - 1));

	var potencia1 = parseFloat(Math.pow(1 + (ea / 100), anos));
	/* Años */

	var potencia2 = parseFloat(Math.pow(1 + (parseFloat(incr) / 100), anos));
	/* Años */

	var total = '';
	var granTotal = '';
	var totalFinal = '';

	total = parseFloat(vf / ((potencia1 - potencia2) / ((ea / 100) - (parseFloat(incr) / 100))));
	totalFinal = parseFloat(total);
	granTotal = (parseFloat(-totalFinal / ((1 - Math.pow(1 + (parseFloat(eaMes)), meses / anos)) / (parseFloat(eaMes))))).toFixed(0);
	granTotalFinal=0;
		
	var resultadoFinal = total;
	var proyeccion = Array(meses + 1);
	var acumulado = 1;
	var contador = 1;
	var mes = $('input[name=datepicker]').datepicker('getDate').getMonth()+1; 
	var year = $('input[name=datepicker]').datepicker('getDate').getYear()+ 1900; 
	var mesReal;
	
	proyeccion.join('');

	proyeccion[0] = '<tr class="head_table"> <td align="center"> <b> Nº</b></td> <td align="center"><b>MES</b></td> <td align="center"><b>CUOTA MES</b></td> </tr>';

	for ( i = 1; i <= meses4; i++) {
		
		
		if(mes==1){
			
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
			
			resultadoFinal = (parseFloat(total * Math.pow(1 + (incr / 100), contador - 1))).toFixed(0);

			granTotal = (parseFloat(-resultadoFinal / ((1 - Math.pow(1 + (parseFloat(eaMes)), 12)) / (parseFloat(eaMes))))).toFixed(0);
			
			contador++;
	
		}
		else if(acumulado == 12 ){
			
			
			acumulado = 0;
		}
		
		granTotalFinal = granTotal;
		
		var resultado = '';
		var resultado2 = '';

		while (granTotalFinal.length > 3) {

			resultado = ',' + granTotalFinal.substr(granTotalFinal.length - 3) + resultado;

			granTotalFinal = granTotalFinal.substring(0, granTotalFinal.length - 3);

		}

		resultado = granTotalFinal + resultado;

		while (resultadoFinal.length > 3) {

			resultado2 = ',' + resultadoFinal.substr(resultadoFinal.length - 3) + resultado2;

			resultadoFinal = resultadoFinal.substring(0, resultadoFinal.length - 3);

		}

		resultado2 = resultadoFinal + resultado2;

		tabla = '<tr > <td  align="center">' + i + '</td> <td align="center">' + mesReal + "-" + year +'</td> <td align="center">' +'$'+ resultado + '</td></tr>';

		proyeccion[i] = tabla;
		acumulado++;
		mes++;
		
		if (mesReal == "Diciembre"){
			
			year++;
			
		}
		
	}

	document.getElementById('tabla').innerHTML = proyeccion.join(" ");
}


$(document).ready(function() {

$('input[name=vf]'  ).keyup(function(event) {
      

    // format number
    $(this).val(function(index, value) {
        return value
            .replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        ;
        
    });
            this.value = "$" + this.value;

});



});


$(document).ready(function() {

$('input[name=ahorro]'  ).keyup(function(event) {
      

    // format number
    $(this).val(function(index, value) {
        return value
            .replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        ;
    });
		                this.value = "$" + this.value;

});



});

