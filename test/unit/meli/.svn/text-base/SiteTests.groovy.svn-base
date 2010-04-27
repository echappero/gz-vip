package meli


import grails.test.*

class SiteTests extends GrailsUnitTestCase {
    protected void setUp() {
        super.setUp()
    }

    protected void tearDown() {
        super.tearDown()
    }

	void testConstraints() {
		mockForConstraintsTests Site
		
		def s = new Site(siteId:"AR", locale:"español")
		assertFalse s.validate()
		assertEquals "size", s.errors["siteId"]
		assertEquals "size.toosmall", s.errors.getFieldError("siteId").code
		assertEquals "size", s.errors["locale"]
		assertEquals "size.toobig", s.errors.getFieldError("locale").code
		
		def s1 = new Site(siteId:"MLA", locale:"es")
		def s2 = new Site(siteId:"MLB", locale:"pt")
		assertTrue s1.validate()
		assertTrue s2.validate()
		
		mockDomain(Site, [s1, s2])
		
		def s3 = new Site(siteId:"MLB", locale:"pt")
		assertFalse s3.validate()
		assertEquals "unique", s3.errors["siteId"]
		
		def s4 = new Site(siteId:"MPT", locale:"pt")
		assertTrue s4.validate()
		
		def s5 = new Site(siteId:"MLU", locale:"es")
		assertTrue s5.validate()
	}
	
	void testMustFail() {
		mockDomain(Site, [new Site(siteId:"MLA", locale:"es"), 
		                  new Site(siteId:"MLB", locale:"pt")])
		
		def duplicatedSiteId = new Site(siteId:"MLB", locale:"pt")
		assertTrue duplicatedSiteId.validate()
	}
}
