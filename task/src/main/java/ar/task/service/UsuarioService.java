package ar.task.service;

import ar.task.dtos.UsuarioRegistroDTO;
import ar.task.dtos.UsuarioSalidaDTO;
import ar.task.entities.DatosUsuario;
import ar.task.entities.Usuario;
import ar.task.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {

    // 2. Inyección de Dependencias: Traemos el repositorio para poder guardar
    @Autowired
    private UsuarioRepository usuarioRepository;

    // Método principal para registrar
    @Transactional // 3. Si algo falla en medio del proceso, hace "rollback" (deshace todo)
    public UsuarioSalidaDTO registrarUsuario(UsuarioRegistroDTO usuarioDTO) {

        // A. VALIDACIÓN (Lógica de Negocio)
        // Aquí podrías preguntar al repositorio si el email ya existe
        // if (usuarioRepository.existsByCorreo(usuarioDTO.getCorreo())) { ... }

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
}