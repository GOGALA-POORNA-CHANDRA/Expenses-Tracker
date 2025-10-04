package com.expense.tracker.repository;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.expense.tracker.model.Expence;


public interface ExpenceRepository extends JpaRepository<Expence,Long>

{
	
	List<Expence> findByCategory(String category);
	List<Expence> findByDateBetween(LocalDate start,LocalDate end);
	
	@Query("SELECT e.category, SUM(e.amount) FROM Expence e GROUP BY e.category")
	  List<Object[]> sumByCategory();

}
