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

    // 2. Inyección de Dependencias: Traemos el repositorio para poder guardar
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private DatosUsuarioRepository datosUsuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inyección de la herramienta

    // Método principal para registrar
    @Transactional // 3. Si algo falla en medio del proceso, hace "rollback" (deshace todo)
    public UsuarioSalidaDTO registrarUsuario(UsuarioRegistroDTO usuarioDTO) {

        // A. VALIDACIÓN (Lógica de Negocio)
        // 1. VALIDACIONES PREVIAS (El Escudo)
    // Verificamos si el CORREO ya existe
    if (datosUsuarioRepository.findByCorreo(usuarioDTO.getCorreo()).isPresent()) {
        throw new RuntimeException("Error: El correo " + usuarioDTO.getCorreo() + " ya está registrado.");
    }

    // Verificamos si el USERNAME ya existe
    if (usuarioRepository.findByUserName(usuarioDTO.getUserName()).isPresent()) {
        throw new RuntimeException("Error: El usuario " + usuarioDTO.getUserName() + " ya está ocupado.");
    }

        // B. CONVERSIÓN (DTO -> Entidades)
        //  Crear y llenar DatosUsuario
        DatosUsuario datos = new DatosUsuario();
        datos.setNombre(usuarioDTO.getNombre());
        datos.setApellido(usuarioDTO.getApellido());
        datos.setCorreo(usuarioDTO.getCorreo());
        datos.setActivo(true);

        datos.setContrasenia(passwordEncoder.encode(usuarioDTO.getContrasenia())); //   Encriptamos

        //Crear y llenar Usuario
        Usuario usuario = new Usuario();
        usuario.setUserName(usuarioDTO.getUserName());

        //  Relacionarlos
        usuario.setDatosUsuario(datos); // Al meter 'datos' dentro de 'usuario'...

        // GUARDADO (Llamar al repositorio)
        // Gracias al CASCADE.ALL, al guardar 'usuario', se guarda 'datos' automáticamente
        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        // RESPUESTA (Entidad -> DTO Salida)
        // Convertimos el resultado final a un DTO seguro (sin contraseña)
        UsuarioSalidaDTO respuesta = new UsuarioSalidaDTO();
        respuesta.setIdUsuario(usuarioGuardado.getIdUsuario());
        respuesta.setUserName(usuarioGuardado.getUserName());
        respuesta.setNombre(usuarioGuardado.getDatosUsuario().getNombre());
        respuesta.setApellido(usuarioGuardado.getDatosUsuario().getApellido());
        respuesta.setCorreo(usuarioGuardado.getDatosUsuario().getCorreo());
        respuesta.setIdDatosUsuario(usuarioGuardado.getDatosUsuario().getIdDatosUsuario());

        return respuesta;
    }

 public UsuarioSalidaDTO login(String correo, String contrasenia) {

        //  Buscamos al USUARIO COMPLETO (Padre) usando el correo
        Usuario usuario = usuarioRepository.findByDatosUsuario_Correo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        //  Validamos contraseña (sacándola de los datos del usuario)
        if (!passwordEncoder.matches(contrasenia, usuario.getDatosUsuario().getContrasenia())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        //  Llenamos el DTO con TODO
        UsuarioSalidaDTO dto = new UsuarioSalidaDTO();

        // Datos del Padre
        dto.setIdUsuario(usuario.getIdUsuario());
        dto.setUserName(usuario.getUserName());

        // Datos del Hijo
        dto.setIdDatosUsuario(usuario.getDatosUsuario().getIdDatosUsuario());
        dto.setNombre(usuario.getDatosUsuario().getNombre());
        dto.setApellido(usuario.getDatosUsuario().getApellido());
        dto.setCorreo(usuario.getDatosUsuario().getCorreo());

        return dto;
    }
}