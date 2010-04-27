package meli

import grails.test.*
import meli.Item;
import meli.Site;
import meli.Category;
import meli.Customer;
import meli.CatalogProduct;

class ItemTests extends GrailsUnitTestCase {
	
	def item
	
	@Override
	protected void setUp() {
		super.setUp();
		mockForConstraintsTests Item
		item  = new Item(title: "Item Test", bidsCount: 0,  price: 25)
	}
	
	void testNull(){
		//Test Nulls
		item = new Item() 
		assertFalse item.validate()
		assertEquals "nullable", item.errors["title"]
		assertNull item.errors["bidsCount"]
		assertEquals "nullable", item.errors["price"]
		assertEquals "nullable", item.errors["site"]
		
	}
	
	void testBlanks(){
		//Test Blanks		
		item = new Item(title: "", site: "")
		assertFalse item.validate()
		assertEquals "title is blank", "blank", item.errors["title"]
	}
	
	void testMaxSize(){
		StringBuffer tooLong = new StringBuffer("")
		for (def i=0; i<1001; i++) tooLong.append("A")		
		
		//Test Other
		item = new Item(title: tooLong.toString(), bidsCount: 1, price: 25, 
				image: tooLong.toString(), description: tooLong.toString())
		assertFalse item.validate()
		assertEquals "maxSize", item.errors["title"]
		assertEquals "maxSize", item.errors["image"]
		assertEquals "maxSize", item.errors["description"]
	}
	
	
	void testValidate() {
		Site st = new Site(siteId: "MLA", locale: "AR")
		Category cat = new Category(name: "my_category")
		Customer cust = new Customer(nickname: "my_nick")
		CatalogProduct catProd = new CatalogProduct(name: "my_category_prod")
		
		item = new Item(title: "Test Item", bidsCount: 0,
				price: 25, site: st, category: cat,
				customer: cust, catalogProduct: catProd)
		
		item.validate()
		
	}
}
