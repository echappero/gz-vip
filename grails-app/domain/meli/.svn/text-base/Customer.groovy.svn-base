package meli


import java.util.Date;


class Customer {

	 static  hasMany = [califications:Calification,items:Item]

	 String nickname 
	 int points
	 int qtyCalif
	 String location
	
	 Date dateCreated
	 Date lastUpdated
	
	static constraints ={
		 nickname(size:3..20)
	}
	
	String toString() {
		"${nickname} (id=${id})"
	}

}
