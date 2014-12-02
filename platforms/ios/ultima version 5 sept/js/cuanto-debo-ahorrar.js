
$(document).ready(function(){
 $.ajaxSetup( {cache:false} );
	
/* Change Display For Retail Price and Todays Price. */
$('input[name=meses]').keyup( function() {
	var value = $(this).attr("value");
	
	while ( value.substring(0, 1) === '0' || value.length > 2 ) { 	/* no leading zero, max 3 chars */
        value = value.substring(1);									/* return to nothing */
    }
	
	value = value.replace(/[^0-9\.]/g,'');							/* numbers only */
	value = value.replace(/\./g,'');								/* no periods */
	$(this).val(value);
	
	var anos = '12'; 	/* Años */
	

	var total = '';
	total = parseInt(value) * anos;
	


	
} );
	
	
	
}); /* Do Not Remove */