$(document).ready(function() {
	$.ajaxSetup({
		cache : false
	});

	/* Change Display For Retail Price and Todays Price. */
	$('input[name=meses2]').keyup(function() {
		var value = $(this).attr("value");

		while (value.substring(0, 1) === '0' || value.length > 10) {/* no leading zero, max 3 chars */
			value = value.substring(1);
			/* return to nothing */
		}

		value = value.replace(/[^0-9\.]/g, '');
		/* numbers only */
		value = value.replace(/\./g, '');
		/* no periods */
		$(this).val(value);

		var anos = '12';
		/* Años */

		var total = '';
		total = parseInt(value) * anos;




	});

});

$(document).ready(function() {
	$.ajaxSetup({
		cache : false
	});

	/* Change Display For Retail Price and Todays Price. */
	$('input[name=datepicker2]').change(function() {

		var meses = parseInt($("input[name=meses2]").val());
		var anos= 0;
		var dia = $(this).datepicker('getDate').getDate();
		var mes = $(this).datepicker('getDate').getMonth() + 1;
		var ano = 0;
		var mesFinal = 0;
		
	   	

		
		while (mes > 0){
			
			mesFinal = mes + meses;
			
			while (mesFinal > 12) {
				
				anos++;
				mesFinal = mesFinal - 12;
				
				
			}
			
			mes=0;
			
			
			
		}
		
		if (mesFinal < 10) {

			mesFinal = '0' + mesFinal;

		}	
		
		if (dia < 10) {

			dia = '0' + dia;

		}	
					
		ano = $(this).datepicker('getDate').getYear() + 1900 + anos;

		
		if ($("input[name=datepicker]").val() != ' ') {
			$(".fecha").replaceWith('<div class="fecha">' + dia + '/' + mesFinal + '/' + ano + '</div>');
			$(".fecha").formatCurrency();

		}

		$('#ea').focus();

	});

});

$(document).ready(function() {
	$.ajaxSetup({
		cache : false
	});

	/* Change Display For Retail Price and Todays Price. */
	$('input[name=ea2]').keyup(function() {
		var value = $(this).attr("value");

		while (value.substring(0, 1) === '0' || value.length > 8) {/* no leading zero, max 3 chars */
			value = value.substring(1);
			/* return to nothing */
		}
		


		value = value.replace(/[^0-9\.]/, '');
		/* numbers only */
		$(this).val(value);
		

		var potencia = parseFloat(1 / 12);
		/* Años */
		var porcentaje = parseFloat(value / 100);
		/* Años */

		var total = '';
		var granTotal = '';

		total = parseFloat(Math.pow(1 + parseFloat(porcentaje), potencia) - 1);
		granTotal = (parseFloat(total * 100)).toFixed(2);

		/* output */

		$(".sumar2").replaceWith('<div class="sumar2">' + granTotal + "%" + '</div>');
		$(".sumar2").formatCurrency();

	});

});

$(document).ready(function() {
	$.ajaxSetup({
		cache : false
	});

	/* Change Display For Retail Price and Todays Price. */
	$('input[name=ea3]').keyup(function() {
		var value = $(this).attr("value");

		while (value.substring(0, 1) === '0' || value.length > 8) {/* no leading zero, max 3 chars */
			value = value.substring(1);
			/* return to nothing */
		}

		value = value.replace(/[^0-9\.]/, '');
		/* numbers only */
		$(this).val(value);

		var potencia2 = parseFloat(1 / 12);
		/* Años */
		var porcentaje2 = parseFloat(value / 100);
		/* Años */

		var total2 = '';
		var granTotal2 = '';

		total2 = parseFloat(Math.pow(1 + parseFloat(porcentaje2), potencia2) - 1);
		granTotal2 = (parseFloat(total2 * 100)).toFixed(2);

		/* output */

		$(".sumar3").replaceWith('<div class="sumar3">' + granTotal2 + "%" + '</div>');
		$(".sumar3").formatCurrency();

	});

}); 