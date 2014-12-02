		<!-- **********************  Script Calculo Perfil de Riesgo **********************  -->

			$(document).ready(function() {
				var pr1, pr2, pr3, pr4, pr5, resultado;

				$("input[name=radio-choice-1]").change(function() {

					if ($.mobile.activePage.attr("id") == "pg5") {
						pr1 = $('input[name=radio-choice-1]:checked', '#pg5').val();
						$.mobile.changePage("#pg6");
					}
					$("input[name=radio-choice-2]").change(function() {

						if ($.mobile.activePage.attr("id") == "pg6") {
							pr2 = $('input[name=radio-choice-2]:checked', '#pg6').val();
							$.mobile.changePage("#pg7");
						}
						$("input[name=radio-choice-3]").change(function() {

							if ($.mobile.activePage.attr("id") == "pg7") {
								pr3 = $('input[name=radio-choice-3]:checked', '#pg7').val();
								$.mobile.changePage("#pg8");
							}
							$("input[name=radio-choice-4]").change(function() {

								if ($.mobile.activePage.attr("id") == "pg8") {
									pr4 = $('input[name=radio-choice-4]:checked', '#pg8').val();

									$.mobile.changePage("#pg9");
								}

								$("input[name=radio-choice-5]").change(function() {

									if ($.mobile.activePage.attr("id") == "pg9") {

										pr5 = $('input[name=radio-choice-5]:checked', '#pg9').val();

										resultado = parseFloat(pr1) + parseFloat(pr2) + parseFloat(pr3) + parseFloat(pr4) + parseFloat(pr5);

										if (resultado >= 20 && resultado <= 46) {
											$.mobile.changePage("#pg10");

										} else if (resultado >= 47 && resultado <= 74) {
											$.mobile.changePage("#pg13a");

										} else if (resultado >= 75) {
											$.mobile.changePage("#pg14");

										}
									}

								});

							});

						});

					});

				});

			});

		<!-- **********************  Fin Script Calculo Perfil de Riesgo **********************  -->
