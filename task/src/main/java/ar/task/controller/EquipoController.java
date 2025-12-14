package ar.task.controller;

import ar.task.dtos.EquipoDTO;
import ar.task.dtos.UsuarioSalidaDTO;
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
    public ResponseEntity<?> crearEquipo(@RequestBody EquipoDTO equipoDTO) {
        try
        {
            EquipoDTO crearEquipo =  equipoService.crearEquipo(equipoDTO);
            return  ResponseEntity.ok(crearEquipo);
        }
        catch (RuntimeException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // POST: /api/equipo/agregarColaborador?idEquipo=1&idUsuario=5&rol=LIDER
    @PostMapping("/agregarColaborador")
    public ResponseEntity<?> agregarColaborador(
            @RequestParam Integer idEquipo,
            @RequestParam Integer idUsuario,
            @RequestParam String rol) {
        try
        {
            // Llamamos al servicio pasando los 3 datos que recibimos
            equipoService.agregarMiembro(idEquipo, idUsuario, rol);

            // Como el servicio es 'void' (no devuelve nada), respondemos un mensaje de éxito simple
            return ResponseEntity.ok("Usuario agregado al equipo exitosamente");
        }
        catch (RuntimeException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<?> listarEquiposAsignados(@PathVariable Integer idUsuario){
        try
        {
            List<EquipoDTO>  equipoUsuario =  equipoService.obtenerEquiposDelUsuario(idUsuario);

            return ResponseEntity.ok(equipoUsuario);
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
