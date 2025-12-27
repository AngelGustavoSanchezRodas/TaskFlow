package ar.task.dtos;

import lombok.Data;

@Data
public class EquipoUsuarioDTO {
    // Datos del Equipo
    private Integer idEquipo;
    private String nombreEquipo;
    private String categoria;

    // Dato de la Relación (ESTO ES LO QUE FALTABA)
    private String miRol;
}