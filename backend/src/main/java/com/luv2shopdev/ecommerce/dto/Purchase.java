package com.luv2shopdev.ecommerce.dto;

import com.luv2shopdev.ecommerce.entity.Address;
import com.luv2shopdev.ecommerce.entity.Customer;
import com.luv2shopdev.ecommerce.entity.Order;
import com.luv2shopdev.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;

    private Address shippingAddress;

    private Address billingAddress;

    private Order order;

    private Set<OrderItem> orderItems;
}
