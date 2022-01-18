<?php
session_start();
include('../../BD/bd.php');
$data = json_decode(file_get_contents('php://input'), true);

if ($data['action'] == 'ranking') {
    ranking();
}

if ($data['action'] == 'updateUserGame') {
    $user = isset($_SESSION['userActivo']) ? $_SESSION['userActivo'] : "";
    $score = $data['puntuacion'];

    updateUserGame($score, $user);
}
function ranking()
{
    $connection = openBd();

    $consulta = "SELECT score, users.nickname FROM juego_user 
                 JOIN users
                 WHERE idJuego = 2 AND idUser = users.id AND score > 0
                 ORDER BY score DESC LIMIT 5";

    $sentence = $connection->prepare($consulta);
    $sentence->execute();

    $result = $sentence->fetchAll(PDO::FETCH_ASSOC);

    $connection = closeBd();

    if (!empty($result)) {
        echo json_encode($result);
    } else {
        echo json_encode([]);
    }

    $connection = closeBd();
    return $result[0];
}
function updateUserGame($score, $user)
{
    $connection = openBd();
    try {
        $connection->beginTransaction();

        $id_user = $user['id'];
        $consultaSelect = "SELECT score FROM juego_user WHERE idJuego =2 AND idUser = :id_user";
        $query = $connection->prepare($consultaSelect);
        $query->bindParam(':id_user', $id_user);
        $query->execute();

        $scoreExistente = $query->fetchAll(PDO::FETCH_ASSOC);

        if ($scoreExistente[0]['score'] < $score) {
            $consulta = "UPDATE juego_user SET juegoCompleto = 1, score =:score
            WHERE idUser =:id_user AND idJuego = 2";

            $sentence = $connection->prepare($consulta);
            $sentence->bindParam(':score', $score);
            $sentence->bindParam(':id_user', $id_user);
            $sentence->execute();
        }


        $connection->commit();
    } catch (PDOException $ex) {
        $connection->rollBack();
    }

    $connection = closeBd();
}
