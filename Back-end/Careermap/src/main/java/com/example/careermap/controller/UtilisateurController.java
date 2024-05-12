package com.example.careermap.controller;

import java.util.List;
<<<<<<< HEAD
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
=======

import javax.annotation.security.PermitAll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

>>>>>>> f962d6087840983d5858ed32adca6fff306f4c0f
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
<<<<<<< HEAD
import com.example.careermap.dto.AuthentificationDTO;
import com.example.careermap.dto.PersonalityJobDTO;
import com.example.careermap.dto.QuestionDTO;
import com.example.careermap.dto.ResultatDTO;
import com.example.careermap.dto.TestDTO;
import com.example.careermap.dto.UtilisateurDTO;
import com.example.careermap.payload.AuthentificationMessage;
import com.example.careermap.repository.JobsRepo;
import com.example.careermap.service.UtilisateurService;
import com.example.careermap.entity.Reponse;
import com.example.careermap.entity.Jobs;
import com.example.careermap.entity.Resultat;
import com.example.careermap.entity.Test;
import com.example.careermap.entity.Utilisateur;
=======

import com.example.careermap.dto.AuthentificationDTO;
import com.example.careermap.dto.QuestionDTO;
import com.example.careermap.dto.TestDTO;
import com.example.careermap.dto.UtilisateurDTO;
import com.example.careermap.payload.AuthentificationMessage;
import com.example.careermap.service.UtilisateurService;
import com.example.careermap.entity.Reponse;
import com.example.careermap.entity.Resultat;
>>>>>>> f962d6087840983d5858ed32adca6fff306f4c0f


@RestController
@CrossOrigin
@RequestMapping("api/v1/utilisateur")
public class UtilisateurController {
<<<<<<< HEAD
	
	@Autowired
	private JobsRepo jobsRepo;

=======
>>>>>>> f962d6087840983d5858ed32adca6fff306f4c0f

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping(path = "/save")
    public ResponseEntity<String> saveUtilisateur(@RequestBody UtilisateurDTO utilisateurDTO) {
        String id = utilisateurService.addUtilisateur(utilisateurDTO);
        return ResponseEntity.ok(id);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<AuthentificationMessage> authentificationUtilisateur(@RequestBody AuthentificationDTO authentificationDTO) {
        AuthentificationMessage authentificationMessage = utilisateurService.authentificationUtilisateur(authentificationDTO);
        return ResponseEntity.ok(authentificationMessage);
    }

    @PostMapping(path = "/fetchQuestions")
    public ResponseEntity<List<QuestionDTO>> fetchQuestionsForTest(@RequestBody TestDTO testDTO) {
        List<QuestionDTO> questions = utilisateurService.fetchQuestionsForTest(testDTO.getIdTest());
        return ResponseEntity.ok(questions);
    }
    
    
    @PostMapping("/reponses")
    public ResponseEntity<String> createReponse(@RequestBody Reponse reponse) {
        try {
            boolean saved = utilisateurService.addReponse(reponse);
            utilisateurService.addReponse(reponse);
            if (saved) {
                return new ResponseEntity<>("Reponse created successfully", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Failed to create reponse", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/resultat")
<<<<<<< HEAD
    public ResponseEntity<String> createResultat(@RequestBody ResultatDTO resultatDTO) {
        try {
            Resultat resultat = convertToEntity(resultatDTO);
            boolean saved = utilisateurService.addResultat(resultat);
=======
    public ResponseEntity<String> createResultat(@RequestBody Resultat resultat ) {
        try {
            boolean saved = utilisateurService.addResultat(resultat);
            utilisateurService.addResultat(resultat);
>>>>>>> f962d6087840983d5858ed32adca6fff306f4c0f
            if (saved) {
                return new ResponseEntity<>("Resultat created successfully", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Failed to create resultat", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

<<<<<<< HEAD
 



    @RequestMapping("/personality/{userId}/{testId}")
    public PersonalityJobDTO getPersonality(@PathVariable("userId") Long userId, @PathVariable("testId") Long testId) {
        Map<String, Object> perso = utilisateurService.calculatePersonality(userId, testId);
        String personality = (String) perso.get("personality");
        Jobs job = jobsRepo.findByPersonnalite(personality);
        
        System.out.println(job.getNomjob());
        
        PersonalityJobDTO result = new PersonalityJobDTO();
        result.setPersonnalite(personality);
        result.setJobs(job.getNomjob());
        result.setIntroversionPercentage((int) perso.get("introversionPercentage"));
        result.setExtraversionPercentage((int) perso.get("extraversionPercentage"));
        result.setSensingPercentage((int) perso.get("sensingPercentage"));
        result.setIntuitionPercentage((int) perso.get("intuitionPercentage"));
        result.setThinkingPercentage((int) perso.get("thinkingPercentage"));
        result.setFeelingPercentage((int) perso.get("feelingPercentage"));
        result.setJudgingPercentage((int) perso.get("judgingPercentage"));
        result.setPerceivingPercentage((int) perso.get("perceivingPercentage"));
        
        return result;
    }
    
    
   

    
=======
    @RequestMapping("/personality/{userId}/{testId}")
    public String getPersonality(@PathVariable("userId") Long userId, @PathVariable("testId") Long testId) {
		return  utilisateurService.calculatePersonality(userId, testId);
    }
>>>>>>> f962d6087840983d5858ed32adca6fff306f4c0f

}
