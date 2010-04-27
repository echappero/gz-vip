package meli
import grails.test.*

class CatalogProductTests extends GrailsUnitTestCase {
    protected void setUp() {
        super.setUp()
    }

    protected void tearDown() {
        super.tearDown()
    }


	void testTrueAssertion()
	{
		
		mockForConstraintsTests(CatalogProduct)
		
		def catProdu = new CatalogProduct(name:"Un catalogo")
		
		
		assertTrue catProdu.validate()
		
	}
	
	void testCatProdBlank()
	{
		def testCatProd = new CatalogProduct(name:"")
		mockForConstraintsTests(CatalogProduct,[ testCatProd ])
		
		assertFalse "Validación de blank verdadera", testCatProd.validate()
		assertEquals "No tomó blank","blank", testCatProd.errors["name"]

		testCatProd = new CatalogProduct()
		assertFalse "Validación de blank verdadera", testCatProd.validate()
		assertEquals "No tomó blank","nullable", testCatProd.errors["name"]

		
		                                                            
	}
	void testCatProdSize() {
		StringBuffer valueTooLong = new StringBuffer("")
		for (def i=0; i<256; i++) valueTooLong.append("A")
		
		def testCatProd = new CatalogProduct(name:valueTooLong)
		mockForConstraintsTests(CatalogProduct,[ testCatProd ])
		assertFalse "Validación verdadera", testCatProd.validate()
		assertEquals "Tamaño correcto", "maxSize", testCatProd.errors["name"]

        assertEquals "No excedio el tamanio maximo", "maxSize.exceeded", testCatProd.errors.getFieldError("name").code
        assertEquals "El error fue dado por otra cadena", valueTooLong.toString(), testCatProd.errors.getFieldError("name").rejectedValue		                                                            
	}
}
