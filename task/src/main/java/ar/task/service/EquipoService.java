package ar.task.service;

import ar.task.dtos.EquipoDTO;
import ar.task.dtos.EquipoUsuarioDTO;
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

    //  CREAR UN EQUIPO NUEVO
    @Transactional
    public EquipoDTO crearEquipo(EquipoDTO equipoDTO, Integer idUsuarioCreador) {

        // Guardar el equipo en la base de datos
        EquipoTrabajo equipo = new EquipoTrabajo();
        equipo.setNombre(equipoDTO.getNombre());
        equipo.setCategoria(equipoDTO.getCategoria());
        equipo.setActivo(true);

        // Guardar el equipo
        EquipoTrabajo equipoGuardado = equipoRepository.save(equipo);

        agregarMiembro(equipoGuardado.getIdEquipo(), idUsuarioCreador, "LIDER");

        // Devolver el DTO con el ID asignado
        equipoDTO.setIdEquipo(equipoGuardado.getIdEquipo());
        equipoDTO.setActivo(true);
        return equipoDTO;
    }

    //  AGREGAR UN USUARIO A UN EQUIPO
    @Transactional
    public void agregarMiembro(Integer idEquipo, Integer idUsuario, String rol) {

        // Validar que el equipo y el usuario existan
        EquipoTrabajo equipo = equipoRepository.findById(idEquipo)
                .orElseThrow(() -> new RuntimeException("Equipo no encontrado"));

        // Validar que el usuario exista
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Verificar si el usuario ya es miembro del equipo
        if (usuarioEquipoRepository.findByUsuario_IdUsuarioAndEquipoTrabajo_IdEquipo(idUsuario, idEquipo).isPresent()) {
            throw new RuntimeException("El usuario ya pertenece a este equipo");
        }

        // Crear la relación UsuarioEquipo
        UsuarioEquipo membresia = new UsuarioEquipo();
        membresia.setEquipoTrabajo(equipo);
        membresia.setUsuario(usuario);
        membresia.setRol(rol);
        membresia.setActivo(true);

        usuarioEquipoRepository.save(membresia);
    }

    // Este método ahora devuelve EquipoUsuarioDTO (CON ROL)
    public List<EquipoUsuarioDTO> obtenerEquiposDelUsuario(Integer idUsuario) {
        // Obtener las membresías del usuario
        List<UsuarioEquipo> membresias = usuarioEquipoRepository.findByUsuario_IdUsuario(idUsuario);

        // Mapear a DTOs de EquipoUsuarioDTO
        return membresias.stream()
                .map(membresia -> {
                    EquipoUsuarioDTO dto = new EquipoUsuarioDTO();

                    // Datos del equipo
                    dto.setIdEquipo(membresia.getEquipoTrabajo().getIdEquipo());
                    dto.setNombreEquipo(membresia.getEquipoTrabajo().getNombre());
                    dto.setCategoria(membresia.getEquipoTrabajo().getCategoria());

                    // Dato del rol
                    dto.setMiRol(membresia.getRol());

                    return dto;
                })
                .collect(Collectors.toList());
    }

    public void unirseAlEquipo (Integer idEquipo, Integer IdUsuario){

        // Simplemente reutilizamos el método existente para agregar al usuario como "COLABORADOR"
        this.agregarMiembro(idEquipo, IdUsuario, "COLABORADOR");

    }

}