/* ============================================================
   TAI NGUYEN - JAVASCRIPT
   Không sử dụng Tailwind
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    /* ========================================================
       ELEMENTS
    ======================================================== */

    const checkAll = document.getElementById("checkAll");

    const fileSearchInput =
        document.getElementById("fileSearchInput");

    const resourceTableBody =
        document.getElementById("resourceTableBody");

    const openFolderModal =
        document.getElementById("openFolderModal");

    const closeFolderModal =
        document.getElementById("closeFolderModal");

    const cancelFolderButton =
        document.getElementById("cancelFolderButton");

    const createFolderButton =
        document.getElementById("createFolderButton");

    const newFolderModal =
        document.getElementById("new-folder-modal");

    const uploadButton =
        document.getElementById("uploadButton");

    const toastNotification =
        document.getElementById("toastNotification");

    const toastClose =
        document.getElementById("toastClose");

    const refreshButton =
        document.getElementById("refreshButton");

    const listViewButton =
        document.getElementById("listViewButton");

    const gridViewButton =
        document.getElementById("gridViewButton");

    const tableSection =
        document.querySelector(".table-section");

    const projectFilter =
        document.getElementById("projectFilter");

    const fileTypeFilter =
        document.getElementById("fileTypeFilter");

    const sizeFilter =
        document.getElementById("sizeFilter");

    let toastTimer = null;


    /* ========================================================
       CHECK ALL
    ======================================================== */

    if (checkAll) {

        checkAll.addEventListener("change", function () {

            const rowCheckboxes =
                document.querySelectorAll(".row-checkbox");

            rowCheckboxes.forEach(function (checkbox) {

                const row = checkbox.closest("tr");

                if (
                    !row ||
                    row.style.display !== "none"
                ) {
                    checkbox.checked = checkAll.checked;
                }

            });

        });

    }


    /* ========================================================
       ROW CHECKBOX
    ======================================================== */

    document.addEventListener("change", function (event) {

        if (!event.target.classList.contains("row-checkbox")) {
            return;
        }

        updateCheckAllState();

    });


    function updateCheckAllState() {

        if (!checkAll) {
            return;
        }

        const visibleCheckboxes =
            Array.from(
                document.querySelectorAll(
                    "#resourceTableBody tr:not([style*='display: none']) .row-checkbox"
                )
            );

        if (visibleCheckboxes.length === 0) {

            checkAll.checked = false;
            checkAll.indeterminate = false;

            return;
        }

        const checkedCount =
            visibleCheckboxes.filter(
                checkbox => checkbox.checked
            ).length;

        checkAll.checked =
            checkedCount === visibleCheckboxes.length;

        checkAll.indeterminate =
            checkedCount > 0 &&
            checkedCount < visibleCheckboxes.length;

    }


    /* ========================================================
       TOAST
    ======================================================== */

    function triggerToast(message, title) {

        if (!toastNotification) {
            return;
        }

        const toastTitle =
            toastNotification.querySelector(
                ".toast-content strong"
            );

        const toastMessage =
            toastNotification.querySelector(
                ".toast-content span"
            );

        if (title && toastTitle) {
            toastTitle.textContent = title;
        }

        if (message && toastMessage) {
            toastMessage.textContent = message;
        }

        clearTimeout(toastTimer);

        toastNotification.classList.add("show");

        toastTimer = setTimeout(function () {

            hideToast();

        }, 4500);

    }


    function hideToast() {

        if (!toastNotification) {
            return;
        }

        toastNotification.classList.remove("show");

    }


    window.triggerToast = triggerToast;
    window.hideToast = hideToast;


    if (toastClose) {

        toastClose.addEventListener("click", function () {

            hideToast();

        });

    }


    /* ========================================================
       CREATE FOLDER MODAL
    ======================================================== */

    function openModal() {

        if (!newFolderModal) {
            return;
        }

        newFolderModal.classList.remove("hidden");

        document.body.style.overflow = "hidden";

        const folderName =
            document.getElementById("folderName");

        if (folderName) {

            setTimeout(function () {
                folderName.focus();
            }, 100);

        }

    }


    function closeModal() {

        if (!newFolderModal) {
            return;
        }

        newFolderModal.classList.add("hidden");

        document.body.style.overflow = "";

    }


    if (openFolderModal) {

        openFolderModal.addEventListener(
            "click",
            openModal
        );

    }


    if (closeFolderModal) {

        closeFolderModal.addEventListener(
            "click",
            closeModal
        );

    }


    if (cancelFolderButton) {

        cancelFolderButton.addEventListener(
            "click",
            closeModal
        );

    }


    /* Close modal by clicking outside */

    if (newFolderModal) {

        newFolderModal.addEventListener(
            "click",
            function (event) {

                if (event.target === newFolderModal) {
                    closeModal();
                }

            }
        );

    }


    /* Close modal with ESC */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                newFolderModal &&
                !newFolderModal.classList.contains("hidden")
            ) {

                closeModal();

            }

        }
    );


    /* Create folder */

    if (createFolderButton) {

        createFolderButton.addEventListener(
            "click",
            function () {

                const folderName =
                    document.getElementById("folderName");

                const folderNameValue =
                    folderName
                        ? folderName.value.trim()
                        : "";

                if (!folderNameValue) {

                    if (folderName) {

                        folderName.focus();

                        folderName.style.boxShadow =
                            "0 0 0 2px #ba1a1a";

                        setTimeout(function () {

                            folderName.style.boxShadow = "";

                        }, 1800);

                    }

                    return;

                }


                closeModal();

                triggerToast(
                    "Thư mục \"" +
                    folderNameValue +
                    "\" đã được tạo thành công.",
                    "Tạo thư mục thành công"
                );


                if (folderName) {
                    folderName.value = "";
                }

            }
        );

    }


    /* ========================================================
       UPLOAD BUTTON
    ======================================================== */

    if (uploadButton) {

        uploadButton.addEventListener(
            "click",
            function () {

                triggerToast(
                    "Tệp 'Kien_truc_he_thong_v2.pdf' đã được đồng bộ an toàn lên Cloud Storage.",
                    "Đồng bộ hoàn tất"
                );

            }
        );

    }


    /* ========================================================
       SEARCH
    ======================================================== */

    function filterTable() {

        if (!resourceTableBody) {
            return;
        }

        const term =
            fileSearchInput
                ? fileSearchInput.value
                    .trim()
                    .toLowerCase()
                : "";

        const projectValue =
            projectFilter
                ? projectFilter.value.toLowerCase()
                : "";

        const typeValue =
            fileTypeFilter
                ? fileTypeFilter.value.toLowerCase()
                : "";

        const sizeValue =
            sizeFilter
                ? sizeFilter.value.toLowerCase()
                : "";


        const rows =
            resourceTableBody.querySelectorAll("tr");


        rows.forEach(function (row) {

            const rowText =
                row.innerText.toLowerCase();

            let visible = true;


            /* Search */

            if (
                term &&
                !rowText.includes(term)
            ) {

                visible = false;

            }


            /* Project filter */

            if (
                projectValue &&
                !rowText.includes(projectValue)
            ) {

                visible = false;

            }


            /* File type filter */

            if (typeValue) {

                let typeMatch = false;

                switch (typeValue) {

                    case "pdf":
                        typeMatch =
                            rowText.includes(".pdf");
                        break;

                    case "doc":
                        typeMatch =
                            rowText.includes(".doc") ||
                            rowText.includes(".docx");
                        break;

                    case "sheet":
                        typeMatch =
                            rowText.includes(".xls") ||
                            rowText.includes(".xlsx");
                        break;

                    case "design":
                        typeMatch =
                            rowText.includes(".png") ||
                            rowText.includes(".jpg") ||
                            rowText.includes(".jpeg") ||
                            rowText.includes(".fig");
                        break;

                    case "archive":
                        typeMatch =
                            rowText.includes(".zip") ||
                            rowText.includes(".rar");
                        break;

                }

                if (!typeMatch) {
                    visible = false;
                }

            }


            /* Size filter */

            if (sizeValue) {

                const sizeText =
                    rowText;

                const sizeMatch =
                    checkSizeFilter(
                        sizeText,
                        sizeValue
                    );

                if (!sizeMatch) {
                    visible = false;
                }

            }


            row.style.display =
                visible ? "" : "none";

        });


        updateCheckAllState();

    }


    function checkSizeFilter(text, filter) {

        const match =
            text.match(
                /(\d+(?:\.\d+)?)\s*mb/i
            );

        if (!match) {
            return false;
        }

        const size =
            parseFloat(match[1]);


        if (filter === "small") {
            return size < 5;
        }


        if (filter === "medium") {
            return size >= 5 && size <= 50;
        }


        if (filter === "large") {
            return size > 50;
        }


        return true;

    }


    if (fileSearchInput) {

        fileSearchInput.addEventListener(
            "input",
            filterTable
        );

    }


    if (projectFilter) {

        projectFilter.addEventListener(
            "change",
            filterTable
        );

    }


    if (fileTypeFilter) {

        fileTypeFilter.addEventListener(
            "change",
            filterTable
        );

    }


    if (sizeFilter) {

        sizeFilter.addEventListener(
            "change",
            filterTable
        );

    }


    /* ========================================================
       REFRESH
    ======================================================== */

    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            function () {

                if (fileSearchInput) {
                    fileSearchInput.value = "";
                }

                if (projectFilter) {
                    projectFilter.value = "";
                }

                if (fileTypeFilter) {
                    fileTypeFilter.value = "";
                }

                if (sizeFilter) {
                    sizeFilter.value = "";
                }


                const rows =
                    document.querySelectorAll(
                        "#resourceTableBody tr"
                    );

                rows.forEach(function (row) {

                    row.style.display = "";

                });


                if (checkAll) {

                    checkAll.checked = false;
                    checkAll.indeterminate = false;

                }


                document
                    .querySelectorAll(".row-checkbox")
                    .forEach(function (checkbox) {

                        checkbox.checked = false;

                    });


                refreshButton
                    .querySelector(".material-symbols-outlined")
                    ?.classList.add("rotate");


                setTimeout(function () {

                    refreshButton
                        .querySelector(".material-symbols-outlined")
                        ?.classList.remove("rotate");

                }, 500);


                triggerToast(
                    "Dữ liệu tài nguyên đã được làm mới.",
                    "Làm mới thành công"
                );

            }
        );

    }


    /* ========================================================
       VIEW MODE
    ======================================================== */

    if (listViewButton) {

        listViewButton.addEventListener(
            "click",
            function () {

                if (!tableSection) {
                    return;
                }

                tableSection.classList.remove(
                    "grid-mode"
                );

                listViewButton.classList.add(
                    "active"
                );

                if (gridViewButton) {

                    gridViewButton.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    if (gridViewButton) {

        gridViewButton.addEventListener(
            "click",
            function () {

                if (!tableSection) {
                    return;
                }

                tableSection.classList.add(
                    "grid-mode"
                );

                gridViewButton.classList.add(
                    "active"
                );

                if (listViewButton) {

                    listViewButton.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    /* ========================================================
       DELETE BUTTONS
    ======================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const deleteButton =
                event.target.closest(
                    ".delete-button"
                );

            if (!deleteButton) {
                return;
            }


            const row =
                deleteButton.closest("tr");

            if (!row) {
                return;
            }


            const fileName =
                row.querySelector(
                    ".table-file-info p"
                );


            const fileNameText =
                fileName
                    ? fileName.textContent.trim()
                    : "tài liệu";


            const confirmed =
                window.confirm(
                    "Bạn có chắc chắn muốn xóa \"" +
                    fileNameText +
                    "\" không?"
                );


            if (!confirmed) {
                return;
            }


            row.remove();

            updateCheckAllState();

            triggerToast(
                "Tài liệu \"" +
                fileNameText +
                "\" đã được xóa.",
                "Xóa tài liệu thành công"
            );

        }
    );


    /* ========================================================
       PREVIEW BUTTONS
    ======================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".preview-button"
                );

            if (!button) {
                return;
            }


            const row =
                button.closest("tr");

            if (!row) {
                return;
            }


            const fileName =
                row.querySelector(
                    ".table-file-info p"
                );


            const name =
                fileName
                    ? fileName.textContent.trim()
                    : "tài liệu";


            triggerToast(
                "Đang mở bản xem trước của " +
                name + ".",
                "Xem trước tài liệu"
            );

        }
    );


    /* ========================================================
       SIDEBAR NAVIGATION
    ======================================================== */

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function (event) {

               


                navItems.forEach(function (nav) {

                    nav.classList.remove(
                        "active"
                    );

                    nav.removeAttribute(
                        "aria-current"
                    );

                });


                item.classList.add(
                    "active"
                );

                item.setAttribute(
                    "aria-current",
                    "page"
                );

            }
        );

    });


    /* ========================================================
       OTHER ACTION BUTTONS
    ======================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".row-action"
                );

            if (!button) {
                return;
            }

            if (
                button.classList.contains(
                    "delete-button"
                )
            ) {
                return;
            }

            if (
                button.classList.contains(
                    "preview-button"
                )
            ) {
                return;
            }


            const title =
                button.getAttribute("title");


            if (title === "Tải xuống") {

                triggerToast(
                    "Chức năng tải xuống đã được kích hoạt.",
                    "Tải xuống"
                );

            }


            if (title === "Chia sẻ") {

                triggerToast(
                    "Liên kết chia sẻ tài liệu đã được chuẩn bị.",
                    "Chia sẻ tài liệu"
                );

            }

        }
    );


    /* ========================================================
       INITIALIZATION
    ======================================================== */

    updateCheckAllState();

});