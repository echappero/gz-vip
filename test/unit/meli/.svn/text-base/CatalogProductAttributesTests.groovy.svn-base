package meli
import grails.test.*

class CatalogProductAttributesTests extends GrailsUnitTestCase {
    protected void setUp() {
        super.setUp()
    }

    protected void tearDown() {
        super.tearDown()
    }
	
	void testTrueAssertion()
	{
		
		mockForConstraintsTests(CatalogProductAttributes)
		
		def catProduAttr = new CatalogProductAttributes(keyName:"UnaClave", 
				value:"UnValor", catalogProduct:new CatalogProduct(name:"cp"))
		
		
		assertTrue catProduAttr.validate()
		
		//println(catProduAttr.errors)
		
	}
	
	void testCatProdAttrBlank()
	{
		def testCatProdAttr = new CatalogProductAttributes(value:"", keyName:"")
		mockForConstraintsTests(CatalogProductAttributes,[ testCatProdAttr ])
		
		assertFalse "Validación de blank verdadera", testCatProdAttr.validate()
		assertEquals "No tomó blank para value","blank", testCatProdAttr.errors["value"]
        assertEquals "No tomó blank para keyName","blank", testCatProdAttr.errors["keyName"]

		testCatProdAttr = new CatalogProductAttributes()
		assertFalse "Validación de blank verdadera", testCatProdAttr.validate()
		assertEquals "No tomó nullable para value","nullable", testCatProdAttr.errors["value"]
        assertEquals "No tomó nullable para keyName","nullable", testCatProdAttr.errors["keyName"]
	}
	
	void testCatProdAttrSize() {
		
		StringBuffer valueTooLong = new StringBuffer("")
		for (def i=0; i<256; i++) valueTooLong.append("A")
		
		
		def testCatProdAttr = new CatalogProductAttributes(
				value:valueTooLong, keyName:valueTooLong)
		mockForConstraintsTests(CatalogProductAttributes,[ testCatProdAttr ])
		assertFalse "Validación verdadera", testCatProdAttr.validate()
		assertEquals "Tamaño correcto de value", "maxSize", testCatProdAttr.errors["value"]
        assertEquals "Tamaño correcto de keyName", "maxSize", testCatProdAttr.errors["keyName"]

        assertEquals "No excedio el tamanio maximo en value", "maxSize.exceeded", testCatProdAttr.errors.getFieldError("value").code
		assertEquals "El error fue dado por otra cadena en value", valueTooLong.toString(), testCatProdAttr.errors.getFieldError("value").rejectedValue		                                                            
		
		assertEquals "No excedio el tamanio maximo en keyName", "maxSize.exceeded", testCatProdAttr.errors.getFieldError("keyName").code
		assertEquals "El error fue dado por otra cadena en keyName", valueTooLong.toString(), testCatProdAttr.errors.getFieldError("keyName").rejectedValue		                                                            
		 		
	}
}
