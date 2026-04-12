package com.Murallis.Sistema_Cadastro.business;

import com.Murallis.Sistema_Cadastro.Infraestructure.entity.Usuario;
import com.Murallis.Sistema_Cadastro.Infraestructure.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public void salvarUsuario(Usuario usuario) {
        repository.saveAndFlush(usuario);
    }

    public Usuario BuscarUsuarioPorNome(String nome){
        return repository.findByNome(nome).orElseThrow(
                () -> new RuntimeException("Nome não encontrado")
        );
    }

    public Usuario BuscarUsuarioPorCpf(String cpf){
        return repository.findByCpf(cpf).orElseThrow(
                () -> new RuntimeException("CPF não encontrado")
        );
    }

    public void deletarUsuarioPorCpf(String cpf) {
        Usuario usuario = repository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o CPF: " + cpf));

        repository.delete(usuario);
    }

    public List<Usuario> listarTodos() {
        return repository.findAll();
    }


    public void atualizarUsuarioPorCpf(String cpf, Usuario usuario) {
        Usuario usuarioEntity = BuscarUsuarioPorCpf(cpf);
        Usuario usuarioAtualizado = Usuario.builder()
                .cpf(usuario.getCpf() != null ?
                        usuario.getCpf() : usuarioEntity.getCpf())

                .nome(usuario.getNome() != null ?
                        usuario.getNome() : usuarioEntity.getNome())

                .dataDeNascimento(usuario.getDataDeNascimento() != null ?
                        usuario.getDataDeNascimento() : usuarioEntity.getDataDeNascimento())

                .endereco(usuario.getEndereco() != null?
                        usuario.getEndereco() : usuarioEntity.getEndereco())

                .id(usuarioEntity.getId())
                .build();

        repository.saveAndFlush(usuarioAtualizado);

    }
}
