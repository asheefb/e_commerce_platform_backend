package com.jsp.springboot.e_commerce.exception;

public class UserNotFoundByPhoneNumberException extends RuntimeException{
	private String message;

	public UserNotFoundByPhoneNumberException(String message) {
		super();
		this.message = message;
	}

	@Override
	public String getMessage() {
		return message;
	}
}
