package com.jsp.springboot.e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jsp.springboot.e_commerce.entity.User;
import com.jsp.springboot.e_commerce.exception.UsersNotFoundException;
import com.jsp.springboot.e_commerce.service.UserService;
import com.jsp.springboot.e_commerce.utility.ResponseStructure;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<ResponseStructure<User>> registerUser(@RequestBody User user) {

		return userService.registerUser(user);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ResponseStructure<User>> getUserById(int userId) {
		return userService.getUserById(userId);
	}

	@PostMapping("/login/email")
	public ResponseEntity<ResponseStructure<User>> login(@RequestParam String email,@RequestParam String password) {
		return userService.login(email, password);
	}

	@PostMapping("/login/phone")
	public ResponseEntity<ResponseStructure<User>> login(long phoneNumber, String password) {
		return userService.login(phoneNumber, password);
	}

	@PutMapping("/{id}/update")
	public ResponseEntity<ResponseStructure<User>> updateUser(@RequestBody User user) {
		return userService.updateUser(user);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<ResponseStructure<String>> deleteUser(int userId) {
		return userService.deleteUser(userId);
	}
	
	@GetMapping("find-all")
	public ResponseEntity<ResponseStructure<List<User>>> findAllUsers(){
		return userService.findAllUsers();
	}
}
