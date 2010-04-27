package meli
import grails.test.*

class CategoryTests extends GrailsUnitTestCase {
    protected void setUp() {
        super.setUp()
    }

    protected void tearDown() {
        super.tearDown()
    }
	
	void testTrueAssertion()
	{
		
		mockForConstraintsTests(Category)
		
		def cat = new Category(name:"Una categoria")
		
		
		assertTrue cat.validate()
		
	}
	
	void testCategoryNullable()
	{
		def testCategory = new Category()
		mockForConstraintsTests(Category,[ testCategory ])
		
		assertFalse "Validación de blank verdadera", testCategory.validate()
		assertEquals "No tomó nullable para name","nullable", testCategory.errors["name"]
	}
	void testCategorySize() {
		
		StringBuffer valueTooLong = new StringBuffer("")
		for (def i=0; i<256; i++) valueTooLong.append("A")
		
		
		def testCategory = new Category(
				name:valueTooLong)
		mockForConstraintsTests(Category,[ testCategory ])
		assertFalse "Validación verdadera", testCategory.validate()
		assertEquals "Tamaño correcto de name", "maxSize", testCategory.errors["name"]

        assertEquals "No excedio el tamanio maximo", "maxSize.exceeded", testCategory.errors.getFieldError("name").code
        assertEquals "El error fue dado por otra cadena", valueTooLong.toString(), testCategory.errors.getFieldError("name").rejectedValue		                                                            
		                                                                       
	}
}
