
$(document).ready(function () {


    /* controles de datepicker */
    $("#mes_inicio").datepicker({
        inline: true,
        showOtherMonths: true
    });
    $("#mes_final").datepicker({
        inline: true,
        showOtherMonths: true
    })
            .datepicker('widget').wrap('<div class="ll-skin-nigran"/>');

    /* función para cerrar alertas */
    $('.contenedor_alerta a.cerrar').click(function () {
        //le retiramos las clases necesarias para ocultar el div
        $(".contenedor_alerta").removeClass('corta');
        $(".contenedor_alerta").removeClass('grande');
    });


    $('#monto_inversion').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9+\-Ee.]/g, '');
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
            //si el valor es true
            if (validarFechas) {

                //obtengo los parámetros
                var parametrosCalculo = parametros();
                //creo el arreglo de datos
                //cargamos el json y hacemos el proceso de calculo.
                $.getJSON("UserSystem/json/rentabilidades.json", obtenerDataFechas);
            }
            //fin del if
        } else {
            //mostramos las aletas de información para el usuario
            mostrarAlertas("Para una correcta ejecución se deben llenar todos los controles, intentelo de nuevo", 2);
        }


        function obtenerDataFechas(data) {

            //creo la variable de rentabilidad
            var valorRentabilidad = parametrosCalculo[0];
            //creo la variable de indice
            var valorIndice = parametrosCalculo[1];
            //creo la variable de sumar
            var valorSumaGeneral = parametrosCalculo[2];
            //creo la variable de sumar
            var valorFidugobGeneral = parametrosCalculo[3];
            //creo la variable de optimo
            var valorOptimoGeneral = parametrosCalculo[4];
            //creo la variable de cubrir
            var valorCubirGeneral = parametrosCalculo[5];
            //creo la variable de cubrir
            var valorFiduaccionGeneral = parametrosCalculo[6];
            // creo un arreglo para almacenar la matriz de datos que sirve para calcular
            var dataMatriz = new Array();
            //iteramos del objeto json las rentabilidades
            for (item in data.rentabilidades) {
                //creo el arreglo para almacenar los datos de esta posición
                var dataArray = new Array();
                //agrego la fecha al arreglo
                dataArray.push(data.rentabilidades[item].fecha); //[0] : fecha
                //creo la variable adicional que servira para imprimir lo adicional por cada uno de los casos

                //determino que campos debo seleccionar
                if (perfil_riesgo == 1) { //caso para conservador
                    //para este caso se debe tomar el campo sumar y fidugob
                    //calculo el valor indice para este elemento

                    //creo la variable de rentabilidad para capitales
                    var valorRentabilidadCapital = 0;
                    //ahora se valida que tipo de capital se ha seleccionado
                    if (tipo_capital == 1) { //caso para menor
                        valorRentabilidadCapital = data.rentabilidades[item].ren_cap_men_conservador;
                    } else { //caso para mayor
                        valorRentabilidadCapital = data.rentabilidades[item].ren_cap_may_conservador;
                    }
                    //calculo el valor indice para este elemento
                    var valorCalcularIndice = valorIndice * (valorRentabilidad + parseFloat(valorRentabilidadCapital));

                    var valorSuma = data.rentabilidades[item].sumar;
                    // valor de fidgob
                    var valorFidugob = data.rentabilidades[item].fidugob;
                    //calculo el valor suma
                    var valorCalcularSuma = calcularProducto(valorSuma, valorSumaGeneral, mes_inicio, data.rentabilidades[item].fecha)
                    //calculo el valor de fidgob
                    var valorCalcularFidugob = calcularProducto(valorFidugob, valorFidugobGeneral, mes_inicio, data.rentabilidades[item].fecha);


                    //almaceno la información en la matriz
                    dataArray.push(valorRentabilidadCapital); //[1] : valor rentabilidad
                    dataArray.push(valorCalcularIndice); //[2] : indice
                    //agrego los valores para el caso
                    dataArray.push(valorCalcularSuma); //[3] : sumar
                    dataArray.push(valorCalcularFidugob); //[4] : fidugob
                    dataArray.push(valorSuma); //[5] : valor suma database
                    dataArray.push(valorFidugob); //[6] : valor fidugob database


                } else if (perfil_riesgo == 2) {//caso para moderado

                    //creo la variable de rentabilidad para capitales
                    var valorRentabilidadCapital = 0;
                    //ahora se valida que tipo de capital se ha seleccionado
                    if (tipo_capital == 1) { //caso para menor
                        valorRentabilidadCapital = data.rentabilidades[item].ren_cap_men_moderado;
                    } else { //caso para mayor
                        valorRentabilidadCapital = data.rentabilidades[item].ren_cap_may_moderado;
                    }

                    //para este caso se debe tomar el campo optimo
                    //calculo el valor indice para este elemento
                    var valorCalcularIndice = valorIndice * (valorRentabilidad + parseFloat(valorRentabilidadCapital));
                    //valor suma
                    var valorOptimo = data.rentabilidades[item].optimo;
                    //calculo el valor suma
                    var valorCalcularOptimo = calcularProducto(valorOptimo, valorOptimoGeneral, mes_inicio, data.rentabilidades[item].fecha)

                    //almaceno la información en la matriz
                    dataArray.push(valorRentabilidadCapital); //[1] : valor rentabilidad
                    dataArray.push(valorCalcularIndice); //[2] : indice
                    //agrego los valores para el caso
                    dataArray.push(valorCalcularOptimo); //[3] : optimo
                    dataArray.push(valorOptimo); //[4] : valor óptimo database

                } else if (perfil_riesgo == 3) {//caso para agresivo

                    //creo la variable de rentabilidad para capitales
                    var valorRentabilidadCapital = 0;
                    //ahora se valida que tipo de capital se ha seleccionado
                    if (tipo_capital == 1) { //caso para menor
                        valorRentabilidadCapital = data.rentabilidades[item].ren_cap_men_agresivo;
                    } else { //caso para mayor
                        valorRentabilidadCapital = data.rentabilidades[item].ren_cap_may_agresivo;
                    }
                    //para este caso se debe tomar el campo optimo
                    //calculo el valor indice para este elemento
                    var valorCalcularIndice = valorIndice * (valorRentabilidad + parseFloat(valorRentabilidadCapital));
                    //valor suma
                    var valorCubrir = data.rentabilidades[item].cubrir;
                    //calculo el valor cubrir
                    var valorCalcularCubrir = calcularProducto(valorCubrir, valorCubirGeneral, mes_inicio, data.rentabilidades[item].fecha)
                    //valor suma
                    var valorFiduaccion = data.rentabilidades[item].fiduaccion;
                    //calculo el valor cubrir
                    var valorCalcularFiduaccion = calcularProducto(valorFiduaccion, valorFiduaccionGeneral, mes_inicio, data.rentabilidades[item].fecha)

                    //almaceno la información en la matriz
                    dataArray.push(valorRentabilidadCapital); //[1] : valor rentabilidad
                    dataArray.push(valorCalcularIndice); //[2] : indice
                    //agrego los valores para el caso
                    dataArray.push(valorCalcularCubrir); //[3] : cubrir
                    dataArray.push(valorCalcularFiduaccion); //[4] : fiduaccion
                    dataArray.push(valorCubrir); //[5] : valor cubrir database
                    dataArray.push(valorFiduaccion); //[6] : valor cubrir database


                }
                //fin del if

                //asigno el actual de los valores para los siguitenes calculos
                valorIndice = valorCalcularIndice;
                valorSumaGeneral = valorSuma;
                valorFidugobGeneral = valorFidugob;
                valorOptimoGeneral = valorOptimo;

                //agrego el arreglo data al la matriz
                dataMatriz.push(dataArray);

            }
            //fin del for

            //creo un arreglo de presentación
            var dataPresentacion = new Array();
            //obtengo el valor de retabilidad Periodo
            dataPresentacion.push(obtenerRendimientoPeriodo(dataMatriz)); //[0] 
            //obtengo el valor de retabilidad trimestre
            dataPresentacion.push(obtenerRendimientoTrimestre(dataMatriz)); //[1] 
            //obtengo el valor de retabilidad Semestre
            dataPresentacion.push(obtenerRendimientoSemestre(dataMatriz)); //[2] 
            //obtengo el valor de retabilidad Anual
            dataPresentacion.push(obtenerRendimientoAnual(dataMatriz)); //[3] 
            //obtengo el valor de retabilidad Anual Corrido
            dataPresentacion.push(obtenerRendimientoAnualCorrido(dataMatriz)); //[4] 
            //obtengo la desviación por periodo
            dataPresentacion.push(calcularDesviacionEstandar(obtenerDataDesviacionPeriodo(dataMatriz)));//[5] 
            //obtengo la desviación por Trimestral
            dataPresentacion.push(calcularDesviacionEstandar(obtenerDataDesviacionTrimestre(dataMatriz)));//[6] 
            //obtengo la desviación por Semestre
            dataPresentacion.push(calcularDesviacionEstandar(obtenerDataDesviacionSemestre(dataMatriz)));//[7] 
            //obtengo la desviación por año
            dataPresentacion.push(calcularDesviacionEstandar(obtenerDataDesviacionAnual(dataMatriz)));//[8] 
            //obtengo la desviación por año corrido
            dataPresentacion.push(calcularDesviacionEstandar(obtenerDataDesviacionAnualCorrido(dataMatriz)));//[9] 
            //mostramos en pantalla
            presentarDatos(dataPresentacion);

            //fin del if


        }
        //fin de la función aqui

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
            if (compararFechas(fechaInicial, fechaFinal) === 1) {
                //mostramos la alerta de difeencia de fechas
                valorRetorno = false;
                //cambio el valor en la posición 1
                dataControl[0] = 1;
            }
            //validamos que la fecha inicial no sea menor al 01/01/2011
            if (compararFechas(fechaInicial, fechaInicialBase) === 2 || compararFechas(fechaInicial, fechaInicialBase) === 3) {
                //mostramos la alerta de difeencia de fechas
                valorRetorno = false;
                //cambio el valor en la posición 1
                dataControl[1] = 1;
            }
            //validamos que la fecha final no sea mayor al 30/06/2014
            if (compararFechas(fechaFinal, fechaFinalBase) === 1) {
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
         * 
         * @param {type} pSuma
         * @param {type} pSumaAnterior
         * @param {type} pFecha
         * @param {type} pFehcaAnterior
         * @returns {Number}
         */
        function calcularProducto(pSuma, pSumaAnterior, pFechaUsuario, pFechaDato) {
            //creo el valor retorno
            var valorRetorno = 0;

            //realizo la validación de la fecha
            //si la fecha del dato es menor que la que elige el usuario el valor es 0
            //de lo contrario se efectua la formula
            if (pFechaDato < pFechaUsuario) {
                valorRetorno = parseFloat(0);
            } else {
                //calculo el valor de la suma
                var ValorCalcular = (parseFloat(pSuma) / parseFloat(pSumaAnterior)) - 1;
                //reservo 3 decimales
                valorRetorno = ValorCalcular;
            }
            //fin del if

            //devuelvo el valor retorno
            return valorRetorno;
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
            var valorRetorno;
            //verificamos el año
            if (pDataFecha1[2] > pDataFecha2[2]) {
                //si el año es superior se devuelve true
                valorRetorno = 1;
            } else if (pDataFecha1[2] === pDataFecha2[2]) {
                //si el año es igual
                //verificamos el mes
                if (pDataFecha1[1] > pDataFecha2[1]) {
                    //si el mes es superior se devuelve true
                    valorRetorno = 1;
                } else if (pDataFecha1[1] === pDataFecha2[1]) {
                    //si el mes es igual
                    //verificamos el dia
                    if (pDataFecha1[0] > pDataFecha2[0]) {
                        //si el día es mayor de devuelve true
                        valorRetorno = 1;
                    } else if (pDataFecha1[0] === pDataFecha2[0]) {
                        valorRetorno = 2;
                    } else if (pDataFecha1[0] < pDataFecha2[0]) {
                        valorRetorno = 3;
                    }
                    //fin del if
                } else if (pDataFecha1[1] < pDataFecha2[1]) {
                    valorRetorno = 3;
                }
                //fin del if                
            } else if (pDataFecha1[2] < pDataFecha2[2]) {
                valorRetorno = 3;
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
        function parametros() {
            //creo la variable de retorno
            var valorRetorno = new Array();
            //importo el json de parametros
            $.getJSON("UserSystem/json/parametros.json", function (data) {
                //itero los datos
                for (item in data.parametros) {
                    //iniciamos los casos de asignación de datos
                    valorRetorno.push(data.parametros[item].var_rentabilidad); //[0]
                    valorRetorno.push(data.parametros[item].var_indice);//[1]
                    valorRetorno.push(data.parametros[item].sumar);//[2]
                    valorRetorno.push(data.parametros[item].fidugob);//[3]
                    valorRetorno.push(data.parametros[item].optimo);//[4]
                    valorRetorno.push(data.parametros[item].cubrir);//[5]
                    valorRetorno.push(data.parametros[item].fiduaccion);//[6]
                    valorRetorno.push(data.parametros[item].fecha_inicio);//[7]
                    valorRetorno.push(data.parametros[item].fecha_final);//[8]
                    //fin el if
                }
                //fin de la iteración
            });
            //devuelvo el valor retorno
            return valorRetorno;
        }
        //fin de la función.


        /*
         * 
         * @param {type} pData
         * @returns {Array}
         */
        function obtenerRentabilidadProducto(pDataProducto) {
            //creo la variable de retorno
            var valorRetorno = new Array();
            //obtengo los valores
            if (perfil_riesgo == 2) {
                valorRetorno.push(pDataProducto[4]); //tomo la cuarta posición para el primer producto
            } else {
                valorRetorno.push(pDataProducto[5]); //tomo la quinta posición para el primer producto
                valorRetorno.push(pDataProducto[6]); //tomo la sexta posición para el segundo producto
            }
            //fin del if
            //devuelvo la variable de retono
            return valorRetorno;
        }

        /*
         * Obtener Rentabilidad del periodo
         * 
         * @param {type} pData
         * @returns {Number}
         */
        function obtenerRendimientoPeriodo(pData) {
            //descompongo la fecha de inicio
            var fechaInicio = descomponerFecha(mes_inicio);
            //descompongo la fecha fe fin
            var fechaFin = descomponerFecha(mes_final);
            //creo la variable para almacenar
            var dataDesviacionProducto1 = new Array();

            //inicio la iteración de la matriz
            for (var i = 0; i < pData.length; i++) {
                //inicio la iteración de arreglo
                var fechaArreglo = pData[i][0];
                //descompongo la fecha de arreglo
                var fechaArrgloDescompuesta = descomponerFecha(fechaArreglo);
                //comparar las fechas
                //caso para inicial
                if (compararFechas(fechaInicio, fechaArrgloDescompuesta) == 2) {
                    //obtengo el indice inicial
                    var indiceIncial = pData[i][2]; //tomo la segunda posición para el indice inicial
                    //obtengo los datos de la rentabilidad
                    var valoresFechaInicio = obtenerRentabilidadProducto(pData[i]);
                }
                //fin del if
                //caso para final
                if (compararFechas(fechaFin, fechaArrgloDescompuesta) == 2) {
                    //obtengo el indice final
                    var indiceFinal = pData[i][2]; //tomo la última posición.
                    var valoresFechaFinal = obtenerRentabilidadProducto(pData[i]);
                }
                //fin del if

                //obtenemos los datos para la desviación.
                var valor1 = new Array();
                if (perfil_riesgo == 2) {
                    if(compararFechas(fechaInicio, fechaArrgloDescompuesta) == 2){
                    }
                    valor1.push(pData[i][3]);
                    valor1.push(pData[i][0]);

                }


                dataDesviacionProducto1.push(valor1);

            }
            //fin del for matriz
            //resto las fechas
            var fechasResta = restaFechas(mes_inicio, mes_final);//resto las fechas
            //creo la variable de retorno
            var valorRetorno = new Array();
            //calculo la rentabilidad del periodo y la agrego al arreglo
            var rentabiliadPeriodo = Math.pow((parseFloat(indiceFinal) / parseFloat(indiceIncial)), (parseFloat(365) / parseFloat(fechasResta))) - 1;
            valorRetorno.push(rentabiliadPeriodo);

            valorRetorno.push(numeral(monto_inversion * (Math.pow((1 + rentabiliadPeriodo), (restaFechas(mes_inicio, mes_final) / 365)) - 1)).format('$0,00'));

            if (perfil_riesgo == 2) {
                var valor1 = new Array();
                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                var Rentabilidad1 = Math.pow((parseFloat(valoresFechaFinal[0]) / parseFloat(valoresFechaInicio[0])), (parseFloat(365) / parseFloat(fechasResta))) - 1
                valor1.push(Rentabilidad1);
                var Rendimiento1 = numeral(monto_inversion * (Math.pow((1 + Rentabilidad1), (parseFloat(fechasResta) / 365)) - 1)).format('$0,00');
                valor1.push(Rendimiento1);
                valorRetorno.push(valor1);

                //obtengo la desciación del producto 1
                var desviacionProduclto1 = obtenerDesviacionProducto1(dataDesviacionProducto1);


            } else {

                var valor1 = new Array();
                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                var Rentabilidad1 = Math.pow((parseFloat(valoresFechaFinal[0]) / parseFloat(valoresFechaInicio[0])), (parseFloat(365) / parseFloat(fechasResta))) - 1
                valor1.push(Rentabilidad1);
                var Rendimiento1 = numeral(monto_inversion * (Math.pow((1 + Rentabilidad1), (parseFloat(fechasResta) / 365)) - 1)).format('$0,00');
                valor1.push(Rendimiento1);
                valorRetorno.push(valor1);

                var valor2 = new Array();
                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                var Rentabilidad2 = Math.pow((parseFloat(valoresFechaFinal[1]) / parseFloat(valoresFechaInicio[1])), (parseFloat(365) / parseFloat(fechasResta))) - 1
                valor1.push(Rentabilidad2);
                var Rendimiento2 = numeral(monto_inversion * (Math.pow((1 + Rentabilidad2), (parseFloat(fechasResta) / 365)) - 1)).format('$0,00');
                valor1.push(Rendimiento2);
                valorRetorno.push(valor2);
            }
            //devuelvo la variable de retorno
            return valorRetorno;
            /**/
        }
        //fin de la función





        /*
         * Obtener Rentabilidad del trimestre
         * 
         * @param {type} pData
         * @returns {Number}
         */
        function obtenerRendimientoTrimestre(pData) {
            //creo la variable de retorno
            var valorRetorno = new Array()
            //obtengo el largo de la matriz
            var largo = restaFechas(mes_inicio, mes_final);
            if (largo >= 90) {

                //descompongo la fecha fe fin
                var fechaFin = descomponerFecha(mes_final);
                //inicio la iteración de la matriz
                for (var i = 0; i < pData.length; i++) {
                    //inicio la iteración de arreglo
                    var fechaArreglo = pData[i][0];
                    //descompongo la fecha de arreglo
                    var fechaArrgloDescompuesta = descomponerFecha(fechaArreglo);
                    //comparar las fechas
                    //caso para final
                    if (compararFechas(fechaFin, fechaArrgloDescompuesta) == 2) {
                        //obtengo el indice final
                        var indiceFinal = pData[i][2]; //tomo la última posición.
                        var valoresFechaFinal = obtenerRentabilidadProducto(pData[i]);
                        //obtengo el valor del indice de fecha inicial 90 dias atras
                        var indiceInicial = pData[i - 90][2];
                        var valoresFechaInicio = obtenerRentabilidadProducto(pData[i - 90]);
                        //comparo el indice
                        if (indiceInicial == 0) {
                            valorRetorno = 'N/A';
                        } else {
                            //creo la variable de retorno
                            var rentabilidadTrimestre = Math.pow((parseFloat(indiceFinal) / parseFloat(indiceInicial)), (parseFloat(365) / parseFloat(90))) - 1;
                            valorRetorno.push(rentabilidadTrimestre);
                            valorRetorno.push(numeral(monto_inversion * (Math.pow((1 + rentabilidadTrimestre), (90 / 365)) - 1)).format('$0,00'));
                            if (perfil_riesgo == 2) {

                                var valor1 = new Array();
                                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                                var Rentabilidad1 = Math.pow((parseFloat(valoresFechaFinal[0]) / parseFloat(valoresFechaInicio[0])), (parseFloat(365) / 90)) - 1;
                                valor1.push(Rentabilidad1);
                                var Rendimiento1 = numeral(monto_inversion * (Math.pow((1 + Rentabilidad1), (parseFloat(90) / 365)) - 1)).format('$0,00');
                                valor1.push(Rendimiento1);
                                valorRetorno.push(valor1);


                            } else {
                                var valor1 = new Array();
                                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                                var Rentabilidad1 = Math.pow((parseFloat(valoresFechaFinal[0]) / parseFloat(valoresFechaInicio[0])), (parseFloat(365) / 90)) - 1;
                                valor1.push(Rentabilidad1);
                                var Rendimiento1 = numeral(monto_inversion * (Math.pow((1 + Rentabilidad1), (parseFloat(90) / 365)) - 1)).format('$0,00');
                                valor1.push(Rendimiento1);
                                valorRetorno.push(valor1);


                                var valor2 = new Array();
                                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                                var Rentabilidad2 = Math.pow((parseFloat(valoresFechaFinal[1]) / parseFloat(valoresFechaInicio[1])), (parseFloat(365) / 90)) - 1;
                                valor1.push(Rentabilidad2);
                                var Rendimiento2 = numeral(monto_inversion * (Math.pow((1 + Rentabilidad2), (parseFloat(90) / 365)) - 1)).format('$0,00');
                                valor1.push(Rendimiento2);
                                valorRetorno.push(valor2);
                            }
                        }

                    }
                    //fin del if
                }
                //fin del for matriz
            } else {
                valorRetorno = 'N/A';
            }
            //fin del if
            //devuelvo la variable de retorno
            return valorRetorno;
        }
        //fin de la función


        /*
         * Obtener Rentabilidad del semestre
         * 
         * @param {type} pData
         * @returns {Number}
         */
        function obtenerRendimientoSemestre(pData) {
            //creo la variable de retorno
            var valorRetorno = new Array();
            //obtengo los parámetros de las fehcas
            var valorFechaInicial = parametrosCalculo[7];
            //obtengo el largo de la matriz
            var largo = restaFechas(valorFechaInicial, mes_final);
            //obtengo el indice inicial
            if (largo >= 180) {
                //descompongo la fecha fe fin
                var fechaFin = descomponerFecha(mes_final);
                //inicio la iteración de la matriz
                for (var i = 0; i < pData.length; i++) {
                    //inicio la iteración de arreglo
                    var fechaArreglo = pData[i][0];
                    //descompongo la fecha de arreglo
                    var fechaArrgloDescompuesta = descomponerFecha(fechaArreglo);

                    //comparar las fechas
                    //caso para final
                    if (compararFechas(fechaFin, fechaArrgloDescompuesta) == 2) {

                        //obtengo el indice final
                        var indiceFinal = pData[i][2]; //tomo la última posición.
                        var valoresFechaFinal = obtenerRentabilidadProducto(pData[i]);
                        //obtengo el valor del indice de fecha inicial 90 dias atras
                        var indiceInicial = pData[i - 180][2];
                        var valoresFechaInicio = obtenerRentabilidadProducto(pData[i - 180]);
                        //comparo el indice
                        if (indiceInicial == 0) {
                            valorRetorno = 'N/A';
                        } else {
                            //creo la variable de retorno
                            var rentabilidadSemestre = Math.pow((parseFloat(indiceFinal) / parseFloat(indiceInicial)), (parseFloat(365) / parseFloat(180))) - 1
                            valorRetorno.push(rentabilidadSemestre);
                            valorRetorno.push(numeral(monto_inversion * (Math.pow((1 + rentabilidadSemestre), (180 / 365)) - 1)).format('$0,00'));
                            if (perfil_riesgo == 2) {

                                var valor1 = new Array();
                                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                                var Rentabilidad1 = Math.pow((parseFloat(valoresFechaFinal[0]) / parseFloat(valoresFechaInicio[0])), (parseFloat(365) / 180)) - 1;
                                valor1.push(Rentabilidad1);
                                var Rendimiento1 = numeral(monto_inversion * (Math.pow((1 + Rentabilidad1), (parseFloat(180) / 365)) - 1)).format('$0,00');
                                valor1.push(Rendimiento1);
                                valorRetorno.push(valor1);

                            } else {
                                var valor1 = new Array();
                                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                                var Rentabilidad1 = Math.pow((parseFloat(valoresFechaFinal[0]) / parseFloat(valoresFechaInicio[0])), (parseFloat(365) / 180)) - 1;
                                valor1.push(Rentabilidad1);
                                var Rendimiento1 = numeral(monto_inversion * (Math.pow((1 + Rentabilidad1), (parseFloat(180) / 365)) - 1)).format('$0,00');
                                valor1.push(Rendimiento1);
                                valorRetorno.push(valor1);

                                var valor2 = new Array();
                                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                                var Rentabilidad2 = Math.pow((parseFloat(valoresFechaFinal[1]) / parseFloat(valoresFechaInicio[1])), (parseFloat(365) / 180)) - 1;
                                valor1.push(Rentabilidad2);
                                var Rendimiento2 = numeral(monto_inversion * (Math.pow((1 + Rentabilidad2), (parseFloat(180) / 365)) - 1)).format('$0,00');
                                valor1.push(Rendimiento2);
                                valorRetorno.push(valor2);

                            }
                        }
                    }
                    //fin del if
                }
                //fin del for matriz
            } else {
                valorRetorno = 'N/A';
            }
            //fin del if

            //devuelvo la variable de retorno
            return valorRetorno;
        }
        //fin de la función


        /*
         * Obtener Rentabilidad del Año
         * 
         * @param {type} pData
         * @returns {Number}
         */
        function obtenerRendimientoAnual(pData) {
            //creo la variable de retorno
            var valorRetorno = new Array();
            //obtengo los parámetros de las fehcas
            var valorFechaInicial = parametrosCalculo[7];
            //obtengo el largo de la matriz
            var largo = restaFechas(valorFechaInicial, mes_final);
            //obtengo el indice inicial
            if (largo >= 365) {

                //descompongo la fecha fe fin
                var fechaFin = descomponerFecha(mes_final);
                //inicio la iteración de la matriz
                for (var i = 0; i < pData.length; i++) {
                    //inicio la iteración de arreglo
                    var fechaArreglo = pData[i][0];
                    //descompongo la fecha de arreglo
                    var fechaArrgloDescompuesta = descomponerFecha(fechaArreglo);
                    //comparar las fechas
                    //caso para final
                    if (compararFechas(fechaFin, fechaArrgloDescompuesta) == 2) {
                        //obtengo el indice final
                        var indiceFinal = pData[i][2]; //tomo la última posición.
                        var valoresFechaFinal = obtenerRentabilidadProducto(pData[i]);
                        //obtengo el valor del indice de fecha inicial 90 dias atras
                        var indiceInicial = pData[i - 365][2];
                        var valoresFechaInicio = obtenerRentabilidadProducto(pData[i - 365]);
                        //comparo el indice
                        if (indiceInicial == 0) {
                            valorRetorno = 'N/A';
                        } else {
                            //creo la variable de retorno
                            var rentabilidadAnual = (parseFloat(indiceFinal) / parseFloat(indiceInicial)) - 1;
                            valorRetorno.push(rentabilidadAnual);
                            valorRetorno.push(numeral(monto_inversion * ((1 + rentabilidadAnual) - 1)).format('$0,00'));

                            if (perfil_riesgo == 2) {
                                var valor1 = new Array();
                                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                                var Rentabilidad1 = Math.pow((parseFloat(valoresFechaFinal[0]) / parseFloat(valoresFechaInicio[0])), (parseFloat(365) / parseFloat(365))) - 1;
                                valor1.push(Rentabilidad1);
                                var Rendimiento1 = numeral(monto_inversion * (Math.pow((1 + Rentabilidad1), (parseFloat(365) / 365)) - 1)).format('$0,00');
                                valor1.push(Rendimiento1);
                                valorRetorno.push(valor1);
                            } else {
                                var valor1 = new Array();
                                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                                var Rentabilidad1 = Math.pow((parseFloat(valoresFechaFinal[0]) / parseFloat(valoresFechaInicio[0])), (parseFloat(365) / parseFloat(365))) - 1;
                                valor1.push(Rentabilidad1);
                                var Rendimiento1 = numeral(monto_inversion * (Math.pow((1 + Rentabilidad1), (parseFloat(365) / 365)) - 1)).format('$0,00');
                                valor1.push(Rendimiento1);
                                valorRetorno.push(valor1);

                                var valor2 = new Array();
                                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                                var Rentabilidad2 = Math.pow((parseFloat(valoresFechaFinal[1]) / parseFloat(valoresFechaInicio[1])), (parseFloat(365) / parseFloat(365))) - 1;
                                valor1.push(Rentabilidad2);
                                var Rendimiento2 = numeral(monto_inversion * (Math.pow((1 + Rentabilidad2), (parseFloat(365) / 365)) - 1)).format('$0,00');
                                valor1.push(Rendimiento2);
                                valorRetorno.push(valor2);
                            }
                        }
                    }
                    //fin del if
                }
                //fin del for matriz
            } else {
                valorRetorno = 'N/A';
            }
            //fin del if

            //devuelvo la variable de retorno
            return  valorRetorno;
        }
        //fin de la función


        /*
         * Obtener Rentabilidad del año corrido
         * 
         * @param {type} pData
         * @returns {Number}
         */
        function obtenerRendimientoAnualCorrido(pData) {

            //creo la variable de retorno
            var valorRetorno = new Array();

            //descompongo la fecha final
            var fechaFinal = descomponerFecha(mes_final);
            //obtengo la fecha del ultimo año (le resto al año 1)
            var fechaUltimoAno = "31/12/" + (fechaFinal[2] - 1);
            //verifico el año que ha tocado
            //descompongo la fecha de ultimo año
            var fechaUltimoAnoDescompuesta = descomponerFecha(fechaUltimoAno);
            //creo la variable de indice ultimo año
            var indiceUltimoAno = 100;
            //inicio la iteración de la matriz
            for (var i = 0; i < pData.length; i++) {
                //inicio la iteración de arreglo
                var fechaArreglo = pData[i][0];
                //descompongo la fecha de arreglo
                var fechaArrgloDescompuesta = descomponerFecha(fechaArreglo);
                //comparar las fechas
                //caso para ultimo año
                if (fechaFinal[2] - 1 > 2010) {
                    if (compararFechas(fechaUltimoAnoDescompuesta, fechaArrgloDescompuesta) == 2) {
                        //obtengo el indice inicial
                        indiceUltimoAno = pData[i][2]; //tomo la primera posicion.
                        var valoresFechaUltimoAno = obtenerRentabilidadProducto(pData[i]);
                    }
                    //fin del if
                }
                //fin del if
                //caso para indice final
                if (compararFechas(fechaFinal, fechaArrgloDescompuesta) == 2) {
                    //obtengo el indice inicial
                    var indiceFinal = pData[i][2]; //tomo la primera posicion.
                    var valoresFechaFinal = obtenerRentabilidadProducto(pData[i]);
                }
                //fin del if
            }
            //fin del for matriz
            //creo la variable de retorno
            valorRetorno.push(Math.pow((parseFloat(indiceFinal) / parseFloat(indiceUltimoAno)), (parseFloat(365) / parseFloat(restaFechas(fechaUltimoAno, mes_final)))) - 1);
            //agrego un valor de uno en la posicion para no perder el standard de los 
            valorRetorno.push(1);
            if (perfil_riesgo == 2) {

                var valor1 = new Array();
                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                var Rentabilidad1 = Math.pow((parseFloat(valoresFechaFinal[0]) / parseFloat(valoresFechaUltimoAno[0])), (parseFloat(365) / parseFloat(restaFechas(fechaUltimoAno, mes_final)))) - 1;
                valor1.push(Rentabilidad1);
                var Rendimiento1 = 10;
                valor1.push(Rendimiento1);
                valorRetorno.push(valor1);

                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                valorRetorno.push();
            } else {
                var valor1 = new Array();
                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                var Rentabilidad1 = Math.pow((parseFloat(valoresFechaFinal[0]) / parseFloat(valoresFechaUltimoAno[0])), (parseFloat(365) / parseFloat(restaFechas(fechaUltimoAno, mes_final)))) - 1;
                valor1.push(Rentabilidad1);
                var Rendimiento1 = 10;
                valor1.push(Rendimiento1);
                valorRetorno.push(valor1);


                var valor2 = new Array();
                //calculo el valor de la rentabilidad en el producto sumar y lo agrego al arreglo
                var Rentabilidad2 = Math.pow((parseFloat(valoresFechaFinal[1]) / parseFloat(valoresFechaUltimoAno[1])), (parseFloat(365) / parseFloat(restaFechas(fechaUltimoAno, mes_final)))) - 1;
                valor1.push(Rentabilidad2);
                var Rendimiento2 = 10;
                valor1.push(Rendimiento2);
                valorRetorno.push(valor2);

            }

            //devuelvo el valor retorno
            return valorRetorno;
        }
        //fin de la función





        /*
         * 
         * @param {type} pFecha1
         * @param {type} pFecha2
         * @returns {Number}
         */
        function restaFechas(pFecha1, pFecha2) {
            var aFecha1 = pFecha1.split('/');
            var aFecha2 = pFecha2.split('/');
            var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
            var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
            var dif = fFecha2 - fFecha1;
            var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
            return dias;
        }
        //fin de la función

        /*
         * 
         * @param {type} pDataPresentar
         * @returns {undefined}
         */
        function obtenerPorcentaje(pDato) {
            //creo la variable de retorno
            var valor = pDato * 100;
            //aproximo
            var valorRetorno = valor.toPrecision(3);
            //devuelvo el valor
            return valorRetorno;
        }
        //fin de la función

        /*
         * 
         * @param {type} pDataPresentar
         * @returns {undefined}
         */
        function presentarDatos(pDataPresentar) {


            var tablaRendimientos = ' <table class="rendimientos">'
                    + '<tr>'
                    + '<th>Rendimientos de la Inversión</th>'
                    + '<th>Optimización</th>'
                    + presentarProducto()
                    + '</tr>'
                    + '<tr>'
                    + '<td>Rendimientos del Periodo</td>'
                    + '<td>' + pDataPresentar[0][1] + '</td>'
                    + presentarProductoResultado(1, 2, pDataPresentar[0])
                    + '</tr>'
                    + '<tr>'
                    + '<td>Rendimientos del Trimestre</td>'
                    + '<td>' + pDataPresentar[1][1] + '</td>'
                    + presentarProductoResultado(1, 2, pDataPresentar[1])
                    + '</tr>'
                    + '</tr>'
                    + '<tr>'
                    + '<td>Rendimientos del Semestre</td>'
                    + '<td>' + pDataPresentar[2][1] + '</td>'
                    + presentarProductoResultado(1, 2, pDataPresentar[2])
                    + '</tr>'
                    + '<tr>'
                    + '<td>Rendimientos del Año</td>'
                    + '<td>' + pDataPresentar[3][1] + '</td>'
                    + presentarProductoResultado(1, 2, pDataPresentar[3])
                    + '</tr>'
                    + '</table>';
            /* */

            var tablaRentabilidad = '<table class="rentabilidad">'
                    + '<tr>'
                    + '<th>Rentabilidades E.A.</th>'
                    + '<th>Optimización</th>'
                    + presentarProducto()
                    + '</tr>'
                    + '<tr>'
                    + '<td>Rentabilidades del Periodo</td>'
                    + '<td>' + obtenerPorcentaje(pDataPresentar[0][0]) + ' %</td>'
                    + presentarProductoResultado(2, 1, pDataPresentar[0])
                    + '</tr>'
                    + '<tr>'
                    + '<td>Rentabilidades del Trimestre</td>'
                    + '<td>' + obtenerPorcentaje(pDataPresentar[1][0]) + ' %</td>'
                    + presentarProductoResultado(2, 1, pDataPresentar[1])
                    + '</tr>'
                    + '</tr>'
                    + '<tr>'
                    + '<td>Rentabilidades del Semestre</td>'
                    + '<td>' + obtenerPorcentaje(pDataPresentar[2][0]) + ' %</td>'
                    + presentarProductoResultado(2, 1, pDataPresentar[2])
                    + '</tr>'
                    + '<tr>'
                    + '<td>Rentabilidades del Año Corrido</td>'
                    + '<td>' + obtenerPorcentaje(pDataPresentar[4][0]) + ' %</td>'
                    + presentarProductoResultado(2, 1, pDataPresentar[4])
                    + '</tr>'
                    + '<tr>'
                    + '<td>Rentabilidades del Año</td>'
                    + '<td>' + obtenerPorcentaje(pDataPresentar[3][0]) + ' %</td>'
                    + presentarProductoResultado(2, 1, pDataPresentar[3])
                    + '</tr>'
                    + '</table>';
            //verifico el tipo de alerta

            var tablaVolatilidad = '<table class="volatilidad">'
                    + '<tr>'
                    + '<th>Volatilidad E.A.</th>'
                    + '<th>Optimización</th>'
                    + presentarProducto()
                    + '</tr>'
                    + '<tr>'
                    + '<td>Volatilidad del Periodo</td>'
                    + '<td>' + obtenerPorcentaje(pDataPresentar[5]) + ' %</td>'
                    + presentarProductoResultado(2, 1, pDataPresentar[0])
                    + '</tr>'
                    + '<tr>'
                    + '<td>Volatilidad del Trimestre</td>'
                    + '<td>' + obtenerPorcentaje(pDataPresentar[6]) + ' %</td>'
                    + presentarProductoResultado(2, 1, pDataPresentar[1])
                    + '</tr>'
                    + '</tr>'
                    + '<tr>'
                    + '<td>Volatilidad del Semestre</td>'
                    + '<td>' + obtenerPorcentaje(pDataPresentar[7]) + ' %</td>'
                    + presentarProductoResultado(2, 1, pDataPresentar[2])
                    + '</tr>'
                    + '<tr>'
                    + '<td>Volatilidad del Año Corrido</td>'
                    + '<td>' + obtenerPorcentaje(pDataPresentar[9]) + ' %</td>'
                    + presentarProductoResultado(2, 1, pDataPresentar[4])
                    + '</tr>'
                    + '<tr>'
                    + '<td>Volatilidad del Año</td>'
                    + '<td>' + obtenerPorcentaje(pDataPresentar[8]) + ' %</td>'
                    + presentarProductoResultado(2, 1, pDataPresentar[3])
                    + '</tr>'
                    + '</table>';

            var cadenaPrintLarga = '<div class="alert_alta">' + tablaRendimientos + tablaRentabilidad + tablaVolatilidad + '</div>';



            //agrego el contenido al div de alerta
            $(".contenedor_alerta .mensaje").html(cadenaPrintLarga);
            //agrego la clase corta a la alerta
            $(".contenedor_alerta").addClass('grande');

        }
        //fin de la función

        /*
         * 
         * @param {type} pTipo
         * @returns {String}
         */
        function presentarProducto() {
            //creo la variable de retorno
            var valorRetorno = '';
            //vreificamos el tipo
            if (perfil_riesgo == 1) {
                valorRetorno += '<th>Sumar</th>';
                valorRetorno += '<th>Fidugob</th>';
            } else if (perfil_riesgo == 2) {
                valorRetorno += '<th>Óptimo</th>';
            } else if (perfil_riesgo == 3) {
                valorRetorno += '<th>Cubir</th>';
                valorRetorno += '<th>Fiduacción</th>';
            }

            //devuelvo el valor retorno
            return valorRetorno;
        }
        //fin de la función



        function presentarProductoResultado(pTipoBloque, pTipoPeriordo, pDataResultado) {
            //creo la variable de retorno
            var valorRetorno = '';
            //verificamos el tipo
            if (pTipoBloque === 1) {
                if (pTipoPeriordo == 1) { //caso periodo
                    //agrego la posición
                    valorRetorno += '<td>' + pDataResultado[0] + '</td>';
                    if (perfil_riesgo != 2) {
                        //si el perfil de riego es diferente de 2 se agrega la posición del segundo producto
                        valorRetorno += '<td>' + pDataResultado[1] + '</td>';
                    }
                    //fin del if
                } else if (pTipoPeriordo == 2) { //caso periodo
                    //agrego la posición
                    valorRetorno += '<td>' + pDataResultado[2][1] + '</td>';
                    if (perfil_riesgo != 2) {
                        //si el perfil de riego es diferente de 2 se agrega la posición del segundo producto
                        valorRetorno += '<td>' + pDataResultado[2][3] + '</td>';
                    }
                    //fin del if
                }

                //agrego la posición
            } else if (pTipoBloque === 2) {
                //agrego la posición
                valorRetorno += '<td>' + obtenerPorcentaje(pDataResultado[2][0]) + ' %</td>';
                if (perfil_riesgo != 2) {
                    //si el perfil de riego es diferente de 2 se agrega la posición del segundo producto
                    valorRetorno += '<td>' + obtenerPorcentaje(pDataResultado[2][2]) + ' %</td>';
                }
                //fin del if
            }
            //fin del if
            //devuelvo el valor retorno
            return valorRetorno;
        }
        //fin de la función

        /*
         * 
         * @param {type} pDataMatriz
         * @returns {Array}
         */
        function obtenerDataDesviacionPeriodo(pDataMatriz) {

            var fechaInicio = descomponerFecha(mes_inicio);
            var fechaFinal = descomponerFecha(mes_final);

            //creo la variable de retorno 
            var valorRetorno = new Array();
            //obtengo el largo de la matriz
            var largoMatriz = pDataMatriz.length;
            //iteramos la matriz
            for (var i = 0; i < largoMatriz; i++) {

                //obtengo la fecha del arreglo
                var fechaArreglo = descomponerFecha(pDataMatriz[i][0]);
                //comparo las fechas
                var compararInicio = compararFechas(fechaInicio, fechaArreglo);
                var compararFinal = compararFechas(fechaFinal, fechaArreglo);
                //agrego las rentabilidades necesarias en el rango
                if (compararInicio > 1 && compararFinal < 3) {
                    valorRetorno.push(pDataMatriz[i][1]);
                }
                //fin del if
            }
            //fin del for

            //devuelvo el valor retorno
            return valorRetorno;
            /**/
        }
        //fin de la función


        /*
         * 
         * @param {type} pDataMatriz
         * @returns {Array}
         */
        function obtenerDataDesviacionTrimestre(pDataMatriz) {

            var fechaFinal = descomponerFecha(mes_final);

            //creo la variable de retorno 
            var valorRetorno = new Array();
            //obtengo el largo de la matriz
            var largoMatriz = pDataMatriz.length;
            //iteramos la matriz
            for (var i = 0; i < largoMatriz; i++) {
                //obtengo la fecha del arreglo
                var fechaArreglo = descomponerFecha(pDataMatriz[i][0]);
                //comparo las fechas
                var compararFinal = compararFechas(fechaFinal, fechaArreglo);
                //agrego las rentabilidades necesarias en el rango
                if (compararFinal == 2) {
                    //iteramos al reves 
                    for (var o = i; o > i - 90; o--) {
                        valorRetorno.push(pDataMatriz[o][1]);
                    }

                }
                //fin del if
            }
            //fin del for

            //devuelvo el valor retorno
            return valorRetorno;
            /**/
        }
        //fin de la función

        /*
         * 
         * @param {type} pDataMatriz
         * @returns {Array}
         */
        function obtenerDataDesviacionSemestre(pDataMatriz) {

            var fechaFinal = descomponerFecha(mes_final);

            //creo la variable de retorno 
            var valorRetorno = new Array();
            //obtengo el largo de la matriz
            var largoMatriz = pDataMatriz.length;
            //iteramos la matriz
            for (var i = 0; i < largoMatriz; i++) {
                //obtengo la fecha del arreglo
                var fechaArreglo = descomponerFecha(pDataMatriz[i][0]);
                //comparo las fechas
                var compararFinal = compararFechas(fechaFinal, fechaArreglo);
                //agrego las rentabilidades necesarias en el rango
                if (compararFinal == 2) {
                    //iteramos al reves 
                    for (var o = i; o > i - 180; o--) {
                        valorRetorno.push(pDataMatriz[o][1]);
                    }

                }
                //fin del if
            }
            //fin del for

            //devuelvo el valor retorno
            return valorRetorno;
            /**/
        }
        //fin de la función


        /*
         * 
         * @param {type} pDataMatriz
         * @returns {Array}
         */
        function obtenerDataDesviacionAnual(pDataMatriz) {

            var fechaFinal = descomponerFecha(mes_final);

            //creo la variable de retorno 
            var valorRetorno = new Array();
            //obtengo el largo de la matriz
            var largoMatriz = pDataMatriz.length;
            //iteramos la matriz
            for (var i = 0; i < largoMatriz; i++) {
                //obtengo la fecha del arreglo
                var fechaArreglo = descomponerFecha(pDataMatriz[i][0]);
                //comparo las fechas
                var compararFinal = compararFechas(fechaFinal, fechaArreglo);
                //agrego las rentabilidades necesarias en el rango
                if (compararFinal == 2) {
                    //iteramos al reves 
                    for (var o = i; o > i - 365; o--) {
                        valorRetorno.push(pDataMatriz[o][1]);
                    }

                }
                //fin del if
            }
            //fin del for

            //devuelvo el valor retorno
            return valorRetorno;
            /**/
        }
        //fin de la función


        /*
         * 
         * @param {type} pDataMatriz
         * @returns {Array}
         */
        function obtenerDataDesviacionAnualCorrido(pDataMatriz) {

            var fechaFinal = descomponerFecha(mes_final);
            //obtengo la fecha del ultimo año (le resto al año 1)
            var fechaUltimoAno = descomponerFecha("31/12/" + (fechaFinal[2] - 1));
            //creo la variable de retorno 
            var valorRetorno = new Array();
            //obtengo el largo de la matriz
            var largoMatriz = pDataMatriz.length;
            //iteramos la matriz
            for (var i = 0; i < largoMatriz; i++) {
                //obtengo la fecha del arreglo
                var fechaArreglo = descomponerFecha(pDataMatriz[i][0]);
                //comparo las fechas
                var compararInicio = compararFechas(fechaUltimoAno, fechaArreglo);
                var compararFinal = compararFechas(fechaFinal, fechaArreglo);
                //agrego las rentabilidades necesarias en el rango
                if (compararInicio > 1 && compararFinal < 3) {
                    valorRetorno.push(pDataMatriz[i][1]);
                }
                //fin del if
                //fin del if
            }
            //fin del for

            //devuelvo el valor retorno
            return valorRetorno;
            /**/
        }
        //fin de la función



        /*
         * 
         * @param {type} pArrayCalcular
         * @returns {Number}
         */
        function calcularDesviacionEstandar(pArrayCalcular) {
            //obtengo el largo del arreglo
            var largoArreglo = pArrayCalcular.length;
            //creo la variable de suma
            var sumaArreglo = 0;
            //calculo la suma de los valores
            for (var i = 0; i < largoArreglo; i++) {
                //efectuo la suma
                sumaArreglo = sumaArreglo + pArrayCalcular[i];
            }
            //fin del for
            //calculo la media
            var mediaArreglo = sumaArreglo / largoArreglo;

            //creo el arreglo de difrencias
            var valorDiferencias = 0;
            //calculo las diferencias
            for (var o = 0; o < largoArreglo; o++) {
                //obtengo el valor de la diferencia y la elevo al cuadrado
                valorDiferencias = valorDiferencias + Math.pow((pArrayCalcular[o] - mediaArreglo), 2);
            }
            //obtengo la varianza
            var varianza = valorDiferencias / largoArreglo;
            //obtengo la desviación estandar
            var desviacionEstandar = Math.pow(varianza, 0.5) * Math.pow(365, 0.5);

            //devuelvo la desviación
            return desviacionEstandar;
        }
        //fin de la función


        function obtenerDesviacionProducto1(pData) {
            var desviacionProductoPeriodo = obtenerDesviacionProductoPeriodo(pData);
        }


        function obtenerDesviacionProductoPeriodo(pData) {
            

            var fechaInicio = descomponerFecha(mes_inicio);
            var fechaFinal = descomponerFecha(mes_final);

            //creo la variable de retorno 
            var valorCalcular = new Array();
            //obtengo el largo de la matriz
            var largoMatriz = pData.length;
            //iteramos la matriz
            for (var i = 0; i < largoMatriz; i++) {

                //obtengo la fecha del arreglo
                var fechaArreglo = descomponerFecha(pData[i][1]);
                //comparo las fechas
                var compararInicio = compararFechas(fechaInicio, fechaArreglo);
                var compararFinal = compararFechas(fechaFinal, fechaArreglo);
                //agrego las rentabilidades necesarias en el rango
                if (compararInicio > 1 && compararFinal < 3) {
                    if(compararInicio == 2){
                    }
                    valorCalcular.push(pData[i][0]);
                }
                //fin del if
            }
            //fin del for
            var valorRetorno = calcularDesviacionEstandar(valorCalcular);
            //devuelvo el valor retorno
        }






    });
    // fin de la acción en el botón.









});



