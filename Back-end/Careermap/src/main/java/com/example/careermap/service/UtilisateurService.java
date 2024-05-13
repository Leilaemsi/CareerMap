package com.example.careermap.service;

import java.util.List;
import java.util.Map;

import com.example.careermap.dto.AuthentificationDTO;
import com.example.careermap.dto.QuestionDTO;
import com.example.careermap.dto.UtilisateurDTO;
import com.example.careermap.payload.AuthentificationMessage;
import com.example.careermap.entity.Reponse;
import com.example.careermap.entity.Resultat;
import com.example.careermap.entity.Utilisateur;

public interface UtilisateurService {
    Utilisateur addUtilisateur(UtilisateurDTO utilisateurDTO);

    AuthentificationMessage authentificationUtilisateur(AuthentificationDTO authentificationDTO);
   
    List<QuestionDTO> fetchQuestionsForTest(Long id_test);

    boolean addReponse(Reponse reponse);
    boolean addResultat(Resultat resultat);
    Map<String,Object> calculatePersonality(Long userId, Long testId);

	Map<String, Object> mylogin(AuthentificationDTO authentificationDTO);

}

