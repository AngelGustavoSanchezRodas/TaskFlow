package ar.task.dtos;

import lombok.Data;

@Data
public class UsuarioSalidaDTO {
    private Integer idUsuario;
    private String nombre;
    private String apellido;
    private String correo;
    // Agregamos el ID de datos por si acaso, pero nunca la password
    private Integer idDatosUsuario;
}