$(document).ready(function() {
	$.ajaxSetup({
		cache : false
	});

	/* Change Display For Retail Price and Todays Price. */
	$('input[name=datepicker]').change(function() {

		var meses = parseInt($("input[name=meses]").val());
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
