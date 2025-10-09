package com.example.mi_api_rest.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String texto;

}
