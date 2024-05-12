package com.example.careermap.dto;


public class ResultatDTO {
    private Long idResultat;
    private String date;
    private String personnalite;
    private Long fkUtilisateurId; 
    private Long fkTestId; 

    public ResultatDTO() {
      
    }

    public ResultatDTO(Long idResultat, String date, String personnalite, Long fkUtilisateurId, Long fkTestId) {
        this.idResultat = idResultat;
        this.date = date;
        this.personnalite = personnalite;
        this.fkUtilisateurId = fkUtilisateurId;
        this.fkTestId = fkTestId;
    }

    public Long getIdResultat() {
        return idResultat;
    }

    public void setIdResultat(Long idResultat) {
        this.idResultat = idResultat;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPersonnalite() {
        return personnalite;
    }

    public void setPersonnalite(String personnalite) {
        this.personnalite = personnalite;
    }

    public Long getFkUtilisateurId() {
        return fkUtilisateurId;
    }

    public void setFkUtilisateurId(Long fkUtilisateurId) {
        this.fkUtilisateurId = fkUtilisateurId;
    }

    public Long getFkTestId() {
        return fkTestId;
    }

    public void setFkTestId(Long fkTestId) {
        this.fkTestId = fkTestId;
    }
}
