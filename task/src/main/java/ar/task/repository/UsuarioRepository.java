package ar.task.repository;

import ar.task.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Busca el Usuario padre filtrando por el correo de su hijo (DatosUsuario)
    Optional<Usuario> findByDatosUsuario_Correo(String correo);
}