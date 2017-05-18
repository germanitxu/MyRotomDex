<?php

$host = "127.0.0.1";
$port = 3306;
$socket = "";
$user = "root";
$password = "root";
$dbname = "pokedex";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
        or die('Could not connect to the database server' . mysqli_connect_error());
$query = "select * from datos";
if ($stmt = $con->prepare($query)) {

    $stmt->bind_result($id, $numero, $nombre, $tipo1, $tipo2,$desc);
    $stmt->execute();

    $json = [];

    while ($stmt->fetch()) {
        $variable = [
            "id" => $id,
            "nombre" => $nombre,
            "tipo1" => $tipo1,
            "tipo2" => $tipo2,
            "desc" => $desc
        ];


        $json[] = $variable;
    }
    $json = json_encode($json);
    $fop = fopen("pokemon.json", 'w');
    fwrite($fop, $json);
    fclose($fop);
    $stmt->close();
}
if (isset($_SESSION["qWhere"])) {
    unset($_SESSION["qWhere"]);
}
    
