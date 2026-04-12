package com.Murallis.Sistema_Cadastro.controller;

import com.Murallis.Sistema_Cadastro.Infraestructure.entity.Contato;
import com.Murallis.Sistema_Cadastro.business.ContatoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contatos")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ContatoController {

    private final ContatoService service;

    @PostMapping
    public ResponseEntity<Contato> salvar(@RequestBody Contato contato) {
        return ResponseEntity.ok(service.salvar(contato));
    }

    @GetMapping
    public ResponseEntity<List<Contato>> listar(@RequestParam Integer usuarioId) {
        return ResponseEntity.ok(service.listarPorUsuario(usuarioId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contato> atualizar(@PathVariable Integer id,
                                             @RequestBody Contato contato) {
        return ResponseEntity.ok(service.atualizar(id, contato));
    }

    @DeleteMapping
    public ResponseEntity<Void> deletar(@RequestParam Integer id) {
        service.deletar(id);
        return ResponseEntity.ok().build();
    }
}