package com.example.careermap.repository;

import com.example.careermap.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepo extends JpaRepository<Utilisateur, Long> {
}
