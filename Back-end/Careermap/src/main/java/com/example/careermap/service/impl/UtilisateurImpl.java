package com.example.careermap.service.impl;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.careermap.dto.AuthentificationDTO;
import com.example.careermap.dto.QuestionDTO;
import com.example.careermap.dto.UtilisateurDTO;
import com.example.careermap.entity.Question;
import com.example.careermap.entity.Reponse;
import com.example.careermap.entity.Resultat;
import com.example.careermap.entity.Utilisateur;
import com.example.careermap.payload.AuthentificationMessage;
import com.example.careermap.repository.QuestionRepo;
import com.example.careermap.repository.UtilisateurRepo;
import com.example.careermap.repository.ReponseRepo;
import com.example.careermap.repository.ResultatRepo;
import com.example.careermap.service.UtilisateurService;


@Service
public class UtilisateurImpl implements UtilisateurService {

    @Autowired
    UtilisateurRepo utilisateurRepository;

    
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public String addUtilisateur(UtilisateurDTO utilisateurDTO) {
        try {
            Utilisateur utilisateur = new Utilisateur();
            BeanUtils.copyProperties(utilisateurDTO, utilisateur);
            utilisateurRepository.save(utilisateur);
            return "Utilisateur added successfully.";
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public AuthentificationMessage authentificationUtilisateur(AuthentificationDTO authentificationDTO) {
        try {
            Utilisateur utilisateur = utilisateurRepository.findByEmail(authentificationDTO.getEmail());
            if (utilisateur != null && utilisateur.getMotDePasse().equals(authentificationDTO.getMotDePasse())) {
                return new AuthentificationMessage("Authentification successful.", true);
            } else {
                return new AuthentificationMessage("Invalid credentials.", false);
            }
        } catch (Exception e) {
            throw e;
        }
    }
    
    @Autowired
    private QuestionRepo questionRepository;

    @Override
    public List<QuestionDTO> fetchQuestionsForTest(Long id_test) {
        List<Question> questions = questionRepository.findAllByTestId(id_test);
        List<QuestionDTO> questionDTOs = new ArrayList<>();
        for (Question question : questions) {
            QuestionDTO questionDTO = new QuestionDTO();
            questionDTO.setQuestionFrancais(question.getQuestionFrancais());
            questionDTOs.add(questionDTO);
        }
        return questionDTOs;
    }
    
    @Autowired
    private ReponseRepo reponseRepository;

    
    public boolean addReponse(Reponse reponse) {
        try {
            reponseRepository.save(reponse);
            return true; 
        } catch (Exception e) {
          
            return false; 
        }
    }

	
   
 
}
