package ar.task.dtos;

import lombok.Data;

//Esta clase la utilizamos para enviar todos los datos para logearse o registrarse pero despues enviamos la inforamcion a la tabla correspondiente
@Data
public class UsuarioRegistroDTO {

    // Datos de login (Tabla Usuario)
    private String userName;

    // Datos personales (Tabla DatosUsuario)
    private String nombre;
    private String apellido;
    private  String correo;
    private String contrasenia;

}
