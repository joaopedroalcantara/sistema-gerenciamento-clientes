package com.Murallis.Sistema_Cadastro.business;

import com.Murallis.Sistema_Cadastro.Infraestructure.entity.Contato;
import com.Murallis.Sistema_Cadastro.Infraestructure.repository.ContatoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContatoService {

    private final ContatoRepository repository;

    public ContatoService(ContatoRepository repository) {
        this.repository = repository;
    }

    public Contato salvar(Contato contato) {
        return repository.save(contato);
    }

    public List<Contato> listarPorUsuario(Integer usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }

    public Contato atualizar(Integer id, Contato contato) {
        contato.setId(id);
        return repository.save(contato);
    }
}
