package ar.task.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "usuarioequipo")
public class UsuarioEquipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idusuarioequipo")
    private Integer idUsuarioEquipo;

    // ERROR CORREGIDO: Esta fila conecta con UN equipo
    @ManyToOne
    @JoinColumn(name = "idequipo")
    private EquipoTrabajo equipoTrabajo;

    // ERROR CORREGIDO: Esta fila conecta con UN usuario
    @ManyToOne
    @JoinColumn(name = "idusuario")
    private Usuario usuario;

    // Corrección de nombre de variable (minúscula)
    @Column(name = "rol")
    private String rol;

    // Corrección de nombre de variable (minúscula)
    @Column(name = "activo")
    private Boolean activo;
}