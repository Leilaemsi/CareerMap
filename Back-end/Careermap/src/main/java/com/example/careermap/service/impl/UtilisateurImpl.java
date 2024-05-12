package com.example.careermap.service.impl;

import java.util.ArrayList;
<<<<<<< HEAD
import java.util.HashMap;
import java.util.List;
import java.util.Map;

=======
import java.util.List;
>>>>>>> f962d6087840983d5858ed32adca6fff306f4c0f
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

<<<<<<< HEAD
   
    
    
=======
>>>>>>> f962d6087840983d5858ed32adca6fff306f4c0f
    
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
<<<<<<< HEAD
            questionDTO.setIdQuestion(question.getIdQuestion());
=======
>>>>>>> f962d6087840983d5858ed32adca6fff306f4c0f
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

<<<<<<< HEAD
    public Map<String, Object> calculatePersonality(Long userId, Long testId) {
        Map<String, Object> result = new HashMap<>();
        List<String> responses = reponseRepository.findByMatriculeAndIdTest(userId, testId);
        int introversionSum = 0, sensingSum = 0, thinkingSum = 0, judgingSum = 0;

        for (int i = 0; i < responses.size(); i++) {
            int percent = Integer.parseInt(responses.get(i).trim());

            switch (i % 4) {
                case 0:
                case 4:
                case 8:
                case 12:
                case 16:
                case 20:
                case 24:
                    introversionSum += percent;
                    break;
                case 1:
                case 5:
                case 9:
                case 13:
                case 17:
                case 21:
                case 25:
                    sensingSum += percent;
                    break;
                case 2:
                case 6:
                case 10:
                case 14:
                case 18:
                case 22:
                case 26:
                    thinkingSum += percent;
                    break;
                case 3:
                case 7:
                case 11:
                case 15:
                case 19:
                case 23:
                case 27:
                    judgingSum += percent;
                    break;
            }
        }

        int totalResponses = responses.size() / 4;
        int introversionPercentage = introversionSum / totalResponses;
        int sensingPercentage = sensingSum / totalResponses;
        int thinkingPercentage = thinkingSum / totalResponses;
        int judgingPercentage = judgingSum / totalResponses;

        result.put("introversionPercentage", introversionPercentage);
        result.put("extraversionPercentage", 100 - introversionPercentage);
        result.put("sensingPercentage", sensingPercentage);
        result.put("intuitionPercentage", 100 - sensingPercentage);
        result.put("thinkingPercentage", thinkingPercentage);
        result.put("feelingPercentage", 100 - thinkingPercentage);
        result.put("judgingPercentage", judgingPercentage);
        result.put("perceivingPercentage", 100 - judgingPercentage);

        String personality = "";
        if (introversionPercentage > 50) {
            personality += "I";
        } else {
            personality += "E";
        }

        if (sensingPercentage > 50) {
            personality += "S";
        } else {
            personality += "N";
        }

        if (thinkingPercentage > 50) {
            personality += "T";
        } else {
            personality += "F";
        }

        if (judgingPercentage > 50) {
            personality += "J";
        } else {
            personality += "P";
        }

        result.put("personality", personality);

        return result;
    }
	
	 @Autowired
	    private ResultatRepo resultatRepository;

	    
	@Override
	public boolean addResultat(Resultat resultat) {
		   try {
			   
			   resultatRepository.save(resultat);
	            return true; 
	        } catch (Exception e) {
	          
	            return false; 
	        }
	    }
	
	
   
=======
	
   
	@Override
	public String calculatePersonality(Long userId, Long testId) {
		        List<String> responses = reponseRepository.findByMatriculeAndIdTest(userId, testId);
		        int introversionSum = 0, sensingSum = 0, thinkingSum = 0, judgingSum = 0;

		        for (int i = 0; i < responses.size(); i++) {
		            int percent = Integer.parseInt(responses.get(i).trim());

		            switch (i % 4) {
		                case 0:
		                case 4:
		                case 8:
		                case 12:
		                case 16:
		                case 20:
		                case 24:
		                    introversionSum += percent;
		                    break;
		                case 1:
		                case 5:
		                case 9:
		                case 13:
		                case 17:
		                case 21:
		                case 25:
		                    sensingSum += percent;
		                    break;
		                case 2:
		                case 6:
		                case 10:
		                case 14:
		                case 18:
		                case 22:
		                case 26:
		                    thinkingSum += percent;
		                    break;
		                case 3:
		                case 7:
		                case 11:
		                case 15:
		                case 19:
		                case 23:
		                case 27:
		                    judgingSum += percent;
		                    break;
		            }
		        }

		        int totalResponses = responses.size() / 4;
		        int introversionPercentage = introversionSum / totalResponses;
		        int sensingPercentage = sensingSum / totalResponses;
		        int thinkingPercentage = thinkingSum / totalResponses;
		        int judgingPercentage = judgingSum / totalResponses;

		        String personality = "";
		        if (introversionPercentage > 50) {
		            personality += "I";
		        } else {
		            personality += "E";
		        }

		        if (sensingPercentage > 50) {
		            personality += "S";
		        } else {
		            personality += "N";
		        }

		        if (thinkingPercentage > 50) {
		            personality += "T";
		        } else {
		            personality += "F";
		        }

		        if (judgingPercentage > 50) {
		            personality += "J";
		        } else {
		            personality += "P";
		        }

		      
		        return personality;
		    
	}
>>>>>>> f962d6087840983d5858ed32adca6fff306f4c0f
 
}
