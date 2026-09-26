"use strict";


/* =========================================================
   DOM ELEMENTS
========================================================= */

/* Add Modal Elements */
const addModal = document.getElementById("add-modal");

const openAddModalButton =
    document.getElementById("open-add-modal");

const closeAddModalButton =
    document.getElementById("close-add-modal");

const cancelAddModalButton =
    document.getElementById("cancel-add-modal");

const confirmAddButton =
    document.getElementById("confirm-add");

/* View Details Modal Elements */
const viewModal = document.getElementById("view-modal");

const closeViewModalButton =
    document.getElementById("close-view-modal");

const closeViewButton =
    document.getElementById("close-view-btn");

const switchToEditButton =
    document.getElementById("switch-to-edit-btn");

/* Edit Modal Elements */
const editModal = document.getElementById("edit-modal");

const closeEditModalButton =
    document.getElementById("close-edit-modal");

const cancelEditModalButton =
    document.getElementById("cancel-edit-modal");

const confirmEditButton =
    document.getElementById("confirm-edit");

/* Table & Filters Elements */
const employeeTableBody =
    document.getElementById("employee-table-body");

const employeeSearch =
    document.getElementById("employee-search");

const departmentFilter =
    document.getElementById("department-filter");

const roleFilter =
    document.getElementById("role-filter");

const statusFilter =
    document.getElementById("status-filter");

const resetFilterButton =
    document.getElementById("reset-filter");

/* Toast Elements */
const toast =
    document.getElementById("toast-notification");

const toastClose =
    document.getElementById("toast-close");

const toastMessage =
    document.getElementById("toast-message");

/* Export & Pagination */
const exportButton =
    document.getElementById("export-button");

const previousPageButton =
    document.getElementById("previous-page");

const nextPageButton =
    document.getElementById("next-page");

const paginationFrom =
    document.getElementById("pagination-from");

const paginationTo =
    document.getElementById("pagination-to");

const paginationTotal =
    document.getElementById("pagination-total");


/* State variables */
let currentActiveRow = null; // Trỏ tới tr đang được Xem chi tiết hoặc Chỉnh sửa


/* =========================================================
   MODAL CONTROLS
========================================================= */

function openModal(modalInstance) {

    if (!modalInstance) return;

    modalInstance.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeModal(modalInstance) {

    if (!modalInstance) return;

    modalInstance.classList.remove("show");

    document.body.style.overflow = "";

}


/* Add Modal Listeners */

function openAddModal() {

    openModal(addModal);

    setTimeout(function () {

        const nameInput =
            document.getElementById("employee-name-input");

        if (nameInput) {

            nameInput.focus();

        }

    }, 100);

}


function closeAddModal() {

    closeModal(addModal);

}


if (openAddModalButton) {

    openAddModalButton.addEventListener("click", openAddModal);

}


if (closeAddModalButton) {

    closeAddModalButton.addEventListener("click", closeAddModal);

}


if (cancelAddModalButton) {

    cancelAddModalButton.addEventListener("click", closeAddModal);

}


/* View Modal Listeners */

function closeViewModal() {

    closeModal(viewModal);

}


if (closeViewModalButton) {

    closeViewModalButton.addEventListener("click", closeViewModal);

}


if (closeViewButton) {

    closeViewButton.addEventListener("click", closeViewModal);

}


if (switchToEditButton) {

    switchToEditButton.addEventListener("click", function () {

        if (currentActiveRow) {

            closeViewModal();

            openEditModal(currentActiveRow);

        }

    });

}


/* Edit Modal Listeners */

function closeEditModal() {

    closeModal(editModal);

}


if (closeEditModalButton) {

    closeEditModalButton.addEventListener("click", closeEditModal);

}


if (cancelEditModalButton) {

    cancelEditModalButton.addEventListener("click", closeEditModal);

}


/* Click outside modal overlay */

[addModal, viewModal, editModal].forEach(function (modalItem) {

    if (modalItem) {

        modalItem.addEventListener("click", function (event) {

            if (event.target === modalItem) {

                closeModal(modalItem);

            }

        });

    }

});


/* ESC Key */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (addModal && addModal.classList.contains("show")) {

            closeAddModal();

        }

        if (viewModal && viewModal.classList.contains("show")) {

            closeViewModal();

        }

        if (editModal && editModal.classList.contains("show")) {

            closeEditModal();

        }

    }

});


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


function triggerToast(message) {

    if (!toast) return;


    if (message) {

        toastMessage.textContent = message;

    }


    toast.classList.remove("hidden");


    if (toastTimer) {

        clearTimeout(toastTimer);

    }


    toastTimer = setTimeout(function () {

        hideToast();

    }, 4500);

}


function hideToast() {

    if (!toast) return;

    toast.classList.add("hidden");

}


if (toastClose) {

    toastClose.addEventListener("click", hideToast);

}


/* =========================================================
   ADD EMPLOYEE
========================================================= */

if (confirmAddButton) {

    confirmAddButton.addEventListener("click", function () {

        const nameInput =
            document.getElementById("employee-name-input");

        const emailInput =
            document.getElementById("employee-email-input");

        const phoneInput =
            document.getElementById("employee-phone-input");

        const departmentInput =
            document.getElementById("employee-department-input");

        const roleInput =
            document.getElementById("employee-role-input");

        const sendMail =
            document.getElementById("send-mail");


        const name = nameInput.value.trim();

        const email = emailInput.value.trim();

        const phone = phoneInput.value.trim();

        const department = departmentInput.value;

        const role = roleInput.value;


        /* Validation */

        if (!name) {

            alert("Vui lòng nhập họ và tên.");

            nameInput.focus();

            return;

        }


        if (!email) {

            alert("Vui lòng nhập email công việc.");

            emailInput.focus();

            return;

        }


        if (!validateEmail(email)) {

            alert("Email không đúng định dạng.");

            emailInput.focus();

            return;

        }


        /* Add row */

        addEmployeeRow(name, email, phone, department, role);


        /* Close modal */

        closeAddModal();


        /* Reset form */

        nameInput.value = "";

        emailInput.value = "";

        phoneInput.value = "";

        departmentInput.value = "tech";

        roleInput.value = "staff";

        sendMail.checked = true;


        /* Toast */

        if (sendMail.checked) {

            triggerToast("Đã thêm nhân viên và gửi email kích hoạt.");

        } else {

            triggerToast("Đã thêm nhân viên thành công.");

        }

    });

}


/* =========================================================
   VIEW DETAILS LOGIC
========================================================= */

function openViewModal(row) {

    currentActiveRow = row;

    const rowData = extractRowData(row);


    /* Render thông tin lên modal */

    const nameEl = document.getElementById("view-employee-name");

    const codeEl = document.getElementById("view-employee-code");

    const emailEl = document.getElementById("view-employee-email");

    const phoneEl = document.getElementById("view-employee-phone");

    const deptEl = document.getElementById("view-employee-department");

    const roleEl = document.getElementById("view-employee-role");

    const statusEl = document.getElementById("view-employee-status");

    const dateEl = document.getElementById("view-employee-date");

    const avatarContainer = document.getElementById("view-avatar-container");


    if (nameEl) nameEl.textContent = rowData.name;

    if (codeEl) codeEl.textContent = rowData.code;

    if (emailEl) emailEl.textContent = rowData.email;

    if (phoneEl) phoneEl.textContent = rowData.phone || "—";

    if (dateEl) dateEl.textContent = rowData.date;


    if (deptEl) {

        deptEl.innerHTML = getDepartmentBadgeHTML(rowData.department);

    }


    if (roleEl) {

        roleEl.innerHTML = getRoleBadgeHTML(rowData.role);

    }


    if (statusEl) {

        statusEl.innerHTML = getStatusBadgeHTML(rowData.status);

    }


    if (avatarContainer) {

        avatarContainer.innerHTML = rowData.avatarHTML;

    }


    openModal(viewModal);

}


/* =========================================================
   EDIT EMPLOYEE LOGIC
========================================================= */

function openEditModal(row) {

    currentActiveRow = row;

    const rowData = extractRowData(row);


    /* Đổ thông tin hiện tại vào form chỉnh sửa */

    const codeInput = document.getElementById("edit-employee-code");

    const nameInput = document.getElementById("edit-employee-name");

    const emailInput = document.getElementById("edit-employee-email");

    const phoneInput = document.getElementById("edit-employee-phone");

    const deptSelect = document.getElementById("edit-employee-department");

    const roleSelect = document.getElementById("edit-employee-role");

    const statusSelect = document.getElementById("edit-employee-status");


    if (codeInput) codeInput.value = rowData.code;

    if (nameInput) nameInput.value = rowData.name;

    if (emailInput) emailInput.value = rowData.email;

    if (phoneInput) phoneInput.value = rowData.phone === "—" ? "" : rowData.phone;

    if (deptSelect) deptSelect.value = rowData.department;

    if (roleSelect) roleSelect.value = rowData.role;

    if (statusSelect) statusSelect.value = rowData.status;


    openModal(editModal);

}


if (confirmEditButton) {

    confirmEditButton.addEventListener("click", function () {

        if (!currentActiveRow) return;


        const nameInput = document.getElementById("edit-employee-name");

        const emailInput = document.getElementById("edit-employee-email");

        const phoneInput = document.getElementById("edit-employee-phone");

        const deptSelect = document.getElementById("edit-employee-department");

        const roleSelect = document.getElementById("edit-employee-role");

        const statusSelect = document.getElementById("edit-employee-status");


        const name = nameInput.value.trim();

        const email = emailInput.value.trim();

        const phone = phoneInput.value.trim();

        const department = deptSelect.value;

        const role = roleSelect.value;

        const status = statusSelect.value;


        /* Validation */

        if (!name) {

            alert("Vui lòng nhập họ và tên.");

            nameInput.focus();

            return;

        }


        if (!email) {

            alert("Vui lòng nhập email công việc.");

            emailInput.focus();

            return;

        }


        if (!validateEmail(email)) {

            alert("Email không đúng định dạng.");

            emailInput.focus();

            return;

        }


        /* Cập nhật dòng tr trong bảng */

        updateRowData(currentActiveRow, {

            name: name,

            email: email,

            phone: phone,

            department: department,

            role: role,

            status: status

        });


        closeEditModal();


        /* Lọc lại danh sách để áp dụng trạng thái mới (nếu đang bật bộ lọc) */

        filterEmployees();


        triggerToast(`Đã cập nhật thông tin nhân viên ${name}.`);

    });

}


/* Extract data from table row */

function extractRowData(row) {

    const nameEl = row.querySelector(".employee-name");

    const codeEl = row.querySelector(".employee-code");

    const avatarEl = row.querySelector(".employee-info > img, .employee-info > div.employee-avatar");

    const cells = row.querySelectorAll("td");


    const email = cells[2] ? cells[2].textContent.trim() : "";

    const phone = cells[3] ? cells[3].textContent.trim() : "";

    const date = cells[7] ? cells[7].textContent.trim() : "";


    return {

        name: nameEl ? nameEl.textContent.trim() : "",

        code: codeEl ? codeEl.textContent.trim() : "",

        email: email,

        phone: phone,

        department: row.dataset.department || "tech",

        role: row.dataset.role || "staff",

        status: row.dataset.status || "active",

        date: date,

        avatarHTML: avatarEl ? avatarEl.outerHTML : ""

    };

}


/* Update row in DOM */

function updateRowData(row, data) {

    row.dataset.department = data.department;

    row.dataset.role = data.role;

    row.dataset.status = data.status;


    /* Tên nhân viên */

    const nameEl = row.querySelector(".employee-name");

    if (nameEl) {

        nameEl.textContent = data.name;

    }


    /* Avatar chữ viết tắt (nếu dùng initials avatar) */

    const initialsAvatarEl = row.querySelector(".initials-avatar");

    if (initialsAvatarEl) {

        const newInitials = getInitials(data.name);

        initialsAvatarEl.textContent = newInitials;

    }


    /* Email */

    const cells = row.querySelectorAll("td");

    if (cells[2]) {

        cells[2].innerHTML = `<span class="muted-text">${escapeHtml(data.email)}</span>`;

    }


    /* Số điện thoại */

    if (cells[3]) {

        cells[3].innerHTML = `<span class="phone-text">${escapeHtml(data.phone || "—")}</span>`;

    }


    /* Phòng ban Badge */

    if (cells[4]) {

        cells[4].innerHTML = getDepartmentBadgeHTML(data.department);

    }


    /* Vai trò Badge */

    if (cells[5]) {

        cells[5].innerHTML = getRoleBadgeHTML(data.role);

    }


    /* Trạng thái Badge */

    if (cells[6]) {

        cells[6].innerHTML = getStatusBadgeHTML(data.status);

    }

}


/* Badge HTML Generator Helpers */

function getDepartmentBadgeHTML(department) {

    const deptName = getDepartmentName(department);

    const deptClass = "department-" + department;

    return `<span class="department-badge ${deptClass}">${escapeHtml(deptName)}</span>`;

}


function getRoleBadgeHTML(role) {

    const roleName = getRoleName(role);

    const roleClass =
        role === "leader"
            ? "role-leader"
            : role === "admin"
                ? "role-admin"
                : "role-staff";


    const starIcon =
        role === "leader"
            ? `<span class="material-symbols-outlined">stars</span>`
            : role === "admin"
                ? `<span class="material-symbols-outlined">shield_person</span>`
                : "";


    return `<span class="role-badge ${roleClass}">${starIcon}${escapeHtml(roleName)}</span>`;

}


function getStatusBadgeHTML(status) {

    let statusText = "Đang hoạt động";

    let statusClass = "status-active";


    if (status === "pending") {

        statusText = "Chờ kích hoạt";

        statusClass = "status-pending";

    } else if (status === "suspended") {

        statusText = "Tạm khóa";

        statusClass = "status-suspended";

    }


    return `<span class="status-badge ${statusClass}"><span class="status-dot"></span>${escapeHtml(statusText)}</span>`;

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function validateEmail(email) {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}


/* =========================================================
   EMPLOYEE CODE
========================================================= */

function getNextEmployeeCode() {

    const rows =
        employeeTableBody.querySelectorAll("tr[data-department]");

    let maxNumber = 0;


    rows.forEach(function (row) {

        const codeElement = row.querySelector(".employee-code");

        if (!codeElement) return;

        const code = codeElement.textContent.trim();

        const match = code.match(/NV-(\d+)/);

        if (match) {

            const number = parseInt(match[1], 10);

            if (number > maxNumber) {

                maxNumber = number;

            }

        }

    });


    return "NV-" + String(maxNumber + 1).padStart(3, "0");

}


/* =========================================================
   GET DEPARTMENT NAME
========================================================= */

function getDepartmentName(value) {

    const departments = {

        tech: "Phòng Công nghệ",

        design: "Phòng Thiết kế",

        product: "Phòng Sản phẩm",

        qa: "Phòng QA/Kiểm thử"

    };

    return departments[value] || value;

}


/* =========================================================
   GET ROLE NAME
========================================================= */

function getRoleName(value) {

    const roles = {

        leader: "Trưởng nhóm (Leader)",

        staff: "Nhân viên (Staff)",

        admin: "Quản trị viên (Admin)"

    };

    return roles[value] || value;

}


/* =========================================================
   GET CURRENT DATE
========================================================= */

function getCurrentDate() {

    const date = new Date();

    const day = String(date.getDate()).padStart(2, "0");

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const year = date.getFullYear();

    return `${day}/${month}/${year}`;

}


/* =========================================================
   INITIALS
========================================================= */

function getInitials(name) {

    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return "";

    if (parts.length === 1) {

        return parts[0].substring(0, 2).toUpperCase();

    }


    const first = parts[0].charAt(0);

    const last = parts[parts.length - 1].charAt(0);


    return (first + last).toUpperCase();

}


/* =========================================================
   ADD EMPLOYEE ROW
========================================================= */

function addEmployeeRow(name, email, phone, department, role) {

    const code = getNextEmployeeCode();

    const date = getCurrentDate();

    const initials = getInitials(name);


    const row = document.createElement("tr");

    row.dataset.department = department;

    row.dataset.role = role;

    row.dataset.status = "active";


    const avatarClass =
        "avatar-" + initials.toLowerCase().replace(/\s/g, "");


    row.innerHTML = `

        <td class="text-center employee-number">
            01
        </td>

        <td>

            <div class="employee-info">

                <div class="employee-avatar initials-avatar ${avatarClass}">
                    ${escapeHtml(initials)}
                </div>

                <div class="employee-name-wrapper">

                    <span class="employee-name">
                        ${escapeHtml(name)}
                    </span>

                    <span class="employee-code">
                        ${escapeHtml(code)}
                    </span>

                </div>

            </div>

        </td>

        <td>

            <span class="muted-text">
                ${escapeHtml(email)}
            </span>

        </td>

        <td>

            <span class="phone-text">
                ${escapeHtml(phone || "—")}
            </span>

        </td>

        <td>

            ${getDepartmentBadgeHTML(department)}

        </td>

        <td>

            ${getRoleBadgeHTML(role)}

        </td>

        <td>

            ${getStatusBadgeHTML("active")}

        </td>

        <td>

            <span class="date-text">
                ${date}
            </span>

        </td>

        <td>

            <div class="table-actions">

                <button
                    class="action-button view-button"
                    type="button"
                    title="Xem chi tiết"
                >

                    <span class="material-symbols-outlined">
                        visibility
                    </span>

                </button>

                <button
                    class="action-button edit-button"
                    type="button"
                    title="Chỉnh sửa"
                >

                    <span class="material-symbols-outlined">
                        edit
                    </span>

                </button>

                <button
                    class="action-button delete-button"
                    type="button"
                    title="Xóa nhân viên"
                >

                    <span class="material-symbols-outlined">
                        delete
                    </span>

                </button>

            </div>

        </td>

    `;


    employeeTableBody.appendChild(row);

    updateEmployeeNumbers();

    updatePaginationInfo();

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


/* =========================================================
   UPDATE STT
========================================================= */

function updateEmployeeNumbers() {

    const rows =
        employeeTableBody.querySelectorAll("tr[data-department]");

    let index = 1;


    rows.forEach(function (row) {

        if (row.style.display === "none") return;


        const number = row.querySelector(".employee-number");

        if (number) {

            number.textContent = String(index).padStart(2, "0");

        }

        index++;

    });

}


/* =========================================================
   FILTER
========================================================= */

function filterEmployees() {

    const search = employeeSearch.value.trim().toLowerCase();

    const department = departmentFilter.value;

    const role = roleFilter.value;

    const status = statusFilter.value;


    const rows =
        employeeTableBody.querySelectorAll("tr[data-department]");


    let visibleCount = 0;


    rows.forEach(function (row) {

        const rowText = row.textContent.toLowerCase();

        const rowDepartment = row.dataset.department;

        const rowRole = row.dataset.role;

        const rowStatus = row.dataset.status;


        const matchesSearch = !search || rowText.includes(search);

        const matchesDepartment = !department || rowDepartment === department;

        const matchesRole = !role || rowRole === role;

        const matchesStatus = !status || rowStatus === status;


        const visible =
            matchesSearch && matchesDepartment && matchesRole && matchesStatus;


        row.style.display = visible ? "" : "none";


        if (visible) {

            visibleCount++;

        }

    });


    removeNoResultRow();


    if (visibleCount === 0) {

        showNoResultRow();

    }


    updateEmployeeNumbers();


    paginationTotal.textContent = visibleCount;

    paginationFrom.textContent = visibleCount > 0 ? "1" : "0";

    paginationTo.textContent = visibleCount;


    updatePaginationButtons(visibleCount);

}


/* =========================================================
   NO RESULT
========================================================= */

function showNoResultRow() {

    const row = document.createElement("tr");

    row.className = "no-result-row";

    row.id = "no-result-row";


    row.innerHTML = `

        <td colspan="9">

            <div class="no-result-content">

                <span class="material-symbols-outlined">
                    search_off
                </span>

                <span>
                    Không tìm thấy nhân viên phù hợp.
                </span>

            </div>

        </td>

    `;


    employeeTableBody.appendChild(row);

}


function removeNoResultRow() {

    const row = document.getElementById("no-result-row");

    if (row) {

        row.remove();

    }

}


/* =========================================================
   FILTER EVENTS
========================================================= */

if (employeeSearch) {

    employeeSearch.addEventListener("input", filterEmployees);

}

if (departmentFilter) {

    departmentFilter.addEventListener("change", filterEmployees);

}

if (roleFilter) {

    roleFilter.addEventListener("change", filterEmployees);

}

if (statusFilter) {

    statusFilter.addEventListener("change", filterEmployees);

}


/* =========================================================
   RESET FILTER
========================================================= */

if (resetFilterButton) {

    resetFilterButton.addEventListener("click", function () {

        employeeSearch.value = "";

        departmentFilter.value = "";

        roleFilter.value = "";

        statusFilter.value = "";

        filterEmployees();

        triggerToast("Đã làm mới toàn bộ bộ lọc.");

    });

}


/* =========================================================
   TABLE ACTIONS
========================================================= */

document.addEventListener("click", function (event) {

    const button = event.target.closest(".action-button");

    if (!button) return;


    const row = button.closest("tr");

    if (!row) return;


    const employeeNameElement = row.querySelector(".employee-name");

    const employeeName = employeeNameElement

        ? employeeNameElement.textContent.trim()

        : "nhân viên";


    /* View Details */

    if (button.classList.contains("view-button")) {

        openViewModal(row);

        return;

    }


    /* Edit */

    if (button.classList.contains("edit-button")) {

        openEditModal(row);

        return;

    }


    /* Delete */

    if (button.classList.contains("delete-button")) {

        const confirmed = confirm(

            `Bạn có chắc muốn xóa nhân viên "${employeeName}" không?`

        );


        if (confirmed) {

            row.remove();

            updateEmployeeNumbers();

            updatePaginationInfo();

            filterEmployees();

            triggerToast(`Đã xóa nhân viên ${employeeName}.`);

        }

        return;

    }


    /* Resend Activation Link */

    if (button.classList.contains("resend-button")) {

        triggerToast(`Đã gửi lại link kích hoạt cho ${employeeName}.`);

    }

});


/* =========================================================
   PAGINATION
========================================================= */

let currentPage = 1;

const totalPages = 10;


function updatePaginationButtons(visibleCount) {

    if (!previousPageButton || !nextPageButton) return;


    previousPageButton.disabled = currentPage === 1;


    if (currentPage === 1) {

        previousPageButton.classList.add("disabled");

    } else {

        previousPageButton.classList.remove("disabled");

    }


    nextPageButton.disabled = currentPage >= totalPages || visibleCount === 0;

}


function updatePaginationInfo() {

    const rows =

        employeeTableBody.querySelectorAll("tr[data-department]");


    let visibleCount = 0;


    rows.forEach(function (row) {

        if (row.style.display !== "none") {

            visibleCount++;

        }

    });


    paginationTotal.textContent = visibleCount;

    paginationFrom.textContent = visibleCount > 0 ? "1" : "0";

    paginationTo.textContent = visibleCount;

}


document.addEventListener("click", function (event) {

    const pageButton = event.target.closest(".pagination-button[data-page]");

    if (!pageButton) return;


    const page = parseInt(pageButton.dataset.page, 10);

    if (isNaN(page)) return;


    currentPage = page;


    document

        .querySelectorAll(".pagination-button[data-page]")

        .forEach(function (button) {

            button.classList.remove("active");

        });


    pageButton.classList.add("active");


    previousPageButton.disabled = currentPage === 1;

    nextPageButton.disabled = currentPage === totalPages;


    triggerToast(`Đang hiển thị trang ${currentPage}.`);

});


if (previousPageButton) {

    previousPageButton.addEventListener("click", function () {

        if (currentPage <= 1) return;

        currentPage--;

        setActivePagination(currentPage);

        triggerToast(`Đang hiển thị trang ${currentPage}.`);

    });

}


if (nextPageButton) {

    nextPageButton.addEventListener("click", function () {

        if (currentPage >= totalPages) return;

        currentPage++;

        setActivePagination(currentPage);

        triggerToast(`Đang hiển thị trang ${currentPage}.`);

    });

}


function setActivePagination(page) {

    document

        .querySelectorAll(".pagination-button[data-page]")

        .forEach(function (button) {

            button.classList.toggle(

                "active",

                parseInt(button.dataset.page, 10) === page

            );

        });


    previousPageButton.disabled = page === 1;

    nextPageButton.disabled = page === totalPages;


    if (page === 1) {

        previousPageButton.classList.add("disabled");

    } else {

        previousPageButton.classList.remove("disabled");

    }

}


/* =========================================================
   EXPORT CSV
========================================================= */

if (exportButton) {

    exportButton.addEventListener("click", function () {

        const rows =

            employeeTableBody.querySelectorAll("tr[data-department]");


        let csv =

            "STT,Nhân viên,Email,Số điện thoại,Phòng ban,Vai trò,Trạng thái,Ngày tham gia\n";


        rows.forEach(function (row, index) {

            if (row.style.display === "none") return;


            const cells = row.querySelectorAll("td");


            const name =

                row.querySelector(".employee-name")?.textContent.trim() || "";


            const email = cells[2]?.textContent.trim() || "";

            const phone = cells[3]?.textContent.trim() || "";

            const department = cells[4]?.textContent.trim() || "";

            const role = cells[5]?.textContent.trim() || "";

            const status = cells[6]?.textContent.trim() || "";

            const date = cells[7]?.textContent.trim() || "";


            csv += [

                index + 1,

                name,

                email,

                phone,

                department,

                role,

                status,

                date

            ]

                .map(csvEscape)

                .join(",");


            csv += "\n";

        });


        downloadCSV(csv, "danh-sach-nhan-vien.csv");

        triggerToast("Đã xuất danh sách nhân viên.");

    });

}


function csvEscape(value) {

    return `"${String(value).replaceAll('"', '""')}"`;

}


function downloadCSV(content, fileName) {

    const blob = new Blob(["\uFEFF" + content], {

        type: "text/csv;charset=utf-8;"

    });


    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");


    link.href = url;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}


/* =========================================================
   NAVIGATION & EXTRA BUTTONS
========================================================= */

document.querySelectorAll(".nav-item").forEach(function (item) {

    item.addEventListener("click", function () {

        const path = item.dataset.path;


        if (path === "dang-xuat") {

            const confirmed = confirm("Bạn có chắc muốn đăng xuất không?");

            if (confirmed) {

                triggerToast("Đang đăng xuất...");

            }

            return;

        }


        document.querySelectorAll(".nav-item").forEach(function (nav) {

            nav.classList.remove("active");

        });


        item.classList.add("active");


        if (path !== "nhan-vien") {

            triggerToast(`Đã chọn chức năng: ${item.textContent.trim()}`);

        }

    });

});


document.querySelectorAll(".notification-button").forEach(function (button) {

    button.addEventListener("click", function () {

        triggerToast("Bạn có 3 thông báo mới.");

    });

});


document.querySelectorAll('[title="Trợ giúp & Hướng dẫn"]').forEach(function (button) {

    button.addEventListener("click", function () {

        triggerToast("Trợ giúp và hướng dẫn hệ thống.");

    });

});


/* Global Search */

const globalSearch = document.querySelector(".global-search input");

if (globalSearch) {

    globalSearch.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            const keyword = globalSearch.value.trim();

            if (!keyword) {

                triggerToast("Vui lòng nhập nội dung tìm kiếm.");

                return;

            }

            triggerToast(`Đang tìm kiếm: ${keyword}`);

        }

    });

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    updateEmployeeNumbers();

    updatePaginationInfo();

    updatePaginationButtons(5);

});