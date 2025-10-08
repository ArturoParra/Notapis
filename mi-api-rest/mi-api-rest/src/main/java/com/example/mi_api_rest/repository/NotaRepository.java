package com.example.mi_api_rest.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.mi_api_rest.model.Nota;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {

}
