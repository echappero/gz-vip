package meli
import grails.test.*

class CalificationTests extends GrailsUnitTestCase {
    protected void setUp() {
        super.setUp()
    }

    protected void tearDown() {
        super.tearDown()
    }
	
	void testTrueAssertion()
	{

		mockForConstraintsTests(Calification)

		def cust = new Customer(nickname:"klimza")
		Calification cal = new Calification(textoCalif: "calif", customer: cust, 
			fecha:new Date())
		assertTrue cal.validate()
		
		//println(cal.errors)
		
	}
	void testCalifBlank()
	{
		def testCalifBlank = new Calification(textoCalif:"")
		mockForConstraintsTests(Calification,[ testCalifBlank ])
		
		assertFalse "Validación de blank verdadera", testCalifBlank.validate()
		assertEquals "No tomó blank","blank", testCalifBlank.errors["textoCalif"]

		testCalifBlank = new Calification()
		assertFalse "Validación de blank verdadera", testCalifBlank.validate()
		assertEquals "No tomó blank","nullable", testCalifBlank.errors["textoCalif"]
                                                            
	}
	void testCalifMaxSize() {
		StringBuffer valueTooLong = new StringBuffer("")
		for (def i=0; i<256; i++) valueTooLong.append("A")
		
		def testCalif = new Calification(textoCalif:
			valueTooLong)
		mockForConstraintsTests(Calification,[ testCalif ])
		assertFalse "Validación verdadera", testCalif.validate()
		assertEquals "Tamaño correcto", "maxSize", testCalif.errors["textoCalif"]

        assertEquals "No excedio el tamanio maximo", "maxSize.exceeded", testCalif.errors.getFieldError("textoCalif").code
        assertEquals "El error fue dado por otra cadena", valueTooLong.toString(), testCalif.errors.getFieldError("textoCalif").rejectedValue		                                                            
	}
}
