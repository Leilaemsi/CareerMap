package com.example.careermap.dto;

public class QuestionDTO {

    private Long idQuestion;
    private String questionFrancais; // Changed variable name to follow camelCase convention

    public QuestionDTO() {
    }

    public QuestionDTO(Long idQuestion, String questionFrancais) { // Changed parameter name to match field name
        this.idQuestion = idQuestion;
        this.questionFrancais = questionFrancais;
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
}
