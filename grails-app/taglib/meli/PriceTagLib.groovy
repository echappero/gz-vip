package meli

class PriceTagLib {
	def price = { attrs, body ->
		out << "<span class=\"price\">&nbsp;"+attrs?.amount?.intValue()+"<span class=\"decimales\">"+String.format("%02d", ((attrs?.amount - attrs?.amount?.intValue()) * 100) as Integer)+"</span></span>"
	}
}