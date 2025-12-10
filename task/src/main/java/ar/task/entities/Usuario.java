package ar.task.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idusuario")
    private Integer idUsuario;

    @Column(name = "username")
    private String userName;

    // Relación Uno a Uno con DatosUsuario
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "iddatosusuario", referencedColumnName = "iddatosusuario")
    private DatosUsuario datosUsuario;
}