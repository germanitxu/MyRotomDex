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
            $("#miPc").attr('data-storage', resultado.length);
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
                creature += '<figure data-name="' + el['nombre'] + '" data-type-pr="' + el['tipo1'] + '" data-type-sc="' + el['tipo2'] + '" class="figura shown" id="' + id + '">' +
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
        $("#selectPaginas").empty();
        var select = document.getElementById('selectPaginas');
        var x = parseInt($("#miPc").attr('data-storage'));
        for (var i = 1; i <= (( x/ 10) - 1); i++) {
            var opt = document.createElement('option');
            opt.value = (i * 10);
            opt.innerHTML = (i * 10);
            select.appendChild(opt);
        }
        var opt = document.createElement('option');
        opt.value = x;
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