package com.jsp.springboot.e_commerce.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.jsp.springboot.e_commerce.entity.Cart;
import com.jsp.springboot.e_commerce.entity.Product;
import com.jsp.springboot.e_commerce.entity.User;
import com.jsp.springboot.e_commerce.exception.CartNotFundByIdException;
import com.jsp.springboot.e_commerce.exception.ProductNotFoundByIdException;
import com.jsp.springboot.e_commerce.exception.UserNotFoundByIdException;
import com.jsp.springboot.e_commerce.repository.CartRepository;
import com.jsp.springboot.e_commerce.repository.ProductRepository;
import com.jsp.springboot.e_commerce.repository.UserRepository;
import com.jsp.springboot.e_commerce.service.CartService;
import com.jsp.springboot.e_commerce.utility.ResponseStructure;
@Service
public class CartServiceImpl implements CartService{

	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	private <R> ResponseStructure<R> createResponseStrucute(int statusCode,R data, String message){
		ResponseStructure<R> responseStructure=new ResponseStructure<R>();
		responseStructure.setStatusCode(statusCode);
		responseStructure.setData(data);
		responseStructure.setMessage(message);
		
		return responseStructure;
	}
	
	@Override
	public ResponseEntity<ResponseStructure<Cart>> addToCart(int cartId, int productId) {
		Cart cart=cartRepository.findById(cartId)
				.orElseThrow(()->new CartNotFundByIdException("Cart Not Found"));
		
		Product product=productRepository.findById(productId)
				.orElseThrow(()->new ProductNotFoundByIdException("Product Not Available"));
		
		cart.getProducts().add(product);
		cart.setTotal(cart.getTotal()+product.getPrice());
		
		return new ResponseEntity<ResponseStructure<Cart>>(createResponseStrucute
				(HttpStatus.OK.value(),cartRepository.save(cart) , "Product Added Succesufully!!"),HttpStatus.OK);
	}

	@Override
	public ResponseEntity<ResponseStructure<Cart>> removeFromCart(int cartId, int productId) {
		Cart cart=cartRepository.findById(cartId)
				.orElseThrow(()->new CartNotFundByIdException("Cart Not Found"));
		
		Product product=productRepository.findById(productId)
				.orElseThrow(()->new ProductNotFoundByIdException("Product Not Available"));
		
		cart.getProducts().remove(product);
		cart.setTotal(cart.getTotal()-product.getPrice());
		return new ResponseEntity<ResponseStructure<Cart>>(createResponseStrucute
				(HttpStatus.OK.value(),cartRepository.save(cart) , "Product removed Succesufully!!"),HttpStatus.OK);
	}

	@Override
	public ResponseEntity<ResponseStructure<Cart>> getCartById(int cartId) {
		
		return new ResponseEntity<ResponseStructure<Cart>>(createResponseStrucute
				(HttpStatus.OK.value(), cartRepository.findById(cartId)
						.orElseThrow(()->new CartNotFundByIdException("Cart Not Found")), "Cart Found Success"),HttpStatus.OK);
	}
	
	@Override
	public ResponseEntity<ResponseStructure<Cart>> createCart(Cart cart){
		return new ResponseEntity<ResponseStructure<Cart>>(createResponseStrucute
				(HttpStatus.CREATED.value(), cartRepository.save(cart), "Cart Added SuccessFully!!"),HttpStatus.CREATED);
	}
	
	@Override
	public ResponseEntity<ResponseStructure<String>> setCartToUser(int userId,int cartId){
		User user=userRepository.findById(userId)
				.orElseThrow(()->new UserNotFoundByIdException("User Not Found"));
		Cart cart=cartRepository.findById(cartId)
				.orElseThrow(()->new CartNotFundByIdException("Cart Not Found"));
		String data,message=null;
		
		if(user.getCart()==null) {
			user.setCart(cart);
			userRepository.save(user);
		    data="Cart Added";
		    message="Cart Added Succesufullu!!";
		}else {
			user.setCart(user.getCart()); 
			data="User Have Already His Own Cart";
			message="Cart Not Added";
		}
		return new ResponseEntity<ResponseStructure<String>>(createResponseStrucute
				(HttpStatus.CREATED.value(),data , message),HttpStatus.CREATED);
	}

}
