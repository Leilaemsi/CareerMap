package com.example.careermap.controller;

import java.util.List;

import javax.annotation.security.PermitAll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.careermap.dto.AuthentificationDTO;
import com.example.careermap.dto.QuestionDTO;
import com.example.careermap.dto.TestDTO;
import com.example.careermap.dto.UtilisateurDTO;
import com.example.careermap.payload.AuthentificationMessage;
import com.example.careermap.service.UtilisateurService;
import com.example.careermap.entity.Reponse;
import com.example.careermap.entity.Resultat;


@RestController
@CrossOrigin
@RequestMapping("api/v1/utilisateur")
public class UtilisateurController {

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
    
  

}
