package com.jsp.springboot.e_commerce.exception;

public class ProductsNotFoundExcpetion extends RuntimeException {
	private String message;

	public ProductsNotFoundExcpetion(String message) {
		super();
		this.message = message;
	}

	@Override
	public String getMessage() {
		return message;
	}
	
}
