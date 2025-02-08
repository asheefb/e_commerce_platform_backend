package com.jsp.springboot.e_commerce.utility;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.jsp.springboot.e_commerce.exception.CartNotFundByIdException;
import com.jsp.springboot.e_commerce.exception.NewUserException;
import com.jsp.springboot.e_commerce.exception.PasswordInvalidException;
import com.jsp.springboot.e_commerce.exception.ProductNotFoundByIdException;
import com.jsp.springboot.e_commerce.exception.ProductsNotFoundExcpetion;
import com.jsp.springboot.e_commerce.exception.UserAlreadyExistException;
import com.jsp.springboot.e_commerce.exception.UserNotFoundByEmailException;
import com.jsp.springboot.e_commerce.exception.UserNotFoundByIdException;
import com.jsp.springboot.e_commerce.exception.UserNotFoundByPhoneNumberException;

@RestControllerAdvice
public class ApplicationHandler {
	
	private ResponseEntity<ErrorStructure<String>> createErrorStructure(int statusCode,String data,String message){
		ErrorStructure<String> errorStructure=new ErrorStructure<String>();
		errorStructure.setStatusCode(statusCode);
		errorStructure.setData(data);
		errorStructure.setMessage(message);
		return new ResponseEntity<ErrorStructure<String>>(errorStructure, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler
	public ResponseEntity<ErrorStructure<String>> userNotFoundByIdException(UserNotFoundByIdException ee){
		return createErrorStructure(HttpStatus.NOT_FOUND.value(), "User Not Found By id", ee.getMessage());
	}
	
	@ExceptionHandler
	public ResponseEntity<ErrorStructure<String>> userNotFoundByEmailException(UserNotFoundByEmailException ee){
		return createErrorStructure(HttpStatus.NOT_FOUND.value(), "User Not Found By email", ee.getMessage());
	}
	
	@ExceptionHandler
	public ResponseEntity<ErrorStructure<String>> passwordInvalidException(PasswordInvalidException ee){
		return createErrorStructure(HttpStatus.NOT_FOUND.value(), "User Not Found", ee.getMessage());
	}
	
	@ExceptionHandler
	public ResponseEntity<ErrorStructure<String>> userNotFoundByPhoneNumberException(UserNotFoundByPhoneNumberException ee){
		return createErrorStructure(HttpStatus.NOT_FOUND.value(), "User Not Found By Phone Number", ee.getMessage());
	}
	
	@ExceptionHandler
	public ResponseEntity<ErrorStructure<String>> productNotFoundByIdException(ProductNotFoundByIdException ee){
		return createErrorStructure(HttpStatus.NOT_FOUND.value(), "Product Not Found By Id", ee.getMessage());
	}
	
	@ExceptionHandler
	public ResponseEntity<ErrorStructure<String>> productsNotFoundException(ProductsNotFoundExcpetion ee){
		return createErrorStructure(HttpStatus.NOT_FOUND.value(), "Product Not Found By Id", ee.getMessage());
	}
	
	@ExceptionHandler
	public ResponseEntity<ErrorStructure<String>> cartNotFoundByIdException(CartNotFundByIdException ee){
		return createErrorStructure(HttpStatus.NOT_FOUND.value(), "Cart Not Found By Id", ee.getMessage());
	}
	
	@ExceptionHandler
	public ResponseEntity<ErrorStructure<String>> userAlreadyExistExpeption(UserAlreadyExistException ee){
		return createErrorStructure(HttpStatus.NOT_FOUND.value(), "User Already Exist", ee.getMessage());
	}
	
	@ExceptionHandler
	public ResponseEntity<ErrorStructure<String>> newUserExcpetion(NewUserException ee){
		return createErrorStructure(HttpStatus.NOT_FOUND.value(), "new user", ee.getMessage());
	}

}
