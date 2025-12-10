package ar.task.repository;

import ar.task.entities.UsuarioEquipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioEquipoRepository extends JpaRepository<UsuarioEquipo, Integer> {

    // Buscar todos los miembros de un equipo
    List<UsuarioEquipo> findByEquipoTrabajo_IdEquipo(Integer idEquipo);

    // Buscar en qué equipos está un usuario
    List<UsuarioEquipo> findByUsuario_IdUsuario(Integer idUsuario);

    // Verificar si un usuario ya pertenece a un equipo específico (para no agregarlo doble)
    Optional<UsuarioEquipo> findByUsuario_IdUsuarioAndEquipoTrabajo_IdEquipo(Integer idUsuario, Integer idEquipo);
}