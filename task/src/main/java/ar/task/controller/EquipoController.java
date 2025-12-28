package ar.task.controller;

import ar.task.dtos.EquipoDTO;
import ar.task.dtos.EquipoUsuarioDTO;
import ar.task.service.EquipoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipo")
@CrossOrigin(origins = "*")
public class EquipoController {

    @Autowired
    private EquipoService equipoService;

    @PostMapping("/crearEquipo")
    public ResponseEntity<?> crearEquipo(@RequestBody EquipoDTO equipoDTO, @RequestParam Integer idUsuario) {
        try {
            EquipoDTO crearEquipo = equipoService.crearEquipo(equipoDTO, idUsuario);
            return ResponseEntity.ok(crearEquipo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/agregarColaborador")
    public ResponseEntity<?> agregarColaborador(
            @RequestParam Integer idEquipo,
            @RequestParam Integer idUsuario,
            @RequestParam String rol) {
        try {
            equipoService.agregarMiembro(idEquipo, idUsuario, rol);
            return ResponseEntity.ok("Usuario agregado al equipo exitosamente");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 👇 ESTE ES EL ÚNICO ENDPOINT DE LISTADO QUE NECESITAS AHORA
    @GetMapping("/mis-equipos/{idUsuario}")
    public ResponseEntity<?> obtenerEquiposPorUsuario(@PathVariable Integer idUsuario) {
        try {
            // Ahora sí coinciden los tipos (EquipoUsuarioDTO)
            List<EquipoUsuarioDTO> misEquipos = equipoService.obtenerEquiposDelUsuario(idUsuario);
            return ResponseEntity.ok(misEquipos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al cargar equipos: " + e.getMessage());
        }
    }
}