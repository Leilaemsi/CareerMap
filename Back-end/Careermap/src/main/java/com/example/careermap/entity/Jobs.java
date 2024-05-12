package com.example.careermap.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class Jobs {
	

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column( length = 50) 
    private String nomjob;
    
    @Column( length = 50) 
    private String personnalite;
    
    
    

	public Jobs() {
		
	}

	public Jobs(Long id, String nomjob, String personnalite) {
	
		this.id = id;
		this.nomjob = nomjob;
		this.personnalite = personnalite;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomjob() {
		return nomjob;
	}

	public void setNomjob(String nomjob) {
		this.nomjob = nomjob;
	}

	public String getPersonnalite() {
		return personnalite;
	}

	public void setPersonnalite(String personnalite) {
		this.personnalite = personnalite;
	}
    
    
    

}
