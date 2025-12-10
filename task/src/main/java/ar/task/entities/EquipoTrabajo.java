package ar.task.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "equipotrabajo")
public class EquipoTrabajo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idequipo")
    private Integer idEquipo;

    @Column(name = "nombre")
    private String nombre;

    // Corrección: variable en minúscula
    @Column(name = "categoria")
    private String categoria;

    @Column(name = "activo")
    private Boolean activo;
}