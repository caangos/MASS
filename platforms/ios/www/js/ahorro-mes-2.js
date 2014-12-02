$(document).ready(function() {
	$.ajaxSetup({
		cache : false
	});

	/* Change Display For Retail Price and Todays Price. */
	$('input[name=ahorro]').keyup(function() {
		var value = $(this).attr("value");

		var meses2 = $("input[name=meses2]").val();

		var ea2 = $("input[name=ea2]").val();

		var ea3 = $("input[name=ea3]").val();

		var ahorroo = $("input[name=ahorro]").val();

		var ahorro = parseInt(ahorroo.replace(/[^0-9-.]/g, ''));
		
		var anos= parseFloat(meses2/12);

		var meses = parseInt(anos * 12);

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

		var resultado = '';

		while (granTotal.length > 3) {

			resultado = ',' + granTotal.substr(granTotal.length - 3) + resultado;

			granTotal = granTotal.substring(0, granTotal.length - 3);

		}

		resultado = granTotal + resultado;

		/* output */

		$(".segunda").replaceWith('<div class="segunda">' + "$" + resultado + '</div>');
		$(".segunda").formatCurrency();

	});

});

$(document).ready(function() {

	$('input[name=ahorro]').keyup(function(event) {

		// format number
		$(this).val(function(index, value) {
			return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		});
		                this.value = "$" + this.value;

	});

}); 