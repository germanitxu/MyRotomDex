
$(document).ready(function () {
    generarPokemon(10);
    llenarSelectTipos();
    llenarSelectPaginas();
    $("#rotomBar").draggable();
    $(".shown, #notFound").hide();
    $("#panelInfo").hide();
    var ordenTipos = ["Normal", "Fuego", "Agua", "Eléctrico", "Planta", "Hielo", "Lucha",
        "Veneno", "Tierra", "Volador", "Psíquico", "Bicho", "Roca", "Fantasma",
        "Dragón", "Siniestro", "Acero", "Hada"];
    var r = 127;
    var g = 217;
    var b = 243;
    /**
     *   Carga JSON
     */
    $(".shown").on("click", function () {
        $("#idPanel, #nombrePanel, #tiposTexto,#datosTexto").empty();
        var id = $(this).attr('id');
        var nombre = "";
        var src = "";

        $.getJSON('pokemon.json', function (resultado) {

            $.each(resultado, function (i, el) {
                if (id == el['id']) {
                    $("#idPanel").append("<p>" + id + "</p>");
                    $("#nombrePanel").append("<p>" + el['nombre'].toUpperCase() + "</p>");
                    $("#tiposTexto").append('<span id="spanTipo">Tipo: </span>' + el['tipo1'] + " " + el['tipo2']);
                    $("#datosTexto").append(el['desc']);
                    src = "imagenes/pokemon/" + id + " " + el['nombre'] + ".gif";
                    $("#pokemonPanel").attr('src', src);
                    $('#panelInfo').css({top: '50%', left: '50%', margin: '-' + ($('#panelInfo').height() / 2) + 'px 0 0 -' + ($('#panelInfo').width() / 2) + 'px'});
                    $("#panelInfo").show();
                    luces(false);

                }
            });
        });

    });


    /**
     * Esta funcion controla el apagado de la pantalla informativa del pokemon
     * Al apretar en cualquier sitio menos en otro pokemon o en el Rotom se apaga la pantalla
     */
    $("html").click(function (e) {
        if ($(e.target).hasClass('shown') || e.target.nodeName == 'IMG') {
            return false;
        }
        luces(true);
        $("#panelInfo").hide();

    });
    /**
     * Esta funcion va a resetear los selects al empezar la busqueda para que sea mas habil.
     */
    $("#fname").on("click", function () {
        var pokes = $("#miPc").length;
        $('#selectOrden option[value="todos"]').attr('selected', 'selected');

        $('#selectPaginas option[value=35]').attr('selected', 'selected');
        $('.shown').show();

    });
    /**
     * Busqueda de pokemons en el campo de busqueda
     */
    $("#fname").on("keyup", function (event) {

        if ($("#selectOrden").val() != 3) {
            //busqueda normal
            if ($("#fname").val().length != 0) {


                $(".shown").hide();
                $.post("funciones.php", {indice: $("#fname").val()}, function (data) {

                    var nombres = data.split('/');
                    nombres = nombres.slice(0, -1);
                    if (nombres.length != 0) {
                        $("#notFound").hide();
                        $.each(nombres, function (i, el) {
                            var idPokemon = "#" + el.substring(0, 3);
                            $(idPokemon).show();

                        });
                    } else {
                        $("#notFound").show();
                    }
                });


            } else {
                $(".shown").show();
                $("#notFound").hide();
            }
        } else {

        }
    });


    /**
     * Funcion de fondo de pantalla
     */
    $("html").on("wheel", function (e) {
        var rgb = ($('body').css("background-color")).match(/\d+/g);
        var r = rgb[0];
        var g = rgb[1];
        var b = rgb[2];
        if ($("#panelInfo").css('display') == 'none') {
            if (e.originalEvent.deltaY < 0) {
                $("body").css('background-color', 'rgb(' + (+r + 2) + ',' + (+g + 2) + ',' + (+b + 2) + ')');
            } else {

                $("body").css('background-color', 'rgb(' + (r - 2) + ',' + (g - 2) + ',' + (b - 2) + ')');
            }
            ;
        }
        ;


    });
    /**
     *   Muestra solo el numero de pokemons elegidos
     */
    $("#selectPaginas").change(function () {
        $(".shown").hide();
        var num = $("#selectPaginas").val();
        $('#selectOrden option[value=num]').attr('selected', 'selected');
        generarPokemon(num);
    });

    /**
     *   Muestra por TIPO (Increible verdad? Hasta donde pretende
     * llegar la tecnologia de hoy en dia :O )
     */
    $("#selectOrden").change(function () {
        $("#notFound").hide();
        $(".shown").hide();
        var num = $("#selectPaginas").val();
        var clase = $("#selectOrden").val();

        if (clase == "num") {
            $(".shown:lt(" + num + ")").show();
            
        } else {
            if ($("." + clase).length == 0) {
                $("#notFound").show();
            } else {
                $("." + clase).show();
                $('data-type1="'+clase+'"').show();
                $('data-type2="'+clase+'"').show();
            }
        }


    });
    /**
     * Enciende y apaga las luces. Un poco
     */
    function luces(bool) {
        //apagar las luces
        if (!bool) {
            $("body").animate({
                backgroundColor: 'rgb(0,3,29)'
            }, 400);
            $("#barras").fadeTo(600, .5);
            //encender las luces
        } else {
            $("html body").animate({
                backgroundColor: 'rgb(127,217,243)',
            }, 600);
            $("#barras").fadeTo(400, 1);

        }
    }

    function generarPokemon(max) {
        var creature = '';

        $.getJSON('pokemon.json', function (resultado) {
            boxsize = resultado.length;
            $.each(resultado, function (i, el) {
                if (i >= max) {
                    return false;
                }
                ;
                var id = '';
                if (el['id'] < 10) {
                    id = '00' + el['id'];
                } else if (el['id'] < 100) {
                    id = '0' + el['id'];
                } else {
                    id = el['id'];
                }
                creature += '<figure data-name="' + el['nombre'] + '" data-type1="' + el['tipo1'] + '" data-type2="' + el['tipo2'] + '" class="figura shown ' + el['tipo1'] + ' ' + el['tipo2'] + '" id="' + id + '">' +
                        '<img class="imagenPokemon" src="imagenes/pokemon/' + id + ' ' + el['nombre'] + '.gif">' +
                        ' <figcaption class="nombrePoke">' + el['nombre'] + '</figcaption>' +
                        '<img class="tipo" src="imagenes/tipos/Tipo_' + el['tipo1'] + '.gif">';
                el['tipo2'] !== " " ? creature += '<img class="tipo"  src="imagenes/tipos/Tipo_' + el['tipo2'] + '.gif">' : creature += '';
                creature += '</figure>';
            });
            $("#miPc").append(creature);
        });

    }
    /**
     * Al apretar en el rotom, desaparece y vuelve a aparecer los buscadores
     */

    function mostrarBuscador() {
        var list = document.getElementsByClassName("buscador");
        for (var i = 0; i < list.length; i++) {
            if (list[i].style["visibility"] == "hidden") {
                list[i].style["visibility"] = "visible";
                document.getElementById("rotomBar").style.pointerEvents = "auto";
            } else {
                list[i].style["visibility"] = "hidden";
                document.getElementById("rotomBar").style.pointerEvents = "none";
                document.getElementById("pokemonFlotante").style.pointerEvents = "auto";
                document.getElementById("rotomBar").style.marginRight = "10%";
            }
        }
    }
    /**
     * Rellena el desplegable segun la cantidad de pokemons que haya en miPc
     */
    function llenarSelectPaginas() {
        var select = document.getElementById('selectPaginas');
        for (var i = 1; i <= ((34 / 10) - 1); i++) {
            var opt = document.createElement('option');
            opt.value = (i * 10);
            opt.innerHTML = (i * 10);
            select.appendChild(opt);
        }
        var opt = document.createElement('option');
        opt.value = 34;
        opt.innerHTML = "Todos";
        select.appendChild(opt);
    }
    /**
     * Rellena el desplegable con los 15 tipos elementales.
     */
    function llenarSelectTipos() {
        var ordenTipos = ["Normal", "Fuego", "Agua", "Eléctrico", "Planta", "Hielo", "Lucha",
            "Veneno", "Tierra", "Volador", "Psíquico", "Bicho", "Roca", "Fantasma",
            "Dragón"];
        var select = document.getElementById('selectOrden');
        var opt = document.createElement('option');
        opt.value = "todos";
        opt.innerHTML = "Todos";
        select.appendChild(opt);
        for (var i = 1; i <= ordenTipos.length - 1; i++) {
            var opt = document.createElement('option');
            opt.value = ordenTipos[i].toLowerCase();
            opt.innerHTML = ordenTipos[i];
            select.appendChild(opt);
        }
    }
    ;


});
