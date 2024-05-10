package com.example.careermap.repository;

import com.example.careermap.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtilisateurRepo extends JpaRepository<Utilisateur, Long> {
    Utilisateur findByEmail(String email);
    Optional<Utilisateur> findById(Long id);
}
