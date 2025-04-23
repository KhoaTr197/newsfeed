$(document).ready(() => {
  $(".edit-btn-category").on("click", function () {
    //
    const categoryId = $(this).data("id");
    const categoryName = $(this).data("name");
    const categoryStatus = $(this).data("status");
    $("#editCategoryId").val(categoryId);
    $("#editCategoryName").val(categoryName);
    $("#editCategoryStatus").val(categoryStatus);
    $("#editCategoryModal").modal("show");
  });

  $("#saveChangesCategoryBtn").on("click", function () {
    const categoryId = $("#editCategoryId").val();
    const categoryName = $("#editCategoryName").val();
    const categoryStatus = $("#editCategoryStatus").val();
    if (!categoryName) {
      alert("Category name is required");
      return;
    }
    $.ajax({
      url: "admin/category/" + categoryId,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        name: categoryName,
        status: categoryStatus,
      }),
      success: function (response) {
        $("#editCategoryModal").modal("hide");
        alert("Category updated successfully");
        location.reload();
      },
      error: function (xhr, status, error) {
        console.error("Error updating category:", xhr.responseText);
        alert("Failed to update category: " + xhr.responseText);
      },
    });
  });

  $("#addCategoryBtn").on("click", function () {
    const categoryName = $("#categoryName").val();
    const categoryStatus = $("#categoryStatus").val();
    if (!categoryName) {
      alert("Category name is required");
      return;
    }
    $.ajax({
      url: "admin/category",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        name: categoryName,
        status: categoryStatus,
      }),
      success: function (response) {
        $("#addCategoryModal").modal("hide");
        alert("Category added successfully");
        location.reload();
      },
      error: function (xhr, status, error) {
        console.error("Error adding category:", xhr.responseText);
        alert("Failed to add category: " + xhr.responseText);
      },
    });
  });
});
