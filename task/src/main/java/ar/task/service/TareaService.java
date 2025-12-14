package ar.task.service;

import ar.task.dtos.TareaDTO;
import ar.task.entities.EquipoTrabajo;
import ar.task.entities.Tarea;
import ar.task.entities.Usuario;
import ar.task.repository.EquipoTrabajoRepository;
import ar.task.repository.TareaRepository;
import ar.task.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TareaService {

    @Autowired
    private TareaRepository tareaRepository;

    @Autowired
    private EquipoTrabajoRepository equipoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // 1. CREAR TAREA
    @Transactional
    public TareaDTO crearTarea(TareaDTO tareaDTO) {

        // A. BUSCAR LAS RELACIONES (Validar que existan los IDs)
        // Buscamos el equipo. Si no existe, lanzamos error (RuntimeException por ahora)
        EquipoTrabajo equipo = equipoRepository.findById(tareaDTO.getIdEquipo())
                .orElseThrow(() -> new RuntimeException("Error: El equipo con ID " + tareaDTO.getIdEquipo() + " no existe."));

        Usuario creador = usuarioRepository.findById(tareaDTO.getIdUsuarioCreador())
                .orElseThrow(() -> new RuntimeException("Error: Usuario creador no encontrado."));

        Usuario asignado = usuarioRepository.findById(tareaDTO.getIdUsuarioAsignado())
                .orElseThrow(() -> new RuntimeException("Error: Usuario asignado no encontrado."));

        // B. MAPEO (DTO -> Entidad)
        Tarea nuevaTarea = new Tarea();
        nuevaTarea.setTitulo(tareaDTO.getTitulo());
        nuevaTarea.setDescripcion(tareaDTO.getDescripcion());
        nuevaTarea.setEstado(true); // Por defecto activa/pendiente
        nuevaTarea.setPrioridad(tareaDTO.getPrioridad());
        nuevaTarea.setCategoria(tareaDTO.getCategoria());
        nuevaTarea.setFechaCreacion(new Date()); // Fecha de hoy
        nuevaTarea.setFechaFin(tareaDTO.getFechaFin());
        nuevaTarea.setActivo(true);

        // Aquí metemos los OBJETOS completos que encontramos arriba
        nuevaTarea.setEquipoTrabajo(equipo);
        nuevaTarea.setUsuarioCreador(creador);
        nuevaTarea.setUsuarioAsignado(asignado);

        // C. GUARDAR
        Tarea tareaGuardada = tareaRepository.save(nuevaTarea);

        // D. RETORNAR DTO (Actualizamos el ID generado)
        tareaDTO.setIdTarea(tareaGuardada.getIdTarea());
        return tareaDTO;
    }

    // 2. LISTAR TAREAS POR EQUIPO
    // Este método devuelve una lista de DTOs, no de Entidades (para proteger datos)
    public List<TareaDTO> obtenerTareasPorEquipo(Integer idEquipo) {
        List<Tarea> tareas = tareaRepository.findByEquipoTrabajo_IdEquipo(idEquipo);

        // Convertimos la lista de Entidades a lista de DTOs usando Streams (magia de Java 8)
        return tareas.stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    // Método auxiliar privado para convertir Entidad -> DTO (para no repetir código)
    private TareaDTO convertirADTO(Tarea tarea) {
        TareaDTO dto = new TareaDTO();
        dto.setIdTarea(tarea.getIdTarea());
        dto.setTitulo(tarea.getTitulo());
        dto.setDescripcion(tarea.getDescripcion());
        dto.setEstado(tarea.getEstado());
        dto.setPrioridad(tarea.getPrioridad());
        dto.setFechaFin(tarea.getFechaFin());

        dto.setCategoria(tarea.getCategoria());

        // Solo devolvemos los IDs, no los objetos enteros
        dto.setIdEquipo(tarea.getEquipoTrabajo().getIdEquipo());
        dto.setIdUsuarioCreador(tarea.getUsuarioCreador().getIdUsuario());

        if (tarea.getUsuarioAsignado() != null) {
            dto.setIdUsuarioAsignado(tarea.getUsuarioAsignado().getIdUsuario());
        }

        return dto;
    }

    // Método para cambiar SOLO el estado (Pendiente/Terminada)
    @Transactional
    public TareaDTO cambiarEstado(Integer idTarea, Boolean nuevoEstado) {

        // 1. BUSCAR: Usamos findById para traer el objeto completo
        // Si no existe, lanzamos el error de una vez con .orElseThrow
        Tarea tarea = tareaRepository.findById(idTarea)
                .orElseThrow(() -> new RuntimeException("Error: No se encontró la tarea con ID " + idTarea));

        // 2. MODIFICAR: Cambiamos solo el campo que nos interesa
        tarea.setEstado(nuevoEstado);

        // 3. GUARDAR: Al usar .save() con un objeto que ya tiene ID,
        // Spring sabe que es una ACTUALIZACIÓN (Update), no una creación.
        Tarea tareaActualizada = tareaRepository.save(tarea);

        // 4. RETORNAR: Convertimos a DTO para devolver la respuesta
        return convertirADTO(tareaActualizada);
    }

   // Cambiamos a 'void' porque al borrar ya no tenemos objeto que devolver
    public void eliminarTarea(Integer idTarea) {

        // 1. VERIFICAR (Usamos un if simple)
        if (!tareaRepository.existsById(idTarea)) {
            throw new RuntimeException("Error: No se encontró la tarea con ID " + idTarea);
        }

        // 2. BORRAR
        tareaRepository.deleteById(idTarea);
    }


}