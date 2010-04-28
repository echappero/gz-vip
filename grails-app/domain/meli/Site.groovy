package meli

class Site {
	String siteId
	String locale
	
	Date dateCreated
	Date lastUpdated
	
	static constraints = {
		siteId(size:3..3, blank:false, unique:true)
		locale(size:2..2, blank:false)
	}
	
	String toString() {
		"${siteId} (id=${id})"
	}
}
