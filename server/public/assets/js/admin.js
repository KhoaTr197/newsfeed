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

  // Function to load categories
  function loadCategories() {
    $.ajax({
      url: '/api/categories',
      type: 'GET',
      success: function (categories) {
        allCategories = categories;
        const categoryTableBody = $('#categoryTableBody');
        categoryTableBody.empty();

        allCategories.forEach(category => {
          categoryTableBody.append(`
            <tr>
              <td>${category.id}</td>
              <td>${category.cateName}</td>
              <td>${category.status ? 'Active' : 'Inactive'}</td>
              <td><button class="btn btn-sm btn-info edit-category" data-id="${category.id}">
                <i class="fa fa-edit"></i>
              </button></td>
            </tr>
          `);
        });
      },
      error: function (_, __, error) {
        console.error('Error loading categories:', error);
      }
    });
  }

  // Function to load users
  function loadUsers() {
    $.ajax({
      url: '/api/users',
      type: 'GET',
      success: function (users) {
        allUsers = users;
        const authorTableBody = $('#authorTableBody');
        authorTableBody.empty();

        if (users.length === 0) {
          authorTableBody.append('<tr><td colspan="6" class="text-center">No users found</td></tr>');
          return;
        }

        allUsers.forEach(author => {
          authorTableBody.append(`
            <tr>
              <td>${author.id}</td>
              <td>${author.username}</td>
              <td>${author.email}</td>
              <td>${author.role ? '<span class="badge badge-primary">Author</span>' : '<span class="badge badge-info">Admin</span>'}</td>
              <td>${author.status ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-danger">Inactive</span>'}</td>
              <td>
                <button class="btn btn-sm btn-info edit-user" data-id="${author.id}">
                  <i class="fa fa-edit"></i>
                </button>
              </td>
            </tr>
          `);
        });
      },
      error: function (_, __, error) {
        console.error('Error loading users:', error);
        $('#authorTableBody').html('<tr><td colspan="6" class="text-center text-danger">Error loading users</td></tr>');
      }
    });
  }

  // Function to load contacts
  function loadContacts() {
    $.ajax({
      url: '/api/contacts',
      type: 'GET',
      success: function (contacts) {
        allContacts = contacts;
        const contactTableBody = $('#contactTableBody');
        contactTableBody.empty();

        allContacts.forEach(contact => {
          contactTableBody.append(`
            <tr>
              <td>${contact.id}</td>
              <td>${contact.name}</td>
              <td>${contact.email}</td>
              <td>${contact.message}</td>
            </tr>
          `);
        });
      },
      error: function (_, __, error) {
        console.error('Error loading contacts:', error);
      }
    });
  }

  // Function to load articles
  function loadArticles() {
    const articleTableBody = $('#articleTableBody');

    $.ajax({
      url: '/api/articles',
      type: 'GET',
      success: function (articles) {
        allArticles = articles;
        articleTableBody.empty();

        articles.forEach(article => {
          articleTableBody.append(`
            <tr>
              <td>${article.id}</td>
              <td>${article.title}</td>
              <td>${allCategories.find(category => category.id == article.cateId)?.cateName || 'N/A'}</td>
              <td>${allUsers.find(user => user.id == article.userId)?.username || 'N/A'}</td>
              <td>${formatDate(article.publishedDate)}</td>
              <td>
                ${article.status ?
              '<span class="badge badge-success">Published</span>' :
              '<span class="badge badge-warning">Draft</span>'
            }
              </td>
              <td>
                <button class="btn btn-sm btn-info edit-article" data-id="${article.id}">
                  <i class="fa fa-edit"></i>
                </button>
              </td>
            </tr>
          `);
        });
      },
      error: function (xhr, status, error) {
        console.error('Error loading articles:', error);
        articleTableBody.html('<tr><td colspan="7" class="text-center text-danger">Error loading articles</td></tr>');
      }
    });
  }
  // ARTICLES
  // Handle add article modal when showing
  $('#addArticleModal').on('shown.bs.modal', function () {
    // Clear existing options
    $("#addCategory, #addAuthor").empty();

    // Add a default option
    $("#addCategory").append('<option value="" selected>Select a category</option>');
    $("#addAuthor").append('<option value="" selected>Select an author</option>');

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
  // Set up event handler for article edit button
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
          loadArticles();
          alert('Article added successfully!');
        },
        error: function (xhr, status, error) {
          console.error('Error adding article:', error);
          alert('Error adding article. Please try again.');
        }
      });
  });
  // Handle save edit article button
  $('#editArticleBtn').on('click', function () {
    const article = {
      id: $('#editArticleId').val(),
      title: $('#editTitle').val(),
      content: $('#editContent').val(),
      thumbnail: $('#editThumbnail').val(),
      cateId: $('#editCategory').val(),
      userId: $('#editAuthor').val(),
      status: $('#editStatus').val(),
      publishedDate: $('#editPublishedDate').val()
    };

    // Validate form
    if (!article.title || !article.content) {
      alert('Please fill in all required fields');
      return;
    }

    // Update article
    $.ajax({
      url: '/api/articles',
      type: 'PUT',
      data: JSON.stringify(article),
      contentType: 'application/json',
      success: function (response) {
        $('#editArticleModal').modal('hide');
        loadArticles(); // Reload articles to show updated data
        alert('Article updated successfully!');
      },
      error: function (error) {
        console.error('Error updating article:', error);
        alert('Error updating article. Please try again.');
      }
    });
  });
  // USERS
  // Handle when submit add new user
  $('#addUserBtn').on('click', function () {
    $(".form-error").text("").hide();

    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const role = $('#role').val();
    const status = $('#status').val();

    const validator = new FormValidator({
      username: {
        minLength: 3,
        maxLength: 20,
        allowedChars: /^[a-zA-Z0-9_]+$/,
        noSpaces: true,
      },
      email: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      },
      password: {
        minLength: 3,
        maxLength: 30,
        mustContain: null,
        noSpaces: true
      }
    });

    const usernameResult = validator.username(username);
    const emailResult = validator.email(email);
    const passwordResult = validator.password(password);

    if (!usernameResult.isValid) {
      $("#username+label.error").text(`* ${usernameResult.message}`);
      return;
    }
    if (!emailResult.isValid) {
      $("#email+label.error").text(`* ${emailResult.message}`);
      return;
    }
    if (!passwordResult.isValid) {
      $("#password+label.error").text(`* ${passwordResult.message}`);
      return;
    }

    $.ajax({
      url: '/api/users',
      type: 'POST',
      data: JSON.stringify({ username, email, password, role, status }),
      contentType: 'application/json',
      success: function (response) {
        $('#addUserModal').modal('hide');
        loadUsers();
        alert('Author added successfully!');
      },
      error: function (xhr, status, error) {
        console.error('Error adding author:', error);
        alert('Error adding author. Please try again.');
      }
    });
  });
  // Handle save edit user button
  $('#editUserBtn').on('click', function () {
      const id = $('#editUserId').val();
      const username = $('#editUsername').val();
      const email = $('#editEmail').val();
      const role = $('#editRole').val();
      const status = $('#editStatus').val();
  
      // Update users
      $.ajax({
        url: '/api/users',
        type: 'PUT',
        data: JSON.stringify({ id, username, email, role, status }),
        contentType: 'application/json',
        success: function (response) {
          $('#editUserModal').modal('hide');
          loadUsers();
          alert('Author updated successfully!');
        },
        error: function (error) {
          console.error('Error updating author:', error);
          alert('Error updating author. Please try again.');
        }
      });
  });
  // Set up event handler for user edit button
  $(document).on('click', '.edit-user', function () {
    const userId = $(this).data('id');

    const user = allUsers.find(user => user.id == userId);

    if (user) {
      $('#editUserId').val(user.id);
      $('#editUsername').val(user.username);
      $('#editEmail').val(user.email);
      $('#editPassword').val(user.password);
      $('#editRole').val(user.role);
      $('#editStatus').val(user.status);

      $('#editUserModal').modal('show');
    } else {
      alert('User not found!');
    }
  });
  // CATEGORIES
  // Handle when submit add new category
  $('#addCategoryBtn').on('click', function () {
    const name = $('#categoryName').val();
    const status = $('#categoryStatus').val();

    $.ajax({
      url: '/api/categories',
      type: 'POST',
      data: JSON.stringify({ name, status }),
      contentType: 'application/json',
      success: function (response) {
        $('#addCategoryModal').modal('hide');
        loadCategories();
        alert('Category added successfully!');
      },
      error: function (error) {
        console.error('Error adding category:', error);
        alert('Error adding category. Please try again.');
      }
    });
  });
  // Handle when submit edit category
  $('#editCategoryBtn').on('click', function () {
    const id = $('#editCategoryId').val();
    const name = $('#editCategoryName').val();
    const status = $('#editCategoryStatus').val();

    $.ajax({
      url: `/api/categories/${id}`,
      type: 'PUT',
      data: JSON.stringify({ name, status }),
      contentType: 'application/json',
      success: function (response) {
        $('#editCategoryModal').modal('hide');
        loadCategories();
        alert('Category updated successfully!');
      },
      error: function (error) {
        console.error('Error updating category:', error);
        alert('Error updating category. Please try again.');
      }
    });

  });
  // Set up event handler for category edit button
  $(document).on('click', '.edit-category', function () {
    const categoryId = $(this).data('id');

    const category = allCategories.find(category => category.id == categoryId);

    if (category) {
      $('#editCategoryId').val(category.id);
      $('#editCategoryName').val(category.cateName);
      $('#editCategoryStatus').val(category.status);

      $('#editCategoryModal').modal('show');
    } else {
      alert('Category not found!');
    }
  });
  // Handle tab navigation
  $('.admin-sidebar .nav-link').on('click', function () {
      $('.admin-sidebar .nav-link').removeClass('active');
      $(this).addClass('active');
  
      var targetTab = $(this).attr('href');
  
      // Hide all tab panes first
      $('.tab-pane').removeClass('show active');
  
      // Show only the target tab pane
      $(targetTab).addClass('show active');
  
      // Load data based on which tab is clicked
      if (targetTab === '#articles') {
        loadCategories();
        loadUsers();
        loadArticles();
      }
      else if (targetTab === '#users') {
        loadUsers();
      }
      else if (targetTab === '#categories') {
        loadCategories();
      }
      else if (targetTab === '#contacts') {
        loadContacts();
      }
  });
  // Handle logout button
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