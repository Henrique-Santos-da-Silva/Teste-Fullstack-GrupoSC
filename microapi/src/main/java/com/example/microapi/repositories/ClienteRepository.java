package com.example.microapi.repositories;

import com.example.microapi.models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, String> {
    List<Cliente> findByRazaoSocial(String razaoSocial);
    Optional<Cliente> findByUsuarioAndSenha(String usuario, String senha);
}
