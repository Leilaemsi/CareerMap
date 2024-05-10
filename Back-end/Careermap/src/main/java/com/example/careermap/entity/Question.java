package com.example.careermap.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
import javax.persistence.JoinTable;

@Entity
public class Question {

    @Id
    @Column(name="idQuestion")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idQuestion;

    @Column(name="question_Francais", length = 255) 
    private String questionFrancais;
    
    @ManyToOne
    @JoinColumn(name = "id_test")
    private Test fkidtest;
   
    @ManyToMany
    @JoinTable(name = "reponse",
        joinColumns = @JoinColumn(name = "idQuestion"),
        inverseJoinColumns = @JoinColumn(name = "matricule"))
    private List<Utilisateur> utilisateurs;

    public Question() {
    	
    }
    
    public Question(Long idQuestion, String questionFrancais, Test fkidtest, List<Utilisateur> utilisateurs) { // Updated variable name
        super();
        this.idQuestion = idQuestion;
        this.questionFrancais = questionFrancais;
        this.fkidtest = fkidtest;
        this.utilisateurs = utilisateurs;
    }

    public Long getIdQuestion() {
        return idQuestion;
    }
   
    public void setIdQuestion(Long idQuestion) {
        this.idQuestion = idQuestion;
    }

    public String getQuestionFrancais() {
        return questionFrancais;
    }

    public void setQuestionFrancais(String questionFrancais) {
        this.questionFrancais = questionFrancais;
    }

    public Test getFkidtest() {
        return fkidtest;
    }

    public void setFkidtest(Test fkidtest) {
        this.fkidtest = fkidtest;
    }

    public List<Utilisateur> getUtilisateurs() {
        return utilisateurs;
    }

    public void setUtilisateurs(List<Utilisateur> utilisateurs) {
        this.utilisateurs = utilisateurs;
    }
}
