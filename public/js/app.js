$(function() {

	$('#add-books').on('submit', function(event) {
		event.preventDefault();

		var form = $(this);
		var serverData = form.serialize();
	    var currentUrl = window.location;
  
	    var serverLink = '/admin/addBooksSubmit';  

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


	$('#add-authors').on('submit', function(event) {
		event.preventDefault();

		var form = $(this);
		var serverData = form.serialize();
	    var currentUrl = window.location;
	   //var dev  = /localhost/.test(currentUrl);
	   var serverLink = '/admin/addAuthorsSubmit'
	  
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


$(document).on('click',".dele",function(event) {

    
    if(!confirm('Are you sure ?')){
      return false;
    }

    var target = $(event.currentTarget);
    var id = target.data('id');
    var source = target.data('source');
      	if(source == 'book') { 
      	       var sUrl = '/admin/delete-book'; 
  			} else if (source == 'author') {
  				var sUrl = '/admin/delete-author';
  			} else {
  				var sUrl = '';
  			}

 
	    $.ajax({
	      type: 'DELETE',
	      //crossDomain: true,
	      url: sUrl + '/' + id
	    }).done(function () {
	      target.parents('tr').remove();
	    });
  });

});

