package ar.task.dtos;

import lombok.Data;

@Data
public class EquipoDTO {
    private Integer idEquipo;
    private String nombre;
    private String categoria;
    private Boolean activo;
}