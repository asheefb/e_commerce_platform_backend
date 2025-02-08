package com.jsp.springboot.e_commerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jsp.springboot.e_commerce.entity.Cart;
import com.jsp.springboot.e_commerce.service.CartService;
import com.jsp.springboot.e_commerce.utility.ResponseStructure;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartContoller {
	@Autowired
	private CartService cartService;
	
	@PostMapping("/add-to-cart")
	public ResponseEntity<ResponseStructure<Cart>> addToCart(@RequestParam int cartId,@RequestParam int productId) {
		return cartService.addToCart(cartId, productId);
	}

	@DeleteMapping("/remove-from-cart")
	public ResponseEntity<ResponseStructure<Cart>> removeFromCart(int cartId, int productId) {
		return cartService.removeFromCart(cartId, productId);
	}

	@GetMapping("/get/carts")
	public ResponseEntity<ResponseStructure<Cart>> getCartById(int cartId) {

		return cartService.getCartById(cartId);
	}
	
	@PostMapping("/create/cart")
	public ResponseEntity<ResponseStructure<Cart>> createCart(@RequestBody Cart cart){
		return cartService.createCart(cart);
	}
	
	@PostMapping("/set-cart-user")
	public ResponseEntity<ResponseStructure<String>> setCartToUser(int userId,int cartID){
		return cartService.setCartToUser(userId, cartID);
	}
}
