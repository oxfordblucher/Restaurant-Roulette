//On click should set variables for the input fields
$("#submitAddresses").on("click", function(){
    console.log("Functioning");
    let addressOne = $("#addressOne").val();
    let addressTwo = $("#addressTwo").val();
    alert(addressOne + addressTwo);
});

$(".modal-button").click(function() {
    var target = $(this).data("target");
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
 });
 
 $(".modal-close").click(function() {
    $("html").removeClass("is-clipped");
    $(this).parent().removeClass("is-active");
 });