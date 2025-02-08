package com.jsp.springboot.e_commerce.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.jsp.springboot.e_commerce.entity.Cart;
import com.jsp.springboot.e_commerce.entity.User;
import com.jsp.springboot.e_commerce.exception.PasswordInvalidException;
import com.jsp.springboot.e_commerce.exception.UserNotFoundByEmailException;
import com.jsp.springboot.e_commerce.exception.UserNotFoundByIdException;
import com.jsp.springboot.e_commerce.exception.UserNotFoundByPhoneNumberException;
import com.jsp.springboot.e_commerce.exception.UsersNotFoundException;
import com.jsp.springboot.e_commerce.repository.CartRepository;
import com.jsp.springboot.e_commerce.repository.UserRepository;
import com.jsp.springboot.e_commerce.service.UserService;
import com.jsp.springboot.e_commerce.utility.ResponseStructure;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository  userRepository;

	@Autowired
	private CartRepository cartRepository;

	private <R> ResponseStructure<R> createResponseStructure(int statusCode,R data ,String message){
		ResponseStructure<R> responseStructure=new ResponseStructure<R>();
		responseStructure.setStatusCode(statusCode);
		responseStructure.setData(data);
		responseStructure.setMessage(message);

		return responseStructure;
	}

	@Override
	public ResponseEntity<ResponseStructure<User>> registerUser(User user) {
		Optional<User> user2=userRepository.findByEmail(user.getEmail());

		Optional<User> user3=userRepository.findByPhoneNumber(user.getPhoneNumber());

		if(user2.isPresent()&&user2.isPresent()) {
			if(user2.get().getCart()!=null||user3.get().getCart()!=null) {
				return new ResponseEntity<ResponseStructure<User>>(createResponseStructure
						(HttpStatus.OK.value(), user2.get(), "User Already Exist"),HttpStatus.OK);
			}else {
				Cart cart=new Cart();
				cart.setUser(user2.get());
				user2.get().setCart(cart);
				return new ResponseEntity<ResponseStructure<User>>(createResponseStructure
						(HttpStatus.OK.value(), user2.get(), "User Already Exist"),HttpStatus.OK);
			}
		}else {
			Cart cart=new Cart();
			cart.setUser(user);
			user.setCart(cart);
			return new ResponseEntity<ResponseStructure<User>>(createResponseStructure
					(HttpStatus.CREATED.value(),userRepository.save(user) , "User Data Saved"),HttpStatus.CREATED);
		}

	}



	@Override
	public ResponseEntity<ResponseStructure<User>> getUserById(int userId) {

		return new ResponseEntity<ResponseStructure<User>>(createResponseStructure
				(HttpStatus.FOUND.value(), userRepository.findById(userId)
						.orElseThrow(()->new UserNotFoundByIdException("user Not Found")), "User Found"),HttpStatus.FOUND);
	}

	@Override
	public ResponseEntity<ResponseStructure<User>> login(String email, String password) {

		User user=userRepository.findByEmail(email).orElseThrow(()->new UserNotFoundByEmailException("User Not Found"));

		if(!user.getPassword().equals(password)) 
			throw new PasswordInvalidException("Invalid Password");
		else {
			return new ResponseEntity<ResponseStructure<User>>(createResponseStructure
					(HttpStatus.OK.value(), user, "Login Success"),HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<ResponseStructure<User>> login(long phoneNumber, String password) {

		User user=userRepository.findByPhoneNumber(phoneNumber)
				.orElseThrow(()->new UserNotFoundByPhoneNumberException("Invalid Phone Number"));

		if(!user.getPassword().equals(password))
			throw new PasswordInvalidException("Invalid Password");
		else {
			return new ResponseEntity<ResponseStructure<User>>(createResponseStructure
					(HttpStatus.OK.value(), user, "Login Success"),HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<ResponseStructure<User>> updateUser(User updatedUser) {
		User user=userRepository.findById(updatedUser.getUserId())
				.orElseThrow(()->new UserNotFoundByIdException("User Not Found"));

		updatedUser.setUserId(user.getUserId());

		return new ResponseEntity<ResponseStructure<User>>(createResponseStructure
				(HttpStatus.CREATED.value(), userRepository.save(updatedUser), "updated Succesufully!!"),HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<ResponseStructure<String>> deleteUser(int userId) {
		User user=userRepository.findById(userId)
				.orElseThrow(()->new UserNotFoundByIdException("User Not Found"));
		userRepository.delete(user);

		return new ResponseEntity<ResponseStructure<String>>(createResponseStructure
				(HttpStatus.OK.value(), "Deleted", "Deleted Succesufully!!"),HttpStatus.OK);
	}

	@Override
	public ResponseEntity<ResponseStructure<List<User>>> findAllUsers(){
		List<User> users=userRepository.findAll();
		if(users.isEmpty()) {
			throw new UsersNotFoundException("No More Users in Data base");
		}else {
			return new ResponseEntity<ResponseStructure<List<User>>>(createResponseStructure
					(HttpStatus.OK.value(), users, "Fetched"),HttpStatus.OK);
		}

	}
	
//	@Override
//	public ResponseEntity<ResponseStructure<User>> changeUserRole(String role){
//		
//	}

}
