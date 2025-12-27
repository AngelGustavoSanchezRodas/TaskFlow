package ar.task.service;

import ar.task.dtos.EquipoDTO;
import ar.task.dtos.EquipoUsuarioDTO; // 👈 Importante
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
    public EquipoDTO crearEquipo(EquipoDTO equipoDTO) {
        EquipoTrabajo equipo = new EquipoTrabajo();
        equipo.setNombre(equipoDTO.getNombre());
        equipo.setCategoria(equipoDTO.getCategoria());
        equipo.setActivo(true);

        EquipoTrabajo equipoGuardado = equipoRepository.save(equipo);

        equipoDTO.setIdEquipo(equipoGuardado.getIdEquipo());
        equipoDTO.setActivo(true);
        return equipoDTO;
    }

    //  AGREGAR UN USUARIO A UN EQUIPO
    @Transactional
    public void agregarMiembro(Integer idEquipo, Integer idUsuario, String rol) {
        EquipoTrabajo equipo = equipoRepository.findById(idEquipo)
                .orElseThrow(() -> new RuntimeException("Equipo no encontrado"));

        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (usuarioEquipoRepository.findByUsuario_IdUsuarioAndEquipoTrabajo_IdEquipo(idUsuario, idEquipo).isPresent()) {
            throw new RuntimeException("El usuario ya pertenece a este equipo");
        }

        UsuarioEquipo membresia = new UsuarioEquipo();
        membresia.setEquipoTrabajo(equipo);
        membresia.setUsuario(usuario);
        membresia.setRol(rol);
        membresia.setActivo(true);

        usuarioEquipoRepository.save(membresia);
    }

    // 👇 MÉTODOS CORREGIDOS 👇

    // Este método ahora devuelve EquipoUsuarioDTO (CON ROL)
    public List<EquipoUsuarioDTO> obtenerEquiposDelUsuario(Integer idUsuario) {
        List<UsuarioEquipo> membresias = usuarioEquipoRepository.findByUsuario_IdUsuario(idUsuario);

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
}