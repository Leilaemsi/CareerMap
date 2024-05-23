package com.example.careermap.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity
public class Reponse {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReponse;
    
    @Column(name="reponse")
    private String reponse;
    
    @ManyToOne
    @JoinColumn(name = "matricule")
    private Utilisateur fk_utilisateur;

    @ManyToOne
    @JoinColumn(name = "idQuestion")
    private Question fk_question;
    
    private Long iteration;
     
    
    public Reponse() {
 
    }


	


	public Reponse(Long idReponse, String reponse, Utilisateur fk_utilisateur, Question fk_question, Long iteration) {
		super();
		this.idReponse = idReponse;
		this.reponse = reponse;
		this.fk_utilisateur = fk_utilisateur;
		this.fk_question = fk_question;
		this.iteration = iteration;
	}





	public Long getIteration() {
		return iteration;
	}





	public void setIteration(Long iteration) {
		this.iteration = iteration;
	}





	public Long getIdReponse() {
		return idReponse;
	}


	public void setIdReponse(Long idReponse) {
		this.idReponse = idReponse;
	}


	public String getReponse() {
		return reponse;
	}


	public void setReponse(String reponse) {
		this.reponse = reponse;
	}


	public Utilisateur getFk_utilisateur() {
		return fk_utilisateur;
	}


	public void setFk_utilisateur(Utilisateur fk_utilisateur) {
		this.fk_utilisateur = fk_utilisateur;
	}


	public Question getFk_question() {
		return fk_question;
	}


	public void setFk_question(Question fk_question) {
		this.fk_question = fk_question;
	}
    
    
}
