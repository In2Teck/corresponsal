$(document).on("ready", function(){
  $("#usuarios-li").addClass("active")
});

function getUserEntries(userId, nombre) {
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
      $("#myModal h2").text("Videos de " + nombre);
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
      $("#userEntries").append('<tr><th>Video</th><th>Ticket</th></tr>');
      $("#userEntries").append('<tr><td class="video-td"><iframe src="' + playbackUrl.replace("/msg/", "/embed/") +'" frameborder="no" scrolling="no" height="450" width="100%"></iframe></td><td>' + ticket + '</td></tr>');
    }
  }
  else {

  }
  $("#myModal").modal({maxWidth:600, minHeight:450});
}