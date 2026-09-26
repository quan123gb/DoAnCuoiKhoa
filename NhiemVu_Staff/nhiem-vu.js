/* =========================================================
   NHIỆM VỤ ĐƯỢC GIAO - JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const sidebar = document.getElementById("sidebar");
    const mobileMenuButton = document.getElementById("mobileMenuButton");

    const globalSearch = document.getElementById("globalSearch");
    const taskSearch = document.getElementById("taskSearch");

    const projectFilter = document.getElementById("projectFilter");
    const priorityFilter = document.getElementById("priorityFilter");
    const statusFilter = document.getElementById("statusFilter");

    const taskRows = Array.from(
        document.querySelectorAll(".task-row")
    );

    const visibleCount = document.getElementById("visibleCount");

    const selectAllTasks =
        document.getElementById("selectAllTasks");

    const resetFilters =
        document.getElementById("resetFilters");

    const quickFilters =
        document.querySelectorAll(".quick-filter");

    const viewTabs =
        document.querySelectorAll(".view-tab");

    /* =====================================================
       MOBILE SIDEBAR
    ====================================================== */

    if (mobileMenuButton) {

        mobileMenuButton.addEventListener("click", function () {

            sidebar.classList.toggle("mobile-open");

        });

    }


    /* Đóng sidebar khi click ra ngoài trên mobile */

    document.addEventListener("click", function (event) {

        if (
            window.innerWidth <= 1024 &&
            sidebar.classList.contains("mobile-open") &&
            !sidebar.contains(event.target) &&
            !mobileMenuButton.contains(event.target)
        ) {

            sidebar.classList.remove("mobile-open");

        }

    });


    /* =====================================================
       SIDEBAR NAVIGATION
    ====================================================== */

    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(function (item) {

        item.addEventListener("click", function (event) {

         


            const path = item.dataset.path;

            if (!path) {
                return;
            }

            if (path === "dang-xuat") {

                openModal(
                    "Đăng xuất",
                    "Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?",
                    "Đăng xuất"
                );

                return;
            }

            navItems.forEach(function (nav) {
                nav.classList.remove("active");
            });

            item.classList.add("active");

            showToast(
                "Đã chọn: " + item.textContent.trim()
            );

        });

    });


    /* =====================================================
       TASK FILTER
    ====================================================== */

    function normalizeText(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d");

    }


    function filterTasks() {

        const keyword =
            normalizeText(taskSearch.value.trim());

        const project =
            projectFilter.value;

        const priority =
            priorityFilter.value;

        const status =
            statusFilter.value;


        let count = 0;


        taskRows.forEach(function (row) {

            const rowText =
                normalizeText(row.textContent);

            const rowProject =
                row.dataset.project;

            const rowPriority =
                row.dataset.priority;

            const rowStatus =
                row.dataset.status;


            const matchesKeyword =
                keyword === "" ||
                rowText.includes(keyword);


            const matchesProject =
                project === "all" ||
                rowProject === project;


            const matchesPriority =
                priority === "all" ||
                rowPriority === priority;


            const matchesStatus =
                status === "all" ||
                rowStatus === status;


            const visible =
                matchesKeyword &&
                matchesProject &&
                matchesPriority &&
                matchesStatus;


            row.classList.toggle(
                "hidden",
                !visible
            );


            if (visible) {
                count++;
            }

        });


        visibleCount.textContent = count;

    }


    /* Search */

    if (taskSearch) {

        taskSearch.addEventListener(
            "input",
            filterTasks
        );

    }


    /* Project */

    projectFilter.addEventListener(
        "change",
        filterTasks
    );


    /* Priority */

    priorityFilter.addEventListener(
        "change",
        filterTasks
    );


    /* Status */

    statusFilter.addEventListener(
        "change",
        filterTasks
    );


    /* =====================================================
       GLOBAL SEARCH
    ====================================================== */

    if (globalSearch) {

        globalSearch.addEventListener(
            "input",
            function () {

                taskSearch.value =
                    globalSearch.value;

                filterTasks();

            }
        );

    }


    /* =====================================================
       QUICK FILTERS
    ====================================================== */

    quickFilters.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                quickFilters.forEach(function (item) {
                    item.classList.remove("active");
                });

                button.classList.add("active");


                const type =
                    button.dataset.quickFilter;


                if (type === "all") {

                    taskSearch.value = "";

                    projectFilter.value = "all";
                    priorityFilter.value = "all";
                    statusFilter.value = "all";

                }

                else if (type === "today") {

                    taskRows.forEach(function (row) {

                        const isToday =
                            row.dataset.today === "true";

                        row.classList.toggle(
                            "hidden",
                            !isToday
                        );

                    });

                    updateVisibleCount();

                    return;

                }

                else if (type === "high") {

                    priorityFilter.value = "high";

                }

                else if (type === "in_progress") {

                    statusFilter.value = "in_progress";

                }

                else if (type === "pending_review") {

                    statusFilter.value =
                        "pending_review";

                }

                else if (type === "done") {

                    statusFilter.value = "done";

                }


                filterTasks();

            }
        );

    });


    function updateVisibleCount() {

        const count =
            taskRows.filter(function (row) {

                return !row.classList.contains("hidden");

            }).length;

        visibleCount.textContent = count;

    }


    /* =====================================================
       RESET FILTERS
    ====================================================== */

    resetFilters.addEventListener(
        "click",
        function () {

            taskSearch.value = "";

            globalSearch.value = "";

            projectFilter.value = "all";

            priorityFilter.value = "all";

            statusFilter.value = "all";


            quickFilters.forEach(function (button) {
                button.classList.remove("active");
            });


            const allFilter =
                document.querySelector(
                    '[data-quick-filter="all"]'
                );

            if (allFilter) {
                allFilter.classList.add("active");
            }


            filterTasks();

            showToast(
                "Đã đặt lại toàn bộ bộ lọc"
            );

        }
    );


    /* =====================================================
       SELECT ALL TASKS
    ====================================================== */

    if (selectAllTasks) {

        selectAllTasks.addEventListener(
            "change",
            function () {

                const visibleRows =
                    taskRows.filter(function (row) {

                        return !row.classList.contains(
                            "hidden"
                        );

                    });


                visibleRows.forEach(function (row) {

                    const checkbox =
                        row.querySelector(
                            ".task-checkbox"
                        );

                    if (checkbox) {
                        checkbox.checked =
                            selectAllTasks.checked;
                    }

                });

            }
        );

    }


    /* =====================================================
       TASK CHECKBOXES
    ====================================================== */

    document
        .querySelectorAll(".task-checkbox")
        .forEach(function (checkbox) {

            checkbox.addEventListener(
                "change",
                function () {

                    const checked =
                        document.querySelectorAll(
                            ".task-checkbox:checked"
                        ).length;

                    const total =
                        document.querySelectorAll(
                            ".task-checkbox"
                        ).length;


                    if (selectAllTasks) {

                        selectAllTasks.checked =
                            checked === total;

                        selectAllTasks.indeterminate =
                            checked > 0 &&
                            checked < total;

                    }

                }
            );

        });


    /* =====================================================
       SELECT TASK ROW
    ====================================================== */

    taskRows.forEach(function (row) {

        row.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.closest(
                        "button, input, a"
                    )
                ) {
                    return;
                }

                taskRows.forEach(function (item) {
                    item.classList.remove(
                        "selected-row"
                    );
                });

                row.classList.add("selected-row");

                updateDetailPanel(
                    row.dataset.task
                );

            }
        );

    });


    /* =====================================================
       VIEW TABS
    ====================================================== */

    viewTabs.forEach(function (tab) {

        tab.addEventListener(
            "click",
            function () {

                viewTabs.forEach(function (item) {
                    item.classList.remove("active");
                });

                tab.classList.add("active");

                const view =
                    tab.dataset.view;


                if (view === "list") {

                    showToast(
                        "Đang hiển thị dạng danh sách"
                    );

                    return;

                }


                if (view === "kanban") {

                    showToast(
                        "Bảng Kanban sẽ được mở"
                    );

                    return;

                }


                if (view === "calendar") {

                    showToast(
                        "Lịch hạn chót sẽ được mở"
                    );

                }

            }
        );

    });


    /* =====================================================
       UPDATE DETAIL PANEL
    ====================================================== */

    function updateDetailPanel(taskCode) {

        const detailCode =
            document.querySelector(
                ".detail-task-code"
            );

        if (detailCode) {

            detailCode.textContent =
                "[" + taskCode + "]";

        }

        showToast(
            "Đã chọn nhiệm vụ " + taskCode
        );

    }


    /* =====================================================
       SUBTASK CHECKBOX
    ====================================================== */

    const checkItems =
        document.querySelectorAll(
            ".check-item input"
        );


    checkItems.forEach(function (checkbox) {

        checkbox.addEventListener(
            "change",
            function () {

                const item =
                    checkbox.closest(
                        ".check-item"
                    );

                const status =
                    item.querySelector(
                        ".check-status"
                    );

                const text =
                    item.querySelector(
                        ".check-content > span"
                    );


                if (checkbox.checked) {

                    if (text) {
                        text.classList.add(
                            "done-text"
                        );
                    }

                    if (status) {

                        status.textContent =
                            "Đã xong";

                        status.classList.remove(
                            "active"
                        );

                    }

                    showToast(
                        "Đã hoàn thành subtask"
                    );

                } else {

                    if (text) {
                        text.classList.remove(
                            "done-text"
                        );
                    }

                    if (status) {

                        status.textContent =
                            "Đang làm";

                        status.classList.add(
                            "active"
                        );

                    }

                }

            }
        );

    });


    /* =====================================================
       SUBMIT TASK
    ====================================================== */

    document
        .querySelectorAll(".submit-task")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const task =
                        button.dataset.task ||
                        "TSK-204";

                    openModal(
                        "Nộp duyệt nhiệm vụ",
                        "Bạn có chắc chắn muốn nộp nhiệm vụ " +
                        task +
                        " cho Leader kiểm tra?",
                        "Nộp duyệt"
                    );

                }
            );

        });


    /* Detail submit */

    const detailSubmitButton =
        document.getElementById(
            "detailSubmitButton"
        );


    if (detailSubmitButton) {

        detailSubmitButton.addEventListener(
            "click",
            function () {

                openModal(
                    "Nộp duyệt nhiệm vụ",
                    "Nộp sản phẩm của TSK-204 cho Leader An kiểm tra?",
                    "Nộp duyệt"
                );

            }
        );

    }


    /* =====================================================
       START TASK
    ====================================================== */

    document
        .querySelectorAll(".start-task")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const row =
                        button.closest(".task-row");

                    if (row) {

                        row.dataset.status =
                            "in_progress";

                        const status =
                            row.querySelector(
                                ".status"
                            );

                        if (status) {

                            status.className =
                                "status in-progress";

                            status.innerHTML =
                                '<span class="small-dot blue-dot"></span>' +
                                "Đang thực hiện";

                        }

                    }

                    showToast(
                        "Đã bắt đầu nhiệm vụ"
                    );

                }
            );

        });


    /* =====================================================
       MORE BUTTON
    ====================================================== */

    document
        .querySelectorAll(".more-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    const task =
                        button.dataset.task ||
                        button
                            .closest(".task-row")
                            ?.dataset.task ||
                        "nhiệm vụ";

                    openModal(
                        "Tùy chọn nhiệm vụ",
                        "Bạn đang thao tác với " +
                        task +
                        ". Các tùy chọn chi tiết có thể được tích hợp tại đây.",
                        "Đóng"
                    );

                }
            );

        });


    /* =====================================================
       QUICK REPORT
    ====================================================== */

    const quickReportButton =
        document.getElementById(
            "quickReportBtn"
        );


    if (quickReportButton) {

        quickReportButton.addEventListener(
            "click",
            function () {

                openModal(
                    "Báo cáo nhanh",
                    "Chức năng báo cáo nhanh cho phép bạn ghi nhận tiến độ, khó khăn hoặc kết quả công việc trong ngày.",
                    "Gửi báo cáo"
                );

            }
        );

    }


    /* =====================================================
       EXPORT
    ====================================================== */

    const exportButton =
        document.getElementById(
            "exportButton"
        );


    if (exportButton) {

        exportButton.addEventListener(
            "click",
            exportTasksToCSV
        );

    }


    function exportTasksToCSV() {

        const visibleRows =
            taskRows.filter(function (row) {

                return !row.classList.contains(
                    "hidden"
                );

            });


        if (visibleRows.length === 0) {

            showToast(
                "Không có nhiệm vụ để xuất"
            );

            return;

        }


        const data = [
            [
                "Mã Task",
                "Tên nhiệm vụ",
                "Dự án",
                "Ưu tiên",
                "Trạng thái",
                "Tiến độ"
            ]
        ];


        visibleRows.forEach(function (row) {

            const cells =
                row.querySelectorAll("td");


            const taskCode =
                row.dataset.task;

            const taskName =
                cells[2]
                    ?.querySelector(".task-name")
                    ?.childNodes[0]
                    ?.textContent
                    ?.trim() || "";

            const project =
                cells[3]
                    ?.querySelector("strong")
                    ?.textContent
                    ?.trim() || "";

            const priority =
                row.dataset.priority;

            const status =
                row.dataset.status;

            const progress =
                cells[6]
                    ?.querySelector(
                        ".progress-header strong"
                    )
                    ?.textContent
                    ?.trim() || "";


            data.push([
                taskCode,
                taskName,
                project,
                priority,
                status,
                progress
            ]);

        });


        const csv =
            data.map(function (row) {

                return row.map(function (cell) {

                    return '"' +
                        String(cell)
                            .replace(/"/g, '""') +
                        '"';

                }).join(",");

            }).join("\n");


        const blob =
            new Blob(
                ["\uFEFF" + csv],
                {
                    type:
                        "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "danh-sach-nhiem-vu.csv";

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);


        showToast(
            "Đã xuất danh sách nhiệm vụ"
        );

    }


    /* =====================================================
       QUICK PROGRESS
    ====================================================== */

    const quickProgressButton =
        document.getElementById(
            "quickProgressButton"
        );


    if (quickProgressButton) {

        quickProgressButton.addEventListener(
            "click",
            function () {

                openModal(
                    "Cập nhật tiến độ nhanh",
                    "Bạn có thể cập nhật phần trăm hoàn thành, trạng thái hoặc ghi chú cho các nhiệm vụ đang thực hiện.",
                    "Cập nhật"
                );

            }
        );

    }


    /* =====================================================
       CREATE TASK
    ====================================================== */

    const createTaskButton =
        document.getElementById(
            "createTaskButton"
        );


    if (createTaskButton) {

        createTaskButton.addEventListener(
            "click",
            function () {

                openModal(
                    "Đề xuất / Tạo việc phát sinh",
                    "Chức năng này dùng để đề xuất nhiệm vụ mới hoặc ghi nhận công việc phát sinh ngoài kế hoạch.",
                    "Tạo việc"
                );

            }
        );

    }


    /* =====================================================
       COLUMN SETTINGS
    ====================================================== */

    const columnButton =
        document.getElementById(
            "columnButton"
        );


    if (columnButton) {

        columnButton.addEventListener(
            "click",
            function () {

                openModal(
                    "Tùy chỉnh cột",
                    "Bạn có thể lựa chọn các cột muốn hiển thị trong danh sách nhiệm vụ.",
                    "Lưu cấu hình"
                );

            }
        );

    }


    /* =====================================================
       COMMENT
    ====================================================== */

    const commentInput =
        document.getElementById(
            "commentInput"
        );

    const sendComment =
        document.getElementById(
            "sendComment"
        );


    function sendCommentMessage() {

        const message =
            commentInput.value.trim();


        if (!message) {

            showToast(
                "Vui lòng nhập nội dung phản hồi"
            );

            commentInput.focus();

            return;

        }


        commentInput.value = "";

        showToast(
            "Đã gửi phản hồi cho Leader An"
        );

    }


    if (sendComment) {

        sendComment.addEventListener(
            "click",
            sendCommentMessage
        );

    }


    if (commentInput) {

        commentInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                 

                    sendCommentMessage();

                }

            }
        );

    }


    /* =====================================================
       NOTIFICATIONS
    ====================================================== */

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                openModal(
                    "Thông báo",
                    "Bạn có 3 thông báo mới: 1 nhiệm vụ sắp đến hạn, 1 phản hồi từ Leader và 1 cập nhật dự án.",
                    "Đã xem"
                );

            }
        );

    }


    /* =====================================================
       HELP
    ====================================================== */

    const helpButton =
        document.getElementById(
            "helpButton"
        );


    if (helpButton) {

        helpButton.addEventListener(
            "click",
            function () {

                openModal(
                    "Trợ giúp",
                    "Bạn có thể sử dụng ô tìm kiếm, bộ lọc, danh sách nhiệm vụ và khu vực chi tiết để quản lý công việc cá nhân.",
                    "Đã hiểu"
                );

            }
        );

    }


    /* =====================================================
       MODAL
    ====================================================== */

    const modalOverlay =
        document.getElementById(
            "modalOverlay"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalBody =
        document.getElementById(
            "modalBody"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );

    const modalCancel =
        document.getElementById(
            "modalCancel"
        );

    const modalConfirm =
        document.getElementById(
            "modalConfirm"
        );


    let modalConfirmAction = null;


    function openModal(
        title,
        message,
        confirmText
    ) {

        modalTitle.textContent = title;

        modalBody.textContent = message;

        modalConfirm.textContent =
            confirmText || "Xác nhận";

        modalOverlay.classList.add("show");

        modalConfirmAction = function () {

            showToast(
                "Thao tác đã được xác nhận"
            );

            closeModal();

        };

    }


    function closeModal() {

        modalOverlay.classList.remove(
            "show"
        );

        modalConfirmAction = null;

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    modalCancel.addEventListener(
        "click",
        closeModal
    );


    modalConfirm.addEventListener(
        "click",
        function () {

            if (
                typeof modalConfirmAction ===
                "function"
            ) {

                modalConfirmAction();

            } else {

                closeModal();

            }

        }
    );


    modalOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modalOverlay
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       KEYBOARD SHORTCUTS
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            /* Escape đóng modal */

            if (
                event.key === "Escape"
            ) {

                closeModal();

            }


            /* N mở hộp thoại ghi chú */

            if (
                event.key.toLowerCase() === "n" &&
                !isTyping()
            ) {

                if (commentInput) {

                    commentInput.focus();

                    showToast(
                        "Đã mở nhanh ô ghi chú tiến độ"
                    );

                }

            }


            /* Space tick subtask */

            if (
                event.code === "Space" &&
                !isTyping()
            ) {

                const activeCheck =
                    document.querySelector(
                        ".active-check input"
                    );


                if (activeCheck) {
  

                    activeCheck.checked =
                        !activeCheck.checked;

                    activeCheck.dispatchEvent(
                        new Event(
                            "change"
                        )
                    );

                }

            }

        }
    );


    function isTyping() {

        const element =
            document.activeElement;

        if (!element) {
            return false;
        }

        const tag =
            element.tagName.toLowerCase();

        return (
            tag === "input" ||
            tag === "textarea" ||
            tag === "select"
        );

    }


    /* =====================================================
       TOAST
    ====================================================== */

    const toast =
        document.getElementById(
            "toast"
        );

    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    let toastTimer;


    function showToast(message) {

        toastMessage.textContent =
            message;

        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(function () {

                toast.classList.remove(
                    "show"
                );

            }, 2600);

    }


    /* =====================================================
       INITIALIZATION
    ====================================================== */

    filterTasks();

});