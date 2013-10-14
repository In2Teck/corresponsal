var entry;

$(document).on("ready", onReady);

function onReady() {
  $(document).on("loginReq", onLoginReq);
  $(document).on("fbLoaded", onFBLoaded);
  
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
      $("#section-fan-content").fadeOut(function() {
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
  console.log("result: " + data.id);
  console.log("result: " + status);
  entry = data;  
  $.ajax({
    type: "GET",
    url: "/get_ready",
    data_type: "html",
    success: function(data, textStatus, jqXHR) {
      $("#section-fan-content").fadeOut(function() {
          $(this).html(data).slideDown();
        });   
    },
    error: function() {
    } 
  }); 
}

function onNewEntryError(xhr, status, error) {
  console.log("error: " + status);
  console.log("error: " + error);
}

function recordEntry() {
  $.ajax({
    type: "GET",
    url: "/record_entry/"+ entry.id,
    data_type: "html",
    success: function(data, textStatus, jqXHR) {
      $("#section-fan").fadeOut(function() {
          $(this).html(data).slideDown();
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
  var apiURL = "http://apitest.mailvu.com/api/v1/message?api-key=JOSECUERVO&action=RECORD_MSG&request-id=" + entry.id + "&user-id=josecuervo&timestamp=" + timestamp + "&hash=" + hashcode;
  console.log(apiURL);
  $("#mailvu-widget").attr('src', apiURL);
}