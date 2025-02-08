package com.jsp.springboot.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.springboot.e_commerce.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer>{

}
