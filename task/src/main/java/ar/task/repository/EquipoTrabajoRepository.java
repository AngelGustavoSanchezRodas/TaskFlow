package ar.task.repository;

import ar.task.entities.EquipoTrabajo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipoTrabajoRepository extends JpaRepository<EquipoTrabajo, Integer> {

    // Traer solo los equipos que no han sido borrados lógicamente
    List<EquipoTrabajo> findByActivoTrue();
}