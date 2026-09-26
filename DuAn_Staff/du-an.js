/* =========================================================
   DU-AN.JS
   Dự án tham gia - Project Management (CRUD Đầy đủ)

   Lưu ý:
   - Quản lý dữ liệu danh sách Dự án (Xem, Thêm, Sửa, Xóa).
   - Không sử dụng Tailwind.
   - Giữ nguyên giao diện ban đầu.
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       INITIAL DATA (PROJECTS STATE)
    ===================================================== */

    let projects = [
        {
            id: "PRJ-ECOMM-01",
            title: "Sàn Thương Mại Điện Tử Đa Kênh (Omnichannel Retail)",
            status: "active",
            statusText: "Đang triển khai - Sprint 4 / 6 (Release v2.1)",
            category: "E-Commerce / B2C",
            role: "lead",
            roleTitle: "Lead UI/UX Designer",
            roleDesc: "Chịu trách nhiệm thiết kế toàn bộ luồng Checkout, Cổng thanh toán & Hệ thống Design System dùng chung cho Web + App.",
            overallProgress: 75,
            sprintText: "Sprint 4 đang diễn ra",
            planText: "Kế hoạch: Sprint 6",
            personalProgress: 87.5,
            tasksDone: 14,
            tasksTotal: 16,
            activeTasksText: "Còn 2 task active",
            dateRange: "01/03/2025 - 30/08/2025",
            daysRemaining: "(Còn 72 ngày)",
            nextMilestone: "Bàn giao UI Sprint 4 (20/06/2025)",
            pmName: "Nguyễn Văn An",
            pmEmail: "an.nguyen@enterprise.vn",
            pmAvatar: "NA",
            teamCount: "12 thành viên nhóm đa chức năng",
            platform: "Web, iOS & Android",
            priority: "high",
            deadline: "20250620",
            updated: 2,
            search: "PRJ-ECOMM-01 Sàn Thương Mại Điện Tử Đa Kênh Omnichannel Retail Nguyễn Văn An Lead UI UX Designer E-Commerce B2C"
        },
        {
            id: "PRJ-HRM-02",
            title: "Cổng Quản Trị Nhân Sự & Đãi Ngộ Doanh Nghiệp",
            status: "active",
            statusText: "Giai đoạn Thiết kế v1.2",
            category: "Enterprise SaaS / Internal",
            role: "member",
            roleTitle: "Product Designer (Core Member)",
            roleDesc: "Phụ trách phân hệ Đơn từ nhân sự điện tử, Chấm công định vị và Bảng tính tổng kết đãi ngộ tháng cho CBNV.",
            overallProgress: 45,
            sprintText: "Đang ở Phase 1: Prototype",
            planText: "Target: Release Q4",
            personalProgress: 60,
            tasksDone: 6,
            tasksTotal: 10,
            activeTasksText: "Còn 4 task đang làm",
            dateRange: "15/04/2025 - 15/11/2025",
            daysRemaining: "(Còn 148 ngày)",
            nextMilestone: "Nghiệm thu Prototype Đơn hàng (28/06/2025)",
            pmName: "Trần Thị Mai",
            pmEmail: "mai.tran@enterprise.vn",
            pmAvatar: "TM",
            teamCount: "9 thành viên dự án chuyên trách",
            platform: "Desktop Web App",
            priority: "medium",
            deadline: "20250628",
            updated: 1,
            search: "PRJ-HRM-02 Cổng Quản Trị Nhân Sự Đãi Ngộ Doanh Nghiệp Trần Thị Mai Product Designer Core Member Enterprise SaaS Internal"
        },
        {
            id: "PRJ-CRM-03",
            title: "Hệ Thống Quản Lý Chăm Sóc Khách Hàng CRM 360",
            status: "completed",
            statusText: "Đã hoàn thành - Đã nghiệm thu",
            category: "CRM / Service",
            role: "reviewer",
            roleTitle: "Design Reviewer",
            roleDesc: "Đánh giá quy chuẩn UI/UX và nghiệm thu bộ UI kit cho cổng chăm sóc khách hàng.",
            overallProgress: 100,
            sprintText: "Đã bàn giao v1.0",
            planText: "Hoàn tất Q1/2025",
            personalProgress: 100,
            tasksDone: 12,
            tasksTotal: 12,
            activeTasksText: "Đã nghiệm thu toàn bộ",
            dateRange: "01/01/2025 - 30/04/2025",
            daysRemaining: "(Đã kết thúc)",
            nextMilestone: "Đã đóng dự án",
            pmName: "Lê Hoàng Nam",
            pmEmail: "nam.le@enterprise.vn",
            pmAvatar: "LN",
            teamCount: "8 thành viên",
            platform: "Web & Mobile App",
            priority: "low",
            deadline: "20250430",
            updated: 0,
            search: "PRJ-CRM-03 Hệ Thống Quản Lý Chăm Sóc Khách Hàng CRM 360 Lê Hoàng Nam Design Reviewer"
        },
        {
            id: "PRJ-FIN-04",
            title: "Ứng Dụng Quản Lý Tài Chính & Ngân Sách Nội Bộ",
            status: "completed",
            statusText: "Đã hoàn thành - Release v1.0",
            category: "Fintech / Internal",
            role: "member",
            roleTitle: "Product Designer",
            roleDesc: "Thiết kế Dashboard báo cáo dòng tiền và quy trình phê duyệt chi tiêu tự động.",
            overallProgress: 100,
            sprintText: "Đã đi vào vận hành",
            planText: "Hoàn tất Q4/2024",
            personalProgress: 100,
            tasksDone: 15,
            tasksTotal: 15,
            activeTasksText: "Đã nghiệm thu toàn bộ",
            dateRange: "01/09/2024 - 15/12/2024",
            daysRemaining: "(Đã kết thúc)",
            nextMilestone: "Bảo trì định kỳ",
            pmName: "Phạm Văn Đức",
            pmEmail: "duc.pham@enterprise.vn",
            pmAvatar: "PD",
            teamCount: "10 thành viên",
            platform: "Desktop Web App",
            priority: "medium",
            deadline: "20241215",
            updated: 0,
            search: "PRJ-FIN-04 Ứng Dụng Quản Lý Tài Chính Ngân Sách Nội Bộ Phạm Văn Đức Product Designer"
        },
        {
            id: "PRJ-LOG-05",
            title: "Nền Tảng Điều Hành Logistics & Vận Chuyển",
            status: "archived",
            statusText: "Lưu trữ - Tạm dừng triển khai",
            category: "Supply Chain",
            role: "member",
            roleTitle: "UI/UX Designer",
            roleDesc: "Khảo sát người dùng và thiết kế luồng điều phối xe tải giao hàng.",
            overallProgress: 30,
            sprintText: "Dừng tại Sprint 2",
            planText: "Đã lưu trữ hồ sơ",
            personalProgress: 40,
            tasksDone: 4,
            tasksTotal: 10,
            activeTasksText: "Tạm dừng",
            dateRange: "01/10/2024 - 31/01/2025",
            daysRemaining: "(Đã lưu trữ)",
            nextMilestone: "Tạm ngưng",
            pmName: "Vũ Thanh Hà",
            pmEmail: "ha.vu@enterprise.vn",
            pmAvatar: "VH",
            teamCount: "6 thành viên",
            platform: "Web & Mobile",
            priority: "low",
            deadline: "20250131",
            updated: 0,
            search: "PRJ-LOG-05 Nền Tảng Điều Hành Logistics Vận Chuyển Vũ Thanh Hà UI UX Designer"
        }
    ];


    /* =====================================================
       ELEMENT REFERENCES
    ===================================================== */

    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const mobileMenuButton = document.getElementById("mobileMenuButton");

    const globalSearch = document.getElementById("globalSearch");
    const projectSearch = document.getElementById("projectSearch");
    const roleFilter = document.getElementById("roleFilter");
    const sortFilter = document.getElementById("sortFilter");
    const resetFilters = document.getElementById("resetFilters");

    const statusTabs = document.querySelectorAll(".status-tab");
    const viewButtons = document.querySelectorAll(".view-button");

    const projectGrid = document.getElementById("projectGrid");

    const modalOverlay = document.getElementById("modalOverlay");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const modalClose = document.getElementById("modalClose");
    const modalCancel = document.getElementById("modalCancel");
    const modalConfirm = document.getElementById("modalConfirm");
    const modalFooter = document.getElementById("modalFooter");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    const toastIcon = document.getElementById("toastIcon");

    const quickReportButton = document.getElementById("quickReportButton");
    const helpButton = document.getElementById("helpButton");
    const notificationButton = document.getElementById("notificationButton");
    const exportButton = document.getElementById("exportButton");
    const requestProjectButton = document.getElementById("requestProjectButton");

    // Stat elements
    const statTotalProjects = document.getElementById("statTotalProjects");
    const statCompletedProjectsText = document.getElementById("statCompletedProjectsText");
    const statAvgProgress = document.getElementById("statAvgProgress");
    const statAvgProgressBar = document.getElementById("statAvgProgressBar");
    const summaryProjectCount = document.getElementById("summaryProjectCount");

    const countActive = document.getElementById("countActive");
    const countCompleted = document.getElementById("countCompleted");
    const countArchived = document.getElementById("countArchived");
    const countAll = document.getElementById("countAll");


    /* =====================================================
       STATE
    ===================================================== */

    let currentStatus = "active";
    let currentView = "grid";
    let currentModalConfirmHandler = null;
    let toastTimer = null;


    /* =====================================================
       RENDER PROJECTS
    ===================================================== */

    function renderProjects() {
        if (!projectGrid) return;

        projectGrid.innerHTML = "";

        projects.forEach(function (prj) {
            const card = document.createElement("article");
            card.className = "project-card";
            card.dataset.id = prj.id;
            card.dataset.status = prj.status;
            card.dataset.role = prj.role;
            card.dataset.progress = prj.overallProgress;
            card.dataset.priority = prj.priority;
            card.dataset.deadline = prj.deadline;
            card.dataset.updated = prj.updated;
            card.dataset.search = prj.search || `${prj.id} ${prj.title} ${prj.pmName} ${prj.roleTitle} ${prj.category}`;

            // Status Badge Class
            let statusBadgeClass = "blue-status";
            if (prj.status === "completed") statusBadgeClass = "completed-status";
            if (prj.status === "archived") statusBadgeClass = "archived-status";
            if (prj.role === "member") statusBadgeClass = "tertiary-status";

            // Code Badge Class
            let codeBadgeClass = prj.role === "lead" ? "primary-code" : "tertiary-code";
            let roleIconClass = prj.role === "lead" ? "primary-role" : "tertiary-role";

            card.innerHTML = `
                <div class="project-body">
                    <div class="project-header">
                        <div class="project-title-area">
                            <div class="project-meta-tags">
                                <span class="project-code ${codeBadgeClass}">
                                    ${prj.id}
                                </span>
                                <span class="project-status ${statusBadgeClass}">
                                    <span></span>
                                    ${prj.statusText}
                                </span>
                                <span class="project-category">
                                    ${prj.category}
                                </span>
                            </div>
                            <h2>${prj.title}</h2>
                        </div>
                        <button class="more-button" type="button" title="Tùy chọn dự án" data-id="${prj.id}">
                            <span class="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>

                    <!-- Role -->
                    <div class="role-banner">
                        <div class="role-icon ${roleIconClass}">
                            <span class="material-symbols-outlined">
                                ${prj.role === 'lead' ? 'verified_user' : 'badge'}
                            </span>
                        </div>
                        <div>
                            <p class="role-title">
                                Vai trò: <span>${prj.roleTitle}</span>
                            </p>
                            <p class="role-description">${prj.roleDesc}</p>
                        </div>
                    </div>

                    <!-- Metrics -->
                    <div class="metric-grid">
                        <div class="metric-box">
                            <div class="metric-heading">
                                <span>Tiến độ chung dự án</span>
                                <strong>${prj.overallProgress}%</strong>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill secondary-fill" style="width: ${prj.overallProgress}%;"></div>
                            </div>
                            <div class="metric-footer">
                                <span>${prj.sprintText}</span>
                                <span>${prj.planText}</span>
                            </div>
                        </div>

                        <div class="metric-box">
                            <div class="metric-heading">
                                <span>Tiến độ cá nhân (Bình)</span>
                                <strong class="${prj.role === 'lead' ? 'primary-text' : 'tertiary-text'}">
                                    ${prj.personalProgress}%
                                </strong>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill ${prj.role === 'lead' ? 'primary-fill' : 'tertiary-fill'}" style="width: ${prj.personalProgress}%;"></div>
                            </div>
                            <div class="metric-footer">
                                <span>Đã xong: <strong>${prj.tasksDone}/${prj.tasksTotal} task</strong></span>
                                <span class="${prj.role === 'lead' ? 'danger-text' : ''}">${prj.activeTasksText}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Metadata -->
                    <div class="project-metadata">
                        <div class="metadata-item">
                            <span class="material-symbols-outlined">calendar_today</span>
                            <span>${prj.dateRange} <strong class="primary-text">${prj.daysRemaining}</strong></span>
                        </div>

                        <div class="metadata-item">
                            <span class="material-symbols-outlined ${prj.role === 'lead' ? 'tertiary-text' : 'danger-text'}">flag</span>
                            <span>Mốc tới: <strong>${prj.nextMilestone}</strong></span>
                        </div>

                        <div class="project-manager">
                            <div class="manager-avatar ${prj.role !== 'lead' ? 'tertiary-avatar' : ''}">
                                ${prj.pmAvatar}
                            </div>
                            <span>Project Manager:</span>
                            <strong>${prj.pmName}</strong>
                            <span>• ${prj.pmEmail}</span>
                        </div>
                    </div>

                    <!-- Team -->
                    <div class="team-row">
                        <div class="team-left">
                            <div class="avatar-stack">
                                <span class="avatar avatar-blue">TB</span>
                                <span class="avatar avatar-purple">${prj.pmAvatar}</span>
                                <span class="avatar avatar-cyan">HQ</span>
                                <span class="avatar avatar-light">LT</span>
                                <span class="avatar avatar-gray">+4</span>
                            </div>
                            <span>${prj.teamCount}</span>
                        </div>

                        <div class="platform-label ${prj.role !== 'lead' ? 'tertiary-platform' : ''}">
                            <span class="material-symbols-outlined">devices</span>
                            ${prj.platform}
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="project-footer">
                    <div class="project-links">
                        <a href="#" class="project-link">
                            <span class="material-symbols-outlined">design_services</span>
                            Figma Specs
                        </a>
                        <a href="#" class="project-link">
                            <span class="material-symbols-outlined">description</span>
                            PRD Docs
                        </a>
                        <a href="#" class="project-link">
                            <span class="material-symbols-outlined">view_kanban</span>
                            Board Sprint
                        </a>
                    </div>

                    <button class="project-open-button ${prj.role === 'lead' ? 'primary-button' : 'tertiary-button'}" type="button" data-id="${prj.id}">
                        <span>Vào không gian dự án</span>
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            `;

            projectGrid.appendChild(card);
        });

        attachCardEvents();
        updateStatsAndCounts();
        applyFilters();
    }


    /* =====================================================
       UPDATE STATS AND TAB COUNTS
    ===================================================== */

    function updateStatsAndCounts() {
        const activeList = projects.filter(p => p.status === "active");
        const completedList = projects.filter(p => p.status === "completed");
        const archivedList = projects.filter(p => p.status === "archived");

        if (countActive) countActive.textContent = activeList.length;
        if (countCompleted) countCompleted.textContent = completedList.length;
        if (countArchived) countArchived.textContent = archivedList.length;
        if (countAll) countAll.textContent = projects.length;

        if (statTotalProjects) {
            statTotalProjects.textContent = activeList.length < 10 ? `0${activeList.length}` : activeList.length;
        }

        if (summaryProjectCount) {
            summaryProjectCount.textContent = `${activeList.length} Dự án`;
        }

        if (statCompletedProjectsText) {
            const count = completedList.length;
            statCompletedProjectsText.textContent = `${count < 10 ? '0' + count : count} dự án`;
        }

        // Tính tiến độ đóng góp trung bình các dự án Active
        if (activeList.length > 0) {
            const sumProgress = activeList.reduce((acc, cur) => acc + cur.personalProgress, 0);
            const avg = (sumProgress / activeList.length).toFixed(1);
            if (statAvgProgress) statAvgProgress.textContent = `${avg}%`;
            if (statAvgProgressBar) statAvgProgressBar.style.width = `${avg}%`;
        } else {
            if (statAvgProgress) statAvgProgress.textContent = "0%";
            if (statAvgProgressBar) statAvgProgressBar.style.width = "0%";
        }
    }


    /* =====================================================
       ATTACH CARD EVENTS (VIEW, EDIT, DELETE)
    ===================================================== */

    function attachCardEvents() {
        // Open Project Buttons
        document.querySelectorAll(".project-open-button").forEach(btn => {
            btn.addEventListener("click", function () {
                const prjId = btn.dataset.id;
                const prj = projects.find(p => p.id === prjId);
                if (prj) {
                    viewProjectDetail(prj);
                }
            });
        });

        // More Buttons (Options dropdown modal)
        document.querySelectorAll(".more-button").forEach(btn => {
            btn.addEventListener("click", function () {
                const prjId = btn.dataset.id;
                const prj = projects.find(p => p.id === prjId);
                if (prj) {
                    openProjectOptionsMenu(prj);
                }
            });
        });
    }


    /* =====================================================
       CRUD OPERATIONS (VIEW, CREATE, EDIT, DELETE)
    ===================================================== */

    // 1. XEM CHI TIẾT DỰ ÁN (VIEW)
    function viewProjectDetail(prj) {
        showModal(
            `Chi tiết: ${prj.id}`,
            `
                <div class="project-detail-view">
                    <div class="detail-section">
                        <h4>${prj.title}</h4>
                        <p style="margin:0; font-size:13px;">${prj.roleDesc}</p>
                    </div>

                    <div class="detail-section">
                        <div class="detail-grid">
                            <div class="detail-item">
                                <span>Mã dự án:</span>
                                <strong>${prj.id}</strong>
                            </div>
                            <div class="detail-item">
                                <span>Phân loại:</span>
                                <strong>${prj.category}</strong>
                            </div>
                            <div class="detail-item">
                                <span>Trạng thái:</span>
                                <strong>${prj.statusText}</strong>
                            </div>
                            <div class="detail-item">
                                <span>Vai trò:</span>
                                <strong>${prj.roleTitle}</strong>
                            </div>
                            <div class="detail-item">
                                <span>Project Manager:</span>
                                <strong>${prj.pmName} (${prj.pmEmail})</strong>
                            </div>
                            <div class="detail-item">
                                <span>Nền tảng:</span>
                                <strong>${prj.platform}</strong>
                            </div>
                            <div class="detail-item">
                                <span>Tiến độ chung:</span>
                                <strong>${prj.overallProgress}%</strong>
                            </div>
                            <div class="detail-item">
                                <span>Tiến độ cá nhân:</span>
                                <strong>${prj.personalProgress}% (${prj.tasksDone}/${prj.tasksTotal} tasks)</strong>
                            </div>
                            <div class="detail-item">
                                <span>Thời gian thực hiện:</span>
                                <strong>${prj.dateRange}</strong>
                            </div>
                            <div class="detail-item">
                                <span>Mốc tiếp theo:</span>
                                <strong>${prj.nextMilestone}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            "Chỉnh sửa dự án này",
            function () {
                openEditProjectModal(prj);
            },
            true
        );
    }

    // 2. TÙY CHỌN DỰ ÁN (MENU MODAL)
    function openProjectOptionsMenu(prj) {
        showModal(
            `Tùy chọn: ${prj.id}`,
            `
                <div class="modal-action-list">
                    <button type="button" class="modal-action" id="optViewDetail">
                        <span class="material-symbols-outlined">visibility</span>
                        <span>Xem thông tin dự án đầy đủ</span>
                    </button>

                    <button type="button" class="modal-action" id="optEditPrj">
                        <span class="material-symbols-outlined">edit</span>
                        <span>Chỉnh sửa thông tin dự án</span>
                    </button>

                    <button type="button" class="modal-action danger" id="optDeletePrj">
                        <span class="material-symbols-outlined">delete</span>
                        <span>Xóa dự án khỏi danh sách</span>
                    </button>
                </div>
            `,
            "Đóng",
            null,
            false
        );

        setTimeout(() => {
            const btnView = document.getElementById("optViewDetail");
            const btnEdit = document.getElementById("optEditPrj");
            const btnDelete = document.getElementById("optDeletePrj");

            if (btnView) {
                btnView.onclick = function () {
                    closeModal();
                    viewProjectDetail(prj);
                };
            }

            if (btnEdit) {
                btnEdit.onclick = function () {
                    closeModal();
                    openEditProjectModal(prj);
                };
            }

            if (btnDelete) {
                btnDelete.onclick = function () {
                    closeModal();
                    openDeleteProjectModal(prj);
                };
            }
        }, 50);
    }

    // 3. CHỈNH SỬA DỰ ÁN (EDIT)
    function openEditProjectModal(prj) {
        showModal(
            `Chỉnh sửa: ${prj.id}`,
            `
                <form id="projectEditForm" class="modal-form">
                    <div class="form-group">
                        <label>Tên dự án *</label>
                        <input type="text" id="editTitle" class="form-control" value="${prj.title}" required>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Phân loại *</label>
                            <input type="text" id="editCategory" class="form-control" value="${prj.category}" required>
                        </div>
                        <div class="form-group">
                            <label>Trạng thái *</label>
                            <select id="editStatus" class="form-control">
                                <option value="active" ${prj.status === 'active' ? 'selected' : ''}>Đang hoạt động</option>
                                <option value="completed" ${prj.status === 'completed' ? 'selected' : ''}>Đã hoàn thành</option>
                                <option value="archived" ${prj.status === 'archived' ? 'selected' : ''}>Được lưu trữ</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Vai trò của bạn *</label>
                            <select id="editRole" class="form-control">
                                <option value="lead" ${prj.role === 'lead' ? 'selected' : ''}>Lead UI/UX Designer</option>
                                <option value="member" ${prj.role === 'member' ? 'selected' : ''}>Product Designer (Core Member)</option>
                                <option value="reviewer" ${prj.role === 'reviewer' ? 'selected' : ''}>Design Reviewer</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Tiến độ chung (%) *</label>
                            <input type="number" id="editOverallProgress" class="form-control" min="0" max="100" value="${prj.overallProgress}" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Tiến độ cá nhân (%) *</label>
                            <input type="number" id="editPersonalProgress" class="form-control" min="0" max="100" value="${prj.personalProgress}" required>
                        </div>
                        <div class="form-group">
                            <label>Project Manager *</label>
                            <input type="text" id="editPmName" class="form-control" value="${prj.pmName}" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Mô tả công việc đảm nhận</label>
                        <textarea id="editRoleDesc" class="form-control" rows="2">${prj.roleDesc}</textarea>
                    </div>
                </form>
            `,
            "Lưu thay đổi",
            function () {
                const title = document.getElementById("editTitle").value.trim();
                const category = document.getElementById("editCategory").value.trim();
                const status = document.getElementById("editStatus").value;
                const role = document.getElementById("editRole").value;
                const overallProgress = parseFloat(document.getElementById("editOverallProgress").value) || 0;
                const personalProgress = parseFloat(document.getElementById("editPersonalProgress").value) || 0;
                const pmName = document.getElementById("editPmName").value.trim();
                const roleDesc = document.getElementById("editRoleDesc").value.trim();

                if (!title || !category || !pmName) {
                    showToast("Vui lòng điền đầy đủ thông tin bắt buộc!", "error");
                    return;
                }

                // Update Project Object
                prj.title = title;
                prj.category = category;
                prj.status = status;
                prj.role = role;
                prj.roleTitle = role === 'lead' ? 'Lead UI/UX Designer' : (role === 'member' ? 'Product Designer (Core Member)' : 'Design Reviewer');
                prj.overallProgress = overallProgress;
                prj.personalProgress = personalProgress;
                prj.pmName = pmName;
                prj.roleDesc = roleDesc;
                prj.updated = Date.now();
                prj.search = `${prj.id} ${prj.title} ${prj.pmName} ${prj.roleTitle} ${prj.category}`;

                if (status === 'completed') {
                    prj.statusText = "Đã hoàn thành - Đã nghiệm thu";
                } else if (status === 'archived') {
                    prj.statusText = "Lưu trữ - Tạm dừng triển khai";
                } else {
                    prj.statusText = "Đang triển khai - Cập nhật mới";
                }

                renderProjects();
                showToast(`Cập nhật dự án ${prj.id} thành công!`, "check_circle");
            },
            true
        );
    }

    // 4. XÓA DỰ ÁN (DELETE)
    function openDeleteProjectModal(prj) {
        showModal(
            `Xác nhận xóa: ${prj.id}`,
            `
                <p>Bạn có chắc chắn muốn xóa dự án <strong>${prj.title} (${prj.id})</strong> không?</p>
                <p class="danger-text" style="font-size: 12px; margin-top: 8px;">
                    ⚠️ Hành động này sẽ loại bỏ dự án khỏi danh sách tham gia của bạn.
                </p>
            `,
            "Xóa vĩnh viễn",
            function () {
                projects = projects.filter(p => p.id !== prj.id);
                renderProjects();
                showToast(`Đã xóa dự án ${prj.id}!`, "delete");
            },
            true,
            true // style as danger button
        );
    }

    // 5. THÊM DỰ ÁN MỚI (CREATE)
    function openCreateProjectModal() {
        showModal(
            "Tạo/Yêu cầu tham gia dự án mới",
            `
                <form id="projectCreateForm" class="modal-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Mã dự án (PRJ-xxx) *</label>
                            <input type="text" id="newId" class="form-control" placeholder="Ví dụ: PRJ-APP-06" required>
                        </div>
                        <div class="form-group">
                            <label>Phân loại *</label>
                            <input type="text" id="newCategory" class="form-control" placeholder="Ví dụ: Mobile / B2B" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Tên dự án *</label>
                        <input type="text" id="newTitle" class="form-control" placeholder="Nhập tên dự án..." required>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Vai trò của bạn *</label>
                            <select id="newRole" class="form-control">
                                <option value="lead">Lead UI/UX Designer</option>
                                <option value="member" selected>Product Designer (Core Member)</option>
                                <option value="reviewer">Design Reviewer</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Project Manager *</label>
                            <input type="text" id="newPmName" class="form-control" placeholder="Tên PM..." required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Mô tả ngắn nhiệm vụ</label>
                        <textarea id="newRoleDesc" class="form-control" rows="2" placeholder="Nhiệm vụ chính của bạn trong dự án này..."></textarea>
                    </div>
                </form>
            `,
            "Tạo dự án",
            function () {
                const id = document.getElementById("newId").value.trim().toUpperCase();
                const title = document.getElementById("newTitle").value.trim();
                const category = document.getElementById("newCategory").value.trim();
                const role = document.getElementById("newRole").value;
                const pmName = document.getElementById("newPmName").value.trim();
                const roleDesc = document.getElementById("newRoleDesc").value.trim() || "Thành viên thiết kế giao diện chính.";

                if (!id || !title || !category || !pmName) {
                    showToast("Vui lòng nhập đầy đủ các trường bắt buộc!", "error");
                    return;
                }

                if (projects.some(p => p.id === id)) {
                    showToast("Mã dự án đã tồn tại!", "error");
                    return;
                }

                const newPrj = {
                    id: id,
                    title: title,
                    status: "active",
                    statusText: "Vừa khởi tạo - Phase 1",
                    category: category,
                    role: role,
                    roleTitle: role === 'lead' ? 'Lead UI/UX Designer' : (role === 'member' ? 'Product Designer (Core Member)' : 'Design Reviewer'),
                    roleDesc: roleDesc,
                    overallProgress: 0,
                    sprintText: "Mới khởi tạo",
                    planText: "Target: Q4",
                    personalProgress: 0,
                    tasksDone: 0,
                    tasksTotal: 5,
                    activeTasksText: "Chưa có task",
                    dateRange: "Vừa tạo - 30/12/2025",
                    daysRemaining: "(Mới tạo)",
                    nextMilestone: "Khởi động dự án",
                    pmName: pmName,
                    pmEmail: `${pmName.toLowerCase().replace(/\s+/g, '.')}@enterprise.vn`,
                    pmAvatar: pmName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "PM",
                    teamCount: "5 thành viên",
                    platform: "Web & Mobile",
                    priority: "medium",
                    deadline: "20251231",
                    updated: Date.now(),
                    search: `${id} ${title} ${pmName} ${category}`
                };

                projects.unshift(newPrj);
                renderProjects();
                showToast(`Đã thêm dự án ${id} thành công!`, "add_circle");
            },
            true
        );
    }


    /* =====================================================
       MODAL CONTROLLER
    ===================================================== */

    function showModal(title, bodyHtml, confirmText = "Xác nhận", onConfirm = null, showConfirmButton = true, isDanger = false) {
        if (!modalOverlay || !modalTitle || !modalBody) return;

        modalTitle.textContent = title;
        modalBody.innerHTML = bodyHtml;

        if (modalConfirm) {
            if (showConfirmButton) {
                modalConfirm.style.display = "inline-flex";
                modalConfirm.textContent = confirmText;
                if (isDanger) {
                    modalConfirm.className = "danger-button";
                } else {
                    modalConfirm.className = "primary-button";
                }
            } else {
                modalConfirm.style.display = "none";
            }
        }

        currentModalConfirmHandler = onConfirm;
        modalOverlay.classList.add("show");
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove("show");
        currentModalConfirmHandler = null;
    }

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalCancel) modalCancel.addEventListener("click", closeModal);

    if (modalConfirm) {
        modalConfirm.addEventListener("click", function () {
            if (typeof currentModalConfirmHandler === "function") {
                currentModalConfirmHandler();
            }
            closeModal();
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", function (e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }


    /* =====================================================
       TOAST CONTROLLER
    ===================================================== */

    function showToast(message, iconName = "check_circle") {
        if (!toast || !toastMessage || !toastIcon) return;

        toastMessage.textContent = message;
        toastIcon.textContent = iconName;

        toast.classList.add("show");

        if (toastTimer) clearTimeout(toastTimer);

        toastTimer = setTimeout(function () {
            toast.classList.remove("show");
        }, 3000);
    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    function openSidebar() {
        if (!sidebar || !sidebarOverlay) return;
        sidebar.classList.add("open");
        sidebarOverlay.classList.add("show");
    }

    function closeSidebar() {
        if (!sidebar || !sidebarOverlay) return;
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("show");
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", function () {
            if (sidebar.classList.contains("open")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }


    /* =====================================================
       SIDEBAR NAVIGATION
    ===================================================== */

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(function (item) {
        item.addEventListener("click", function () {
            const path = item.dataset.path || "";

            if (path === "dang-xuat") {
                showModal(
                    "Đăng xuất",
                    "Bạn có muốn đăng xuất khỏi tài khoản Trần Thị Bình?",
                    "Đăng xuất",
                    function () {
                        showToast("Đã đăng xuất tài khoản.", "logout");
                    },
                    true,
                    true
                );
                return;
            }

            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");

            if (window.innerWidth <= 1024) {
                closeSidebar();
            }

            if (path !== "du-an-tham-gia") {
                showToast("Chuyển tới: " + item.textContent.trim(), "info");
            }
        });
    });


    /* =====================================================
       STATUS TABS
    ===================================================== */

    statusTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            statusTabs.forEach(b => b.classList.remove("active"));
            tab.classList.add("active");
            currentStatus = tab.dataset.status || "all";
            applyFilters();
        });
    });


    /* =====================================================
       VIEW SWITCHER (GRID / LIST)
    ===================================================== */

    viewButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            viewButtons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");

            currentView = button.dataset.view || "grid";

            if (currentView === "list") {
                projectGrid.classList.add("list-view");
            } else {
                projectGrid.classList.remove("list-view");
            }
        });
    });


    /* =====================================================
       SEARCH & FILTERS
    ===================================================== */

    if (projectSearch) {
        projectSearch.addEventListener("input", applyFilters);
    }

    if (globalSearch) {
        globalSearch.addEventListener("input", function () {
            const val = globalSearch.value.trim().toLowerCase();
            if (projectSearch) {
                projectSearch.value = val;
                applyFilters();
            }
        });
    }

    if (roleFilter) {
        roleFilter.addEventListener("change", applyFilters);
    }

    if (sortFilter) {
        sortFilter.addEventListener("change", applyFilters);
    }

    if (resetFilters) {
        resetFilters.addEventListener("click", function () {
            if (projectSearch) projectSearch.value = "";
            if (roleFilter) roleFilter.value = "";
            if (sortFilter) sortFilter.value = "recent";

            currentStatus = "active";
            statusTabs.forEach(tab => {
                if (tab.dataset.status === "active") tab.classList.add("active");
                else tab.classList.remove("active");
            });

            applyFilters();
            showToast("Đã làm mới bộ lọc.", "restart_alt");
        });
    }


    /* =====================================================
       APPLY FILTERS & SORT
    ===================================================== */

    function applyFilters() {
        const keyword = projectSearch ? projectSearch.value.trim().toLowerCase() : "";
        const role = roleFilter ? roleFilter.value : "";
        const cards = Array.from(document.querySelectorAll(".project-card"));

        cards.forEach(function (card) {
            const cardStatus = card.dataset.status || "";
            const cardRole = card.dataset.role || "";
            const searchableText = (card.dataset.search || "").toLowerCase();

            const statusMatch = currentStatus === "all" || cardStatus === currentStatus;
            const roleMatch = role === "" || cardRole === role;
            const searchMatch = keyword === "" || searchableText.includes(keyword);

            if (statusMatch && roleMatch && searchMatch) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });

        sortProjects();
        updateEmptyState();
    }


    /* =====================================================
       SORT PROJECTS
    ===================================================== */

    function sortProjects() {
        if (!projectGrid || !sortFilter) return;

        const sortType = sortFilter.value;
        const visibleCards = Array.from(projectGrid.querySelectorAll(".project-card:not(.hidden)"));

        visibleCards.sort(function (a, b) {
            if (sortType === "progress") {
                return Number(b.dataset.progress || 0) - Number(a.dataset.progress || 0);
            }
            if (sortType === "deadline") {
                return Number(a.dataset.deadline || 99999999) - Number(b.dataset.deadline || 99999999);
            }
            if (sortType === "priority") {
                const priorityOrder = { high: 1, medium: 2, low: 3 };
                return (priorityOrder[a.dataset.priority] || 99) - (priorityOrder[b.dataset.priority] || 99);
            }
            return Number(b.dataset.updated || 0) - Number(a.dataset.updated || 0);
        });

        visibleCards.forEach(card => projectGrid.appendChild(card));
    }


    /* =====================================================
       EMPTY STATE
    ===================================================== */

    function updateEmptyState() {
        const existingEmpty = document.getElementById("projectEmptyState");
        const visibleCards = document.querySelectorAll(".project-card:not(.hidden)");

        if (visibleCards.length === 0) {
            if (existingEmpty) return;

            const emptyState = document.createElement("div");
            emptyState.id = "projectEmptyState";
            emptyState.className = "project-empty-state";
            emptyState.innerHTML = `
                <div class="empty-icon">
                    <span class="material-symbols-outlined">search_off</span>
                </div>
                <h3>Không tìm thấy dự án nào</h3>
                <p>Không có dự án nào phù hợp với điều kiện tìm kiếm/lọc hiện tại.</p>
                <button type="button" id="emptyResetButton">Làm mới bộ lọc</button>
            `;

            projectGrid.appendChild(emptyState);

            const emptyResetButton = document.getElementById("emptyResetButton");
            if (emptyResetButton) {
                emptyResetButton.addEventListener("click", function () {
                    if (resetFilters) resetFilters.click();
                });
            }
        } else if (existingEmpty) {
            existingEmpty.remove();
        }
    }


    /* =====================================================
       TOPBAR BUTTON EVENTS
    ===================================================== */

    if (requestProjectButton) {
        requestProjectButton.addEventListener("click", openCreateProjectModal);
    }

    if (exportButton) {
        exportButton.addEventListener("click", function () {
            showToast("Đã xuất báo cáo danh sách dự án (PDF/Excel)!", "file_download");
        });
    }

    if (quickReportButton) {
        quickReportButton.addEventListener("click", function () {
            showToast("Đã mở mẫu báo cáo nhanh tiến độ công việc.", "add");
        });
    }

    if (helpButton) {
        helpButton.addEventListener("click", function () {
            showToast("Đang kết nối Trung tâm hỗ trợ...", "help");
        });
    }

    if (notificationButton) {
        notificationButton.addEventListener("click", function () {
            showToast("Bạn có 3 thông báo dự án mới chưa đọc.", "notifications");
        });
    }


    /* =====================================================
       INITIAL RUN
    ===================================================== */

    renderProjects();

});