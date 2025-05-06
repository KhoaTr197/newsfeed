$(document).ready(function () {
  // Global arrays to store all categories, articles, users, and contacts
  let allArticles = [];
  let allCategories = [];
  let allUsers = [];
  let allContacts = [];
  let allNewsletters = [];
  // Function to format date
  function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  // Function to get categories
  function getCategories() {
    $.ajax({
      url: "/api/categories",
      type: "GET",
      success: function (categories) {
        allCategories = categories;
        $("#categoryCount").text(allCategories.length);
      },
      error: function (xhr, status, error) {
        console.error("Error loading categories:", error);
      },
    });
  }
  // Function to load categories
  function loadCategories() {
    const categoryTableBody = $("#categoryTableBody");
    categoryTableBody.empty();

    allCategories.forEach((category) => {
      categoryTableBody.append(`
            <tr>
              <td>${category.id}</td>
              <td>${category.cate_name}</td>
              <td>${category.status
          ? `<span class="badge category-status status-active" data-categorystatus=${category.id}>Active</span>`
          : `<span class="badge category-status status-inactive" data-categorystatus=${category.id}>Inactive</span>`
        }</td>
              <td>
                <button class="btn btn-sm btn-info edit-category" data-id="${category.id
        }">
                  <i class="fa fa-edit"></i>
                </button>
                <button class="btn btn-sm ${category.status ? "btn-danger" : "btn-success"
        } toggle-category" data-id="${category.id}">
                  <i class="fa ${category.status ? "fa-ban" : "fa-check"}"></i>
                </button>
              </td>
            </tr>
          `);
    });
  }
  // Function to get users
  function getUsers() {
    $.ajax({
      url: "/api/users",
      type: "GET",
      success: function (users) {
        allUsers = users;
        $("#userCount").text(allUsers.length);
      },
      error: function (xhr, status, error) {
        console.error("Error loading users:", error);
      },
    });
  }
  // Function to load users
  function loadUsers() {
    const userTableBody = $("#userTableBody");
    userTableBody.empty();

    allUsers.forEach((user) => {
      userTableBody.append(`
            <tr>
              <td>${user.id}</td>
              <td>${user.username}</td>
              <td>${user.email}</td>
              <td>${user.role
          ? '<span class="badge status-info">Admin</span>'
          : '<span class="badge">User</span>'
        }</td>
              <td>${user.status
          ? `<span class="badge user-status status-active" data-userstatus=${user.id}>Active</span>`
          : `<span class="badge user-status status-inactive" data-userstatus=${user.id}>Inactive</span>`
        }</td>
              <td>
                <button class="btn btn-sm btn-info edit-user" data-id="${user.id
        }">
                  <i class="fa fa-edit"></i>
                </button>
                <button class="btn btn-sm ${user.status ? "btn-danger" : "btn-success"
        } toggle-user" data-id="${user.id}">
                  <i class="fa ${user.status ? "fa-ban" : "fa-check"}"></i>
                </button>
              </td>
            </tr>
          `);
    });
  }
  // Function to get contacts
  function getContacts() {
    $.ajax({
      url: "/api/contacts",
      type: "GET",
      success: function (contacts) {
        allContacts = contacts;
      },
      error: function (xhr, status, error) {
        console.error("Error loading contacts:", error);
      },
    });
  }
  // Function to load contacts
  function loadContacts() {
    const contactStatus = {
      pending: "Pending",
      in_progress: "In progress",
      resolved: "Resolved",
      rejected: "Rejected",
    };

    const contactTableBody_pending = $("#contactTableBody_pending");
    contactTableBody_pending.empty();

    const pendingContacts = allContacts.filter(
      (contact) => contact.status === "pending"
    );

    if (pendingContacts) {
      pendingContacts.forEach((contact) => {
        contactTableBody_pending.append(`
            <tr>
              <td>${contact.id}</td>
              <td>${contact.name}</td>
              <td>${contact.email}</td>
              <td>${contact.phone}</td>
              <td>${contact.title}</td>
              <td>${contact.content}</td>
              <td>${formatDate(contact.created_at)}</td>
              <td>${contactStatus[contact.status]}</td>
              <td><button 
            class="btn btn-sm btn-primary mx-1 btnUpdateContactStatus" data-contact-id="${contact.id
          }" 
        data-new-status='in_progress'
          >Process
          </button></td><td><button 
            class="btn btn-sm btn-primary mx-1 btnUpdateContactStatus" data-contact-id="${contact.id
          }" 
        data-new-status='rejected'
          >Reject
          </button></td>
            </tr>
          `);
      });
    } else {
      contactTableBody_pending.append(`<tr>
        <td colspan="10">No contacts</td>
        </tr>`);
    }

    const contactTableBody_in_progress = $("#contactTableBody_in_progress");
    contactTableBody_in_progress.empty();

    const inProgressContacts = allContacts.filter(
      (contact) => contact.status === "in_progress"
    );
    if (inProgressContacts) {
      inProgressContacts.forEach((contact) => {
        contactTableBody_in_progress.append(`
            <tr>
            <td>${contact.id}</td>
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>${contact.title}</td>
            <td>${contact.content}</td>
            <td>${formatDate(contact.created_at)}</td>
            <td>${contactStatus[contact.status]}</td><td><button 
            class="btn btn-sm btn-primary mx-1 btnUpdateContactStatus" data-contact-id="${contact.id
          }" 
              data-new-status='resolved'
              >Done
              </button></td>
              </tr>
              `);
      });
    } else {
      contactTableBody_in_progress.append(`<tr>
              <td colspan="10">No contacts</td>
              </tr>`);
    }

    const contactTableBody_resolved = $("#contactTableBody_resolved");
    contactTableBody_resolved.empty();

    const resolvedContacts = allContacts.filter(
      (contact) => contact.status === "resolved"
    );
    if (resolvedContacts) {
      resolvedContacts.forEach((contact) => {
        contactTableBody_resolved.append(`
              <tr>
                <td>${contact.id}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>${contact.title}</td>
                <td>${contact.content}</td>
                <td>${formatDate(contact.created_at)}</td>
                <td>${contactStatus[contact.status]}</td>
              </tr>
            `);
      });
    } else {
      contactTableBody_resolved.append(`<tr>
              <td colspan="10">No contacts</td>
              </tr>`);
    }

    const contactTableBody_rejected = $("#contactTableBody_rejected");
    contactTableBody_rejected.empty();

    const rejectedContacts = allContacts.filter(
      (contact) => contact.status === "rejected"
    );
    if (rejectedContacts) {
      rejectedContacts.forEach((contact) => {
        contactTableBody_rejected.append(`
              <tr>
                <td>${contact.id}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>${contact.title}</td>
                <td>${contact.content}</td>
                <td>${formatDate(contact.created_at)}</td>
                <td>${contactStatus[contact.status]}</td>
              </tr>
            `);
      });
    } else {
      contactTableBody_rejected.append(`<tr>
        <td colspan="10">No contacts</td>
        </tr>`);
    }
  }
  // Event delegation for dynamically created buttons
  $(document).on("click", ".btnUpdateContactStatus", function (e) {
    const contactId = $(this).data("contact-id");
    const newStatus = $(this).data("new-status");
    if (confirm(`Xác nhận cập nhật trạng thái?`)) {
      updateContactStatus(contactId, newStatus);
    }
  });
  //cập nhật trạng thái liên hệ
  function updateContactStatus(contactId, newStatus) {
    $.ajax({
      url: `/api/contacts/status`,
      method: "PATCH",
      contentType: "application/json",
      data: JSON.stringify({ status: newStatus, id: contactId }),
      success: function (response) {
        $.ajax({
          url: "/api/contacts",
          type: "GET",
          cache: false, // Ngăn caching để lấy dữ liệu mới nhất
          success: function (contacts) {
            allContacts = contacts;
            loadContacts(); // Tải lại bảng
            $("#successModal").modal("show");
          },
          error: function (xhr, status, error) {
            console.error("Error reloading contacts:", error, xhr.responseText);
            alert("Lỗi khi làm mới danh sách liên hệ");
          },
        });
      },
      error: function (xhr, status, error) {
        console.error("Error updating status:", error);
        alert("Lỗi khi cập nhật trạng thái");
      },
    });
  }

  // Function to get articles
  function getArticles() {
    $.ajax({
      url: "/api/articles",
      type: "GET",
      success: function (articles) {
        allArticles = articles;
        $("#articleCount").text(allArticles.length);
      },
      error: function (xhr, status, error) {
        console.error("Error loading articles:", error);
      },
    });
  }
  // Function to load articles
  function loadArticles() {
    const articleTableBody = $("#articleTableBody");
    articleTableBody.empty();

    allArticles.sort((a, b) => a.id - b.id);

    allArticles.forEach((article) => {
      articleTableBody.append(`
            <tr>
              <td>${article.id}</td>
              <td>${article.title}</td>
              <td>${allCategories.find((category) => category.id == article.cate_id)
          ?.cate_name || "N/A"
        }</td>
              <td>${allUsers.find((user) => user.id == article.user_id)?.username ||
        "N/A"
        }</td>
              <td>${formatDate(article.published_date)}</td>
              <td>
                ${article.status
          ? `<span class="badge article-status status-published" data-articlestatus=${article.id}>Published</span>`
          : `<span class="badge article-status status-pending" data-articlestatus=${article.id}>Pending</span>`
        }
              </td>
              <td>
                <button class="btn btn-sm btn-info edit-article" data-id="${article.id
        }">
                  <i class="fa fa-edit"></i>
                </button>
                <button class="btn btn-sm ${article.status ? "btn-danger" : "btn-success"
        } toggle-article" data-id="${article.id}">
                  <i class="fa ${article.status ? "fa-ban" : "fa-check"}"></i>
                </button>
              </td>
            </tr>
          `);
    });
  }
  // Function to get newsletter
  function getNewsletters() {
    $.ajax({
      url: "/api/newsletter",
      type: "GET",
      success: function (newsletter) {
        allNewsletters = newsletter;
      },
      error: function (xhr, status, error) {
        console.error("Error loading newsletter:", error);
      },
    });
  }
  // Function to load newsletter
  function loadNewsletters() {
    const newsletterTableBody = $("#newsletterTableBody");
    newsletterTableBody.empty();

    allNewsletters.forEach((newsletter) => {
      newsletterTableBody.append(`
            <tr>
              <td>${newsletter.id}</td>
              <td>${newsletter.email}</td>
            </tr>
          `);
    });
  }
  // -----------------------------------------
  // Get Categories
  getCategories();
  // Get articles
  getArticles();
  // Get users
  getUsers();
  // Get contacts
  getContacts();
  // Get newsletter
  getNewsletters();
  // Ensure dashboard tab is active on page load
  $("#dashboard").addClass("show active in");
  $('.admin-sidebar .nav-link[href="#dashboard"]').addClass("active");
  // ARTICLES
  // Handle add article button
  $("#addNewArticleBtn").on("click", function () {
    // Clear existing options
    $("#addCategory, #addAuthor").empty();

    // Add a default option
    $("#addCategory").append(
      '<option value="" selected>Select a category</option>'
    );
    $("#addAuthor").append(
      '<option value="" selected>Select an author</option>'
    );

    // Add options from allCategories, allUsers array
    allCategories.forEach((category) => {
      $("#addCategory").append(
        `<option value="${category.id}">${category.cate_name}</option>`
      );
    });
    allUsers.forEach((user) => {
      $("#addAuthor").append(
        `<option value="${user.id}">${user.username}</option>`
      );
    });

    // Clear form fields
    $("#title").val("");
    $("#content").val("");
    $("#thumbnail").val("");
    $("#status").val("1"); // Default to published
    $("#publishedDate").val(new Date().toISOString().slice(0, 16)); // Default to current date and time
  });
  // Set up event handler for article edit button
  $(document).on("click", ".edit-article", function () {
    const articleId = $(this).data("id");

    const article = allArticles.find((article) => article.id == articleId);

    if (article) {
      $("#editArticleId").val(article.id);
      $("#editTitle").val(article.title);
      $("#editContent").val(article.content);
      $("#editThumbnail").val(article.thumbnail);

      // Clear existing options
      $("#editCategory, #editAuthor").empty();

      // Add a default option
      $("#editCategory").append('<option value="">Select a category</option>');
      $("#editAuthor").append('<option value="">Select an author</option>');

      // Add options from allCategories, allUsers array
      allCategories.forEach((category) => {
        const selected = category.id == article.cate_id ? "selected" : "";
        $("#editCategory").append(
          `<option value="${category.id}" ${selected}>${category.cate_name}</option>`
        );
      });
      allUsers.forEach((user) => {
        const selected = user.id == article.user_id ? "selected" : "";
        $("#editAuthor").append(
          `<option value="${user.id}" ${selected}>${user.username}</option>`
        );
      });

      $("#editStatus").val(article.status);
      $("#editPublishedDate").val(
        article.published_date ? article.published_date.slice(0, 16) : ""
      ); // Set published date

      $("#editArticleModal").modal("show");
    } else {
      alert("Article not found!");
    }
  });
  // Handle save add article button
  $("#addArticleBtn").on("click", function () {
    const title = $("#title").val();
    const content = $("#content").val();
    const thumbnail = $("#thumbnail").val();
    const cate_id = $("#addCategory").val();
    const user_id = $("#addAuthor").val();
    const status = $("#status").val();
    const published_date = $("#publishedDate").val();

    // Validate form
    if (!title || !content) {
      alert("Please fill in all required fields");
      return;
    }

    if (!cate_id) {
      alert("Please select a category");
      return;
    }

    if (!user_id) {
      alert("Please select an author");
      return;
    }

    // Add article
    $.ajax({
      url: "/api/articles",
      type: "POST",
      data: JSON.stringify({
        title,
        content,
        thumbnail,
        cate_id,
        user_id,
        status,
        published_date,
      }),
      contentType: "application/json",
      success: function (response) {
        $("#addArticleModal").modal("hide");
        getArticles();
        loadArticles();
        alert("Article added successfully!");
      },
      error: function (xhr, status, error) {
        console.error("Error adding article:", error);
        alert("Error adding article. Please try again.");
      },
    });
  });
  // Handle save edit article button
  $("#editArticleBtn").on("click", function () {
    const article = {
      id: $("#editArticleId").val(),
      title: $("#editTitle").val(),
      content: $("#editContent").val(),
      thumbnail: $("#editThumbnail").val(),
      cate_id: $("#editCategory").val(),
      user_id: $("#editAuthor").val(),
      status: $("#editArticleStatus").val(),
      published_date: $("#editPublishedDate").val(),
    };

    // Validate form
    if (!article.title || !article.content) {
      alert("Please fill in all required fields");
      return;
    }

    // Update article
    $.ajax({
      url: "/api/articles",
      type: "PUT",
      data: JSON.stringify(article),
      contentType: "application/json",
      success: function (response) {
        $("#editArticleModal").modal("hide");
        getArticles();
        loadArticles(); // Reload articles to show updated data
        alert("Article updated successfully!");
      },
      error: function (error) {
        console.error("Error updating article:", error);
        alert("Error updating article. Please try again.");
      },
    });
  });
  $(document).on("click", ".toggle-article", function () {
    const articleId = $(this).data("id");
    const article = allArticles.find((article) => article.id == articleId);

    if (!article) return;

    if (article.status == 0) {
      $.ajax({
        url: "/api/articles/active",
        type: "PUT",
        data: JSON.stringify({ id: articleId }),
        contentType: "application/json",
        success: function (response) {
          alert("Article activated successfully!");
          getArticles();
          loadArticles();

          $(`.article-status[data-articlestatus="${articleId}"]`)
            .removeClass("status-pending")
            .addClass("status-published")
            .text("Published");
          $(`.toggle-article[data-id="${articleId}"]`)
            .removeClass("btn-success")
            .addClass("btn-danger");
          $(`.toggle-article[data-id="${articleId}"] i`)
            .removeClass("fa-check")
            .addClass("fa-ban");
        },
        error: function (error) {
          alert("Error activating article:", error);
        },
      });
    } else {
      $.ajax({
        url: "/api/articles/",
        type: "DELETE",
        data: JSON.stringify({ id: articleId }),
        contentType: "application/json",
        success: function (response) {
          alert("Article deactivated successfully!");
          getArticles();
          loadArticles();

          $(`.article-status[data-articlestatus="${articleId}"]`)
            .removeClass("status-published")
            .addClass("status-pending")
            .text("Pending");
          $(`.toggle-article[data-id="${articleId}"]`)
            .removeClass("btn-danger")
            .addClass("btn-success");
          $(`.toggle-article[data-id="${articleId}"] i`)
            .removeClass("fa-ban")
            .addClass("fa-check");
        },
        error: function (error) {
          alert("Error activating article:", error);
        },
      });
    }
  });
  // USERS
  // Handle when submit add new user
  $("#addUserBtn").on("click", function () {
    $(".form-error").text("").hide();

    const username = $("#username").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const role = $("#role").val();
    const status = $("#status").val();

    const validator = new FormValidator({
      username: {
        minLength: 3,
        maxLength: 20,
        allowedChars: /^[a-zA-Z0-9_]+$/,
        noSpaces: true,
      },
      email: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
      password: {
        minLength: 3,
        maxLength: 30,
        mustContain: null,
        noSpaces: true,
      },
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
      url: "/api/users",
      type: "POST",
      data: JSON.stringify({ username, email, password, role, status }),
      contentType: "application/json",
      success: function (response) {
        $("#addUserModal").modal("hide");
        getUsers();
        loadUsers();
        alert("Author added successfully!");
      },
      error: function (xhr, status, error) {
        console.error("Error adding author:", error);
        alert("Error adding author. Please try again.");
      },
    });
  });
  // Handle save edit user button
  $("#editUserBtn").on("click", function () {
    const id = $("#edituser_id").val();
    const username = $("#editUsername").val();
    const email = $("#editEmail").val();
    const role = $("#editRole").val();

    if (!username || !email) {
      alert("Please fill in all required fields");
      return;
    }

    if (!role) {
      alert("Please select a role");
      return;
    }

    // Update users
    $.ajax({
      url: "/api/users",
      type: "PUT",
      data: JSON.stringify({ id, username, email, role }),
      contentType: "application/json",
      success: function (response) {
        $("#editUserModal").modal("hide");
        getUsers();
        loadUsers();
        alert("Author updated successfully!");
      },
      error: function (error) {
        console.error("Error updating author:", error);
        alert("Error updating author. Please try again.");
      },
    });
  });
  $("#resetPasswordUserBtn").on("click", function () {
    const username = $("#editUsername").val();
    $.ajax({
      url: "/api/users/reset",
      type: "POST",
      data: JSON.stringify({ username }),
      contentType: "application/json",
      success: function (response) {
        alert("Password reset successfully!");
      },
      error: function (error) {
        alert(`Error resetting password: ${error}`);
      },
    });
  });
  // Set up event handler for user edit button
  $(document).on("click", ".edit-user", function () {
    const user_id = $(this).data("id");

    const user = allUsers.find((user) => user.id == user_id);

    if (user) {
      $("#edituser_id").val(user.id);
      $("#editUsername").val(user.username);
      $("#editEmail").val(user.email);
      $("#editPassword").val(user.password);
      $("#editRole").val(user.role);
      $("#editStatus").val(user.status);

      $("#editUserModal").modal("show");
    } else {
      alert("User not found!");
    }
  });
  // Set up event handler for user toggle button
  $(document).on("click", ".toggle-user", function () {
    const user_id = $(this).data("id");

    const user = allUsers.find((user) => user.id == user_id);

    if (!user) return;

    console.log(user.status);
    if (user.status == 0) {
      $.ajax({
        url: "/api/users/active",
        type: "PUT",
        data: JSON.stringify({ id: user_id }),
        contentType: "application/json",
        success: function (response) {
          alert("User activated successfully!");
          getUsers();
          loadUsers();

          $(`.user-status[data-userstatus="${user_id}"]`)
            .removeClass("status-inactive")
            .addClass("status-active")
            .text("Active");
          $(`.toggle-user[data-id="${user_id}"]`)
            .removeClass("btn-success")
            .addClass("btn-danger");
          $(`.toggle-user[data-id="${user_id}"] i`)
            .removeClass("fa-check")
            .addClass("fa-ban");
        },
        error: function (error) {
          alert("Error activating user:", error);
        },
      });
    } else {
      $.ajax({
        url: "/api/users/",
        type: "DELETE",
        data: JSON.stringify({ id: user_id }),
        contentType: "application/json",
        success: function (response) {
          alert("User deactivated successfully!");
          getUsers();
          loadUsers();

          $(`.user-status[data-userstatus="${user_id}"]`)
            .removeClass("status-active")
            .addClass("status-inactive")
            .text("Inactive");
          $(`.toggle-user[data-id="${user_id}"]`)
            .removeClass("btn-danger")
            .addClass("btn-success");
          $(`.toggle-user[data-id="${user_id}"] i`)
            .removeClass("fa-ban")
            .addClass("fa-check");
        },
        error: function (error) {
          alert("Error deactivating user:", error);
        },
      });
    }
  });
  // CATEGORIES
  // Handle when submit add new category
  $("#addCategoryBtn").on("click", function () {
    const name = $("#categoryName").val();
    const status = $("#categoryStatus").val();

    $.ajax({
      url: "/api/categories",
      type: "POST",
      data: JSON.stringify({ name, status }),
      contentType: "application/json",
      success: function (response) {
        $("#addCategoryModal").modal("hide");
        getCategories();
        loadCategories();
        alert("Category added successfully!");
      },
      error: function (error) {
        console.error("Error adding category:", error);
        alert("Error adding category. Please try again.");
      },
    });
  });
  // Handle when submit edit category
  $("#editCategoryBtn").on("click", function () {
    const id = $("#editCategoryId").val();
    const name = $("#editCategoryName").val();

    $.ajax({
      url: `/api/categories/${id}`,
      type: "PUT",
      data: JSON.stringify({ name }),
      contentType: "application/json",
      success: function (response) {
        $("#editCategoryModal").modal("hide");
        getCategories();
        loadCategories();
        alert("Category updated successfully!");
      },
      error: function (error) {
        console.error("Error updating category:", error);
        alert("Error updating category. Please try again.");
      },
    });
  });
  // Set up event handler for category edit button
  $(document).on("click", ".edit-category", function () {
    const categoryId = $(this).data("id");

    const category = allCategories.find(
      (category) => category.id == categoryId
    );

    if (category) {
      $("#editCategoryId").val(category.id);
      $("#editCategoryName").val(category.cate_name);
      $("#editCategoryStatus").val(category.status);

      $("#editCategoryModal").modal("show");
    } else {
      alert("Category not found!");
    }
  });
  $(document).on('click', '.toggle-category', function () {
    if (!confirm("Are you sure you want to toggle this category?"))
      return;

    const categoryId = $(this).data('id');

    const category = allCategories.find(
      (category) => category.id == categoryId
    );

    if (!category) return;

    if (category.status == 0) {
      $.ajax({
        url: "/api/categories/active/",
        type: "PUT",
        data: JSON.stringify({ id: categoryId }),
        contentType: "application/json",
        success: function (response) {
          alert("Category activated successfully!");
          getCategories();
          loadCategories();

          $(`.category-status[data-categorystatus="${categoryId}"]`)
            .removeClass("status-inactive")
            .addClass("status-active")
            .text("Active");
          $(`.toggle-category[data-id="${categoryId}"]`)
            .removeClass("btn-success")
            .addClass("btn-danger");
          $(`.toggle-category[data-id="${categoryId}"] i`)
            .removeClass("fa-check")
            .addClass("fa-ban");
        },
        error: function (error) {
          alert("Error activating category:", error);
        },
      });
    } else {
      $.ajax({
        url: "/api/categories/",
        type: "DELETE",
        data: JSON.stringify({ id: categoryId }),
        contentType: "application/json",
        success: function (response) {
          alert("Category deactivated successfully!");
          getCategories();
          loadCategories();

          $(`.category-status[data-categorystatus="${categoryId}"]`)
            .removeClass("status-active")
            .addClass("status-inactive")
            .text("Inactive");
          $(`.toggle-category[data-id="${categoryId}"]`)
            .removeClass("btn-danger")
            .addClass("btn-success");
          $(`.toggle-category[data-id="${categoryId}"] i`)
            .removeClass("fa-ban")
            .addClass("fa-check");
        },
        error: function (error) {
          alert("Error deactivating category:", error);
        },
      });
    }
  });
  // Handle tab navigation
  $(".admin-sidebar .nav-link").on("click", function () {
    $(".admin-sidebar .nav-link").removeClass("active");
    $(this).addClass("active");

    var targetTab = $(this).attr("href");

    // Hide all tab panes first
    $(".tab-pane").removeClass("show active");

    // Show only the target tab pane
    $(targetTab).addClass("show active");

    // Load data based on which tab is clicked
    if (targetTab === "#articles") {
      loadCategories();
      loadUsers();
      loadArticles();
    } else if (targetTab === "#users") {
      loadUsers();
    } else if (targetTab === "#categories") {
      loadCategories();
    } else if (targetTab === "#contacts") {
      loadContacts();
      $("#pending").addClass("active");
    } else if (targetTab === "#newsletters") {
      loadNewsletters();
    }
  });
  // Handle logout button
  $("#logout").on("click", function () {
    $.ajax({
      url: "/api/auth/logout",
      type: "POST",
      success: function (response) {
        if (response.success) {
          window.location.href = "/";
        }
      },
      error: function (xhr, status, error) {
        console.log("Logout error:", error);
      },
    });
  });
});
