package com.example.careermap.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Utilisateur {

	@Id
    @Column(name="matricule")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matricule;

    @Column(name="nom", length = 25)
    private String nom;

    @Column(name="prenom", length = 25)
    private String prenom;

    @Column(name="email", length = 50)
    private String email;

    @Column(name="mot_de_passe", length = 50)
    private String motDePasse;
    
    @ManyToMany(mappedBy = "utilisateurs")
    private List<Test> tests;

    @ManyToMany(mappedBy = "utilisateurs")
    private List<Question> questions;
    
    public Utilisateur() {
    }

	

	public Utilisateur(Long matricule, String nom, String prenom, String email, String motDePasse, List<Test> tests,
			List<Question> questions) {
		super();
		this.matricule = matricule;
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.motDePasse = motDePasse;
		this.tests = tests;
		this.questions = questions;
	}



	public Long getMatricule() {
		return matricule;
	}


	public void setMatricule(Long matricule) {
		this.matricule = matricule;
	}


	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getPrenom() {
		return prenom;
	}


	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getMotDePasse() {
		return motDePasse;
	}


	public void setMotDePasse(String motDePasse) {
		this.motDePasse = motDePasse;
	}

	public List<Test> getTests() {
		return tests;
	}

	public void setTests(List<Test> tests) {
		this.tests = tests;
	}



	public List<Question> getQuestions() {
		return questions;
	}



	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}

	
}
