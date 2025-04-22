$(document).ready(function () {
  // Global array to store all articles
  let allArticles = [];
  let allCategories = [];
  let allAuthors = [];

  // Function to format date
  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  // Function to get status text
  function getStatusText(status) {
    return status ? '<span class="badge badge-success">Published</span>' : '<span class="badge badge-secondary">Draft</span>';
  }

  // Function to get article by ID from the array
  function getArticleById(id) {
    return allArticles.find(article => article.id == id);
  }

  // Function to update article
  function updateArticle(article) {
    return $.ajax({
      url: '/api/articles',
      type: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      data: JSON.stringify(article),
      contentType: 'application/json'
    });
  }

  function loadCategories() {
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

          // Get article data from the array and populate the edit modal
          const article = getArticleById(articleId);
          if (article) {
            $('#editArticleId').val(article.id);
            $('#editTitle').val(article.title);
            $('#editContent').val(article.content);
            $('#editThumbnail').val(article.thumbnail);
            $('#editCategory').val(article.cateId);
            $('#editAuthor').val(article.userId);
            $('#editStatus').val(article.status);
        
            $('#editArticleModal').modal('show');
          } else {
            alert('Article not found!');
          }
        });
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