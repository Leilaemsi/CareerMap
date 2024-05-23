package com.example.careermap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.careermap.entity.Jobs;

@Repository
public interface JobsRepo  extends JpaRepository<Jobs, Long> {
	
	Jobs findByPersonnalite(String personnalite);
	

}


