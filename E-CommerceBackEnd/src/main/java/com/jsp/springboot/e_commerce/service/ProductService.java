package com.jsp.springboot.e_commerce.service;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.jsp.springboot.e_commerce.entity.Category;
import com.jsp.springboot.e_commerce.entity.Product;
import com.jsp.springboot.e_commerce.utility.ResponseStructure;

public interface ProductService {
	
	public ResponseEntity<ResponseStructure<Product>> addProduct(Product product);
	
	public ResponseEntity<ResponseStructure<Product>> getProductById(int productId);
	
	public ResponseEntity<ResponseStructure<Product>> updateProduct(Product product);
	
	public ResponseEntity<ResponseStructure<String>> deleteProduct(int productId);
	
	public ResponseEntity<ResponseStructure<List<Product>>> getAllProducts();

	public ResponseEntity<ResponseStructure<Category>> saveCategory(Category category);

	public ResponseEntity<ResponseStructure<List<Product>>> addMultiProducts(List<Product> products);
}
