$(document).on("click", "#submit-add-property", () => {
  const id = localStorage.getItem("id");
  const name = $("#add-property-name").val().trim().trim();
  const address = $("#add-property-address").val().trim().trim();
  const city = $("#add-property-city").val().trim().trim();
  const state = $("#add-property-state").val().trim().trim();
  const zipcode = $("#add-property-zipcode").val().trim().trim();
  
  const property = {
    id,
    name,
    address,
    city,
    state,
    zipcode
  };
  console.log(property);

  $.ajax({
    url: "/addproperty",
    method: "POST",
    data: property
  }).then((dbProperty) => {
    // console.log(dbProperty);
    // res.redirect()
  })

});

$("#userName").text(localStorage.getItem("name"));
console.log(localStorage.getItem("name"));