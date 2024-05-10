package com.example.careermap.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.careermap.entity.Question;

@Repository
public interface QuestionRepo extends JpaRepository<Question, Long> {
    @Query("SELECT q FROM Question q WHERE q.fkidtest.id_test = :id_test")
    List<Question> findAllByTestId(@Param("id_test") Long id_test);
}
