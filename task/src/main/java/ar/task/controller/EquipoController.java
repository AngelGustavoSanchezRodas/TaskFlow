package ar.task.controller;

import ar.task.dtos.EquipoDTO;
import ar.task.dtos.EquipoUsuarioDTO;
import ar.task.dtos.MiembroDTO;
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

    // CREAR EQUIPO
    @PostMapping("/crearEquipo")
    public ResponseEntity<?> crearEquipo(@RequestBody EquipoDTO equipoDTO, @RequestParam Integer idUsuario) {
        try {
            EquipoDTO crearEquipo = equipoService.crearEquipo(equipoDTO, idUsuario);
            return ResponseEntity.ok(crearEquipo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // AGREGAR COLABORADOR AL EQUIPO
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

    // ESTE ES EL ÚNICO ENDPOINT DE LISTADO QUE NECESITAS AHORA
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

    // UNIRSE AL EQUIPO COMO COLABORADOR
    @PostMapping("/unirseAlEquipo")
    public ResponseEntity<?> unirseAlEquipoComoColaborador (
            @RequestParam Integer idEquipo,
            @RequestParam Integer idUsuario) {
        try
        {
            equipoService.unirseAlEquipo(idEquipo, idUsuario);
            return ResponseEntity.ok("Usuario se unió al equipo exitosamente");
        }
        catch (Exception e)
        {
           return ResponseEntity.badRequest().body("Error al unirse al equipo: "+e.getMessage());
        }

    }

    // OBTENER MIEMBROS DEL EQUIPO
    @GetMapping("/{idEquipo}/miembros")
    public ResponseEntity<?> obtenerMiembros(@PathVariable Integer idEquipo) {
        try {
            List<MiembroDTO> miembros = equipoService.obtenerMiembrosDelEquipo(idEquipo);
            return ResponseEntity.ok(miembros);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al obtener miembros: " + e.getMessage());
        }
    }

    @DeleteMapping("/{idEquipo}/salir/{idUsuario}")
    public ResponseEntity<?> salirDelEquipo(@PathVariable Integer idEquipo, @PathVariable Integer idUsuario) {
        try {
            equipoService.salirDelEquipo(idEquipo, idUsuario);
            return ResponseEntity.ok("Has salido del equipo exitosamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}