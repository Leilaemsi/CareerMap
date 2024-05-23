package com.example.careermap.repository;


import com.example.careermap.entity.Resultat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
 
public interface ResultatRepo extends  JpaRepository <Resultat, Long>{
	
	
	 @Query("SELECT r FROM Resultat r WHERE r.fk_utilisateur.matricule = :matricule")
	    List<Resultat> findByFk_utilisateurMatricule(Long matricule);
	
}
