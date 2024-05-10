package com.example.careermap.service;

import java.util.List;

import com.example.careermap.dto.AuthentificationDTO;
import com.example.careermap.dto.QuestionDTO;
import com.example.careermap.dto.UtilisateurDTO;
import com.example.careermap.payload.AuthentificationMessage;
import com.example.careermap.entity.Reponse;
import com.example.careermap.entity.Resultat;

public interface UtilisateurService {
    String addUtilisateur(UtilisateurDTO utilisateurDTO);

    AuthentificationMessage authentificationUtilisateur(AuthentificationDTO authentificationDTO);
   
    List<QuestionDTO> fetchQuestionsForTest(Long id_test);

    boolean addReponse(Reponse reponse);
    boolean addResultat(Resultat resultat);
    
    String calculatePersonality(Long userId, Long testId);

}
