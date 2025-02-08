package com.jsp.springboot.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.springboot.e_commerce.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
