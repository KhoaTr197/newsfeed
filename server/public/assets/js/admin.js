$(document).ready(function () {
  // Global array to store all articles
  let allArticles = [];
  let allCategories = [];
  let allUsers = [];
  let allContacts = [];
  // Function to format date
  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  // Function to get categories
  function getCategories() {
    $.ajax({
      url: '/api/categories',
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function (categories) {
        allCategories = categories;
        const categorySelect = $('#category, #editCategory');
        categorySelect.empty();
        categories.forEach(category => {
          categorySelect.append(`<option value="${category.id}">${category.cateName}</option>`);
        });
      },
      error: function (xhr, status, error) {
        console.error('Error loading categories:', error);
      }
    });
  }

  function loadAuthors() {
    $.ajax({
      url: '/api/users',
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function (authors) {
        allAuthors = authors;
        const authorSelect = $('#author, #editAuthor');
        authorSelect.empty();
        authors.forEach(author => {
          authorSelect.append(`<option value="${author.id}">${author.username}</option>`);
        });
      },
      error: function (xhr, status, error) {
        console.error('Error loading authors:', error);
      }
    });
  }

  // Function to load articles
  function loadArticles() {
    // Show loading indicator
    const tableBody = $('#articles table tbody');
    tableBody.html('<tr><td colspan="7" class="text-center">Loading articles...</td></tr>');

    // Load articles
    $.ajax({
      url: '/api/articles',
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function (articles) {
        // Store articles in the global array
        allArticles = articles;

        tableBody.empty();

        if (articles.length === 0) {
          tableBody.append('<tr><td colspan="7" class="text-center">No articles found</td></tr>');
          return;
        }

        articles.forEach(article => {
          tableBody.append(`
            <tr>
              <td>${article.id}</td>
              <td>${article.title}</td>
              <td>${article.cateId || 'N/A'}</td>
              <td>${article.userId || 'N/A'}</td>
              <td>${formatDate(article.publishedDate)}</td>
              <td>${getStatusText(article.status)}</td>
              <td>
                <button class="btn btn-sm btn-info edit-article" data-id="${article.id}">
                  <i class="fa fa-edit"></i>
                </button>           
              </td>
            </tr>
          `);
        });

        // Set up event handler for edit button
        $('.edit-article').on('click', function () {
          const articleId = $(this).data('id');

    // Add options from allCategories, allUsers array
    allCategories.forEach(category => {
      $("#addCategory").append(`<option value="${category.id}">${category.cateName}</option>`);
    });
    allUsers.forEach(user => {
      $("#addAuthor").append(`<option value="${user.id}">${user.username}</option>`);
    });

    // Clear form fields
    $('#title').val('');
    $('#content').val('');
    $('#thumbnail').val('');
    $('#status').val('1'); // Default to published
    $('#publishedDate').val(new Date().toISOString().slice(0, 16)); // Default to current date and time
  });
  // Set up event handler for article edit button in table
  $(document).on('click', '.edit-article', function () {
    const articleId = $(this).data('id');

    const article = allArticles.find(article => article.id == articleId);

    if (article) {
      $('#editArticleId').val(article.id);
      $('#editTitle').val(article.title);
      $('#editContent').val(article.content);
      $('#editThumbnail').val(article.thumbnail);

      // Clear existing options
      $("#editCategory, #editAuthor").empty();

      // Add a default option
      $("#editCategory").append('<option value="">Select a category</option>');
      $("#editAuthor").append('<option value="">Select an author</option>');

      // Add options from allCategories, allUsers array
      allCategories.forEach(category => {
        const selected = category.id == article.cateId ? 'selected' : '';
        $("#editCategory").append(`<option value="${category.id}" ${selected}>${category.cateName}</option>`);
      });
      allUsers.forEach(user => {
        const selected = user.id == article.userId ? 'selected' : '';
        $("#editAuthor").append(`<option value="${user.id}" ${selected}>${user.username}</option>`);
      });

      $('#editStatus').val(article.status);
      $('#editPublishedDate').val(article.publishedDate ? article.publishedDate.slice(0, 16) : ''); // Set published date

      $('#editArticleModal').modal('show');
    } else {
      alert('Article not found!');
    }
  });
  // Handle save add article button
  $('#addArticleBtn').on('click', function () {
    const title = $('#title').val();
    const content = $('#content').val();
    const thumbnail = $('#thumbnail').val();
    const cateId = $('#addCategory').val();
    const userId = $('#addAuthor').val();
    const status = $('#status').val();
    const publishedDate = $('#publishedDate').val();

    // Validate form
    if (!title || !content) {
      alert('Please fill in all required fields');
      return;
    }

    if (!cateId) {
      alert('Please select a category');
      return;
    }

    if (!userId) {
      alert('Please select an author');
      return;
    }

    // Add article
    $.ajax({
      url: '/api/articles',
      type: 'POST',
      data: JSON.stringify({ title, content, thumbnail, cateId, userId, status, publishedDate }),
      contentType: 'application/json',
      success: function (response) {
        $('#addArticleModal').modal('hide');
        getArticles();
        loadArticles();
        alert('Article added successfully!');
      },
      error: function (xhr, status, error) {
        console.error('Error loading articles:', error);
        tableBody.html('<tr><td colspan="7" class="text-center text-danger">Error loading articles</td></tr>');
      }
    });
  }

  // Handle save edit article button
  $('#saveEditArticle').on('click', function () {
    const article = {
      id: $('#editArticleId').val(),
      title: $('#editTitle').val(),
      content: $('#editContent').val(),
      thumbnail: $('#editThumbnail').val(),
      cateId: $('#editCategory').val(),
      userId: $('#editAuthor').val(),
      status: $('#editStatus').val()
    };

    // Validate form
    if (!article.title || !article.content) {
      alert('Please fill in all required fields');
      return;
    }

    // Update article
    updateArticle(article)
      .done(function (response) {
        if (response.success) {
          $('#editArticleModal').modal('hide');
          loadArticles(); // Reload articles to show updated data
          alert('Article updated successfully!');
        } else {
          alert('Error updating article: ' + response.message);
        }
      })
      .fail(function (error) {
        console.error('Error updating article:', error);
        alert('Error updating article. Please try again.');
      });
  });

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

    // Load articles when articles tab is clicked
    if (targetTab === '#articles') {
      loadArticles();
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
        console.log('Logout error:', error);
      }
    });
  });
});