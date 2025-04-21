$(document).ready(function () {
  // Handle tab navigation
  $('.admin-sidebar .nav-link').on('click', function () {
    $('.admin-sidebar .nav-link').removeClass('active');
    $(this).addClass('active');

    // Hide dashboard panel when other links are active
    var targetTab = $(this).attr('href');
    if (targetTab !== '#dashboard') {
      $('#dashboard').removeClass('show active');
    } else {
      $('#dashboard').addClass('show active');
    }
  });

  $("#logout").on("click", function () {
    $.ajax({
      url: '/api/auth/logout',
      type: 'POST',
      success: function (response) {
        if (response.success) {
          window.location.href = '/admin/login';
        }
      },
      error: function (xhr, status, error) {
        console.log(error);
      }
    });
  });
});