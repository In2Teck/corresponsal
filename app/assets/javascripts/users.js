$(document).on("ready", function(){
  $("#usuarios-li").addClass("active")
});

function getUserEntries(userId) {
		$.ajax({
    beforeSend: function( xhr ) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    }, 
    type: "GET",
    url: "/users/" + userId + "/get_entries",
    dataType: "json",
    success: function(data, textStatus, jqXHR) {
      var entries = [];
      for (var index = 0; index < data.length; index++) {
				entries.push(data[index]);
      }
      $("#myModal h2").text("Videos");
      showModal(entries);
    },
    error: function() {
    } 
  });
}


function showModal(entries) {
	$("#userEntries").empty();
  
  if (entries.length > 0) {
    for (var index = 0; index < entries.length; index++) {
      var playbackUrl = entries[index].playback_url
      var ticket = entries[index].ticket_number;
      $("#userEntries").append('<tr><th>Video</th><th>Ticket</th></tr>')
      $("#userEntries").append('<tr><td><iframe src="' + playbackUrl +'" frameborder="no" scrolling="no" height="450" width="100%"></iframe></td><td>' + ticket + '</td></tr>');
    }
  }
  else {

  }
  $("#myModal").modal({maxWidth:800, minHeight:450});
}