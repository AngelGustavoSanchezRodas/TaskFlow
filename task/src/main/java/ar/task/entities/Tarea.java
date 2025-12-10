package ar.task.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date; // O usa java.time.LocalDate que es más moderno

@Entity
@Data
@Table(name = "tarea")
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idtarea")
    private Integer idTarea;

    // ERROR CORREGIDO: Una tarea pertenece a UN equipo -> ManyToOne
    @ManyToOne
    @JoinColumn(name = "idequipo", nullable = false)
    private EquipoTrabajo equipoTrabajo;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "descripcion")
    private String descripcion;

    // ERROR CORREGIDO: En SQL es BOOLEAN, aquí debe ser Boolean
    @Column(name = "estado")
    private Boolean estado;

    @Column(name = "prioridad")
    private Boolean prioridad;

    @Column(name = "categoria")
    private String categoria;

    @Column(name = "fechacreacion")
    private Date fechaCreacion; // Recomendación: Usar LocalDate

    @Column(name = "fechafin")
    private Date fechaFin;

    @Column(name = "activo")
    private Boolean activo;

    // El creador es UN usuario
    @ManyToOne
    @JoinColumn(name = "idusuariocreador")
    private Usuario usuarioCreador;

    // El asignado es UN usuario
    @ManyToOne
    @JoinColumn(name = "idusuarioasignado")
    private Usuario usuarioAsignado;
}