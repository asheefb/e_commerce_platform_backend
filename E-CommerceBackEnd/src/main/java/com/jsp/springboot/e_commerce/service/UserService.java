package com.jsp.springboot.e_commerce.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.jsp.springboot.e_commerce.entity.User;
import com.jsp.springboot.e_commerce.utility.ResponseStructure;

public interface UserService {
	public ResponseEntity<ResponseStructure<User>> registerUser(User user);
	
	public ResponseEntity<ResponseStructure<User>> getUserById(int userId);
	
	public ResponseEntity<ResponseStructure<User>> login(String email,String password);
	
	public ResponseEntity<ResponseStructure<User>> login(long phoneNumber,String password);
	
	public ResponseEntity<ResponseStructure<User>> updateUser(User user);
	
	public ResponseEntity<ResponseStructure<String>> deleteUser(int userId);

	public ResponseEntity<ResponseStructure<List<User>>> findAllUsers();
}
