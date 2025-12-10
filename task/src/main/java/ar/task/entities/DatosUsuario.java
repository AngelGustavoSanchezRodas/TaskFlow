package ar.task.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "datosusuario")
public class DatosUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iddatosusuario")
    private Integer idDatosUsuario; // Corregí "idDatosUsario" (faltaba una u)

    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "correo")
    private String correo;

    @Column(name = "contrasenia")
    private String contrasenia;

    @Column(name = "activo")
    private Boolean activo;
}