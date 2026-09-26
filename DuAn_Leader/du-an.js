/* =========================================================
   PROJECT MANAGEMENT SYSTEM
   DU-AN.JS - Xử lý logic và tương tác Không gian dự án
========================================================= */

/* Dữ liệu mẫu các thành viên */
const memberData = {
    "NA": {
        name: "Nguyễn Văn An",
        role: "Trưởng dự án / Senior Lead",
        email: "an.nguyen@company.com",
        phone: "0901 234 567",
        dept: "Phát triển Phần mềm",
        projects: "PRJ-ECOMM-01, PRJ-HRM-02",
        bgClass: "blue-bg"
    },
    "TH": {
        name: "Trần Văn Hòa",
        role: "Frontend Developer",
        email: "hoa.tran@company.com",
        phone: "0902 345 678",
        dept: "Phát triển Phần mềm",
        projects: "PRJ-ECOMM-01",
        bgClass: "cyan-bg"
    },
    "LK": {
        name: "Lê Thị Khánh",
        role: "UI/UX Designer",
        email: "khanh.le@company.com",
        phone: "0903 456 789",
        dept: "Thiết kế Sản phẩm",
        projects: "PRJ-ECOMM-01, PRJ-LIB-03",
        bgClass: "purple-bg"
    },
    "TB": {
        name: "Trần Thị Bình",
        role: "Project Manager",
        email: "binh.tran@company.com",
        phone: "0904 567 890",
        dept: "Quản lý Dự án",
        projects: "PRJ-HRM-02",
        bgClass: "purple-bg"
    },
    "QV": {
        name: "Quách Văn Vũ",
        role: "Backend Developer",
        email: "vu.quach@company.com",
        phone: "0905 678 901",
        dept: "Phát triển Phần mềm",
        projects: "PRJ-HRM-02",
        bgClass: "blue-bg"
    },
    "DN": {
        name: "Đỗ Ngọc Nam",
        role: "QA / Tester Specialist",
        email: "nam.do@company.com",
        phone: "0906 789 012",
        dept: "Kiểm thử Chất lượng",
        projects: "PRJ-HRM-02",
        bgClass: "cyan-bg"
    },
    "LC": {
        name: "Lê Minh Cường",
        role: "Tech Lead",
        email: "cuong.le@company.com",
        phone: "0907 890 123",
        dept: "Phát triển Hệ thống",
        projects: "PRJ-LIB-03",
        bgClass: "cyan-bg"
    },
    "HP": {
        name: "Hoàng Văn Phúc",
        role: "Database Administrator",
        email: "phuc.hoang@company.com",
        phone: "0908 901 234",
        dept: "Cơ sở dữ liệu",
        projects: "PRJ-LIB-03",
        bgClass: "blue-bg"
    },
    "PN": {
        name: "Phạm Hoàng Nam",
        role: "Project Leader",
        email: "nam.pham@company.com",
        phone: "0909 012 345",
        dept: "Đào tạo & Giáo dục",
        projects: "PRJ-EDU-04",
        bgClass: "error-bg"
    },
    "MA": {
        name: "Mai Anh Tuấn",
        role: "DevOps Engineer",
        email: "tuan.mai@company.com",
        phone: "0910 123 456",
        dept: "Vận hành Hạ tầng",
        projects: "PRJ-EDU-04",
        bgClass: "blue-bg"
    },
    "HL": {
        name: "Hoàng Thùy Linh",
        role: "Cloud Architect",
        email: "linh.hoang@company.com",
        phone: "0911 234 567",
        dept: "Điện toán đám mây",
        projects: "PRJ-INFRA-05",
        bgClass: "cyan-bg"
    },
    "QD": {
        name: "Quyền Đức Anh",
        role: "System Engineer",
        email: "anh.quyen@company.com",
        phone: "0912 345 678",
        dept: "Vận hành Hạ tầng",
        projects: "PRJ-INFRA-05",
        bgClass: "blue-bg"
    },
    "MN": {
        name: "Minh Nhật",
        role: "Security Specialist",
        email: "nhat.minh@company.com",
        phone: "0913 456 789",
        dept: "An ninh mạng",
        projects: "PRJ-INFRA-05",
        bgClass: "purple-bg"
    }
};

/* Dữ liệu dự án */
let projectsData = [
    {
        code: "PRJ-ECOMM-01",
        title: "Xây dựng Website thương mại điện tử",
        leader: "Nguyễn Văn An",
        status: "ongoing",
        statusText: "Đang thực hiện",
        progress: 85,
        period: "15/01/2025 - 15/06/2025",
        members: ["NA", "TH", "LK"]
    },
    {
        code: "PRJ-HRM-02",
        title: "Phát triển ứng dụng quản lý nhân sự",
        leader: "Trần Thị Bình",
        status: "ongoing",
        statusText: "Đang thực hiện",
        progress: 64,
        period: "01/03/2025 - 30/07/2025",
        members: ["TB", "QV", "DN"]
    },
    {
        code: "PRJ-LIB-03",
        title: "Thiết kế hệ thống quản lý thư viện",
        leader: "Lê Minh Cường",
        status: "closing",
        statusText: "Sắp hoàn tất",
        progress: 92,
        period: "10/02/2025 - 20/05/2025",
        members: ["LC", "HP"]
    },
    {
        code: "PRJ-EDU-04",
        title: "Xây dựng nền tảng học trực tuyến",
        leader: "Phạm Hoàng Nam",
        status: "delayed",
        statusText: "Chậm tiến độ",
        progress: 40,
        period: "05/04/2025 - 10/08/2025",
        members: ["PN", "MA", "TH"]
    },
    {
        code: "PRJ-INFRA-05",
        title: "Nâng cấp hạ tầng Microservices Core",
        leader: "Hoàng Thùy Linh",
        status: "completed",
        statusText: "Đã hoàn thành",
        progress: 100,
        period: "01/01/2025 - 30/04/2025",
        members: ["HL", "QD", "MN"]
    }
];

/* Biến theo dõi trạng thái */
let deleteProjectCodeTarget = null;
let currentWorkspaceCode = null;

// Chờ DOM load hoàn tất
document.addEventListener("DOMContentLoaded", function () {
    initViewSwitcher();
    initFilters();
    initModalEvents();
    initFormSubmissions();
});

/* Chuyển chế độ xem Dạng Thẻ / Dạng Bảng */
function initViewSwitcher() {
    const gridBtn = document.getElementById("viewGridBtn");
    const tableBtn = document.getElementById("viewTableBtn");
    const gridContainer = document.getElementById("projectGridContainer");
    const tableContainer = document.getElementById("projectTableContainer");

    if (gridBtn && tableBtn) {
        gridBtn.addEventListener("click", function () {
            gridBtn.classList.add("active");
            tableBtn.classList.remove("active");
            gridContainer.classList.remove("hidden");
            tableContainer.classList.add("hidden");
        });

        tableBtn.addEventListener("click", function () {
            tableBtn.classList.add("active");
            gridBtn.classList.remove("active");
            tableContainer.classList.remove("hidden");
            gridContainer.classList.add("hidden");
        });
    }
}

/* Lọc & Tìm kiếm */
function initFilters() {
    const searchInput = document.getElementById("searchInput");
    const statusFilter = document.getElementById("statusFilter");
    const leaderFilter = document.getElementById("leaderFilter");
    const resetBtn = document.getElementById("resetFilters");

    function applyFilters() {
        const query = (searchInput?.value || "").toLowerCase();
        const statusVal = statusFilter?.value || "all";
        const leaderVal = leaderFilter?.value || "all";

        // Lọc dạng Card
        const cards = document.querySelectorAll(".project-card");
        cards.forEach(card => {
            const title = (card.getAttribute("data-title") || "").toLowerCase();
            const code = (card.getAttribute("data-code") || "").toLowerCase();
            const leader = card.getAttribute("data-leader") || "";
            const status = card.getAttribute("data-status") || "";

            const matchSearch = title.includes(query) || code.includes(query) || leader.toLowerCase().includes(query);
            const matchStatus = (statusVal === "all") || (status === statusVal);
            const matchLeader = (leaderVal === "all") || (leader === leaderVal);

            if (matchSearch && matchStatus && matchLeader) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });

        // Lọc dạng Hàng Bảng
        const rows = document.querySelectorAll(".table-row");
        rows.forEach(row => {
            const title = (row.getAttribute("data-title") || "").toLowerCase();
            const code = (row.getAttribute("data-code") || "").toLowerCase();
            const leader = row.getAttribute("data-leader") || "";
            const status = row.getAttribute("data-status") || "";

            const matchSearch = title.includes(query) || code.includes(query) || leader.toLowerCase().includes(query);
            const matchStatus = (statusVal === "all") || (status === statusVal);
            const matchLeader = (leaderVal === "all") || (leader === leaderVal);

            if (matchSearch && matchStatus && matchLeader) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }

    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (statusFilter) statusFilter.addEventListener("change", applyFilters);
    if (leaderFilter) leaderFilter.addEventListener("change", applyFilters);

    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            if (searchInput) searchInput.value = "";
            if (statusFilter) statusFilter.value = "all";
            if (leaderFilter) leaderFilter.value = "all";
            applyFilters();
        });
    }
}

/* =========================================================
   GIAO DIỆN KHÔNG GIAN DỰ ÁN (PROJECT WORKSPACE)
========================================================= */
function goToProjectWorkspace(code) {
    const projectCode = code || currentWorkspaceCode || "PRJ-ECOMM-01";
    currentWorkspaceCode = projectCode;

    const prj = projectsData.find(p => p.code === projectCode) || projectsData[0];

    // Cập nhật thông tin Header Không gian dự án
    const codeEl = document.getElementById("wsProjectCode");
    const titleEl = document.getElementById("wsProjectTitle");
    const badgeEl = document.getElementById("wsProjectBadge");
    const leaderEl = document.getElementById("wsProjectLeader");
    const periodEl = document.getElementById("wsProjectPeriod");
    const progressEl = document.getElementById("wsProjectProgressText");

    if (codeEl) codeEl.innerText = prj.code;
    if (titleEl) titleEl.innerText = prj.title;
    if (leaderEl) leaderEl.innerText = prj.leader;
    if (periodEl) periodEl.innerText = prj.period;
    if (progressEl) progressEl.innerText = prj.progress + "%";

    if (badgeEl) {
        badgeEl.className = "status-badge " + prj.status;
        badgeEl.innerHTML = `<span class="status-dot"></span>` + prj.statusText;
    }

    // Đóng Modal nếu đang mở
    closeModal("detailModal");

    // Chuyển view: Ẩn danh sách, Hiện không gian dự án
    document.getElementById("projectsListView").classList.add("hidden");
    document.getElementById("workspaceView").classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function leaveProjectWorkspace() {
    document.getElementById("workspaceView").classList.add("hidden");
    document.getElementById("projectsListView").classList.remove("hidden");
}

/* Chuyển các tab bên trong Không gian dự án */
function switchWsTab(tabId, btn) {
    const tabs = document.querySelectorAll(".ws-tab-content");
    tabs.forEach(t => t.classList.add("hidden"));

    const btns = document.querySelectorAll(".ws-tab-btn");
    btns.forEach(b => b.classList.remove("active"));

    const activeTab = document.getElementById(tabId);
    if (activeTab) activeTab.classList.remove("hidden");

    if (btn) btn.classList.add("active");
}

/* Thêm công việc nhanh trong Kanban */
function showNewTaskModal(columnType) {
    const taskName = prompt("Nhập tên công việc mới cho dự án " + currentWorkspaceCode + ":");
    if (!taskName || taskName.trim() === "") return;

    let targetListId = "todoTaskList";
    if (columnType === "doing") targetListId = "doingTaskList";
    if (columnType === "review") targetListId = "reviewTaskList";

    const targetList = document.getElementById(targetListId);
    if (targetList) {
        const newCard = document.createElement("div");
        newCard.className = "kanban-card";
        newCard.innerHTML = `
            <span class="kanban-card-tag feature">Nhiệm vụ</span>
            <div class="kanban-card-title">${taskName.trim()}</div>
            <div class="kanban-card-footer"><span>Vừa thêm</span><strong>NA</strong></div>
        `;
        targetList.prepend(newCard);
        alert("Đã thêm công việc thành công!");
    }
}

/* Gửi trao đổi / Bình luận trong dự án */
function postDiscussion() {
    const input = document.getElementById("discussionInput");
    if (!input || !input.value.trim()) return;

    const list = document.getElementById("discussionList");
    if (list) {
        const newItem = document.createElement("div");
        newItem.className = "discussion-item";
        newItem.innerHTML = `
            <div class="discussion-avatar blue-bg">NA</div>
            <div class="discussion-body">
                <div class="discussion-header">
                    <span class="discussion-author">Nguyễn Văn An</span>
                    <span class="discussion-time">Vừa xong</span>
                </div>
                <div class="discussion-text">${input.value.trim()}</div>
            </div>
        `;
        list.appendChild(newItem);
        input.value = "";
    }
}

/* =========================================================
   XỬ LÝ MODAL & FORM
========================================================= */
function initModalEvents() {
    const openCreateBtn = document.getElementById("openCreateModal");
    if (openCreateBtn) {
        openCreateBtn.addEventListener("click", function () {
            openModal("createProjectModal");
        });
    }
}

function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
}

/* Mở Modal xem chi tiết dự án */
function openDetailModal(code) {
    currentWorkspaceCode = code;
    const prj = projectsData.find(p => p.code === code);
    if (!prj) return;

    document.getElementById("modalProjectCode").innerText = prj.code;
    document.getElementById("modalProjectTitle").innerText = prj.title;
    document.getElementById("modalProjectLeader").innerText = prj.leader;
    document.getElementById("modalProjectPeriod").innerText = prj.period;
    document.getElementById("modalProjectProgressText").innerText = prj.progress + "%";
    document.getElementById("modalProgressBar").style.width = prj.progress + "%";

    const badge = document.getElementById("modalProjectBadge");
    if (badge) {
        badge.innerText = prj.statusText;
        badge.className = "modal-status " + prj.status;
    }

    // Hiển thị danh sách thành viên trong modal
    const membersContainer = document.getElementById("modalProjectMembers");
    if (membersContainer) {
        membersContainer.innerHTML = "";
        prj.members.forEach(mKey => {
            const m = memberData[mKey];
            if (m) {
                const chip = document.createElement("div");
                chip.className = "member-chip";
                chip.onclick = function () { openMemberModal(mKey); };
                chip.innerHTML = `
                    <div class="member-chip-avatar ${m.bgClass}">${mKey}</div>
                    <div class="member-chip-info">
                        <span class="member-chip-name">${m.name}</span>
                        <span class="member-chip-role">${m.role}</span>
                    </div>
                `;
                membersContainer.appendChild(chip);
            }
        });
    }

    openModal("detailModal");
}

/* Mở Modal xem chi tiết thành viên */
function openMemberModal(memberKey) {
    const m = memberData[memberKey];
    if (!m) return;

    document.getElementById("memberAvatar").className = "member-detail-avatar " + m.bgClass;
    document.getElementById("memberAvatar").innerText = memberKey;
    document.getElementById("memberName").innerText = m.name;
    document.getElementById("memberRole").innerText = m.role;
    document.getElementById("memberEmail").innerText = m.email;
    document.getElementById("memberPhone").innerText = m.phone;
    document.getElementById("memberDepartment").innerText = m.dept;
    document.getElementById("memberProjects").innerText = m.projects;

    openModal("memberDetailModal");
}

/* Mở Modal chỉnh sửa dự án */
function openEditModal(code) {
    const prj = projectsData.find(p => p.code === code);
    if (!prj) return;

    document.getElementById("editProjectName").value = prj.title;
    document.getElementById("editProjectCode").value = prj.code;
    document.getElementById("editProjectLeader").value = prj.leader;
    document.getElementById("editProjectProgress").value = prj.progress;
    document.getElementById("editProjectStatus").value = prj.status;
    document.getElementById("editProjectPeriod").value = prj.period;

    openModal("editProjectModal");
}

/* Xác nhận & thực thi Xóa dự án */
function confirmDeleteProject(code, title) {
    deleteProjectCodeTarget = code;
    document.getElementById("deleteProjectNameText").innerText = title;
    openModal("deleteModal");
}

function executeDeleteProject() {
    if (!deleteProjectCodeTarget) return;

    projectsData = projectsData.filter(p => p.code !== deleteProjectCodeTarget);

    // Xóa phần tử khỏi giao diện Grid & Table
    const card = document.querySelector(`.project-card[data-code="${deleteProjectCodeTarget}"]`);
    if (card) card.remove();

    const row = document.querySelector(`.table-row[data-code="${deleteProjectCodeTarget}"]`);
    if (row) row.remove();

    closeModal("deleteModal");
    alert("Đã xóa dự án " + deleteProjectCodeTarget + " thành công!");
    deleteProjectCodeTarget = null;
}

/* Xử lý gửi Form tạo mới & Chỉnh sửa */
function initFormSubmissions() {
    const editForm = document.getElementById("editProjectForm");
    if (editForm) {
        editForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const code = document.getElementById("editProjectCode").value;
            const prj = projectsData.find(p => p.code === code);

            if (prj) {
                prj.title = document.getElementById("editProjectName").value;
                prj.leader = document.getElementById("editProjectLeader").value;
                prj.progress = parseInt(document.getElementById("editProjectProgress").value);
                prj.status = document.getElementById("editProjectStatus").value;
                prj.period = document.getElementById("editProjectPeriod").value;

                // Cập nhật DOM trên UI card
                const card = document.querySelector(`.project-card[data-code="${code}"]`);
                if (card) {
                    card.querySelector("h3").innerText = prj.title;
                    card.querySelector(".progress-header strong").innerText = prj.progress + "%";
                    card.querySelector(".progress-bar").style.width = prj.progress + "%";
                }

                alert("Cập nhật thông tin dự án thành công!");
                closeModal("editProjectModal");
            }
        });
    }

    const newForm = document.getElementById("newProjectForm");
    if (newForm) {
        newForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(newForm);

            const newPrj = {
                code: formData.get("projectCode"),
                title: formData.get("projectName"),
                leader: formData.get("leader"),
                status: "ongoing",
                statusText: "Đang thực hiện",
                progress: 0,
                period: (formData.get("startDate") || "01/05/2025") + " - " + (formData.get("endDate") || "31/10/2025"),
                members: ["NA"]
            };

            projectsData.push(newPrj);
            alert("Tạo mới dự án " + newPrj.code + " thành công!");
            closeModal("createProjectModal");
            newForm.reset();
        });
    }
}