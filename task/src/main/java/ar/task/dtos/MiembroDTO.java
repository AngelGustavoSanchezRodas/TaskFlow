package ar.task.dtos;

import lombok.Data;

@Data
public class MiembroDTO {
    private Integer idUsuario;
    private String nombre;
    private String apellido;
    private String correo;
    private String rol; // "LIDER" o "COLABORADOR"
}