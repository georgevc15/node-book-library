$(function() {

	$('#add-books').on('submit', function(event) {
		event.preventDefault();

		var form = $(this);
		var serverData = form.serialize();
	    var currentUrl = window.location;
  
    console.log('serbver data'+serverData);

	   var dev  = /localhost/.test(currentUrl);


	   if(dev == true) {  var serverLink = 'http://localhost:3000/admin/addBooksSubmit';  } else {  var serverLink = 'production';   }
		

	  
	   $.ajax({
			type: 'POST', url: serverLink, data: serverData
		})
		 .error(function() {
	         console.log('eroare');	
		 })
		 .success(function(serverResponse) {
		    //window.location.replace("/admin/manage-books");
		 	$("#shmeswrap").show().delay(5000).fadeOut();
		 	$("#shmes").html(serverResponse['message']);
		 	$('#add-books').trigger("reset");
		});

	});


});