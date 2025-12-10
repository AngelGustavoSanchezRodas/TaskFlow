package ar.task.repository;

import ar.task.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Para buscar si existe un usuario tipo "Agustavo93"
    Optional<Usuario> findByUserName(String userName);
}