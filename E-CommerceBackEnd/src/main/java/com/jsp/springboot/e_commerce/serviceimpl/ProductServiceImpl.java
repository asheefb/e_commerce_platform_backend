package com.jsp.springboot.e_commerce.serviceimpl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.jsp.springboot.e_commerce.entity.Cart;
import com.jsp.springboot.e_commerce.entity.Category;
import com.jsp.springboot.e_commerce.entity.Product;
import com.jsp.springboot.e_commerce.exception.ProductNotFoundByIdException;
import com.jsp.springboot.e_commerce.exception.ProductsNotFoundExcpetion;
import com.jsp.springboot.e_commerce.repository.CategoryRepository;
import com.jsp.springboot.e_commerce.repository.ProductRepository;
import com.jsp.springboot.e_commerce.service.ProductService;
import com.jsp.springboot.e_commerce.utility.ResponseStructure;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	private <R> ResponseStructure<R> createResponseStructure(int statusCode, R data, String message) {
		ResponseStructure<R> responseStructure=new ResponseStructure<R>();
		responseStructure.setStatusCode(statusCode);
		responseStructure.setData(data);
		responseStructure.setMessage(message);
		return responseStructure;
	}
	
	@Override
	public ResponseEntity<ResponseStructure<Product>> addProduct(Product product) {
		String categoryName=product.getCategory().getCategoryName();
		
		Category category=categoryRepository.findByCategoryName(categoryName).orElseGet(()->{
			Category newCategory=new Category();
			newCategory.setCategoryName(categoryName);
			return categoryRepository.save(newCategory);
		});
		product.setCategory(category);
		
		return new ResponseEntity<ResponseStructure<Product>>(createResponseStructure
				(HttpStatus.CREATED.value(),productRepository.save(product),"Product Created Succesuufuly"),HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<ResponseStructure<Product>> getProductById(int productId) {

		return new ResponseEntity<ResponseStructure<Product>>(createResponseStructure
				(HttpStatus.FOUND.value(), productRepository.findById(productId)
						.orElseThrow(()->new ProductNotFoundByIdException("Product Not Found")), "Product Found"),HttpStatus.FOUND);
	}

	@Override
	public ResponseEntity<ResponseStructure<Product>> updateProduct(Product updatedProduct) {
		Product product= productRepository.findById(updatedProduct.getProductId())
				.orElseThrow(()->new ProductNotFoundByIdException("Product Not Found"));
		
		updatedProduct.setProductId(product.getProductId());
		
		return new ResponseEntity<ResponseStructure<Product>>(createResponseStructure
				(HttpStatus.CREATED.value(), productRepository.save(updatedProduct), "Updated Succesufully!!"),HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<ResponseStructure<String>> deleteProduct(int productId) {
		Product product=productRepository.findById(productId)
				.orElseThrow(()->new ProductNotFoundByIdException("Product Not Found"));
		
		productRepository.delete(product);
		
		return new ResponseEntity<ResponseStructure<String>>(createResponseStructure
				(HttpStatus.OK.value(), "Deleted", "Deleted Succesufully!!"),HttpStatus.OK);
	}

	@Override
	public ResponseEntity<ResponseStructure<List<Product>>> getAllProducts() {
		List<Product> products=productRepository.findAll();
		if(products.isEmpty())
			throw new ProductsNotFoundExcpetion("Products Not Present In the Data base");
		else {
			return new ResponseEntity<ResponseStructure<List<Product>>>(createResponseStructure(HttpStatus.OK.value(), products, "Products Found"),HttpStatus.OK);
		}
	}
	
	@Override
	public ResponseEntity<ResponseStructure<Category>> saveCategory(@RequestBody Category category){
		return new ResponseEntity<ResponseStructure<Category>>(createResponseStructure
				(HttpStatus.CREATED.value(),categoryRepository.save(category),"Data Added"),HttpStatus.CREATED);
	}
	
	@Override
	public ResponseEntity<ResponseStructure<List<Product>>> addMultiProducts(List<Product> products){
		if (products == null || products.isEmpty()) {
	        throw new IllegalArgumentException("Product list cannot be null or empty");
	    }
		List<Product> list=productRepository.saveAll(products);
		return new ResponseEntity<ResponseStructure<List<Product>>>(createResponseStructure
				(HttpStatus.CREATED.value(), list, "All Products Added"),HttpStatus.CREATED);
	}

}
