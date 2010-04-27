<script>
  	var current = new Array(2);
  	var headers = new Array('description','Community');
	var defaultTabs = new Array('HDescripción','HPreguntas al vendedor'); 
    var list = document.getElementsByTagName('LI');
    	
	   	for(i=0; i< headers.length; i++)
    	{     	 		
					var flag = true
  	 		
     	 		for(j=0; j< list.length; j++){
     	 			
     	 			var node = list[j];
     	 			
     	 			if(node.id == trim(defaultTabs[i]) && flag)
     	 			{
     	 				current[i]=node.cloneNode(false);
  	  				node.id='current';
  	  				flag = false;
  	  			}  	  				
  	  		}
    	}

</script>