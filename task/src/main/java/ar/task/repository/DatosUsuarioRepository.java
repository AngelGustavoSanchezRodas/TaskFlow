package ar.task.repository;

import ar.task.entities.DatosUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DatosUsuarioRepository extends JpaRepository<DatosUsuario, Integer> {

    // Método mágico: Spring implementa esto solo leyendo el nombre
    // SELECT * FROM datosusuario WHERE correo = ?
    Optional<DatosUsuario> findByCorreo(String correo);
}