package com.jsp.springboot.e_commerce.exception;

public class UsersNotFoundException extends RuntimeException {
	private String message;

	public UsersNotFoundException(String message) {
		super();
		this.message = message;
	}

	@Override
	public String getMessage() {
		return message;
	}
	
}
