$(document).on("click", "#submit-add-property", () => {
  const id = "User Id";
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
    method: "PUT",
    data: property
  }).then((data) => {
    console.log(data);
    // res,redirect()
  })

})