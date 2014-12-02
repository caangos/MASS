
$(document).ready(function () {


	
    /* función para cerrar alertas */
    $('.contenedor_alerta a.cerrar').click(function () {
        $(".contenedor_alerta").removeClass('corta');
    });
    
/*Funciona Ver Grafica*/
    $('#ver-grafica').click(function () {
    
            mostrarAlertas("Para una correcta ejecución se deben llenar todos los controles, intentelo de nuevo", 2);
            
        function mostrarAlertas(pDataPrint, pTipo) {
            var cadenaPrint = '';

            if (pTipo === 2) {
                cadenaPrint += '<div class="alert_alta">'+ '<img src="UserSystem/img/graficas/grafica-fidubogota-ceois.png" />' + '</div>';
            }


            //agrego el contenido al div de alerta
            $(".contenedor_alerta .mensaje").html(cadenaPrint);
            //agrego la clase corta a la alerta
            $(".contenedor_alerta").addClass('corta');

        }

});

/*Funciona Ver Grafica 6.1*/
    $('#grafica-admon').click(function () {
    
            mostrarAlertas("Para una correcta ejecución se deben llenar todos los controles, intentelo de nuevo", 2);
            
        function mostrarAlertas(pDataPrint, pTipo) {
            var cadenaPrint = '';

            if (pTipo === 2) {
                cadenaPrint += '<div class="alert_alta-admon">'+ '<img src="UserSystem/img/diagramas/fideicomite.png" />' + '</div>';
            }


            //agrego el contenido al div de alerta
            $(".contenedor_alerta .mensaje").html(cadenaPrint);
            //agrego la clase corta a la alerta
            $(".contenedor_alerta").addClass('corta');

        }

});

/*Funciona Ver Grafica 6.2*/
    $('#grafica-admin-anticipo').click(function () {
    
            mostrarAlertas("Para una correcta ejecución se deben llenar todos los controles, intentelo de nuevo", 2);
            
        function mostrarAlertas(pDataPrint, pTipo) {
            var cadenaPrint = '';

            if (pTipo === 2) {
                cadenaPrint += '<div class="alert_alta-admon">'+ '<img src="UserSystem/img/diagramas/admin-anticipos.png" />' + '</div>';
            }


            //agrego el contenido al div de alerta
            $(".contenedor_alerta .mensaje").html(cadenaPrint);
            //agrego la clase corta a la alerta
            $(".contenedor_alerta").addClass('corta');

        }

});
/*Funciona Ver Grafica 6.3*/
    $('#grafica-fuente-pago').click(function () {
    
            mostrarAlertas("Para una correcta ejecución se deben llenar todos los controles, intentelo de nuevo", 2);
            
        function mostrarAlertas(pDataPrint, pTipo) {
            var cadenaPrint = '';

            if (pTipo === 2) {
                cadenaPrint += '<div class="alert_alta-admon">'+ '<img style="width: 75%;" src="UserSystem/img/diagramas/fuente-de-pago.png" />' + '</div>';
            }


            //agrego el contenido al div de alerta
            $(".contenedor_alerta .mensaje").html(cadenaPrint);
            //agrego la clase corta a la alerta
            $(".contenedor_alerta").addClass('corta');

        }

});
/*Funciona Ver Grafica 6.4*/
    $('#grafica-garantia').click(function () {
    
            mostrarAlertas("Para una correcta ejecución se deben llenar todos los controles, intentelo de nuevo", 2);
            
        function mostrarAlertas(pDataPrint, pTipo) {
            var cadenaPrint = '';

            if (pTipo === 2) {
                cadenaPrint += '<div class="alert_alta-admon">'+ '<img style="width: 80%;" src="UserSystem/img/diagramas/garantia.png" />' + '</div>';
            }


            //agrego el contenido al div de alerta
            $(".contenedor_alerta .mensaje").html(cadenaPrint);
            //agrego la clase corta a la alerta
            $(".contenedor_alerta").addClass('corta');

        }

});
/*Funciona Ver Grafica Fiducia Mercantil*/
    $('#grafica-fiducia-mercantil').click(function () {
    
            mostrarAlertas("Para una correcta ejecución se deben llenar todos los controles, intentelo de nuevo", 2);
            
        function mostrarAlertas(pDataPrint, pTipo) {
            var cadenaPrint = '';

            if (pTipo === 2) {
                cadenaPrint += '<div class="alert_alta-admon">'+ '<img style="width: 80%;" src="UserSystem/img/diagramas/fiducia-mercantil.png" />' + '</div>';
            }


            //agrego el contenido al div de alerta
            $(".contenedor_alerta .mensaje").html(cadenaPrint);
            //agrego la clase corta a la alerta
            $(".contenedor_alerta").addClass('corta');

        }

});

    /* función simular */
    $('#btn_simular').click(function () {
        //obtengo los valores de los controles
        var tipo_capital = $('#tipo_capital').val(); //tipo capital
        var perfil_riesgo = $('#perfil_riesgo').val(); //perfil de riesgo
        var mes_inicio = $('#mes_inicio').val(); //mes de inicio
        var mes_final = $('#mes_final').val(); //mes final
        var monto_inversion = $('#monto_inversion').val(); //monto de inversión.







        if (tipo_capital !== '' && perfil_riesgo !== '' && mes_inicio !== '' && mes_final !== '' && monto_inversion !== '') {
            //validamos las fechas.
            var validarFechas = validarFechas(mes_inicio, mes_final);
            if (validarFechas) {


                //cargamos el json
                $.getJSON("http://fidubogota.web/UserSystem/json/rentabilidades.json", function (data) {

                    //creo la variable de dataPrint
                    var dataPrint = '';
                    alert(tipo_capital + ' - ' + perfil_riesgo);

                    //obtengo los parámetros
                    var parametrosCalculo = parametros(1);


                    alert('vamos a calcular');

                    //primero validamos que tipo capital ha elegido
                    //creo la variable de indice
                    var valorIndice = parametrosCalculo[1];
                    alert(valorIndice);

                    if (tipo_capital == 1 && perfil_riesgo == 1) { //caso para capital menor - conservador
                        //iteramos del objeto json las rentabilidades
                        for (item in data.rentabilidades) {
                            var valorCalcular = valorIndice * (parseFloat(1) + parseFloat(data.rentabilidades[item].ren_cap_men_conservador));
                            var valorCalcularAprox = valorCalcular.toFixed(3);
                            dataPrint += '<tr>'
                                    + '<td>' + parseFloat(data.rentabilidades[item].ren_cap_men_conservador) + '</td>'
                                    + '<td> | </td>'
                                    + '<td>' + valorCalcularAprox + '</td>'
                                    + '</tr>';
                            valorIndice = valorCalcularAprox;
                        }
                        //fin del for
                    }
                    //

                    //pego la tabla a la información
                    var table = '<table>'
                            + ''
                            + dataPrint
                            + ''
                            + '</table>'

                    $(".datos_prueba").html(table);



                });

            }
        } else {
            //mostramos las aletas de información para el usuario
            mostrarAlertas("Para una correcta ejecución se deben llenar todos los controles, intentelo de nuevo", 2);
        }





        /*
         *  función para validar fechas
         * 
         * @param {type} pFechaInicial
         * @param {type} pFechaFinal
         * @returns {llamados_L31.validarFechas.valorRetorno.valorRetorno}
         */
        function validarFechas(pFechaInicial, pFechaFinal) {
            //creo la variable de retorno
            var valorRetorno = true;
            //variable de rango en fechas
            var fechaInicialBase = descomponerFecha('31/12/2010');
            var fechaFinalBase = descomponerFecha('30/06/2014');
            var fechaFinal = descomponerFecha(pFechaFinal);
            var fechaInicial = descomponerFecha(pFechaInicial);

            //creo la variable de control
            /*
             * esta varible tendrá tres posiciones
             * [0] diferencia entre las fechas y que la fecha inicial no se a mayor a la final
             * [1] diferencia entre la fecha inicial y el inicio del rango en la base de datos
             * [2] diferencia entre la fecha final y el final del rango en la base de datos
             */
            var dataControl = new Array(0, 0, 0);

            /* hacemos las tres validaciones */
            //validamos que la fecha inicial no sea mayor que la final
            if (compararFechas(fechaFinal, fechaInicial) === false) {
                //mostramos la alerta de difeencia de fechas
                valorRetorno = false;
                //cambio el valor en la posición 1
                dataControl[0] = 1;
            }
            //validamos que la fecha inicial no sea menor al 01/01/2011
            if (compararFechas(fechaInicial, fechaInicialBase) === false) {
                //mostramos la alerta de difeencia de fechas
                valorRetorno = false;
                //cambio el valor en la posición 1
                dataControl[1] = 1;
            }
            //validamos que la fecha final no sea mayor al 30/06/2014
            if (compararFechas(fechaFinalBase, fechaFinal) === false) {
                //mostramos la alerta de difeencia de fechas
                valorRetorno = false;
                //cambio el valor en la posición 1
                dataControl[2] = 1;
            }
            if (valorRetorno === false) {
                //mostramos alertas
                mostrarAlertas(dataControl, 1);
            }

            //devolvemos el valor retorno
            return valorRetorno;
        }
        //fin de la función



        /*
         * función para despomponer fechas y devolver un array
         * 
         * @param {type} pFecha
         * @returns {Array.Array}
         */
        function descomponerFecha(pFecha) {
            //creo la variable de retorno
            //descompongo la fehca y la asigno en el array
            var dataFecha = pFecha.split("/");
            //creo las variables de la fecha
            var ano = parseInt(dataFecha[2]);
            var mes = parseInt(dataFecha[1]);
            var dia = parseInt(dataFecha[0]);

            //devuelvo el valor retorno
            return valorRetorno = new Array(dia, mes, ano);
        }
        //fin de la función


        /*
         * función mostrar alertas
         *
         * @param {type} pDataPrint
         * @param {type} pTipo
         * @returns {undefined}
         * 
         */
        function mostrarAlertas(pDataPrint, pTipo) {
            var cadenaPrint = '';
            //verifico el tipo de alerta
            if (pTipo === 1) {
                //preparo la cadena de para enviar
                if (pDataPrint[0] === 1) {
                    cadenaPrint += '<div class="alert">la fecha inicial no debe ser superior a la fecha final</div>';
                }
                if (pDataPrint[1] === 1) {
                    cadenaPrint += '<div class="alert">la fecha inicial no debe ser menor a 01/01/2011</div>';
                }
                if (pDataPrint[2] === 1) {
                    cadenaPrint += '<div class="alert">la fecha final no debe ser mayor a 30/06/2014</div>';
                }
            }
            if (pTipo === 2) {
                cadenaPrint += '<div class="alert_alta">' + pDataPrint + '</div>';
            }


            //agrego el contenido al div de alerta
            $(".contenedor_alerta .mensaje").html(cadenaPrint);
            //agrego la clase corta a la alerta
            $(".contenedor_alerta").addClass('corta');

        }
        //fin de la función

        /* 
         * función para comparar dos fechas 
         * verifica si la primera es menor que la segunda
         * recibe arreglos de tres posiciones con las fechas
         * 
         * @returns {Array|valorRetorno}
         */
        function compararFechas(pDataFecha1, pDataFecha2) {
            //creo la variable de retorno
            var valorRetorno = false;
            //verificamos el año
            if (pDataFecha1[2] > pDataFecha2[2]) {
                //si el año es superior se devuelve true
                valorRetorno = true;
            } else if (pDataFecha1[2] === pDataFecha2[2]) {
                //si el año es igual
                //verificamos el mes
                if (pDataFecha1[1] > pDataFecha2[1]) {
                    //si el mes es superior se devuelve true
                    valorRetorno = true;
                } else if (pDataFecha1[1] === pDataFecha2[1]) {
                    //si el mes es igual
                    //verificamos el dia
                    if (pDataFecha1[0] > pDataFecha2[0]) {
                        //si el día es mayor de devuelve true
                        valorRetorno = true;
                    }
                    //fin del if
                }
                //fin del if                
            }
            //fin del if
            //devuelvo el valor retorno
            return valorRetorno;
        }
        //fin de la función




        /*
         * función para obtener los datos parámetros
         * 
         * @returns {Array|valorRetorno}
         * 
         * El arreglo devuelvo las siguientes posiciones
         * [0] = var_rentabilidad
         * [1] = var_indice
         * [2] = fecha_inicio
         */
        function parametros(pTipo) {
            //creo la variable de retorno
            valorRetorno = new Array();
            //importo el json de parametros
            $.getJSON("http://fidubogota.web/UserSystem/json/parametros.json", function (data) {
                //itero los datos
                for (item in data.parametros) {

                    //iniciamos los casos de asignación de datos
                    if (pTipo === 1) { //caso para 1 : parametros de calculo
                        valorRetorno.push(data.parametros[item].var_rentabilidad);
                        valorRetorno.push(data.parametros[item].var_indice);
                    } else if (pTipo === 2) {//caso para 2 : parametros de fecha
                        valorRetorno.push(data.parametros[item].fecha_inicio);
                    }


                }
                //fin de la iteración

            });
            //devuelvo el valor retorno
            return valorRetorno;
        }


    });
    // fin de la acción en el botón.







});



