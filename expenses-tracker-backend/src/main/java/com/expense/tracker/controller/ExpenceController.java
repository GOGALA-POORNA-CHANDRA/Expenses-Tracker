package com.expense.tracker.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expense.tracker.dto.ExpenceDTO;
import com.expense.tracker.model.Expence;
import com.expense.tracker.service.ExpenceService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/expence")
@CrossOrigin(origins = "*")
@Validated
public class ExpenceController 
{
	@Autowired
	public  ExpenceService service;
	public ExpenceController(ExpenceService service)
	{
		this.service=service;
	}
	@PostMapping
	  public ResponseEntity<Expence> create(@Valid @RequestBody ExpenceDTO dto) {
	    LocalDate d = LocalDate.parse(dto.getDate());
	    Expence e = new Expence(dto.getAmount(), d, dto.getNote(), dto.getCategory());
	    return ResponseEntity.ok(service.add(e));
	  }

	  @GetMapping
	  public ResponseEntity<List<Expence>> list() { return ResponseEntity.ok(service.listAll()); }

	  @GetMapping("/{id}")
	  public ResponseEntity<Expence> get(@PathVariable Long id) {
	    Expence e = service.get(id);
	    if (e == null) return ResponseEntity.notFound().build();
	    return ResponseEntity.ok(e);
	  }

	  @PutMapping("/{id}")
	  public ResponseEntity<Expence> update(@PathVariable Long id, @Valid @RequestBody ExpenceDTO dto) {
	    LocalDate d = LocalDate.parse(dto.getDate());
	    Expence updated = new Expence(dto.getAmount(), d, dto.getNote(), dto.getCategory());
	    Expence res = service.update(id, updated);
	    if (res == null) return ResponseEntity.notFound().build();
	    return ResponseEntity.ok(res);
	  }

	  @DeleteMapping("/{id}")
	  public ResponseEntity<Void> delete(@PathVariable Long id) {
		    service.delete(id);
		    return ResponseEntity.noContent().build();
		  }

		  @GetMapping("/summary/total")
		  public ResponseEntity<Map<String, Double>> total() {
		    return ResponseEntity.ok(Map.of("total", service.totalSpent()));
		  }

		  @GetMapping("/summary/category")
		  public ResponseEntity<Map<String, Double>> byCategory() {
		    return ResponseEntity.ok(service.spentByCategory());
		  }
		  

}
