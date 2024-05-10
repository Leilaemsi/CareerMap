package com.example.careermap.repository;


import com.example.careermap.entity.Resultat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
 
public interface ResultatRepo extends  JpaRepository <Resultat, Long>{

}
