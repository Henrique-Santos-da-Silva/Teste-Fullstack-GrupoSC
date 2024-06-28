package com.example.microapi.services;

import com.example.microapi.exceptions.ResourceNotFoundException;
import com.example.microapi.models.Cliente;
import com.example.microapi.repositories.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente criarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente editarCliente(String cnpj, Cliente cliente) {
        return clienteRepository.findById(cnpj).map(clienteEditado -> {
            clienteEditado.setRazaoSocial(cliente.getRazaoSocial());
            clienteEditado.setUsuario(cliente.getUsuario());
            clienteEditado.setSenha(cliente.getSenha());
            clienteEditado.setStatus(cliente.getStatus());
            return clienteRepository.save(cliente);
        }).orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));
    }

    public void excluirCliente(String cnpj) {
        clienteRepository.deleteById(cnpj);
    }

    public List<Cliente> listarTodosClientes() {
        return clienteRepository.findAll();
    }

    public List<Cliente> listarClientesPorRazaoSocial(String razaoSocial) {
        return clienteRepository.findByRazaoSocial(razaoSocial);
    }

    public Optional<Cliente> buscarClientePorCnpj(String cnpj) {
        return clienteRepository.findById(cnpj);
    }

    public Optional<Cliente> login(String usuario, String senha) {
        return clienteRepository.findByUsuarioAndSenha(usuario, senha);
    }
}
