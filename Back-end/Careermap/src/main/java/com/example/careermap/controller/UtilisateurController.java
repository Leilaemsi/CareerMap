package com.example.careermap.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.careermap.dto.AuthentificationDTO;
import com.example.careermap.dto.PersonalityJobDTO;
import com.example.careermap.dto.QuestionDTO;
import com.example.careermap.dto.ReponseDTO;
import com.example.careermap.dto.ResultatDTO;
import com.example.careermap.dto.TestDTO;
import com.example.careermap.dto.UtilisateurDTO;
import com.example.careermap.repository.JobsRepo;
import com.example.careermap.repository.ReponseRepo;
import com.example.careermap.service.UtilisateurService;
import com.example.careermap.entity.Reponse;
import com.example.careermap.entity.Jobs;
import com.example.careermap.entity.Question;
import com.example.careermap.entity.Resultat;
import com.example.careermap.entity.Test;
import com.example.careermap.entity.Utilisateur;


@RestController
@CrossOrigin
@RequestMapping("api/v1/utilisateur")
public class UtilisateurController {
	
	@Autowired
	private JobsRepo jobsRepo;

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping(path = "/save")
    public ResponseEntity<Utilisateur> saveUtilisateur(@RequestBody UtilisateurDTO utilisateurDTO) {
        Utilisateur id = utilisateurService.addUtilisateur(utilisateurDTO);
      //  return ResponseEntity.ok(id);
       return  ResponseEntity.status(HttpStatus.CREATED).body(id);
    }


    @PostMapping(path = "/login")
    public ResponseEntity<Map<String, Object>> authentificationplus(@RequestBody AuthentificationDTO authentificationDTO) {
        Map<String, Object> response = utilisateurService.mylogin(authentificationDTO);
        HttpStatus httpStatus = (Boolean) response.get("status") ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return ResponseEntity.status(httpStatus).body(response);
    }

    @PostMapping(path = "/fetchQuestions")
    public ResponseEntity<List<QuestionDTO>> fetchQuestionsForTest(@RequestBody TestDTO testDTO) {
        List<QuestionDTO> questions = utilisateurService.fetchQuestionsForTest(testDTO.getIdTest());
        return ResponseEntity.ok(questions);
    }
    
    
   
    @Autowired
    private ReponseRepo reponseRepository;

    @PostMapping("/reponses")
    public boolean addReponse(@RequestBody ReponseDTO reponseDTO) {
        try {
      
        	
            Reponse reponse = new Reponse();
            reponse.setReponse(reponseDTO.getReponse());

  
            Utilisateur utilisateur = new Utilisateur();
            utilisateur.setMatricule(reponseDTO.getMatricule());
            reponse.setFk_utilisateur(utilisateur);

            Question question = new Question();
            question.setIdQuestion(reponseDTO.getIdQuestion());
           
            Test fkidtest = new Test();
            fkidtest.setId_test(reponseDTO.getIdQuestion());
            question.setFkidtest(fkidtest);
            reponse.setFk_question(question);
               	
            int iteration = (int) (reponseDTO.getIteration() + reponseDTO.getIncrement());
                long Iteration=iteration;
                reponse.setIteration(Iteration);
                
                

             
        
            
            reponseRepository.save(reponse);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    
    @PostMapping("/maxIteration")
    public ResponseEntity<?> MaxIteration(@RequestBody ReponseDTO reponseDTO) {
        try {
        	 Reponse reponse = new Reponse();
             reponse.setReponse(reponseDTO.getReponse());

   
             Utilisateur utilisateur = new Utilisateur();
             utilisateur.setMatricule(reponseDTO.getMatricule());
             reponse.setFk_utilisateur(utilisateur);

             Question question = new Question();
             question.setIdQuestion(reponseDTO.getIdQuestion());
             
             Test fkidtest = new Test();
             fkidtest.setId_test(reponseDTO.getIdQuestion());
             question.setFkidtest(fkidtest);
             reponse.setFk_question(question);
             
                  
         	
             
             Long maxIteration = reponseRepository.findMaxIterationByMatriculeAndTestId(
            		    reponse.getFk_utilisateur().getMatricule(),
            		    1L 
            		);
             	if (maxIteration == null) {
            		    maxIteration = 0L;
            		}

            		return ResponseEntity.ok(maxIteration);

        } catch (HttpMessageNotReadableException e) {
            
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON format");
        } catch (Exception e) {
           
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    
    @PostMapping("/resultat")
    public ResponseEntity<String> createResultat(@RequestBody ResultatDTO resultatDTO) {
        try {
            Resultat resultat = convertToEntity(resultatDTO);
            boolean saved = utilisateurService.addResultat(resultat);
            if (saved) {
                return new ResponseEntity<>("Resultat created successfully", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Failed to create resultat", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Resultat convertToEntity(ResultatDTO resultatDTO) {
    	 Map<String, Object> perso = utilisateurService.calculatePersonality(resultatDTO.getFkUtilisateurId(),resultatDTO.getFkTestId());
         String personality = (String) perso.get("personality");
         Jobs job = jobsRepo.findByPersonnalite(personality);
        Resultat resultat = new Resultat();
        resultat.setId_resultat(resultatDTO.getIdResultat());
        resultat.setDate(resultatDTO.getDate());
        resultat.setPersonnalite(personality);
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setMatricule(resultatDTO.getFkUtilisateurId());   
        resultat.setFk_utilisateur(utilisateur);
        Test test = new Test();
        test.setId_test(resultatDTO.getFkTestId());   
        resultat.setFk_test(test);
        resultat.setId(job);
        resultat.setIntroversionPercentage((int) perso.get("introversionPercentage"));
        resultat.setExtraversionPercentage((int) perso.get("extraversionPercentage"));
        resultat.setSensingPercentage((int) perso.get("sensingPercentage"));
        resultat.setIntuitionPercentage((int) perso.get("intuitionPercentage"));
        resultat.setThinkingPercentage((int) perso.get("thinkingPercentage"));
        resultat.setFeelingPercentage((int) perso.get("feelingPercentage"));
        resultat.setJudgingPercentage((int) perso.get("judgingPercentage"));
        resultat.setPerceivingPercentage((int) perso.get("perceivingPercentage"));

        return resultat;
    }



    @RequestMapping("/personality/{userId}/{testId}")
    public PersonalityJobDTO getPersonality(@PathVariable("userId") Long userId, @PathVariable("testId") Long testId) {
        Map<String, Object> perso = utilisateurService.calculatePersonality(userId, testId);
        String personality = (String) perso.get("personality");
        Jobs job = jobsRepo.findByPersonnalite(personality);
        
    
                PersonalityJobDTO result = new PersonalityJobDTO();
        result.setPersonnalite(personality);
        result.setJobs(job.getNomjob());
        result.setDescription(job.getDescription());
        result.setImg(job.getImg());
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
    
    
    

    @RequestMapping("/resultats/{matricule}")
    public List<ResultatDTO> fetchAllUtilisateurTest(@PathVariable Long matricule) {
        return utilisateurService.fetchAllUtilisateurTest(matricule);
    }
    
    
    
    
    
    
    	
    
    
    
   

    

}
