package com.example.careermap.dto;

public class UtilisateurDTO {

    private String Matricule;
    private String Nom;
    private String Prenom;
    private String Email;
    private String MotDePasse;

    public UtilisateurDTO() {
    }

    public UtilisateurDTO(String Matricule, String Nom, String Prenom, String Email, String MotDePasse) {
        this.Matricule = Matricule;
        this.Nom = Nom;
        this.Prenom = Prenom;
        this.Email = Email;
        this.MotDePasse = MotDePasse;
    }

    public String getMatricule() {
        return Matricule;
    }

    public void setMatricule(String Matricule) {
        this.Matricule = Matricule;
    }

    public String getNom() {
        return Nom;
    }

    public void setNom(String Nom) {
        this.Nom = Nom;
    }

    public String getPrenom() {
        return Prenom;
    }

    public void setPrenom(String Prenom) {
        this.Prenom = Prenom;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String Email) {
        this.Email = Email;
    }

    public String getMotDePasse() {
        return MotDePasse;
    }

    public void setMotDePasse(String MotDePasse) {
        this.MotDePasse = MotDePasse;
    }

}
