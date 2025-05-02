$(document).ready(function () {
  // Check if URL has #contact hash and open modal
  if (window.location.hash === '#contact') {
    $('#contactModal').modal('show');
  }
  // Handle contact form submission
  $("#submitContactForm").on("click", function () {
    const name = $("#name").val();
    const email = $("#email").val();
    const message = $("#message").val();

    // Validate form fields
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

    // Submit form via AJAX
    $.ajax({
      url: "/api/contacts",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        name,
        email,
        message,
      }),
      success: function () {
        // Show success message and clear form
        alert("Message sent successfully!");
        $("#name").val("");
        $("#email").val("");
        $("#message").val("");
        // Close the modal
        $("#contactModal").modal("hide");
      },
      error: function (xhr, status, error) {
        console.error("Error sending message:", xhr.responseText);
        alert("Failed to send message: " + xhr.responseText);
      },
    });
  });
});
