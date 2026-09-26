/* =========================================================
   QUẢN LÝ NHIỆM VỤ - LEADER
   LD-ADM03
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const taskTableBody = document.getElementById("taskTableBody");

    const taskSearch = document.getElementById("taskSearch");

    const projectFilter = document.getElementById("projectFilter");

    const priorityFilter = document.getElementById("priorityFilter");

    const assigneeFilter = document.getElementById("assigneeFilter");

    const statusFilter = document.getElementById("statusFilter");

    const resetFilterButton =
        document.getElementById("resetFilterButton");

    const resultCount =
        document.getElementById("resultCount");

    const paginationTotal =
        document.getElementById("paginationTotal");

    const selectAllTasks =
        document.getElementById("selectAllTasks");

    const pageSize =
        document.getElementById("pageSize");

    const listViewButton =
        document.getElementById("listViewButton");

    const kanbanViewButton =
        document.getElementById("kanbanViewButton");

    const listView =
        document.getElementById("listView");

    const kanbanView =
        document.getElementById("kanbanView");

    const exportButton =
        document.getElementById("exportButton");

    const addTaskButton =
        document.getElementById("addTaskButton");

    const taskModal =
        document.getElementById("taskModal");

    const detailModal =
        document.getElementById("detailModal");

    const closeModalButton =
        document.getElementById("closeModalButton");

    const cancelModalButton =
        document.getElementById("cancelModalButton");

    const closeDetailButton =
        document.getElementById("closeDetailButton");

    const closeDetailFooterButton =
        document.getElementById("closeDetailFooterButton");

    const taskForm =
        document.getElementById("taskForm");

    const modalTitle =
        document.getElementById("modalTitle");

    const detailContent =
        document.getElementById("detailContent");

    const globalSearch =
        document.getElementById("globalSearch");

    const helpButton =
        document.getElementById("helpButton");

    const notificationButton =
        document.getElementById("notificationButton");

    const viewUrgentButton =
        document.getElementById("viewUrgentButton");

    const balanceButton =
        document.getElementById("balanceButton");


    /* =====================================================
       STATE
    ====================================================== */

    let editingRow = null;

    let currentPage = 1;

    let currentPageSize =
        parseInt(pageSize.value, 10) || 6;

    let activeQuickFilter = null;


    /* =====================================================
       HELPER
    ====================================================== */

    function getRows() {

        return Array.from(
            taskTableBody.querySelectorAll("tr")
        );

    }


    function normalizeText(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    }


    function getTaskData(row) {

        return {

            id: row.dataset.id || "",

            project: row.dataset.project || "",

            priority: row.dataset.priority || "",

            assignee: row.dataset.assignee || "",

            status: row.dataset.status || "",

            progress:
                parseInt(row.dataset.progress || "0", 10),

            overdue:
                row.dataset.overdue === "true",

            name:
                row.querySelector(".task-title")?.textContent.trim() || "",

            projectName:
                row.querySelector(".project-name")?.textContent.trim() || "",

            dueDate:
                row.querySelector(".date-text")?.textContent.trim() || ""

        };

    }


    /* =====================================================
       FILTER
    ====================================================== */

    function filterTasks() {

        const searchValue =
            normalizeText(taskSearch.value.trim());

        const selectedProject =
            projectFilter.value;

        const selectedPriority =
            priorityFilter.value;

        const selectedAssignee =
            assigneeFilter.value;

        const selectedStatus =
            statusFilter.value;


        const rows = getRows();

        let visibleRows = [];


        rows.forEach(function (row) {

            const data =
                getTaskData(row);

            let matches = true;


            /* Search */

            if (searchValue) {

                const searchableText =
                    normalizeText(
                        [
                            data.id,
                            data.name,
                            data.projectName,
                            data.assignee,
                            data.project,
                            data.status
                        ].join(" ")
                    );

                if (!searchableText.includes(searchValue)) {

                    matches = false;

                }

            }


            /* Project */

            if (
                selectedProject !== "all" &&
                data.project !== selectedProject
            ) {

                matches = false;

            }


            /* Priority */

            if (
                selectedPriority !== "all" &&
                data.priority !== selectedPriority
            ) {

                matches = false;

            }


            /* Assignee */

            if (
                selectedAssignee !== "all" &&
                data.assignee !== selectedAssignee
            ) {

                matches = false;

            }


            /* Status */

            if (
                selectedStatus !== "all" &&
                data.status !== selectedStatus
            ) {

                /*
                 * Trang mẫu có TS-102 là
                 * "Đang kiểm tra".
                 *
                 * Cho phép nó xuất hiện trong
                 * nhóm Đang thực hiện.
                 */

                if (
                    selectedStatus === "Đang thực hiện" &&
                    data.status === "Đang kiểm tra"
                ) {

                    // giữ lại

                } else {

                    matches = false;

                }

            }


            /* Quick filter */

            if (activeQuickFilter === "mine") {

                if (data.assignee !== "Nguyễn Văn An") {

                    matches = false;

                }

            }


            if (activeQuickFilter === "overdue") {

                if (!data.overdue) {

                    matches = false;

                }

            }


            if (activeQuickFilter === "approval") {

                if (
                    data.status !== "Đang kiểm tra" &&
                    data.status !== "Chờ duyệt"
                ) {

                    matches = false;

                }

            }


            /*
             * Với dữ liệu mẫu hiện tại,
             * filter tuần này chỉ minh họa
             * nhóm nhiệm vụ có hạn gần.
             */

            if (activeQuickFilter === "week") {

                const ids =
                    [
                        "TS-101",
                        "TS-102",
                        "TS-103"
                    ];

                if (!ids.includes(data.id)) {

                    matches = false;

                }

            }


            if (matches) {

                visibleRows.push(row);

            }

        });


        rows.forEach(function (row) {

            row.style.display = "none";

        });


        /*
         * Phân trang dữ liệu hiện tại.
         */

        const start =
            (currentPage - 1) * currentPageSize;

        const end =
            start + currentPageSize;


        visibleRows
            .slice(start, end)
            .forEach(function (row) {

                row.style.display = "";

            });


        resultCount.textContent =
            visibleRows.length;

        paginationTotal.textContent =
            visibleRows.length;


        updatePagination(
            visibleRows.length
        );


        selectAllTasks.checked = false;

    }


    /* =====================================================
       PAGINATION
    ====================================================== */

    function updatePagination(total) {

        const paginationButtons =
            document.querySelector(".pagination-buttons");

        if (!paginationButtons) {
            return;
        }


        const totalPages =
            Math.max(
                1,
                Math.ceil(total / currentPageSize)
            );


        if (currentPage > totalPages) {

            currentPage = totalPages;

        }


        paginationButtons.innerHTML = "";


        /* Previous */

        const previousButton =
            document.createElement("button");

        previousButton.className =
            "page-button";

        previousButton.innerHTML =
            '<span class="material-symbols-outlined">chevron_left</span>';

        if (currentPage === 1) {

            previousButton.classList.add("disabled");

        } else {

            previousButton.addEventListener(
                "click",
                function () {

                    currentPage--;

                    filterTasks();

                }
            );

        }

        paginationButtons.appendChild(
            previousButton
        );


        /*
         * Tạo các trang.
         */

        const pages = [];


        if (totalPages <= 7) {

            for (
                let i = 1;
                i <= totalPages;
                i++
            ) {

                pages.push(i);

            }

        } else {

            pages.push(1);
            pages.push(2);
            pages.push(3);
            pages.push("...");
            pages.push(totalPages);

        }


        pages.forEach(function (page) {

            if (page === "...") {

                const dots =
                    document.createElement("span");

                dots.className =
                    "page-dots";

                dots.textContent = "...";

                paginationButtons.appendChild(dots);

                return;

            }


            const button =
                document.createElement("button");

            button.className =
                "page-button";

            button.textContent =
                page;


            if (page === currentPage) {

                button.classList.add("active");

            }


            button.addEventListener(
                "click",
                function () {

                    currentPage = page;

                    filterTasks();

                }
            );


            paginationButtons.appendChild(
                button
            );

        });


        /* Next */

        const nextButton =
            document.createElement("button");

        nextButton.className =
            "page-button";

        nextButton.innerHTML =
            '<span class="material-symbols-outlined">chevron_right</span>';


        if (currentPage >= totalPages) {

            nextButton.classList.add("disabled");

        } else {

            nextButton.addEventListener(
                "click",
                function () {

                    currentPage++;

                    filterTasks();

                }
            );

        }


        paginationButtons.appendChild(
            nextButton
        );


        /*
         * Cập nhật thông tin hiển thị.
         */

        const paginationInfo =
            document.querySelector(".pagination-info");

        if (paginationInfo) {

            if (total === 0) {

                paginationInfo.innerHTML =
                    "Không có nhiệm vụ phù hợp";

            } else {

                const start =
                    (currentPage - 1) *
                    currentPageSize + 1;

                const end =
                    Math.min(
                        currentPage * currentPageSize,
                        total
                    );

                paginationInfo.innerHTML =
                    `Hiển thị <strong>${start}</strong> đến <strong>${end}</strong> trong tổng số <strong>${total}</strong> nhiệm vụ`;

            }

        }

    }


    /* =====================================================
       QUICK FILTER
    ====================================================== */

    document
        .querySelectorAll(".quick-filter")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const filter =
                        button.dataset.filter;


                    if (activeQuickFilter === filter) {

                        activeQuickFilter = null;

                        button.classList.remove("active");

                    } else {

                        document
                            .querySelectorAll(".quick-filter")
                            .forEach(function (item) {

                                item.classList.remove("active");

                            });


                        activeQuickFilter =
                            filter;

                        button.classList.add("active");

                    }


                    currentPage = 1;

                    filterTasks();

                }
            );

        });


    /* =====================================================
       SEARCH
    ====================================================== */

    taskSearch.addEventListener(
        "input",
        function () {

            currentPage = 1;

            filterTasks();

        }
    );


    [
        projectFilter,
        priorityFilter,
        assigneeFilter,
        statusFilter
    ].forEach(function (select) {

        select.addEventListener(
            "change",
            function () {

                currentPage = 1;

                filterTasks();

            }
        );

    });


    /* =====================================================
       RESET
    ====================================================== */

    resetFilterButton.addEventListener(
        "click",
        function () {

            taskSearch.value = "";

            projectFilter.value = "all";

            priorityFilter.value = "all";

            assigneeFilter.value = "all";

            statusFilter.value = "all";


            activeQuickFilter = null;


            document
                .querySelectorAll(".quick-filter")
                .forEach(function (button) {

                    button.classList.remove("active");

                });


            currentPage = 1;

            filterTasks();

        }
    );


    /* =====================================================
       SELECT ALL
    ====================================================== */

    selectAllTasks.addEventListener(
        "change",
        function () {

            const rows =
                getRows();

            rows.forEach(function (row) {

                if (row.style.display !== "none") {

                    const checkbox =
                        row.querySelector(".task-checkbox");

                    if (checkbox) {

                        checkbox.checked =
                            selectAllTasks.checked;

                    }

                }

            });

        }
    );


    /* =====================================================
       PAGE SIZE
    ====================================================== */

    pageSize.addEventListener(
        "change",
        function () {

            currentPageSize =
                parseInt(
                    pageSize.value,
                    10
                );

            currentPage = 1;

            filterTasks();

        }
    );


    /* =====================================================
       VIEW SWITCH
    ====================================================== */

    listViewButton.addEventListener(
        "click",
        function () {

            listViewButton.classList.add("active");

            kanbanViewButton.classList.remove("active");

            listView.classList.remove("hidden");

            kanbanView.classList.add("hidden");

        }
    );


    kanbanViewButton.addEventListener(
        "click",
        function () {

            kanbanViewButton.classList.add("active");

            listViewButton.classList.remove("active");

            kanbanView.classList.remove("hidden");

            listView.classList.add("hidden");

            renderKanban();

        }
    );


    /* =====================================================
       KANBAN
    ====================================================== */

    function renderKanban() {

        const columns =
            document.querySelectorAll(
                ".kanban-content"
            );


        columns.forEach(function (column) {

            column.innerHTML = "";

        });


        getRows().forEach(function (row) {

            const data =
                getTaskData(row);


            let status =
                data.status;


            if (status === "Đang kiểm tra") {

                status = "Chờ duyệt";

            }


            const column =
                document.querySelector(
                    `.kanban-content[data-status="${status}"]`
                );


            if (!column) {
                return;
            }


            const card =
                document.createElement("div");

            card.className =
                "kanban-card";


            card.innerHTML = `

                <div class="kanban-card-id">
                    ${data.id}
                </div>

                <div class="kanban-card-title">
                    ${data.name}
                </div>

                <div class="kanban-card-project">
                    ${data.projectName}
                </div>

                <div class="kanban-card-footer">

                    <span class="kanban-progress">
                        Tiến độ ${data.progress}%
                    </span>

                    <span class="priority-badge ${getPriorityClass(data.priority)}">
                        ${data.priority}
                    </span>

                </div>
            `;


            card.addEventListener(
                "click",
                function () {

                    showTaskDetail(row);

                }
            );


            column.appendChild(card);

        });

    }


    function getPriorityClass(priority) {

        switch (priority) {

            case "Khẩn cấp":
                return "critical";

            case "Cao":
                return "high";

            case "Trung bình":
                return "medium";

            case "Thấp":
                return "low";

            default:
                return "medium";

        }

    }


    /* =====================================================
       MODAL
    ====================================================== */

    function openTaskModal(row = null) {

        editingRow = row;

        taskModal.classList.remove("hidden");


        if (row) {

            modalTitle.textContent =
                "Chỉnh sửa nhiệm vụ";


            const data =
                getTaskData(row);


            document.getElementById(
                "taskIdInput"
            ).value = data.id;


            document.getElementById(
                "taskNameInput"
            ).value = data.name;


            document.getElementById(
                "taskProjectInput"
            ).value = data.project;


            document.getElementById(
                "taskAssigneeInput"
            ).value = data.assignee;


            document.getElementById(
                "taskPriorityInput"
            ).value = data.priority;


            let statusValue =
                data.status;


            if (statusValue === "Đang kiểm tra") {

                statusValue = "Chờ duyệt";

            }


            document.getElementById(
                "taskStatusInput"
            ).value = statusValue;


            document.getElementById(
                "taskProgressInput"
            ).value = data.progress;

        } else {

            modalTitle.textContent =
                "Phân công nhiệm vụ";


            taskForm.reset();


            document.getElementById(
                "taskProgressInput"
            ).value = 0;

        }

    }


    function closeTaskModal() {

        taskModal.classList.add("hidden");

        editingRow = null;

    }


    addTaskButton.addEventListener(
        "click",
        function () {

            openTaskModal();

        }
    );


    closeModalButton.addEventListener(
        "click",
        closeTaskModal
    );


    cancelModalButton.addEventListener(
        "click",
        closeTaskModal
    );


    taskModal.addEventListener(
        "click",
        function (event) {

            if (event.target === taskModal) {

                closeTaskModal();

            }

        }
    );


    /* =====================================================
       SAVE TASK
    ====================================================== */

    taskForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const id =
                document.getElementById(
                    "taskIdInput"
                ).value.trim();


            const name =
                document.getElementById(
                    "taskNameInput"
                ).value.trim();


            const project =
                document.getElementById(
                    "taskProjectInput"
                ).value;


            const assignee =
                document.getElementById(
                    "taskAssigneeInput"
                ).value;


            const priority =
                document.getElementById(
                    "taskPriorityInput"
                ).value;


            const status =
                document.getElementById(
                    "taskStatusInput"
                ).value;


            const progress =
                parseInt(
                    document.getElementById(
                        "taskProgressInput"
                    ).value || 0,
                    10
                );


            if (!id || !name) {

                alert(
                    "Vui lòng nhập đầy đủ mã và tên nhiệm vụ."
                );

                return;

            }


            if (editingRow) {

                updateTaskRow(
                    editingRow,
                    {
                        id,
                        name,
                        project,
                        assignee,
                        priority,
                        status,
                        progress
                    }
                );

            } else {

                createTaskRow(
                    {
                        id,
                        name,
                        project,
                        assignee,
                        priority,
                        status,
                        progress
                    }
                );

            }


            closeTaskModal();

            currentPage = 1;

            filterTasks();

        }
    );


    /* =====================================================
       CREATE ROW
    ====================================================== */

    function createTaskRow(data) {

        const row =
            document.createElement("tr");


        row.dataset.id =
            data.id;

        row.dataset.project =
            data.project;

        row.dataset.priority =
            data.priority;

        row.dataset.assignee =
            data.assignee;

        row.dataset.status =
            data.status;

        row.dataset.progress =
            data.progress;

        row.dataset.overdue =
            data.status === "Quá hạn"
                ? "true"
                : "false";


        const initials =
            getInitials(data.assignee);


        row.innerHTML = `

            <td>
                <input type="checkbox" class="task-checkbox">
            </td>

            <td>
                <span class="task-id">
                    ${data.id}
                </span>
            </td>

            <td>

                <div class="task-title">
                    ${data.name}
                </div>

                <div class="task-meta">

                    <span>
                        <span class="material-symbols-outlined">
                            comment
                        </span>
                        0
                    </span>

                    <span>
                        <span class="material-symbols-outlined">
                            attach_file
                        </span>
                        0
                    </span>

                </div>

            </td>

            <td>

                <div class="project-name">
                    ${getProjectName(data.project)}
                </div>

                <div class="project-code">
                    ${data.project}
                </div>

            </td>

            <td>

                <div class="assignee">

                    <div class="small-avatar blue-avatar">
                        ${initials}
                    </div>

                    <div>

                        <div class="assignee-name">
                            ${data.assignee}
                        </div>

                        <div class="assignee-role">
                            Nhân viên dự án
                        </div>

                    </div>

                </div>

            </td>

            <td>

                <span class="priority-badge ${getPriorityClass(data.priority)}">
                    ${data.priority}
                </span>

            </td>

            <td>

                <span class="date-text">
                    Chưa thiết lập
                </span>

            </td>

            <td>

                <span class="status-badge ${getStatusClass(data.status)}">
                    ${data.status}
                </span>

            </td>

            <td>

                <div class="progress-cell">

                    <div class="progress-info">
                        <span>${data.progress}%</span>
                        <span>0/0</span>
                    </div>

                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width:${data.progress}%">
                        </div>

                    </div>

                </div>

            </td>

            <td>

                <div class="row-actions">

                    <button class="icon-action view-action"
                            title="Xem chi tiết">

                        <span class="material-symbols-outlined">
                            visibility
                        </span>

                    </button>

                    <button class="icon-action edit-action"
                            title="Chỉnh sửa">

                        <span class="material-symbols-outlined">
                            edit
                        </span>

                    </button>

                    <button class="icon-action delete-action"
                            title="Xóa nhiệm vụ">

                        <span class="material-symbols-outlined">
                            delete
                        </span>

                    </button>

                </div>

            </td>

        `;


        taskTableBody.appendChild(row);

    }


    /* =====================================================
       UPDATE ROW
    ====================================================== */

    function updateTaskRow(row, data) {

        row.dataset.id =
            data.id;

        row.dataset.project =
            data.project;

        row.dataset.priority =
            data.priority;

        row.dataset.assignee =
            data.assignee;

        row.dataset.status =
            data.status;

        row.dataset.progress =
            data.progress;

        row.dataset.overdue =
            data.status === "Quá hạn"
                ? "true"
                : "false";


        const taskId =
            row.querySelector(".task-id");

        const taskTitle =
            row.querySelector(".task-title");

        const projectName =
            row.querySelector(".project-name");

        const projectCode =
            row.querySelector(".project-code");

        const assigneeName =
            row.querySelector(".assignee-name");

        const priorityBadge =
            row.querySelector(".priority-badge");

        const statusBadge =
            row.querySelector(".status-badge");

        const progressText =
            row.querySelector(
                ".progress-info span"
            );

        const progressFill =
            row.querySelector(
                ".progress-fill"
            );


        if (taskId) {

            taskId.textContent =
                data.id;

        }


        if (taskTitle) {

            taskTitle.textContent =
                data.name;

        }


        if (projectName) {

            projectName.textContent =
                getProjectName(data.project);

        }


        if (projectCode) {

            projectCode.textContent =
                data.project;

        }


        if (assigneeName) {

            assigneeName.textContent =
                data.assignee;

        }


        if (priorityBadge) {

            priorityBadge.textContent =
                data.priority;

            priorityBadge.className =
                `priority-badge ${getPriorityClass(data.priority)}`;

        }


        if (statusBadge) {

            statusBadge.textContent =
                data.status;

            statusBadge.className =
                `status-badge ${getStatusClass(data.status)}`;

        }


        if (progressText) {

            progressText.textContent =
                `${data.progress}%`;

        }


        if (progressFill) {

            progressFill.style.width =
                `${data.progress}%`;

        }

    }


    function getStatusClass(status) {

        switch (status) {

            case "Chưa bắt đầu":
                return "not-started";

            case "Đang thực hiện":
            case "Đang kiểm tra":
                return "doing";

            case "Chờ duyệt":
                return "testing";

            case "Hoàn thành":
                return "completed";

            case "Quá hạn":
                return "overdue";

            default:
                return "not-started";

        }

    }


    function getProjectName(code) {

        const projects = {

            "PRJ-ECOMM-01":
                "Website TMĐT Quốc Tế",

            "PRJ-HRM-02":
                "Quản lý nhân sự HRM",

            "PRJ-LIB-03":
                "Thư viện số Doanh nghiệp",

            "PRJ-EDU-04":
                "Nền tảng học trực tuyến",

            "PRJ-INFRA-05":
                "Bảo mật hạ tầng Cloud"

        };


        return projects[code] || code;

    }


    function getInitials(name) {

        const parts =
            name.trim().split(/\s+/);

        if (parts.length === 1) {

            return parts[0]
                .substring(0, 2)
                .toUpperCase();

        }


        return (
            parts[0].charAt(0) +
            parts[parts.length - 1].charAt(0)
        ).toUpperCase();

    }


    /* =====================================================
       TABLE ACTIONS
    ====================================================== */

    taskTableBody.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest("button");

            if (!button) {
                return;
            }


            const row =
                button.closest("tr");

            if (!row) {
                return;
            }


            /* View */

            if (
                button.classList.contains(
                    "view-action"
                )
            ) {

                showTaskDetail(row);

                return;

            }


            /* Edit */

            if (
                button.classList.contains(
                    "edit-action"
                )
            ) {

                openTaskModal(row);

                return;

            }


            /* Delete */

            if (
                button.classList.contains(
                    "delete-action"
                )
            ) {

                deleteTask(row);

            }

        }
    );


    /* =====================================================
       DELETE
    ====================================================== */

    function deleteTask(row) {

        const data =
            getTaskData(row);


        const confirmed =
            confirm(
                `Bạn có chắc chắn muốn xóa nhiệm vụ "${data.id} - ${data.name}" không?`
            );


        if (!confirmed) {
            return;
        }


        row.remove();

        currentPage = 1;

        filterTasks();

        alert(
            `Đã xóa nhiệm vụ ${data.id}.`
        );

    }


    /* =====================================================
       DETAIL
    ====================================================== */

    function showTaskDetail(row) {

        const data =
            getTaskData(row);


        detailContent.innerHTML = `

            <div class="detail-grid">

                <div class="detail-item">

                    <div class="detail-label">
                        Mã nhiệm vụ
                    </div>

                    <div class="detail-value">
                        ${data.id}
                    </div>

                </div>


                <div class="detail-item">

                    <div class="detail-label">
                        Mức ưu tiên
                    </div>

                    <div class="detail-value">
                        ${data.priority}
                    </div>

                </div>


                <div class="detail-item full">

                    <div class="detail-label">
                        Tên nhiệm vụ
                    </div>

                    <div class="detail-value">
                        ${data.name}
                    </div>

                </div>


                <div class="detail-item">

                    <div class="detail-label">
                        Dự án
                    </div>

                    <div class="detail-value">
                        ${data.projectName}
                    </div>

                </div>


                <div class="detail-item">

                    <div class="detail-label">
                        Mã dự án
                    </div>

                    <div class="detail-value">
                        ${data.project}
                    </div>

                </div>


                <div class="detail-item">

                    <div class="detail-label">
                        Người thực hiện
                    </div>

                    <div class="detail-value">
                        ${data.assignee}
                    </div>

                </div>


                <div class="detail-item">

                    <div class="detail-label">
                        Trạng thái
                    </div>

                    <div class="detail-value">
                        ${data.status}
                    </div>

                </div>


                <div class="detail-item">

                    <div class="detail-label">
                        Hạn hoàn thành
                    </div>

                    <div class="detail-value">
                        ${data.dueDate}
                    </div>

                </div>


                <div class="detail-item">

                    <div class="detail-label">
                        Tiến độ
                    </div>

                    <div class="detail-value">
                        ${data.progress}%
                    </div>

                </div>

            </div>

        `;


        detailModal.classList.remove(
            "hidden"
        );

    }


    function closeDetailModal() {

        detailModal.classList.add(
            "hidden"
        );

    }


    closeDetailButton.addEventListener(
        "click",
        closeDetailModal
    );


    closeDetailFooterButton.addEventListener(
        "click",
        closeDetailModal
    );


    detailModal.addEventListener(
        "click",
        function (event) {

            if (event.target === detailModal) {

                closeDetailModal();

            }

        }
    );


    /* =====================================================
       EXPORT CSV
    ====================================================== */

    exportButton.addEventListener(
        "click",
        function () {

            const rows =
                getRows();


            if (rows.length === 0) {

                alert(
                    "Không có dữ liệu để xuất."
                );

                return;

            }


            const csvRows = [];


            csvRows.push([
                "Mã số",
                "Tên nhiệm vụ",
                "Dự án",
                "Người thực hiện",
                "Mức ưu tiên",
                "Hạn hoàn thành",
                "Trạng thái",
                "Tiến độ"
            ]);


            rows.forEach(function (row) {

                const data =
                    getTaskData(row);


                csvRows.push([
                    data.id,
                    data.name,
                    data.projectName,
                    data.assignee,
                    data.priority,
                    data.dueDate,
                    data.status,
                    `${data.progress}%`
                ]);

            });


            const csv =
                csvRows
                    .map(function (row) {

                        return row
                            .map(function (value) {

                                return `"${String(value)
                                    .replace(/"/g, '""')}"`;

                            })
                            .join(",");

                    })
                    .join("\n");


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
                "bao-cao-nhiem-vu.csv";


            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);


            URL.revokeObjectURL(url);

        }
    );


    /* =====================================================
       GLOBAL SEARCH
    ====================================================== */

    globalSearch.addEventListener(
        "input",
        function () {

            const value =
                globalSearch.value.trim();


            if (!value) {
                return;
            }


            taskSearch.value =
                value;

            currentPage = 1;

            filterTasks();

        }
    );


    /* =====================================================
       HELP
    ====================================================== */

    helpButton.addEventListener(
        "click",
        function () {

            alert(
                "Trung tâm trợ giúp\n\n" +
                "• Sử dụng ô tìm kiếm để tìm nhiệm vụ.\n" +
                "• Có thể lọc theo dự án, mức ưu tiên, người thực hiện và trạng thái.\n" +
                "• Sử dụng Bảng Kanban để xem nhiệm vụ theo trạng thái.\n" +
                "• Nút Xuất báo cáo dùng để tải danh sách nhiệm vụ dạng CSV."
            );

        }
    );


    /* =====================================================
       NOTIFICATION
    ====================================================== */

    notificationButton.addEventListener(
        "click",
        function () {

            alert(
                "Bạn có 5 thông báo mới.\n\n" +
                "• 2 nhiệm vụ cần phê duyệt.\n" +
                "• 1 nhiệm vụ đang quá hạn.\n" +
                "• 2 cập nhật từ thành viên dự án."
            );

        }
    );


    /* =====================================================
       URGENT
    ====================================================== */

    viewUrgentButton.addEventListener(
        "click",
        function () {

            document
                .querySelectorAll(".quick-filter")
                .forEach(function (button) {

                    button.classList.remove(
                        "active"
                    );

                });


            const overdueButton =
                document.querySelector(
                    '.quick-filter[data-filter="overdue"]'
                );


            if (overdueButton) {

                overdueButton.classList.add(
                    "active"
                );

            }


            activeQuickFilter =
                "overdue";


            currentPage = 1;

            filterTasks();


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       BALANCE
    ====================================================== */

    balanceButton.addEventListener(
        "click",
        function () {

            alert(
                "Chức năng Cân đối tải sẽ giúp Leader phân tích khối lượng nhiệm vụ của từng nhân sự và đề xuất điều chỉnh phân công."
            );

        }
    );


    /* =====================================================
       PROFILE
    ====================================================== */

    document
        .querySelector(".profile-more")
        ?.addEventListener(
            "click",
            function () {

                alert(
                    "Nguyễn Văn An\nTrưởng dự án / Leader"
                );

            }
        );


    /* =====================================================
       ESC CLOSE MODAL
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeTaskModal();

                closeDetailModal();

            }

        }
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterTasks();

    renderKanban();

});