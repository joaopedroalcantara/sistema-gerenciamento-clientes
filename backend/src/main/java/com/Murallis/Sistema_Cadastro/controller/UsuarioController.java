package com.Murallis.Sistema_Cadastro.controller;

import com.Murallis.Sistema_Cadastro.Infraestructure.entity.Usuario;
import com.Murallis.Sistema_Cadastro.business.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
@RequiredArgsConstructor

public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Void>salvarUsuario(@RequestBody Usuario usuario){
        usuarioService.salvarUsuario(usuario);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Usuario> BuscarUsuarioPorCpf(@RequestParam String cpf) {
        return ResponseEntity.ok(usuarioService.BuscarUsuarioPorCpf(cpf));
    }

    @GetMapping("/nome")
    public ResponseEntity<Usuario> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(usuarioService.BuscarUsuarioPorNome(nome));
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Usuario>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @DeleteMapping
    public ResponseEntity<Void> deletarUsuarioPorCpf(@RequestParam String cpf) {
        usuarioService.deletarUsuarioPorCpf(cpf);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Void> atualizarUsuarioPorCpf(@RequestParam String cpf,
                                                       @RequestBody Usuario usuario){

        usuarioService.atualizarUsuarioPorCpf(cpf, usuario);
        return ResponseEntity.ok().build();
    }
}
