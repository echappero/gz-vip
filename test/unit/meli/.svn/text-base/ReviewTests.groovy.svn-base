package meli


import grails.test.*

class ReviewTests extends GrailsUnitTestCase {
    protected void setUp() {
        super.setUp()
    }

    protected void tearDown() {
        super.tearDown()
    }

	void testConstraints() {
		mockForConstraintsTests Review
		
		StringBuffer titleTooLong = new StringBuffer("")
		for (def i=0; i<500; i++) titleTooLong.append("A")
		
		def r = new Review(title:titleTooLong.toString(), contras:"")
		assertFalse r.validate()
		assertEquals "maxSize", r.errors["title"]
		assertEquals "maxSize.exceeded", r.errors.getFieldError("title").code
		assertEquals titleTooLong.toString(), r.errors.getFieldError("title").rejectedValue
		assertEquals "nullable", r.errors["conclusion"]
		assertNull r.pros
		assertEquals "nullable", r.errors["customer"]
		assertNull r.customer
		assertEquals "blank", r.errors["contras"]
		
		r = new Review(title:"lalala", conclusion:"lalala", pros:"lalala", contras:"lalala",
				customer: new Customer(nickname:"lalala"), 
				catalogProduct: new CatalogProduct(name:"lalala"))
		assertTrue r.validate()
	}
}
