$(document).on("ready", onReady);

function onReady() {
  $(document).on("fbLoaded", onFBLoaded);
  $(".participar-btn").on("click", onLoadFB); 
  
  if ($("#ruby-values").data("is-fan")) {
    $("#section-no-fan").css({display: "none"});
    $("#section-fan").css({display: "block"});
  }
  else {
    $("header").css({margin: 0});
  }
}

function onLoadFB() {
  console.log("hola");
  checkFB();
}

function onFBLoaded() {
  
}
