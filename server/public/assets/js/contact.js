$(document).ready(function () {
  $("#contact_form").on("submit", (e) => {
    e.preventDefault();
    const name = $("#name").val();
    const email = $("#email").val();
    const message = $("#message").val();
    if (!name) {
      alert("Please fill in name field!");
      return;
    }
    if (!email) {
      alert("Please fill in email field!");
      return;
    }
    if (!message) {
      alert("Please fill in message field!");
      return;
    }
    $.ajax({
      url: "api/contact",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        name,
        email,
        message,
      }),
      success: () => {
        alert("Contact added successfully");
        $("#name").val("");
        $("#email").val("");
        $("#message").val("");
      },
      error: function (xhr, status, error) {
        console.error("Error adding contact:", xhr.responseText);
        alert("Failed to add contact: " + xhr.responseText);
      },
    });
  });
});
