$(document).ready(function() {
	$.ajaxSetup({
		cache : false
	});

	/* Change Display For Retail Price and Todays Price. */
	$('input[name=ea]').keyup(function() {
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

		$(".sumar").replaceWith('<div class="sumar">' + granTotal + "%" + '</div>');
		$(".sumar").formatCurrency();

	});

});


