package com.example.careermap.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.careermap.entity.Reponse;


@Repository
public interface ReponseRepo extends JpaRepository<Reponse, Long>{
	
	@Query("SELECT r.reponse " +
		       "FROM Reponse r " +
		       "JOIN r.fk_question q " +
		       "WHERE r.fk_utilisateur.matricule = :matricule " +
		       "AND q.fkidtest.id_test = :id_test " +
		       "AND r.iteration =:iteration")

	List<String> findByMatriculeAndIdTest(@Param("matricule") long matricule, @Param("id_test") Long id_test,@Param("iteration") long iteration);

	
	@Query("SELECT MAX(r.iteration) FROM Reponse r " +
		       "JOIN r.fk_question q " +
		       "WHERE r.fk_utilisateur.matricule = :matricule " +
		       "AND q.fkidtest.id_test = :id_test")
		Long findMaxIterationByMatriculeAndTestId(@Param("matricule") Long matricule, @Param("id_test") Long idTest);



}
