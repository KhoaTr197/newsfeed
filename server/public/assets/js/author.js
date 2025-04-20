$(document).ready(function () {
  // Handle tab navigation
  $('.author-sidebar .nav-link').on('click', function () {
    $('.author-sidebar .nav-link').removeClass('active');
    $(this).addClass('active');

    // Hide dashboard panel when other links are active
    var targetTab = $(this).attr('href');
    if (targetTab !== '#dashboard') {
      $('#dashboard').removeClass('show active');
    } else {
      $('#dashboard').addClass('show active');
    }
  });

  // New Article button redirects to Write tab
  $('#newArticleBtn').on('click', function () {
    $('.author-sidebar .nav-link[href="#write"]').click();
  });

  // Live preview for article editor
  $('#articleTitle').on('input', function () {
    $('#previewTitle').text($(this).val() || 'Your Article Title');
  });

  $('#articleCategory').on('change', function () {
    $('#previewCategory').text($(this).find('option:selected').text());
  });

  $('#articleContent').on('input', function () {
    if ($(this).html() && $(this).html().trim() !== '') {
      // Replace the preview content with the editor content
      $('#previewBody').html($(this).html());
    } else {
      // Keep the default preview content
      // Don't replace it with empty content
    }
  });

  // Initialize with current date
  var today = new Date();
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  $('#previewDate').text(today.toLocaleDateString('en-US', options));

  // Simple toolbar functionality
  $('.editor-toolbar .btn').on('click', function () {
    document.execCommand($(this).attr('data-command'), false, null);
    $('#articleContent').focus();
  });

  // Set data-command attributes for toolbar buttons
  $('.editor-toolbar .btn').each(function () {
    var icon = $(this).find('i').attr('class').split(' ')[1];
    switch (icon) {
      case 'fa-bold': $(this).attr('data-command', 'bold'); break;
      case 'fa-italic': $(this).attr('data-command', 'italic'); break;
      case 'fa-underline': $(this).attr('data-command', 'underline'); break;
      case 'fa-header': $(this).attr('data-command', 'formatBlock').attr('data-value', '<h2>'); break;
      case 'fa-list-ul': $(this).attr('data-command', 'insertUnorderedList'); break;
      case 'fa-list-ol': $(this).attr('data-command', 'insertOrderedList'); break;
      case 'fa-link': $(this).attr('data-command', 'createLink').attr('data-value', prompt('Enter link URL:')); break;
      case 'fa-image': $(this).attr('data-command', 'insertImage').attr('data-value', prompt('Enter image URL:')); break;
    }
  });
});
