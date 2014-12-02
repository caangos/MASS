		<!-- **********************  Script Calculo Perfil de Riesgo **********************  -->

			$(document).ready(function() {
				var pr6, pr7, pr8, pr9, pr10, resultado1;

				$("input[name=radio-choice-6]").change(function() {

					if ($.mobile.activePage.attr("id") == "pg26") {
						pr6 = $('input[name=radio-choice-6]:checked', '#pg26').val();
						$.mobile.changePage("#pg27");
					}
					$("input[name=radio-choice-7]").change(function() {

						if ($.mobile.activePage.attr("id") == "pg27") {
							pr7 = $('input[name=radio-choice-7]:checked', '#pg27').val();
							$.mobile.changePage("#pg28");
						}
						$("input[name=radio-choice-8]").change(function() {

							if ($.mobile.activePage.attr("id") == "pg28") {
								pr8 = $('input[name=radio-choice-8]:checked', '#pg28').val();
								$.mobile.changePage("#pg29");
							}
							$("input[name=radio-choice-9]").change(function() {

								if ($.mobile.activePage.attr("id") == "pg29") {
									pr9 = $('input[name=radio-choice-9]:checked', '#pg29').val();

									$.mobile.changePage("#pg30");
								}

								$("input[name=radio-choice-10]").change(function() {

									if ($.mobile.activePage.attr("id") == "pg30") {

										pr10 = $('input[name=radio-choice-10]:checked', '#pg30').val();
										

										resultado1 = parseInt(pr6) + parseInt(pr7) + parseInt(pr8) + parseInt(pr9) + parseInt(pr10);
										

										if (resultado1 >= 20 && resultado1 <= 46) {
											$.mobile.changePage("#pg10");

										} else if (resultado1 >= 47 && resultado1 <= 74) {
											$.mobile.changePage("#pg13a");

										} else if (resultado1 >= 75) {
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
