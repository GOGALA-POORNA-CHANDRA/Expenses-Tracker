package com.expense.tracker.service;


import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expense.tracker.model.Expence;
import com.expense.tracker.repository.ExpenceRepository;



@Service

public class ExpenceService 

{
	@Autowired
	private  ExpenceRepository repo;
	
	public ExpenceService (ExpenceRepository repo) 
	{ 
		this.repo = repo; 
	}
	public Expence add(Expence e)
	{
		return repo.save(e);
	}
	public List<Expence> listAll()
	{
		return repo.findAll();
		
	}
	public Expence get(Long id)
	{
		return repo.findById(id).orElse(null);
		
	}
	public Expence update(Long id,Expence updated)
	{
		return repo.findById(id).map(e -> {
		      e.setAmount(updated.getAmount());
		      e.setDate(updated.getDate());
		      e.setNote(updated.getNote());
		      e.setCategory(updated.getCategory());
		      return repo.save(e);
		    }).orElse(null);
	}
	public void delete(Long id)
	{
		repo.deleteById(id);
	}

	public Double totalSpent() {
	    return repo.findAll().stream().mapToDouble(Expence::getAmount).sum();
	  }
	public Map<String, Double> spentByCategory() {
	    return repo.findAll().stream()
	      .collect(Collectors.groupingBy(e -> e.getCategory() == null ? "Uncategorized" : e.getCategory(),
	        Collectors.summingDouble(Expence::getAmount)));
	  }
	

}

	
