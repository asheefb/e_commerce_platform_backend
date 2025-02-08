package com.jsp.springboot.e_commerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.springboot.e_commerce.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	public Optional<User> findByEmail(String email);
	
	public Optional<User> findByPhoneNumber(long phoneNumber);
}
