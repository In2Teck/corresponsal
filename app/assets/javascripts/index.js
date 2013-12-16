var entry;
var once = false;
var isChrome = false;

$(document).on("ready", onReady);

function onReady() {

  if (navigator.userAgent.indexOf("Chrome") != -1)
    isChrome = true;

  window.addEventListener("message", function(event) {
    if (event.data == 'recordingComplete') {
      recordingComplete();
    }
    else if (event.data == 'playbackComplete') {
      playbackComplete();
    }
  });

  $(document).on("loginReq", onLoginReq);
  $(document).on("fbLoaded", onFBLoaded);
  $(document).on("loginSuccess", onParticipar);
  
  if ($("#ruby-values").data("is-fan")) {
    $("#section-no-fan").css({display: "none"});
    $("#section-fan").css({display: "block"});
  }
  else {
    $("#section-no-fan").css({display: "block"});
    $("#section-fan").css({display: "none"});
  }
}

function onLoginReq() {
  $("#participar-btn").on("click", onLogin);
}

function onFBLoaded() {
  $("#participar-btn").off("click", onLogin);
  $("#participar-btn").on("click", onParticipar);
}

function onLogin() {
  login();
}

function onParticipar() {
  $.ajax({
    type: "GET",
    url: "/new_entry",
    data_type: "html",
    success: function(data, textStatus, jqXHR) {
      $("#section-fan").fadeOut(function() {
          $(this).html(data).slideDown();
          $("#entry-form").bind("ajax:success", onNewEntry);
          $("#entry-form").bind("ajax:error", onNewEntryError);
        });
    },
    error: function() {
    } 
  });
}

function onNewEntry(event, data, status, xhr) {
  entry = data;  
  $.ajax({
    type: "GET",
    url: "/get_ready",
    data_type: "html",
    success: function(data, textStatus, jqXHR) {
      $(".error-text").text("");
      $("#section-fan").fadeOut(function() {
          $(this).html(data).slideDown();
        });   
    },
    error: function() {
    } 
  }); 
}

function onNewEntryError(event, xhr, status, error) {
  $(".error-text").text($.parseJSON(xhr.responseText).mensaje);
}

function recordEntry() {
  $.ajax({
    type: "GET",
    url: "/record_entry/"+ entry.id,
    data_type: "html",
    success: function(data, textStatus, jqXHR) {
      $("#section-fan").fadeOut(function() {
          $(this).html(data).slideDown();
          if (isChrome)
            $(".chrome-warning").css("display", "block");
          initMailVU();
        });   
    },
    error: function() {
    } 
  });
}

function initMailVU() {
  var timestamp = $("#entry-values").data("timestamp");
  var hashcode = $("#entry-values").data("hash");
  var apiURL = "https://mailvu.com/api/v1/message?api-key=JOSECUERVO&action=RECORD_MSG&request-id=" + entry.id + "&user-id=josecuervo&timestamp=" + timestamp + "&hash=" + hashcode;
  $("#mailvu-widget").attr('src', apiURL);
}

function recordingComplete() {
  $(".quince-div").fadeOut(function() {
    $(this).replaceWith("<div class='confirmacion'></div>").fadeIn();
  });
}

function playbackComplete() {
  $.ajax({
    type: "GET",
    url: "/confirmation",
    data_type: "html",
    success: function(data, textStatus, jqXHR) {
      $(".content").fadeOut(function() {
        $(this).replaceWith(data).fadeIn();
        publishEntry();
      });
    },
    error: function() {
    } 
  });
}

function otroTicket() {
   $.ajax({
    type: "GET",
    url: "/new_entry",
    data_type: "html",
    success: function(data, textStatus, jqXHR) {
      $("#section-fan").fadeOut(function() {
          $(this).html(data).slideDown();
          $("#entry-form").bind("ajax:success", onNewEntry);
          $("#entry-form").bind("ajax:error", onNewEntryError);
        });   
    },
    error: function() {
      console.log("error");
    } 
  });
}

function showTerms() {
  window.open("http://apps.t2omedia.com.mx/tos.html", "_blank");
}