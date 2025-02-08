package com.jsp.springboot.e_commerce.entity;

import com.jsp.springboot.e_commerce.enums.paymentStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Payment {
	@Id
	private int paymentId;
	private double amount;
	private String paymentMethod;
	private paymentStatus paymentStatus;
	
	@OneToOne
	@JoinColumn(name = "order_id")
	private Order order;

	public int getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public paymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(paymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}
}
