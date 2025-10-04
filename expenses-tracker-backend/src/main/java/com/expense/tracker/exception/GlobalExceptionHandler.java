package com.expense.tracker.exception;


import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice

public class GlobalExceptionHandler 
{

	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	  public ResponseEntity<Map<String,String>> handleValidation(MethodArgumentNotValidException ex){
	    Map<String,String> errors = new HashMap<>();
	    for(FieldError fe: ex.getBindingResult().getFieldErrors()){
	      errors.put(fe.getField(), fe.getDefaultMessage());
	    }
	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
	  }
}
