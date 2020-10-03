//On click should set variables for the input fields
$("#submitAddresses").on("click", function(){
    console.log("Functioning");
    let addressOne = $("#addressOne").val();
    let addressTwo = $("#addressTwo").val();
    alert(addressOne + addressTwo);
});