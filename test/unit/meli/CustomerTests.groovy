package meli;

import java.util.Date;
import meli.Customer;
import meli.Calification;
import meli.Item;
import meli.Site;
import grails.test.GrailsUnitTestCase
import groovy.lang.MetaClass;

class CustomerTests extends GrailsUnitTestCase {
	
	def cust
	
	@Override
	protected void setUp() {
		super.setUp();
		// Make sure we can invoke validate() on our domain Object
		mockForConstraintsTests(Customer)
		// Set up default;
		cust = new Customer(nickname: "mfurlong")	
	}

	void testNull(){
		// Test Null
		cust = new Customer() 
		assertFalse cust.validate()
		assertEquals "nullable", cust.errors["nickname"]
		
		cust= new Customer(nickname: "my_nick")
		assertTrue cust.validate()
	}

	void testOtherConstraints() {

		// Test Other
		cust = new Customer(nickname: "my")
		assertFalse cust.validate() 
		assertEquals "size", cust.errors["nickname"]
		
		cust = new Customer(nickname: "my_nick")
		cust.validate()
		
	}
	
	void testValidate(){
		// Validation should pass! 
		Calification cal = new Calification(textoCalif: "calif")
		Set<Calification> cals = new HashSet<Calification>()
		cals.add(cal)
		Item item = new Item(title: "My Item", bidsCount: 0, 
				price: 25, site: new Site(siteId: "MLA", locale: "AR"))
		Set<Item> itemSet = new HashSet<Item>()
		itemSet.add item
		
		cust = new Customer(nickname: "mfurlong", califications: cals, items: itemSet) 
		
		cal.setBelongsTo cust
		item.setBelongsTo cust
		
		assertTrue cust.validate() 
	}
}