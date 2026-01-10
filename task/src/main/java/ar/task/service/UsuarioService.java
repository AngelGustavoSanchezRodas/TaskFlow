package ar.task.service;

import ar.task.dtos.UsuarioRegistroDTO;
import ar.task.dtos.UsuarioSalidaDTO;
import ar.task.entities.DatosUsuario;
import ar.task.entities.Usuario;
import ar.task.repository.DatosUsuarioRepository;
import ar.task.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private DatosUsuarioRepository datosUsuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Método principal para registrar
    @Transactional
    public UsuarioSalidaDTO registrarUsuario(UsuarioRegistroDTO usuarioDTO) {

        // 1. Verificamos si el CORREO ya existe
        if (datosUsuarioRepository.findByCorreo(usuarioDTO.getCorreo()).isPresent()) {
            throw new RuntimeException("Error: El correo " + usuarioDTO.getCorreo() + " ya está registrado.");
        }

        // 2. CONVERSIÓN (DTO -> Entidades)
        DatosUsuario datos = new DatosUsuario();
        datos.setNombre(usuarioDTO.getNombre());
        datos.setApellido(usuarioDTO.getApellido());
        datos.setCorreo(usuarioDTO.getCorreo());
        datos.setActivo(true);
        datos.setContrasenia(passwordEncoder.encode(usuarioDTO.getContrasenia()));

        Usuario usuario = new Usuario();
        // (Eliminada la línea usuario.setUserName)

        // Relacionarlos
        usuario.setDatosUsuario(datos);

        // 3. GUARDADO
        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        // 4. RESPUESTA
        UsuarioSalidaDTO respuesta = new UsuarioSalidaDTO();
        respuesta.setIdUsuario(usuarioGuardado.getIdUsuario());
        // (Eliminada la respuesta de userName)

        respuesta.setNombre(usuarioGuardado.getDatosUsuario().getNombre());
        respuesta.setApellido(usuarioGuardado.getDatosUsuario().getApellido());
        respuesta.setCorreo(usuarioGuardado.getDatosUsuario().getCorreo());
        respuesta.setIdDatosUsuario(usuarioGuardado.getDatosUsuario().getIdDatosUsuario());

        return respuesta;
    }

    public UsuarioSalidaDTO login(String correo, String contrasenia) {

        // Buscamos al USUARIO usando el correo
        Usuario usuario = usuarioRepository.findByDatosUsuario_Correo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Validamos contraseña
        if (!passwordEncoder.matches(contrasenia, usuario.getDatosUsuario().getContrasenia())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // Llenamos el DTO
        UsuarioSalidaDTO dto = new UsuarioSalidaDTO();

        dto.setIdUsuario(usuario.getIdUsuario());
        // (Eliminado dto.setUserName)

        dto.setIdDatosUsuario(usuario.getDatosUsuario().getIdDatosUsuario());
        dto.setNombre(usuario.getDatosUsuario().getNombre());
        dto.setApellido(usuario.getDatosUsuario().getApellido());
        dto.setCorreo(usuario.getDatosUsuario().getCorreo());

        return dto;
    }

    @Transactional
    public UsuarioSalidaDTO editarPerfil(Integer idUsuario, String nombre, String apellido, String correo) {
        // Buscamos al usuario
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Actualizamos los datos (que viven en DatosUsuario)
        usuario.getDatosUsuario().setNombre(nombre);
        usuario.getDatosUsuario().setApellido(apellido);
        usuario.getDatosUsuario().setCorreo(correo);

        // Guardamos (el Cascade actualiza DatosUsuario automáticamente)
        usuarioRepository.save(usuario);

        // Devolvemos los datos actualizados para que el Front se actualice al instante
        UsuarioSalidaDTO dto = new UsuarioSalidaDTO();
        dto.setIdUsuario(usuario.getIdUsuario());
        dto.setIdDatosUsuario(usuario.getDatosUsuario().getIdDatosUsuario());
        dto.setNombre(usuario.getDatosUsuario().getNombre());
        dto.setApellido(usuario.getDatosUsuario().getApellido());
        dto.setCorreo(usuario.getDatosUsuario().getCorreo());

        return dto;
    }
}