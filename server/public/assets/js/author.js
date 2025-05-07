$(document).ready(function () {
  // Global arrays to store all categories and articles
  let allCategories = [];
  let allArticles = [];
  let currentUser = {};
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
  //Pagination func
  function setupPagination(config) {
    const {
      paginationId, // ID của <ul class="pagination">
      tableBodyId, // ID của <tbody>
      data, // Mảng dữ liệu
      itemsPerPage = 5, // Số bản ghi mỗi trang
      renderRow, // Callback để render mỗi hàng
    } = config;

    let currentPage = 1; // Trang hiện tại

    // Hàm hiển thị dữ liệu theo trang
    function displayData(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedData = data.slice(start, end);

      // Xóa nội dung cũ
      $(`#${tableBodyId}`).empty();

      // Thêm dữ liệu mới
      paginatedData.forEach((item) => {
        $(`#${tableBodyId}`).append(renderRow(item));
      });
    }

    // Hàm tạo các nút phân trang
    function renderPagination() {
      const pageCount = Math.ceil(data.length / itemsPerPage);
      $(`#${paginationId}`).empty();

      // Nút Previous
      $(`#${paginationId}`).append(`
      <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
        <a class="page-link" href="#" aria-label="Previous" data-page="${
          currentPage - 1
        }">
          <span aria-hidden="true">«</span>
        </a>
      </li>
    `);

      // Các nút số trang
      for (let i = 1; i <= pageCount; i++) {
        $(`#${paginationId}`).append(`
        <li class="page-item ${i === currentPage ? "active" : ""}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
      `);
      }

      // Nút Next
      $(`#${paginationId}`).append(`
      <li class="page-item ${currentPage === pageCount ? "disabled" : ""}">
        <a class="page-link" href="#" aria-label="Next" data-page="${
          currentPage + 1
        }">
          <span aria-hidden="true">»</span>
        </a>
      </li>
    `);
    }

    // Xử lý sự kiện click vào nút phân trang
    $(`#${paginationId}`).on("click", ".page-link", function (e) {
      e.preventDefault();
      const page = $(this).data("page");
      if (page && page > 0 && page <= Math.ceil(data.length / itemsPerPage)) {
        currentPage = page;
        displayData(currentPage);
        renderPagination();
      }
    });

    // Khởi tạo
    displayData(currentPage);
    renderPagination();
  }
  //
  function PaginationArticles() {
    setupPagination({
      paginationId: "articlePagination",
      tableBodyId: "articleTableBody",
      data: allArticles,
      itemsPerPage: 5,
      renderRow: (article) => `
      <tr>
        <td>${article.title}</td>
        <td>${
          allCategories.find((category) => category.id == article.cate_id)
            ?.cate_name || "N/A"
        }</td>
        <td>${formatDate(article.published_date)}</td>
        <td>
          ${
            article.status
              ? '<span class="badge status-published">Published</span>'
              : '<span class="badge status-pending">Pending</span>'
          }
        </td>
        <td>
          <button class="btn btn-sm btn-info edit-article" data-id="${
            article.id
          }">
            <i class="fa fa-edit"></i>
          </button>
        </td>
      </tr>
    `,
    });
  }

  // Function to get categories
  function getCategories() {
    $.ajax({
      url: "/api/categories",
      type: "GET",
      success: function (categories) {
        allCategories = categories;
      },
      error: function (xhr, status, error) {
        console.error("Error loading categories:", error);
      },
    });
  }
  // Function to load categories to select menu
  function loadCategoriesToSelectMenu() {
    let categorySelect = $("#articleCategory");
    categorySelect.empty(); // Clear existing options
    categorySelect.append('<option value="">Select Category</option>'); // Add default option

    allCategories
      .filter((category) => category.status == 1)
      .forEach((category) => {
        categorySelect.append(
          `<option value="${category.id}">${category.cate_name}</option>`
        );
      });
  }
  // Function to get articles
  function getArticles() {
    $.ajax({
      url: `/api/articles/user/${window.localStorage.getItem("id")}`,
      type: "GET",
      cache: false,
      success: function (articles) {
        allArticles = articles;
        PaginationArticles();
      },
      error: function (_, __, error) {
        console.error("Error loading articles:", error);
      },
    });
  }

  // Function to load articles to table
  function loadArticlesToTable(table) {
    const articleTableBody = $(table);
    articleTableBody.empty();

    allArticles.forEach((article) => {
      articleTableBody.append(`
            <tr>
              <td>${article.title}</td>
              <td>${
                allCategories.find((category) => category.id == article.cate_id)
                  ?.cate_name || "N/A"
              }</td>
              <td>${formatDate(article.published_date)}</td>
              <td>
                ${
                  article.status
                    ? '<span class="badge status-published">Published</span>'
                    : '<span class="badge status-pending">Pending</span>'
                }
              </td>
              <td>
                <button class="btn btn-sm btn-info edit-article" data-id="${
                  article.id
                }">
                  <i class="fa fa-edit"></i>
                </button>
              </td>
            </tr>
          `);
    });
  }
  // Function to load summary
  function loadSummary() {
    $.ajax({
      url: `/api/articles/user/${window.localStorage.getItem("id")}`,
      type: "GET",
      success: function (articles) {
        const publishedCount = articles.filter(
          (article) => article.status
        ).length;
        const totalCount = articles.length;
        $("#publishedCount").text(publishedCount);
        $("#totalCount").text(totalCount);
      },
      error: function (_, __, error) {
        console.error("Error loading articles:", error);
      },
    });
  }
  // Function to get profile
  function getProfile() {
    $.ajax({
      url: `/api/users/${window.localStorage.getItem("id")}`,
      type: "GET",
      success: function (user) {
        currentUser = user;
      },
      error: function (_, __, error) {
        console.error("Error loading user:", error);
      },
    });
  }
  // Function to load profile
  function loadProfile() {
    $("#profileUsername").val(currentUser.username);
    $("#profileEmail").val(currentUser.email);
  }
  // -----------------------------------------------------------
  // Get Categories
  getCategories();
  // Get articles
  getArticles();
  // Get user profile
  getProfile();
  // Load summary
  loadSummary();
  // Ensure dashboard tab is active on page load
  $("#dashboard").addClass("show active in");
  $('.author-sidebar .nav-link[href="#dashboard"]').addClass("active");
  // Handle tab navigation
  $(".author-sidebar .nav-link").on("click", function () {
    $(".author-sidebar .nav-link").removeClass("active");
    $(this).addClass("active");

    var targetTab = $(this).attr("href");

    // Hide all tab panes first
    $(".tab-pane").removeClass("show active");

    // Show only the target tab pane
    $(targetTab).addClass("show active");

    if (targetTab === "#articles") {
      getArticles();
    } else if (targetTab === "#write") {
      loadCategoriesToSelectMenu();
      $("#articlePublished_date").val(new Date().toISOString().slice(0, 16));
    } else if (targetTab === "#profile") {
      loadProfile();
    }
  });
  // Handle logout button click
  $("#logout").on("click", function () {
    $.ajax({
      url: "/api/auth/logout",
      type: "POST",
      success: function (response) {
        if (response.success) {
          window.localStorage.removeItem("id");
          window.location.href = "/";
        }
      },
      error: function (xhr, status, error) {
        console.log("Logout error:", error);
      },
    });
  });
  // Add Article button redirects to Write tab
  $("#addArticleBtn").on("click", function () {
    $('.author-sidebar .nav-link[href="#write"]').click();
  });
  // Live preview for article editor
  $("#articleTitle").on("input", function () {
    $("#previewTitle").text($(this).val() || "Your Article Title");
  });
  $("#articleCategory").on("change", function () {
    $("#previewCategory").text($(this).find("option:selected").text());
  });
  $("#articleContent").on("input", function () {
    if ($(this).val()) {
      // Replace the preview content with the editor content
      $("#previewBody").text($(this).val());
    }
  });
  // Handle publish article button
  $("#publishArticle").on("click", function () {
    // Get form data
    const title = $("#articleTitle").val();
    const content = $("#articleContent").val();
    const image = $("#articleImage")[0].files[0]; // Get the file input element
    //const publishedDate = $("#articlePublished_date").val();
    const cate_id = $("#articleCategory").val();
    const user_id = window.localStorage.getItem("id");

    if (!title || !image || !content || !cate_id) {
      alert("Please fill in all required fields");
      return;
    }

    $.ajax({
      url: "/api/articles",
      type: "POST",
      data: JSON.stringify({
        title,
        content,
        user_id,
        cate_id,
        status: 1,
      }),
      contentType: "application/json",
      success: function (response) {
        const articleId = response.newArticle.id;
        if (image) {
          // Create FormData object to send the file
          const formData = new FormData();
          formData.append("id", articleId);
          formData.append("image", image);

          // Upload the image
          $.ajax({
            url: "/api/images",
            type: "POST",
            data: formData,
            processData: false, // Don't process the data
            contentType: false, // Let the browser set the content type
            success: function (imageResponse) {
              console.log("Image uploaded successfully:", imageResponse);
              getArticles();
              alert("Article added successfully with image!");
            },
            error: function (error) {
              console.error("Error uploading image:", error);
              $("#addArticleModal").modal("hide");
              getArticles();
              alert(
                "Article added but image upload failed. Please try upload later."
              );
            },
          });
        } else {
          // No image to upload
          getArticles();
          alert("Article added successfully!");
        }
      },
      error: function (error) {
        console.error("Error publishing article:", error);
        alert("Error publishing article. Please try again.");
      },
    });
  });
  // Handle update password button
  $("#update").on("click", function () {
    // Get form data
    const currentPassword = $("#profileCurrentPassword").val();
    const newPassword = $("#profileNewPassword").val();
    const confirmNewPassword = $("#profileConfirmPassword").val();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert("Please fill in all required fields");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm new password do not match");
      return;
    }

    $.ajax({
      url: "/api/users/password",
      type: "PUT",
      data: JSON.stringify({
        username: currentUser.username,
        password: currentPassword,
        newPassword: newPassword,
      }),
      contentType: "application/json",
      success: function (response) {
        alert("Password updated successfully!");
      },
      error: function (error) {
        alert(`Error updating password: ${error}`);
      },
    });
  });
  // Handle edit article action button
  $(document).on("click", ".edit-article", function () {
    const articleId = $(this).data("id");

    const article = allArticles.find((article) => article.id == articleId);

    if (article) {
      $("#editArticleId").val(article.id);
      $("#editTitle").val(article.title);
      $("#editContent").val(article.content);

      // Add a default option
      $("#editCategory").append('<option value="">Select a category</option>');

      // Add options from allCategories array
      allCategories.forEach((category) => {
        const selected = category.id == article.cate_id ? "selected" : "";
        $("#editCategory").append(
          `<option value="${category.id}" ${selected}>${category.cate_name}</option>`
        );
      });

      $("#editStatus").val(article.status);
      $("#editPublished_date").val(
        article.published_date ? article.published_date.slice(0, 16) : ""
      ); // Set published date

      $("#editArticleModal").modal("show");
    } else {
      alert("Article not found!");
    }
  });
  // Handle save edit article button
  $("#editArticleBtn").on("click", function () {
    const id = $("#editArticleId").val();
    const currentArticle = allArticles.find((article) => article.id == id);
    const currentStatus = currentArticle && currentArticle.status;
    const article = {
      id: $("#editArticleId").val(),
      title: $("#editTitle").val(),
      content: $("#editContent").val(),
      image: $("#editImage")[0].files[0],
      cate_id: $("#editCategory").val(),
      user_id: window.localStorage.getItem("id"),
      status: currentStatus,
      //published_date: $("#editPublished_date").val(),
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
        // If we have an image file, upload it
        if (article.image) {
          // Create FormData object to send the file
          const formData = new FormData();
          formData.append("id", article.id);
          formData.append("image", article.image);

          // Upload the image
          $.ajax({
            url: "/api/images",
            type: "PUT",
            data: formData,
            processData: false, // Don't process the data
            contentType: false, // Let the browser set the content type
            success: function (imageResponse) {
              console.log("Image uploaded successfully:", imageResponse);
              $("#editArticleModal").modal("hide");
              getArticles();
              alert("Article updated successfully with image!");
            },
            error: function (error) {
              console.error("Error uploading image:", error);
              $("#editArticleModal").modal("hide");
              getArticles();
              alert(
                "Article updated but image upload failed. Please try upload later."
              );
            },
          });
        } else {
          $("#editArticleModal").modal("hide");
          getArticles();
          alert("Article updated successfully with no image!");
        }
      },
      error: function (error) {
        console.error("Error updating article:", error);
        alert("Error updating article. Please try again.");
      },
    });
  });
});
