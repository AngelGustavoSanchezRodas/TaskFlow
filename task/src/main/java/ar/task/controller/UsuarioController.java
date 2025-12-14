package ar.task.controller;

import ar.task.dtos.UsuarioRegistroDTO;
import ar.task.dtos.UsuarioSalidaDTO;
import ar.task.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // Indica que esta clase recibe peticiones web (JSON)
@RequestMapping("/api/usuarios") // La dirección base: http://localhost:8080/api/usuarios
@CrossOrigin(origins = "*") // Permite que tu Frontend (React) se conecte sin bloqueos
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // POST: Para registrarse
    // URL: http://localhost:8080/api/usuarios/registro
   // En UsuarioController.java

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody UsuarioRegistroDTO usuarioRegistroDTO) {
        try
        {
            UsuarioSalidaDTO nuevoUsuario = usuarioService.registrarUsuario(usuarioRegistroDTO);
            return ResponseEntity.ok(nuevoUsuario);
        }
        catch (RuntimeException e)
        {
            // Si atrapamos un error (como "Correo repetido"), devolvemos un 400 Bad Request
            // con el mensaje que escribimos en el servicio.
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // POST: Para loguearse (Login Básico)
    // URL: http://localhost:8080/api/usuarios/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioRegistroDTO loginData) {
        try {
            UsuarioSalidaDTO usuarioLogueado = usuarioService.login(loginData.getCorreo(), loginData.getContrasenia());
            return ResponseEntity.ok(usuarioLogueado);
        } catch (RuntimeException e) {
            // Si falla (usuario no existe o clave mal), devolvemos error 400
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}