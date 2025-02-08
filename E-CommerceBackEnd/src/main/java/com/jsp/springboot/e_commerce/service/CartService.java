package com.jsp.springboot.e_commerce.service;

import org.springframework.http.ResponseEntity;

import com.jsp.springboot.e_commerce.entity.Cart;
import com.jsp.springboot.e_commerce.utility.ResponseStructure;

public interface CartService {
	
	public ResponseEntity<ResponseStructure<Cart>> addToCart(int cartId,int productId);
	
	public ResponseEntity<ResponseStructure<Cart>> removeFromCart(int cartId,int productId);
	
	public ResponseEntity<ResponseStructure<Cart>> getCartById(int cartId);

	public ResponseEntity<ResponseStructure<Cart>> createCart(Cart cart);

	public ResponseEntity<ResponseStructure<String>> setCartToUser(int userId, int cartID);
	
	
}
