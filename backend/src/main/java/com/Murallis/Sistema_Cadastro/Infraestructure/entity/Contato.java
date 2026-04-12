package com.Murallis.Sistema_Cadastro.Infraestructure.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "contato")
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public enum TipoContato {
        TELEFONE,
        EMAIL
    }

    @Enumerated(EnumType.STRING)
    private TipoContato tipo;

    @Column(nullable = false)
    private String valor;

    private String observacao;

}
