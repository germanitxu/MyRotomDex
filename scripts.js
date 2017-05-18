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
            document.getElementById("rotomBar").style.marginRight="10%";
        }
    }
}
/**
* Rellena el desplegable segun la cantidad de pokemons que haya en miPc
*/
function llenarSelectPaginas() {
    var select = document.getElementById('selectPaginas');
    var x = document.getElementById("miPc").childElementCount;


    for (var i = 1; i<=((x/10)-1); i++){
        var opt = document.createElement('option');
        opt.value = (i*10);
        opt.innerHTML = (i*10);
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
function llenarSelectTipos(){
    var ordenTipos = ["Normal", "Fuego", "Agua", "Eléctrico", "Planta", "Hielo", "Lucha",
        "Veneno", "Tierra", "Volador", "Psíquico", "Bicho", "Roca", "Fantasma",
        "Dragón"];
    var select = document.getElementById('selectOrden');
    var opt = document.createElement('option');
    opt.value = "todos";
    opt.innerHTML = "Todos";
    select.appendChild(opt);
    for (var i = 1; i<=ordenTipos.length-1; i++){
        var opt = document.createElement('option');
        opt.value = ordenTipos[i].toLowerCase();
        opt.innerHTML = ordenTipos[i];
        select.appendChild(opt);
    }
}