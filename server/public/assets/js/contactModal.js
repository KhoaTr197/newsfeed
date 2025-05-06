$(document).ready(function () {
  // Check if URL has #contact hash and open modal
  if (window.location.hash === "#contact") {
    $("#contactModal").modal("show");
  }
  //Show the contact modal after scrolling 30%
  $(window).scroll(function () {
    const scrollPercent =
      ($(window).scrollTop() / ($(document).height() - $(window).height())) *
      100;
    if (scrollPercent > 30) {
      $("#contactModal").modal("show");
      $(window).off("scroll");
    }
  });
  // Handle contact form submission
  $("#submitContactForm").on("click", function () {
    const name = $("#name").val();
    const email = $("#email").val();
    const tel = $("#tel").val();
    const title = $("#title").val();
    const message = $("#message").val();

    // Validate form fields
    if (!name || !email || !message || !title || !tel) {
      alert("Please fill in all required fields!");
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
        tel,
        title,
        message,
      }),
      success: function () {
        // Show success message and clear form
        alert("Message sent successfully!");
        $("#name").val("");
        $("#email").val("");
        $("#tel").val("");
        $("#title").val("");
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
