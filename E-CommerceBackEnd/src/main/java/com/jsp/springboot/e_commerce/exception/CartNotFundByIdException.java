package com.jsp.springboot.e_commerce.exception;

public class CartNotFundByIdException extends RuntimeException{
	private String message;

	@Override
	public String getMessage() {
		return message;
	}

	public CartNotFundByIdException(String message) {
		super();
		this.message = message;
	}
	
}
