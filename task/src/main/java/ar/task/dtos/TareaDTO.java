package ar.task.dtos;

import lombok.Data;
import java.util.Date;

@Data
public class TareaDTO {
    private Integer idTarea; // Opcional al crear, obligatorio al leer
    private String titulo;
    private String descripcion;
    private Boolean estado;
    private Boolean prioridad;
    private String categoria;
    private Date fechaFin;

    // RELACIONES: Usamos solo los IDs para comunicar
    private Integer idEquipo;
    private Integer idUsuarioCreador;
    private Integer idUsuarioAsignado;

    private String nombreResponsable;
}