package com.jsp.springboot.e_commerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.springboot.e_commerce.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>{
	
	public Optional<Category> findByCategoryName(String categoryName);
}
