package meli




import java.util.Date;


class Calification {
	
	static  belongsTo =[customer:Customer, item:Item]

	String textoCalif
	int valueCalif 
	Date fecha
	
	Date dateCreated
	Date lastUpdated
	

	static constraints ={
		textoCalif(maxSize:255, blank:false)
	}
	
	String toString() {
		String s = textoCalif.length() > 100 ? textoCalif.substring(0,100)+"..." : textoCalif;
		"[${valueCalif}] ${s} (id=${id})"
	}
}
