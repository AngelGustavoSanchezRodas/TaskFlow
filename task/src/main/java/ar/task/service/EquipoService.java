package ar.task.service;

import ar.task.dtos.EquipoDTO;
import ar.task.entities.EquipoTrabajo;
import ar.task.entities.Usuario;
import ar.task.entities.UsuarioEquipo;
import ar.task.repository.EquipoTrabajoRepository;
import ar.task.repository.UsuarioEquipoRepository;
import ar.task.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EquipoService {

    @Autowired
    private EquipoTrabajoRepository equipoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioEquipoRepository usuarioEquipoRepository;

    // 1. CREAR UN EQUIPO NUEVO
    @Transactional
    public EquipoDTO crearEquipo(EquipoDTO equipoDTO) {
        EquipoTrabajo equipo = new EquipoTrabajo();
        equipo.setNombre(equipoDTO.getNombre());
        equipo.setCategoria(equipoDTO.getCategoria());
        equipo.setActivo(true);

        EquipoTrabajo equipoGuardado = equipoRepository.save(equipo);

        // Devolvemos el DTO con el ID generado
        equipoDTO.setIdEquipo(equipoGuardado.getIdEquipo());
        equipoDTO.setActivo(true);
        return equipoDTO;
    }

    // 2. AGREGAR UN USUARIO A UN EQUIPO (¡Muy Importante!)
    // Este método crea la relación en la tabla "usuario_equipo"
    @Transactional
    public void agregarMiembro(Integer idEquipo, Integer idUsuario, String rol) {

        // A. Validar que existan ambos
        EquipoTrabajo equipo = equipoRepository.findById(idEquipo)
                .orElseThrow(() -> new RuntimeException("Equipo no encontrado"));

        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // B. Validar si ya es miembro (para no duplicar)
        if (usuarioEquipoRepository.findByUsuario_IdUsuarioAndEquipoTrabajo_IdEquipo(idUsuario, idEquipo).isPresent()) {
            throw new RuntimeException("El usuario ya pertenece a este equipo");
        }

        // C. Crear la relación
        UsuarioEquipo membresia = new UsuarioEquipo();
        membresia.setEquipoTrabajo(equipo);
        membresia.setUsuario(usuario);
        membresia.setRol(rol); // Ej: "LIDER", "COLABORADOR"
        membresia.setActivo(true);

        usuarioEquipoRepository.save(membresia);
    }

    // 3. LISTAR EQUIPOS DE UN USUARIO
    // Sirve para mostrarle al usuario "Mis Equipos" en el frontend
    public List<EquipoDTO> obtenerEquiposDelUsuario(Integer idUsuario) {
        List<UsuarioEquipo> membresias = usuarioEquipoRepository.findByUsuario_IdUsuario(idUsuario);

        // Convertimos la lista de membresías a una lista de equipos simples (DTOs)
        return membresias.stream()
                .map(membresia -> {
                    EquipoTrabajo eq = membresia.getEquipoTrabajo();
                    EquipoDTO dto = new EquipoDTO();
                    dto.setIdEquipo(eq.getIdEquipo());
                    dto.setNombre(eq.getNombre());
                    dto.setCategoria(eq.getCategoria());
                    dto.setActivo(eq.getActivo());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}