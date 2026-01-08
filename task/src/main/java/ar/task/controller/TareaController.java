package ar.task.controller;

import ar.task.dtos.TareaDTO;
import ar.task.entities.Tarea;
import ar.task.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "*")
public class TareaController {

    @Autowired
    private TareaService tareaService;

    @PostMapping("/crearTarea")
    public ResponseEntity<?> crearTarea(@RequestBody TareaDTO tareaDTO){
        try
        {
            tareaDTO = tareaService.crearTarea(tareaDTO);
            return ResponseEntity.ok(tareaDTO);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<TareaDTO>> obtenerTareasPorUsuario(@PathVariable Integer idUsuario) {

        List<TareaDTO> tareas = tareaService.obtenerTareasPorUsuario(idUsuario);

        return ResponseEntity.ok(tareas);
    }

    @GetMapping("/listaTareas/{idEquipo}")
    public ResponseEntity<?> listarTareaPorEquipo(@PathVariable Integer idEquipo){
        try
        {
            List<TareaDTO> listaDeTareas = tareaService.obtenerTareasPorEquipo(idEquipo);
            return ResponseEntity.ok(listaDeTareas);
        }
        catch (RuntimeException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

   @PatchMapping("/{idTarea}/estado")
    public ResponseEntity<?> cambiarEstadoTarea(@PathVariable Integer idTarea, @RequestParam Boolean estado) {
        try {
            // CORRECCIÓN:
            // 1. Enviamos los dos datos: idTarea y estado.
            // 2. Guardamos el resultado en una variable tipo TareaDTO, no Boolean.
            TareaDTO tareaActualizada = tareaService.cambiarEstado(idTarea, estado);

            // Devolvemos el objeto completo para ver que el cambio se aplicó
            return ResponseEntity.ok(tareaActualizada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/editar/{idTarea}")
    public ResponseEntity<?> editarTarea(@PathVariable Integer idTarea, @RequestBody TareaDTO tareaDTO) {
        try {
            TareaDTO tareaEditada = tareaService.editarTarea(idTarea, tareaDTO);
            return ResponseEntity.ok(tareaEditada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{idTarea}")
    public ResponseEntity<?> eliminarTareaEquipo(@PathVariable Integer idTarea) {
        try {
            //  Solo llamamos al método. No asignamos variable porque es void.
            tareaService.eliminarTarea(idTarea);

            // Devolvemos un mensaje simple confirmando que ya no existe
            return ResponseEntity.ok("La tarea con ID " + idTarea + " fue eliminada exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
