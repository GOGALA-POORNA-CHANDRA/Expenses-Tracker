package com.expense.tracker.model;


import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class Expence 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private double amount;
	private LocalDate date;
	private String note;
	private String category;
	
	
	public Expence() {};
	public Expence(Double amount,LocalDate date,String note,String category)
	{
		this.amount=amount;
		this.date = date;
	    this.note = note;
	    this.category = category;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	

}
