package meli


import grails.test.*

class QuestionTests extends GrailsUnitTestCase {
    protected void setUp() {
        super.setUp()
    }

    protected void tearDown() {
        super.tearDown()
    }

	void testConstraints() {
		mockForConstraintsTests Question
		
		def q = new Question()
		assertFalse q.validate()
		assertEquals "nullable", q.errors["question"]
		assertEquals "nullable", q.errors["answer"]
		assertNull q.question
		
		q = new Question(question:"¿Me lo dejás más barato?", answer:"Ni a palos vieja.", 
					questionDt:new Date(), answerDt:new Date(), item: getTestItem())
		assertTrue q.validate()
	}
	
	Item getTestItem() {
		Site st = new Site(id: 1,siteId: "MLA", locale: "AR")
		Category cat = new Category(name: "my_category")
		Customer cust = new Customer(nickname: "my_nick")
		CatalogProduct catProd = new CatalogProduct(name: "my_category_prod")
		
		return new Item(title: "Test Item", bidsCount: 0,
				price: 25, site: st, category: cat,
				customer: cust, catalogProduct: catProd)
		
	}
}
