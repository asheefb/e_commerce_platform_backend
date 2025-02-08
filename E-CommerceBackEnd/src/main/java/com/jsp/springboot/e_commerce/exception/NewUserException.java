package com.jsp.springboot.e_commerce.exception;

public class NewUserException extends RuntimeException{
	private String message;

	public NewUserException(String message) {
		super();
		this.message = message;
	}

	@Override
	public String getMessage() {
		return message;
	}
	
}
