$(document).ready(function() {
	$.ajaxSetup({
		cache : false
	});

	/* Change Display For Retail Price and Todays Price. */
	$('input[name=incremento]').keyup(function() {
		var value = $(this).attr("value");

		while (value.substring(0, 1) === '0' || value.length > 8) {/* no leading zero, max 3 chars */
			value = value.substring(1);
			/* return to nothing */
		}

		value = value.replace(/[^0-9\.]/, '');
		/* numbers only */
		$(this).val(value);

		var meses3 = $("input[name=meses]").val();

		var ea = $("input[name=ea]").val();

		var vff = $("input[name=vf]").val();

		var vf = parseInt(vff.replace(/[^0-9-.]/g, ''));
		
		var anos = parseFloat(meses3/12);

		var meses = parseInt(anos * 12);

		var potencia3 = parseFloat(1 / 12);
		/* Años */
		var porcentaje = parseFloat(ea / 100);

		var eaMes = (parseFloat(Math.pow(1 + parseFloat(porcentaje), potencia3) - 1));

		var potencia1 = parseFloat(Math.pow(1 + (ea / 100), anos));
		/* Años */

		var potencia2 = parseFloat(Math.pow(1 + (parseFloat(value) / 100), anos));
		/* Años */

		var total = '';
		var granTotal = '';
		var totalFinal = '';

		total = parseFloat(vf / ((potencia1 - potencia2) / ((ea / 100) - (parseFloat(value) / 100))));
		totalFinal = parseFloat(total);
		granTotal = (parseFloat(-totalFinal / ((1 - Math.pow(1 + (parseFloat(eaMes)), meses / anos)) / (parseFloat(eaMes))))).toFixed(0);

		var resultado = '';

		while (granTotal.length > 3) {

			resultado = ',' + granTotal.substr(granTotal.length - 3) + resultado;

			granTotal = granTotal.substring(0, granTotal.length - 3);

		}

		resultado = granTotal + resultado;

		/* output */

		$(".primera").replaceWith('<div class="primera">' + "$" + resultado + '</div>');
		$(".primera").formatCurrency();

	});

});
/* Do Not Remove */