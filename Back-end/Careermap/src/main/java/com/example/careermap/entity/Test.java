package com.example.careermap.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Test {

	@Id
    @Column(name="id_test")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_test;

    @Column(name="nom", length = 50)
    private String nom;

    @Column(name="acronyme", length = 50)
    private String acronyme;
    
    @OneToMany
    @JoinColumn(name = "id_test")
    private List<Question> questions;
    
    @ManyToMany
    @JoinTable(name = "resultat",
        joinColumns = @JoinColumn(name = "id_test"),
        inverseJoinColumns = @JoinColumn(name = "matricule"))
    private List<Utilisateur> utilisateurs;


    public Test() {
    }


	public Test(Long id_test, String nom, String acronyme, List<Question> questions, List<Utilisateur> utilisateurs) {
		super();
		this.id_test = id_test;
		this.nom = nom;
		this.acronyme = acronyme;
		this.questions = questions;
		this.utilisateurs = utilisateurs;
	}


	public Long getId_test() {
		return id_test;
	}


	public void setId_test(Long id_test) {
		this.id_test = id_test;
	}


	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getAcronyme() {
		return acronyme;
	}


	public void setAcronyme(String acronyme) {
		this.acronyme = acronyme;
	}


	public List<Utilisateur> getUtilisateurs() {
		return utilisateurs;
	}


	public void setUtilisateurs(List<Utilisateur> utilisateurs) {
		this.utilisateurs = utilisateurs;
	}


	public List<Question> getQuestions() {
		return questions;
	}


	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
	
	
	
}
