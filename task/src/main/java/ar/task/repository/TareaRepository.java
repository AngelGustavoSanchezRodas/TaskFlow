package ar.task.repository;

import ar.task.entities.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Integer> {

    // 1. Buscar todas las tareas de un equipo específico
    // Spring navega por la relación: Tarea -> equipoTrabajo -> idEquipo
    List<Tarea> findByEquipoTrabajo_IdEquipo(Integer idEquipo);

    // 2. Buscar tareas asignadas a un usuario específico
    List<Tarea> findByUsuarioAsignado_IdUsuario(Integer idUsuario);

    // 3. Buscar tareas por estado (ej: Pendientes/Completadas) dentro de un equipo
    List<Tarea> findByEquipoTrabajo_IdEquipoAndEstado(Integer idTarea, Boolean estado);
}