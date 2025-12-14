package ar.task.service;

import ar.task.dtos.UsuarioRegistroDTO;
import ar.task.dtos.UsuarioSalidaDTO;
import ar.task.entities.DatosUsuario;
import ar.task.entities.Usuario;
import ar.task.repository.DatosUsuarioRepository;
import ar.task.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {

    // 2. Inyección de Dependencias: Traemos el repositorio para poder guardar
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private DatosUsuarioRepository datosUsuarioRepository;

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
        // Paso 1: Crear y llenar DatosUsuario
        DatosUsuario datos = new DatosUsuario();
        datos.setNombre(usuarioDTO.getNombre());
        datos.setApellido(usuarioDTO.getApellido());
        datos.setCorreo(usuarioDTO.getCorreo());
        datos.setActivo(true); // Por defecto activo al registrarse

        // TODO: MÁS ADELANTE ENCRIPTAREMOS ESTO CON SPRING SECURITY
        datos.setContrasenia(usuarioDTO.getContrasenia());

        // Paso 2: Crear y llenar Usuario
        Usuario usuario = new Usuario();
        usuario.setUserName(usuarioDTO.getUserName());

        // Paso 3: Relacionarlos (La magia del @OneToOne)
        usuario.setDatosUsuario(datos); // Al meter 'datos' dentro de 'usuario'...

        // C. GUARDADO (Llamar al repositorio)
        // Gracias al CASCADE.ALL, al guardar 'usuario', se guarda 'datos' automáticamente
        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        // D. RESPUESTA (Entidad -> DTO Salida)
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

    // Agrega esto en UsuarioService.java
public UsuarioSalidaDTO login(String correo, String contrasenia) {
    // 1. Buscamos al usuario por correo (usando el repositorio de DatosUsuario)
    // Nota: Necesitarás inyectar DatosUsuarioRepository también si no lo has hecho
    DatosUsuario datos = datosUsuarioRepository.findByCorreo(correo)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    // 2. Validamos contraseña (¡OJO! Esto es texto plano por ahora)
    if (!datos.getContrasenia().equals(contrasenia)) {
        throw new RuntimeException("Contraseña incorrecta");
    }

    // 3. Si todo ok, buscamos el objeto Usuario padre para devolver el DTO
    // (Asumiendo que puedes buscar el Usuario por el ID de sus datos, o relación inversa)
    // Para simplificar, aquí podrías necesitar un método en UsuarioRepository
    // Ejemplo: findByDatosUsuario_Id(Integer id);

    // *Truco temporal*: Por ahora devolvemos un DTO armado con lo que tenemos
    UsuarioSalidaDTO dto = new UsuarioSalidaDTO();
    dto.setNombre(datos.getNombre());
    dto.setCorreo(datos.getCorreo());
    dto.setIdDatosUsuario(datos.getIdDatosUsuario());
    return dto;
}
}