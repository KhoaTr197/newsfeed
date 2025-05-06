$(document).ready(function () {
  // Load existing comments for this article
  loadComments();

  // Handle comment form submission
  $("#commentForm").on("submit", function (e) {
    e.preventDefault();

    const validator = new FormValidator();

    const email = $("#commentEmail").val();
    const content = $("#commentContent").val();
    const articleId = $("#articleId").val();

    if (!email || !validator.email(email).isValid) {
      alert("Please enter your email address");
      return;
    }

    if (!content) {
      alert("Please enter your comment");
      return;
    }

    $("#commentEmail").val("");
    $("#commentContent").val("");

    const tempComment = {
      email: email,
      content: content,
      created_at: new Date().toISOString()
    };

    $.ajax({
      url: `/api/articles/${articleId}/comments`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        email: email,
        content: content,
        article_id: articleId,
        created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      }),
      success: function (response) {
        // Add the new comment to the list
        addCommentToList(response.comment);


        alert("Comment added successfully");

        // Clear the form
        $("#commentEmail").val("");
        $("#commentContent").val("");
      },
      error: function (xhr) {
        const errorMessage = xhr.responseJSON ? xhr.responseJSON.error : "Failed to submit comment. Please try again.";
        alert(errorMessage);
      }
    });
  });

  // Function to load existing comments
  function loadComments() {
    const articleId = $("#articleId").val();

    $.ajax({
      url: `/api/articles/${articleId}/comments`,
      method: "GET",
      success: function (comments) {
        if (comments.length > 0) {
          // Remove the "no comments" message
          $(".no-comments").remove();

          // Add each comment to the list
          comments.forEach(comment => {
            addCommentToList(comment);
          });

          // Update the comment count
          $("#commentCount").text(comments.length);
        }
      },
      error: function (xhr) {
        console.error("Failed to load comments:", xhr.responseText);
      }
    });
  };

  // Function to format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Function to add a new comment to the list
  function addCommentToList(comment) {
    const commentHtml = `
      <div class="comment-item">
        <div class="comment-header">
          <span class="comment-author">${comment.email}</span>
          <span class="comment-date">${formatDate(comment.created_at)}</span>
        </div>
        <div class="comment-content">
          <p>${comment.content}</p>
        </div>
      </div>
    `;

    // Add the new comment at the top of the list
    $(".comments-list").prepend(commentHtml);

    // Update the comment count
    const count = $(".comments-list .comment-item").length;
    $("#commentCount").text(count);

    // Remove the "no comments" message if it exists
    $(".no-comments").remove();
  }
});
