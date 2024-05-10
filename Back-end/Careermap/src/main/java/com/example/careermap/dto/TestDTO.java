package com.example.careermap.dto;

public class TestDTO {

    private Long idTest; // Changed variable name to follow camelCase convention
    private String nom;
    private String acronyme;

    public TestDTO() {
    }

    public TestDTO(Long idTest, String nom, String acronyme) { // Changed parameter names to match field names
        this.idTest = idTest;
        this.nom = nom;
        this.acronyme = acronyme;
    }

    public Long getIdTest() {
        return idTest;
    }

    public void setIdTest(Long idTest) {
        this.idTest = idTest;
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
}
