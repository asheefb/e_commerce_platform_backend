package com.jsp.springboot.e_commerce.exception;

public class PasswordInvalidException extends RuntimeException {
	private String message;

	public PasswordInvalidException(String message) {
		super();
		this.message = message;
	}

	@Override
	public String getMessage() {
		return message;
	}
		
}
