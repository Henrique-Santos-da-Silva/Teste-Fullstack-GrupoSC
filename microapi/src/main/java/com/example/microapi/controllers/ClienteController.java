package com.example.microapi.controllers;

import com.example.microapi.dtos.UsuarioDTO;
import com.example.microapi.exceptions.ResourceNotFoundException;
import com.example.microapi.models.Cliente;
import com.example.microapi.services.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public ResponseEntity<Cliente> criarCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = clienteService.criarCliente(cliente);
        return ResponseEntity.ok(novoCliente);
    }

    @PutMapping("/{cnpj}")
    public ResponseEntity<Cliente> editarCliente(@PathVariable String cnpj, @RequestBody Cliente cliente) {
        try {
            Cliente clienteEditado = clienteService.editarCliente(cnpj, cliente);
            return ResponseEntity.ok(clienteEditado);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{cnpj}")
    public ResponseEntity<Void> excluirCliente(@PathVariable String cnpj) {
        clienteService.excluirCliente(cnpj);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> listarTodosClientes() {
        List<Cliente> clientes = clienteService.listarTodosClientes();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/filtro")
    public ResponseEntity<List<Cliente>> listarClientesPorRazaoSocial(@RequestParam String razaoSocial) {
        List<Cliente> clientes = clienteService.listarClientesPorRazaoSocial(razaoSocial);
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{cnpj}")
    public ResponseEntity<Cliente> buscarClientePorCnpj(@PathVariable String cnpj) {
        Optional<Cliente> cliente = clienteService.buscarClientePorCnpj(cnpj);

        return cliente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<Cliente> login(@RequestBody UsuarioDTO usuario) {
        Optional<Cliente> clienteLogado = clienteService.login(usuario.getUsuario(), usuario.getSenha());
        return clienteLogado.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(401).build());
    }
}
