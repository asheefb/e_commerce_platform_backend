package com.jsp.springboot.e_commerce.utility;

public class ResponseStructure <R>{
	private int statusCode;
	private R data;
	private String message;
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public R getData() {
		return data;
	}
	public void setData(R data) {
		this.data = data;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
