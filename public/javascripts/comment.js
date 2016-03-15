$(document).ready(function(){
	commentsPerPerson();
    $("#serialize").click(function(){
        var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val()};
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
		
		var url = "comment";
		$.ajax({
	  	url:url,
	  	type: "POST",
	  	data: jobj,
	  	contentType: "application/json; charset=utf-8",
	  	success: function(data,textStatus) {
 	    	$("#done").html(textStatus);
 			}
		});
		commentsPerPerson();
    });
	$("#getThem").click(function() {
      $.getJSON('comment', function(data) {
		var everything = "<h4>Current Comments:</h4>";
        everything += "<ul>";
        for(var comment in data) {
          com = data[comment];
          everything += "<li>Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
        }
        everything += "</ul>";
		
        $("#comments").html(everything);
      })
    })
});

var commentsPerPerson = function() {
	$.getJSON('comment', function(data) {
		var everything = "<ul>";
		var names = [];
		data.forEach(function(comment) {
			if(!names.includes(comment.Name)) {
				names.push(comment.Name);
			}
		});
		var count = 0;
		names.forEach(function(name) {
			data.forEach(function(comment) {
				if(comment.Name === name) {
					count++;
				}
			});
			everything += "<li>" + name + " wrote " + count + " comment";
			if(count > 1) everything += "s";
			everything += "</li>";
			count = 0;
		});
		everything += "</ul>";
		$("#creative").html(everything);
	});
}
