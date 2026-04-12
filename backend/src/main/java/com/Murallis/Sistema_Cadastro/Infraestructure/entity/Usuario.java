package com.Murallis.Sistema_Cadastro.Infraestructure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.Builder;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table (name = "usuario")
@Entity

public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @JsonIgnore
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Contato> contatos;

    @Column(name = "nome", length = 100)
    private String nome;

    @Column(name = "cpf", unique = true, length = 14)
    private String cpf;

    @Column(name = "data")
    private LocalDate dataDeNascimento;

    @Column(name = "endereco", length = 255)
    private String endereco;

}
