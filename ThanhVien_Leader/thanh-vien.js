"use strict";

/* =========================================================
   DOM HELPERS
========================================================= */

const $ = (selector, parent = document) => {     return parent.querySelector(selector); };  const $$ = (selector, parent = document) => {
    return [...parent.querySelectorAll(selector)];
};

/* =========================================================
   ELEMENTS
========================================================= */

const sidebar = $("#sidebar");
const sidebarOverlay = $("#sidebarOverlay");
const mobileMenuButton = $("#mobileMenuButton");

// Modals
const addMemberModal = $("#addMemberModal");
const editMemberModal = $("#editMemberModal");
const detailModal = $("#detailModal");
const uploadDocModal = $("#uploadDocModal");
const shareModal = $("#shareModal");
const contactAdminModal = $("#contactAdminModal");
const highPermModal = $("#highPermModal");

// Add Member
const openAddMemberButton = $("#openAddMemberButton");
const closeAddMemberButton = $("#closeAddMemberButton");
const cancelAddMemberButton = $("#cancelAddMemberButton");
const addMemberForm = $("#addMemberForm");

// Edit Member
const closeEditMemberButton = $("#closeEditMemberButton");
const cancelEditMemberButton = $("#cancelEditMemberButton");
const editMemberForm = $("#editMemberForm");

// Upload Doc
const uploadDocBtn = $("#uploadDocBtn");
const closeUploadDocBtn = $("#closeUploadDocBtn");
const cancelUploadDocBtn = $("#cancelUploadDocBtn");
const uploadDocForm = $("#uploadDocForm");
const uploadDropzone = $("#uploadDropzone");
const fileInputSelect = $("#fileInputSelect");

// Share
const shareBtn = $("#shareBtn");
const closeShareBtn = $("#closeShareBtn");
const cancelShareBtn = $("#cancelShareBtn");
const copyShareUrlBtn = $("#copyShareUrlBtn");
const shareUrlInput = $("#shareUrlInput");
const sendShareEmailBtn = $("#sendShareEmailBtn");

// Contact Admin
const contactAdminBtn = $("#contactAdminBtn");
const closeContactAdminBtn = $("#closeContactAdminBtn");
const cancelContactAdminBtn = $("#cancelContactAdminBtn");
const contactAdminForm = $("#contactAdminForm");

// High Permissions
const openHighPermBtn = $("#openHighPermBtn");
const openHighPermHeaderBtn = $("#openHighPermHeaderBtn");
const closeHighPermBtn = $("#closeHighPermBtn");
const cancelHighPermBtn = $("#cancelHighPermBtn");
const saveHighPermBtn = $("#saveHighPermBtn");

// Toast
const toast = $("#successToast");
const toastClose = $("#toastClose");
const toastTitle = $("#toastTitle");
const toastMessage = $("#toastMessage");

// Filters & Table
const globalSearch = $("#globalSearch");
const filterKeyword = $("#filterKeyword");
const filterProject = $("#filterProject");
const filterRole = $("#filterRole");
const filterStatus = $("#filterStatus");
const resetFilters = $("#resetFilters");

const memberTable = $("#memberTable");
const emptyState = $("#emptyState");
const visibleCount = $("#visibleCount");
const selectAll = $("#selectAll");

// Details
const detailTitle = $("#detailTitle");
const detailSubtitle = $("#detailSubtitle");
const detailBody = $("#detailBody");
const closeDetailButton = $("#closeDetailButton");

// Action Header Buttons
const exportButton = $("#exportButton");
const optimizeButton = $("#optimizeButton");
const analyticsDetailBtn = $("#analyticsDetailBtn");

const helpButton = $("#helpButton");
const notificationButton = $("#notificationButton");
const userMenuButton = $("#userMenuButton");

const pageSizeSelect = $("#pageSize");
const firstPageBtn = $("#firstPageBtn");
const prevPageBtn = $("#prevPageBtn");
const nextPageBtn = $("#nextPageBtn");
const lastPageBtn = $("#lastPageBtn");  let currentWorkloadFilter = "all"; let toastTimer = null; let currentEditingRow = null;  /* =========================================================    SIDEBAR MOBILE & NAVIGATION ========================================================= */  function openSidebar() {     if (sidebar) sidebar.classList.add("mobile-open");     if (sidebarOverlay) sidebarOverlay.classList.add("show"); }  function closeSidebar() {     if (sidebar) sidebar.classList.remove("mobile-open");     if (sidebarOverlay) sidebarOverlay.classList.remove("show"); }  if (mobileMenuButton) {     mobileMenuButton.addEventListener("click", openSidebar); }  if (sidebarOverlay) {     sidebarOverlay.addEventListener("click", closeSidebar); }  $$(".sidebar-link").forEach(link => {
    link.addEventListener("click", function (event) {
        const path = this.dataset.path;

        if (path === "dang-xuat") {
            showToast("Đăng xuất", "Chức năng đăng xuất đang ở chế độ mô phỏng.");
            return;
        }

        if (path === "thanh-vien") {
            closeSidebar();
            return;
        }

        $$(".sidebar-link").forEach(item => item.classList.remove("active"));         this.classList.add("active");         closeSidebar();     }); });  /* =========================================================    TOAST HELPER ========================================================= */  function showToast(title, message) {     if (!toast) return;      if (toastTitle) toastTitle.textContent = title;     if (toastMessage) toastMessage.textContent = message;      toast.classList.remove("hidden");      if (toastTimer) clearTimeout(toastTimer);      toastTimer = setTimeout(() => {         toast.classList.add("hidden");     }, 4000); }  if (toastClose) {     toastClose.addEventListener("click", () => {         toast.classList.add("hidden");     }); }  /* =========================================================    MODAL UTILITIES ========================================================= */  function openModal(targetModal) {     if (targetModal) targetModal.classList.remove("hidden"); }  function closeModal(targetModal) {     if (targetModal) targetModal.classList.add("hidden"); }  /* =========================================================    1. CHỈNH SỬA VAI TRÒ & PHÂN QUYỀN (EDIT MEMBER) ========================================================= */  function setupEditMemberHandlers() {     $$
(".edit-member").forEach(btn => {
        btn.addEventListener("click", function () {
            const row = this.closest("tr");
            if (!row) return;

            currentEditingRow = row;

            const name = row.dataset.name || $("#editMemberName").value;
            const code = row.dataset.code || "";
            const email = row.dataset.email || "";
            const project = row.dataset.project || "PRJ-ECOMM-01";
            const role = row.dataset.role || "backend";
            const status = row.dataset.status || "active";
            const workload = row.dataset.workload || "optimal";

            const taskCountElem = row.querySelector(".task-count");
            let taskCountVal = 4;
            if (taskCountElem) {
                const match = taskCountElem.textContent.match(/\d+/);
                if (match) taskCountVal = parseInt(match[0], 10);
            }

            if ($("#editMemberName")) $("#editMemberName").value = name;
            if ($("#editMemberCode")) $("#editMemberCode").value = code;
            if ($("#editMemberEmail")) $("#editMemberEmail").value = email;
            if ($("#editMemberProject")) $("#editMemberProject").value = project;
            if ($("#editMemberRole")) $("#editMemberRole").value = role;
            if ($("#editMemberStatus")) $("#editMemberStatus").value = status;
            if ($("#editMemberWorkload")) $("#editMemberWorkload").value = workload;
            if ($("#editMemberTaskCount")) $("#editMemberTaskCount").value = taskCountVal;

            openModal(editMemberModal);
        });
    });
}

if (closeEditMemberButton) {
    closeEditMemberButton.addEventListener("click", () => closeModal(editMemberModal));
}

if (cancelEditMemberButton) {
    cancelEditMemberButton.addEventListener("click", () => closeModal(editMemberModal));
}

if (editMemberForm) {
    editMemberForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!currentEditingRow) return;

        const newName = $("#editMemberName").value.trim();
        const newCode = $("#editMemberCode").value.trim();
        const newEmail = $("#editMemberEmail").value.trim();
        const newProject = $("#editMemberProject").value;
        const newRole = $("#editMemberRole").value;
        const newStatus = $("#editMemberStatus").value;
        const newWorkload = $("#editMemberWorkload").value;
        const newTaskCount = $("#editMemberTaskCount").value;

        // Update dataset
        currentEditingRow.dataset.name = newName;
        currentEditingRow.dataset.code = newCode;
        currentEditingRow.dataset.email = newEmail;
        currentEditingRow.dataset.project = newProject;
        currentEditingRow.dataset.role = newRole;
        currentEditingRow.dataset.status = newStatus;
        currentEditingRow.dataset.workload = newWorkload;

        // Update DOM elements inside row
        const nameNode = currentEditingRow.querySelector(".member-info strong");
        if (nameNode) nameNode.textContent = newName;

        const codeNode = currentEditingRow.querySelector(".employee-code");
        if (codeNode) codeNode.textContent = newCode;

        const emailNode = currentEditingRow.querySelector(".employee-email");
        if (emailNode) emailNode.textContent = newEmail;

        const projectTitleNode = currentEditingRow.querySelector(".project-title");
        if (projectTitleNode) projectTitleNode.textContent = newProject;

        const taskCountNode = currentEditingRow.querySelector(".task-count");
        if (taskCountNode) {
            taskCountNode.textContent = `${newTaskCount} nhiệm vụ`;
            if (newWorkload === "overload") {
                taskCountNode.className = "task-count overload-task";
            } else if (newStatus === "completed") {
                taskCountNode.className = "task-count completed-task";
            } else {
                taskCountNode.className = "task-count";
            }
        }

        // Workload tag / row style
        if (newWorkload === "overload") {
            currentEditingRow.classList.add("overload-row");
        } else {
            currentEditingRow.classList.remove("overload-row");
        }

        closeModal(editMemberModal);
        showToast("Cập nhật thành công", `Đã cập nhật vai trò và phân quyền cho ${newName}`);
        filterTable();
    });
}

/* =========================================================
   2. XEM CHI TIẾT THÀNH VIÊN (VIEW DETAILS)
========================================================= */

function setupViewMemberHandlers() {
    $$(".view-member").forEach(btn => {
        btn.addEventListener("click", function () {
            const row = this.closest("tr");
            if (!row) return;

            const name = row.dataset.name || "N/A";
            const code = row.dataset.code || "N/A";
            const email = row.dataset.email || "N/A";
            const project = row.dataset.project || "N/A";

            const roleBadge = row.querySelector(".role-badge");
            const roleText = roleBadge ? roleBadge.textContent.trim() : "N/A";

            const statusElem = row.querySelector(".status");
            const statusText = statusElem ? statusElem.textContent.trim() : "Đang tham gia";

            const dateElem = row.querySelector(".date-cell");
            const dateText = dateElem ? dateElem.textContent.trim() : "15/01/2025";

            const taskElem = row.querySelector(".task-count");
            const taskText = taskElem ? taskElem.textContent.trim() : "4 nhiệm vụ";

            if (detailTitle) detailTitle.textContent = name;
            if (detailSubtitle) detailSubtitle.textContent = `${code} - ${email}`;

            if (detailBody) {
                detailBody.innerHTML = `
                    <div class="detail-item">
                        <span>Họ và tên:</span>
                        <strong>${name}</strong>
                    </div>
                    <div class="detail-item">
                        <span>Mã nhân sự:</span>
                        <strong>${code}</strong>
                    </div>
                    <div class="detail-item">
                        <span>Email công ty:</span>
                        <strong>${email}</strong>
                    </div>
                    <div class="detail-item">
                        <span>Dự án đang thuộc về:</span>
                        <strong>${project}</strong>
                    </div>
                    <div class="detail-item">
                        <span>Vai trò đảm nhiệm:</span>
                        <strong>${roleText}</strong>
                    </div>
                    <div class="detail-item">
                        <span>Khối lượng công việc:</span>
                        <strong>${taskText}</strong>
                    </div>
                    <div class="detail-item">
                        <span>Trạng thái tham gia:</span>
                        <strong>${statusText}</strong>
                    </div>
                    <div class="detail-item">
                        <span>Ngày tham gia dự án:</span>
                        <strong>${dateText}</strong>
                    </div>

                    <div class="detail-actions-bar">
                        <button type="button" class="button button-secondary" id="detailDownloadBtn">
                            <span class="material-symbols-outlined">download</span>
                            Tải hồ sơ
                        </button>
                        <button type="button" class="button button-secondary" id="detailShareBtn">
                            <span class="material-symbols-outlined">share</span>
                            Chia sẻ
                        </button>
                        <button type="button" class="button button-secondary" id="detailContactAdminBtn">
                            <span class="material-symbols-outlined">admin_panel_settings</span>
                            Liên hệ QT lưu trữ
                        </button>
                    </div>
                `;

                // Sub-button listeners inside Detail Modal
                const dDownload = $("#detailDownloadBtn");
                if (dDownload) {
                    dDownload.addEventListener("click", () => {
                        showToast("Tải xuống hồ sơ", `Đã tải xuống bộ hồ sơ nhiệm vụ của ${name}`);
                    });
                }

                const dShare = $("#detailShareBtn");
                if (dShare) {
                    dShare.addEventListener("click", () => {
                        closeModal(detailModal);
                        openModal(shareModal);
                    });
                }

                const dContact = $("#detailContactAdminBtn");
                if (dContact) {
                    dContact.addEventListener("click", () => {
                        closeModal(detailModal);
                        openModal(contactAdminModal);
                    });
                }
            }

            openModal(detailModal);
        });
    });
}

if (closeDetailButton) {
    closeDetailButton.addEventListener("click", () => closeModal(detailModal));
}

/* =========================================================
   3. TẢI XUẤT BÁO CÁO / TẢI XUỐNG (EXCEL DOWNLOAD)
========================================================= */

if (exportButton) {
    exportButton.addEventListener("click", () => {
        showToast(
            "Tải xuống danh sách Excel",
            "Đã xuất dữ liệu danh sách 42 thành viên dự án thành tệp .XLSX"
        );
    });
}

/* =========================================================
   4. CHIA SẺ (SHARE)
========================================================= */

if (shareBtn) {
    shareBtn.addEventListener("click", () => openModal(shareModal));
}

if (closeShareBtn) {
    closeShareBtn.addEventListener("click", () => closeModal(shareModal));
}

if (cancelShareBtn) {
    cancelShareBtn.addEventListener("click", () => closeModal(shareModal));
}

if (copyShareUrlBtn && shareUrlInput) {
    copyShareUrlBtn.addEventListener("click", () => {
        shareUrlInput.select();
        navigator.clipboard.writeText(shareUrlInput.value)
            .then(() => {
                showToast("Đã sao chép", "Đã chép đường dẫn chia sẻ dự án vào khay nhớ tạm!");
            })
            .catch(() => {
                showToast("Đã sao chép", "Đã chọn đường dẫn chia sẻ.");
            });
    });
}

if (sendShareEmailBtn) {
    sendShareEmailBtn.addEventListener("click", () => {
        const email = $("#shareEmailInput") ? $("#shareEmailInput").value : "";
        if (email) {
            closeModal(shareModal);
            showToast("Gửi thư thành công", `Đã gửi liên kết chia sẻ dự án tới ${email}`);
        } else {
            showToast("Lỗi nhập liệu", "Vui lòng nhập email nhân sự cần chia sẻ!");
        }
    });
}

/* =========================================================
   5. TẢI TÀI LIỆU LÊN (UPLOAD DOCUMENT)
========================================================= */

if (uploadDocBtn) {
    uploadDocBtn.addEventListener("click", () => openModal(uploadDocModal));
}

if (closeUploadDocBtn) {
    closeUploadDocBtn.addEventListener("click", () => closeModal(uploadDocModal));
}

if (cancelUploadDocBtn) {
    cancelUploadDocBtn.addEventListener("click", () => closeModal(uploadDocModal));
}

if (uploadDropzone && fileInputSelect) {
    uploadDropzone.addEventListener("click", () => fileInputSelect.click());
}

if (uploadDocForm) {
    uploadDocForm.addEventListener("submit", function (e) {
        e.preventDefault();
        closeModal(uploadDocModal);
        showToast("Tải lên hoàn tất", "Tài liệu thành viên đã được lưu trữ an toàn vào hệ thống.");
    });
}

/* =========================================================
   6. LIÊN HỆ QUẢN TRỊ VIÊN LƯU TRỮ (CONTACT ARCHIVE ADMIN)
========================================================= */

if (contactAdminBtn) {
    contactAdminBtn.addEventListener("click", () => openModal(contactAdminModal));
}

if (closeContactAdminBtn) {
    closeContactAdminBtn.addEventListener("click", () => closeModal(contactAdminModal));
}

if (cancelContactAdminBtn) {
    cancelContactAdminBtn.addEventListener("click", () => closeModal(contactAdminModal));
}

if (contactAdminForm) {
    contactAdminForm.addEventListener("submit", function (e) {
        e.preventDefault();
        closeModal(contactAdminModal);
        showToast("Đã gửi yêu cầu", "Yêu cầu đã được chuyển tới Quản trị viên lưu trữ dữ liệu.");
    });
}

/* =========================================================
   7. XEM CẤU HÌNH PHÂN QUYỀN CAO (HIGH PERMISSIONS CONFIG)
========================================================= */

if (openHighPermBtn) {
    openHighPermBtn.addEventListener("click", () => openModal(highPermModal));
}

if (openHighPermHeaderBtn) {
    openHighPermHeaderBtn.addEventListener("click", () => openModal(highPermModal));
}

if (closeHighPermBtn) {
    closeHighPermBtn.addEventListener("click", () => closeModal(highPermModal));
}

if (cancelHighPermBtn) {
    cancelHighPermBtn.addEventListener("click", () => closeModal(highPermModal));
}

if (saveHighPermBtn) {
    saveHighPermBtn.addEventListener("click", () => {
        closeModal(highPermModal);
        showToast("Lưu phân quyền cao", "Cấu hình ma trận bảo mật và phân quyền hệ thống đã được cập nhật!");
    });
}

/* =========================================================
   8. THÊM THÀNH VIÊN VÀO DỰ ÁN (ADD MEMBER)
========================================================= */

if (openAddMemberButton) {
    openAddMemberButton.addEventListener("click", () => openModal(addMemberModal));
}

if (closeAddMemberButton) {
    closeAddMemberButton.addEventListener("click", () => closeModal(addMemberModal));
}

if (cancelAddMemberButton) {
    cancelAddMemberButton.addEventListener("click", () => closeModal(addMemberModal));
}

if (addMemberForm) {
    addMemberForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const memberSelect = $("#memberSelect");
        const selectedOption = memberSelect ? memberSelect.options[memberSelect.selectedIndex] : null;

        const name = selectedOption ? (selectedOption.dataset.name || "Thành viên mới") : "Thành viên mới";

        closeModal(addMemberModal);
        showToast("Phân bổ thành công", `Đã thêm ${name} vào dự án trọng điểm!`);
    });
}

/* =========================================================
   FILTER & SEARCH ENGINE
========================================================= */

function filterTable() {
    const keyword = filterKeyword ? filterKeyword.value.toLowerCase().trim() : "";
    const project = filterProject ? filterProject.value : "all";
    const role = filterRole ? filterRole.value : "all";
    const status = filterStatus ? filterStatus.value : "all";

    const rows = $$("tbody tr", memberTable);
    let visibleCounter = 0;

    rows.forEach(row => {
        const rName = (row.dataset.name || "").toLowerCase();
        const rEmail = (row.dataset.email || "").toLowerCase();
        const rCode = (row.dataset.code || "").toLowerCase();
        const rProject = row.dataset.project || "all";
        const rRole = row.dataset.role || "all";
        const rStatus = row.dataset.status || "all";
        const rWorkload = row.dataset.workload || "all";

        const matchKeyword = !keyword || rName.includes(keyword) || rEmail.includes(keyword) || rCode.includes(keyword);
        const matchProject = project === "all" || rProject === project;
        const matchRole = role === "all" || rRole === role;
        const matchStatus = status === "all" || rStatus === status;
        const matchWorkload = currentWorkloadFilter === "all" || rWorkload === currentWorkloadFilter;

        if (matchKeyword && matchProject && matchRole && matchStatus && matchWorkload) {
            row.style.display = "";
            visibleCounter++;
        } else {
            row.style.display = "none";
        }
    });

    if (visibleCount) {
        visibleCount.textContent = `${visibleCounter}/${rows.length} hiển thị`;
    }

    if (emptyState) {
        if (visibleCounter === 0) {
            emptyState.classList.add("show");
        } else {
            emptyState.classList.remove("show");
        }
    }
}

if (filterKeyword) filterKeyword.addEventListener("input", filterTable);
if (filterProject) filterProject.addEventListener("change", filterTable);
if (filterRole) filterRole.addEventListener("change", filterTable);
if (filterStatus) filterStatus.addEventListener("change", filterTable);

if (globalSearch) {
    globalSearch.addEventListener("input", function () {
        if (filterKeyword) {
            filterKeyword.value = this.value;
            filterTable();
        }
    });
}

if (resetFilters) {
    resetFilters.addEventListener("click", () => {
        if (filterKeyword) filterKeyword.value = "";
        if (filterProject) filterProject.value = "all";
        if (filterRole) filterRole.value = "all";
        if (filterStatus) filterStatus.value = "all";
        if (globalSearch) globalSearch.value = "";

        currentWorkloadFilter = "all";
        $$(".quick-filter").forEach(b => b.classList.remove("active"));
        const defaultQuick = $('.quick-filter[data-workload="all"]');
        if (defaultQuick) defaultQuick.classList.add("active");

        filterTable();
        showToast("Đặt lại bộ lọc", "Đã hiển thị toàn bộ danh sách thành viên.");
    });
}

// Quick filter buttons
$$(".quick-filter").forEach(btn => {     btn.addEventListener("click", function () {         $$
(".quick-filter").forEach(b => b.classList.remove("active"));
        this.classList.add("active");

        currentWorkloadFilter = this.dataset.workload || "all";
        filterTable();
    });
});

/* =========================================================
   TABLE CHECKBOX SELECT ALL & DELETE ACTION
========================================================= */

if (selectAll) {
    selectAll.addEventListener("change", function () {
        const checkboxes = $$(".member-checkbox", memberTable);         checkboxes.forEach(cb => (cb.checked = this.checked));     }); }  function setupRemoveMemberHandlers() {     $$(".remove-member").forEach(btn => {
        btn.addEventListener("click", function () {
            const row = this.closest("tr");
            if (!row) return;

            const name = row.dataset.name || "Thành viên";
            if (confirm(`Bạn có chắc chắn muốn rút thành viên ${name} khỏi dự án?`)) {
                row.remove();
                showToast("Đã thu hồi", `Đã rút ${name} khỏi danh sách dự án.`);
                filterTable();
            }
        });
    });
}

/* =========================================================
   HELPER BUTTONS
========================================================= */

if (optimizeButton) {
    optimizeButton.addEventListener("click", () => {
        showToast("Tối ưu tự động", "Hệ thống AI đã phân bổ lại tải trọng công việc đạt mức cân bằng.");
    });
}

if (analyticsDetailBtn) {
    analyticsDetailBtn.addEventListener("click", () => {
        showToast("Báo cáo chuyên môn", "Đang mở báo cáo chi tiết năng lực nhân sự...");
    });
}

if (helpButton) {
    helpButton.addEventListener("click", () => {
        showToast("Trợ giúp", "Mã chức năng: LD-ADM09 - Hướng dẫn quản lý thành viên.");
    });
}

if (notificationButton) {
    notificationButton.addEventListener("click", () => {
        showToast("Thông báo", "Bạn có 3 thông báo phân bổ nhân sự mới chưa xem.");
    });
}

if (userMenuButton) {
    userMenuButton.addEventListener("click", () => {
        showToast("Tài khoản", "Nguyễn Văn An (Quản trị hệ thống)");
    });
}

/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    setupEditMemberHandlers();
    setupViewMemberHandlers();
    setupRemoveMemberHandlers();
    filterTable();
});