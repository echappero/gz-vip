package meli;
import grails.test.GrailsUnitTestCase;
import meli.PaymentMethod;
import meli.Item;
import meli.Site;
class PaymentMethodTests extends GrailsUnitTestCase {
	
	def testPay
	
	@Override
	protected void setUp() {
		super.setUp();
		mockForConstraintsTests(PaymentMethod)
		testPay  = new PaymentMethod(name: "CC", logo: "/logo.gif")
	}
	
	void testNull(){
		testPay = new PaymentMethod() 
		assertFalse testPay.validate()
		assertEquals "nullable", testPay.errors["name"]
		assertEquals "nullable", testPay.errors["logo"]
	}
	
	void testBlank(){
		
		testPay = new PaymentMethod(name: "", logo: "") 
		assertFalse testPay.validate()
		assertEquals "blank", testPay.errors["name"]
		assertEquals "blank", testPay.errors["logo"]
	}
	
	void testMaxSize(){
		StringBuffer nameTooLong = new StringBuffer("")
		for (def i=0; i<260; i++) nameTooLong.append("A")		
		
		testPay = new PaymentMethod(name: nameTooLong)
		assertFalse testPay.validate() 
		assertEquals "maxSize", testPay.errors["name"]
		assertEquals "maxSize.exceeded", testPay.errors.getFieldError("name").code
		assertEquals nameTooLong.toString(), testPay.errors.getFieldError("name").rejectedValue
		
		
	}
	
	void testValidate() {
	

		Item item = new Item(title: "Item Test Many", bidsCount: 0, 
				price: 25, site: new Site(siteId: "MLB", locale: "BR"))
		Set<Item> itemSet = new HashSet<Item>()
		itemSet.add item
		
		// Validation should pass! 
		testPay = new PaymentMethod(name: "CC", logo: "/logo.gif",
				belongsTo: 
				new Item(title: "Item Test Belong", bidsCount: 0, 
				price: 25, site: new Site(siteId: "MLA", locale: "AR")),
				items: itemSet)
		assertTrue testPay.validate() 
		
	}
	
}