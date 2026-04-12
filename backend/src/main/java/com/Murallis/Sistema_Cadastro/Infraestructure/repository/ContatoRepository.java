package com.Murallis.Sistema_Cadastro.Infraestructure.repository;

import com.Murallis.Sistema_Cadastro.Infraestructure.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {

    List<Contato> findByUsuarioId(Integer usuarioId);
}