USE infinity_jump_db;

-- REVISIÓN DE VISTAS -- 

SELECT * FROM globalranking; -- Todo bien (podría filtrar esto por tiempo también)

SELECT * FROM historialintentos; -- Todo bien

SELECT * FROM usuariosregistrados; -- Todo bien

SELECT * FROM usomejoras; -- Todo bien

SELECT * FROM historialintentos WHERE Jugador="jugador1"; -- Todo bien

SELECT * FROM historialintentos WHERE Jugador="jugador2"; -- Todo bien

SELECT * FROM partidas; -- Todo bien

SELECT * FROM inventario; -- Todo bien

SELECT * FROM usuarios; -- Todo bien

SELECT * FROM nivelesmascomunes; -- Todo bien

SELECT * FROM vistainventario WHERE id_usuario = 1; -- Todo bien