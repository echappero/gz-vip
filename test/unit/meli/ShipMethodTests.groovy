package meli


import grails.test.*

class ShipMethodTests extends GrailsUnitTestCase {
    protected void setUp() {
        super.setUp()
    }

    protected void tearDown() {
        super.tearDown()
    }

	void testConstraints() {
		mockForConstraintsTests ShipMethod
		
		StringBuffer titleTooLong = new StringBuffer("")
		for (def i=0; i<500; i++) titleTooLong.append("A")
		
		def sm = new ShipMethod(description:titleTooLong.toString())
		assertFalse sm.validate()
		assertEquals "maxSize", sm.errors["description"]
		assertEquals "maxSize.exceeded", sm.errors.getFieldError("description").code
		assertEquals titleTooLong.toString(), sm.errors.getFieldError("description").rejectedValue
		
		sm = new ShipMethod(description:"")
		assertFalse sm.validate()
		assertEquals "blank", sm.errors["description"]
		assertEquals "", sm.errors.getFieldError("description").rejectedValue
		
		sm = new ShipMethod()
		assertFalse sm.validate()
		assertEquals "nullable", sm.errors["description"]
		assertEquals null, sm.errors.getFieldError("description").rejectedValue
		
		sm = new ShipMethod(description:"Lo arreglo con el comprador")
		assertTrue sm.validate()
	}
}
