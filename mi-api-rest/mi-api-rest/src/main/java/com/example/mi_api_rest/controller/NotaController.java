package com.example.mi_api_rest.controller;


import com.example.mi_api_rest.model.Nota;
import com.example.mi_api_rest.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notas")
public class NotaController {

    @Autowired
    private NotaRepository repository;

    // Obtener todas las notas
    @GetMapping
    public List<Nota> getAllNotas() {
        return repository.findAll();
    }

    // Obtener una nota por ID
    @GetMapping("/{id}")
    public ResponseEntity<Nota> getNotaById(@PathVariable Long id) {
        Optional<Nota> nota = repository.findById(id);
        return nota.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear una nueva nota
    @PostMapping
    public Nota createNota(@RequestBody Nota nota) {
        return repository.save(nota);
    }

    // Actualizar una nota existente
    @PutMapping("/{id}")
    public ResponseEntity<Nota> updateNota(@PathVariable Long id, @RequestBody Nota notaDetails) {
        Optional<Nota> optionalNota = repository.findById(id);
        if (optionalNota.isPresent()) {
            Nota nota = optionalNota.get();
            nota.setTitulo(notaDetails.getTitulo());
            nota.setTexto(notaDetails.getTexto());
            Nota updatedNota = repository.save(nota);
            return ResponseEntity.ok(updatedNota);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar una nota
    @DeleteMapping("/{id}")
    public ResponseEntity<Nota> deleteNota(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
