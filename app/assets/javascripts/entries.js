$(document).on("ready", function(){
  $("#videos-li").addClass("active")
});

function downloadEntry(entryId) {
	$.ajax({
    beforeSend: function( xhr ) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    }, 
    type: "GET",
    url: "/entries/" + entryId + "/download",
    dataType: "json",
    success: function(data, textStatus, jqXHR) {
     console.log(data.hash);
     console.log(data.timestamp);
     var apiURL = "https://mailvu.com/api/v1/message?api-key=JOSECUERVO&action=DOWNLOAD_MP4&request-id=" + entryId + "&user-id=josecuervo&timestamp=" + data.timestamp + "&hash=" + data.hash + "&msg-id=" + data.video_id;
     top.location = apiURL;
    },
    error: function() {
    } 
  });
}