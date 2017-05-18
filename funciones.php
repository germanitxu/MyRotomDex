<?php


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if (isset($_POST["indice"]) and $_POST["indice"] !== '') {
    
    $titulo = scandir('imagenes/pokemon/');
    $result = '';
    for ($i = 0; $i < count($titulo); $i++) {
        $nombre = substr($titulo[$i],0,-4);
        if (strpos($nombre, $_POST["indice"])) {
            $result.=$nombre;
            $result.="/";
        }
    }

    echo $result;
}
?>