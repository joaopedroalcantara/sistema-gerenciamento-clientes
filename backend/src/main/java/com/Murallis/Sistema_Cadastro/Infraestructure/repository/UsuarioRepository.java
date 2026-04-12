package com.Murallis.Sistema_Cadastro.Infraestructure.repository;

import com.Murallis.Sistema_Cadastro.Infraestructure.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{

    Optional<Usuario> findByNome(String nome);
    Optional<Usuario> findByCpf(String cpf);

    @Transactional
    void deleteByNome(String nome);
}
