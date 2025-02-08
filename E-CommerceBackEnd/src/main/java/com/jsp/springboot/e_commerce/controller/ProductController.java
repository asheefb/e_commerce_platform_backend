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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jsp.springboot.e_commerce.entity.Product;
import com.jsp.springboot.e_commerce.service.ProductService;
import com.jsp.springboot.e_commerce.utility.ResponseStructure;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

	@Autowired
	private ProductService productService;

	@PostMapping("/add-product")
	public ResponseEntity<ResponseStructure<Product>> addProduct(@RequestBody Product product) {

		return productService.addProduct(product); 
	}

	@GetMapping("/find-by-id")
	public ResponseEntity<ResponseStructure<Product>> getProductById(int productId) {

		return productService.getProductById(productId);
	}

	@PutMapping("/update-product")
	public ResponseEntity<ResponseStructure<Product>> updateProduct(Product updatedProduct) {

		return productService.updateProduct(updatedProduct);
	}

	@DeleteMapping("/delete-product")
	public ResponseEntity<ResponseStructure<String>> deleteProduct(@RequestParam int productId) {

		return productService.deleteProduct(productId);
	}

	@GetMapping("/find-all")
	public ResponseEntity<ResponseStructure<List<Product>>> getAllProducts() {
		
		return productService.getAllProducts();
	}
	
	@PostMapping("/add-all")
	public ResponseEntity<ResponseStructure<List<Product>>> addMultiProducts(@RequestBody List<Product> products){
		return productService.addMultiProducts(products);
	}
}
