$(document).ready(function() {
  // Handle newsletter subscription form submission
  $("#newsletterForm").on("submit", function(e) {
    e.preventDefault();
    
    const email = $("#newsletterEmail").val();
    
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    
    // Submit the form via AJAX
    $.ajax({
      url: "/api/newsletter",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ email }),
      success: function(response) {
        alert(response.message || "Thank you for subscribing to our newsletter!");
        $("#newsletterEmail").val("");
      },
      error: function(xhr) {
        const errorMessage = xhr.responseJSON ? xhr.responseJSON.error : "Failed to subscribe. Please try again.";
        alert(errorMessage);
      }
    });
  });
});
