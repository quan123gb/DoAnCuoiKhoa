/* =========================================================
   TIẾN ĐỘ DỰ ÁN
   JAVASCRIPT THUẦN - KHÔNG SỬ DỤNG TAILWIND
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

    const menuItems = document.querySelectorAll(".menu-item");

    const viewButtons = document.querySelectorAll(".view-btn");

    const overviewView = document.getElementById("overviewView");
    const kanbanView = document.getElementById("kanbanView");
    const ganttView = document.getElementById("ganttView");

    const projectSearch = document.getElementById("projectSearch");
    const globalSearch = document.getElementById("globalSearch");

    const projectFilter = document.getElementById("projectFilter");
    const statusFilter = document.getElementById("statusFilter");
    const timeFilter = document.getElementById("timeFilter");

    const resetFilter = document.getElementById("resetFilter");
    const applyFilter = document.getElementById("applyFilter");

    const exportBtn = document.getElementById("exportBtn");

    const viewAllProjects = document.getElementById("viewAllProjects");

    const resourceBtn = document.getElementById("resourceBtn");
    const riskDetailBtn = document.getElementById("riskDetailBtn");

    const kanbanFilterBtn = document.getElementById("kanbanFilterBtn");
    const addMilestoneBtn = document.getElementById("addMilestoneBtn");

    const todayGanttBtn = document.getElementById("todayGanttBtn");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    const toastIcon = document.getElementById("toastIcon");

    const resourceModal = document.getElementById("resourceModal");
    const closeResourceModal = document.getElementById("closeResourceModal");
    const cancelResourceModal = document.getElementById("cancelResourceModal");
    const resourceForm = document.getElementById("resourceForm");


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer = null;

    function showToast(message, icon = "check_circle") {

        if (!toast || !toastMessage) {
            return;
        }

        toastMessage.textContent = message;

        if (toastIcon) {
            toastIcon.textContent = icon;
        }

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function () {
            toast.classList.remove("show");
        }, 2800);
    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    function openMobileSidebar() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.add("mobile-open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("show");
        }

        document.body.style.overflow = "hidden";
    }


    function closeMobileSidebar() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.remove("mobile-open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("show");
        }

        document.body.style.overflow = "";
    }


    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", function () {

            if (sidebar.classList.contains("mobile-open")) {
                closeMobileSidebar();
            } else {
                openMobileSidebar();
            }

        });
    }


    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeMobileSidebar);
    }


    /* =====================================================
       SIDEBAR NAVIGATION
    ===================================================== */

    menuItems.forEach(function (item) {

        item.addEventListener("click", function (event) {

            menuItems.forEach(function (menu) {
                menu.classList.remove("active");
                menu.removeAttribute("aria-current");
            });

            item.classList.add("active");
            item.setAttribute("aria-current", "page");

            const path = item.dataset.path;

            if (path !== "tien-do-du-an") {

                showToast(
                    "Đã chọn chức năng: " +
                    item.querySelector(".menu-left, span:last-child")?.textContent.trim(),
                    "open_in_new"
                );

            }

            closeMobileSidebar();

        });

    });


    /* =====================================================
       VIEW SWITCHER
    ===================================================== */

    function switchView(view) {

        viewButtons.forEach(function (button) {
            button.classList.remove("active");
        });

        const activeButton = document.querySelector(
            '.view-btn[data-view="' + view + '"]'
        );

        if (activeButton) {
            activeButton.classList.add("active");
        }

        if (overviewView) {
            overviewView.classList.remove("active");
        }

        if (kanbanView) {
            kanbanView.classList.remove("active");
        }

        if (ganttView) {
            ganttView.classList.remove("active");
        }

        if (view === "overview" && overviewView) {

            overviewView.classList.add("active");

        } else if (view === "kanban" && kanbanView) {

            kanbanView.classList.add("active");

        } else if (view === "gantt" && ganttView) {

            ganttView.classList.add("active");

        }

    }


    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const view = button.dataset.view;

            switchView(view);

            if (view === "overview") {
                showToast("Đang hiển thị Tổng quan & Biểu đồ");
            }

            if (view === "kanban") {
                showToast("Đang hiển thị Kanban tiến độ");
            }

            if (view === "gantt") {
                showToast("Đang hiển thị biểu đồ Gantt");
            }

        });

    });


    /* =====================================================
       PROJECT DATA
    ===================================================== */

    const projectCards = Array.from(
        document.querySelectorAll(".project-progress")
    );


    /* =====================================================
       SEARCH PROJECT
    ===================================================== */

    function normalizeText(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d");

    }


    function filterProjects(showMessage = false) {

        const searchValue = normalizeText(
            projectSearch ? projectSearch.value.trim() : ""
        );

        const selectedProject =
            projectFilter ? projectFilter.value : "all";

        const selectedStatus =
            statusFilter ? statusFilter.value : "all";

        let visibleCount = 0;

        projectCards.forEach(function (card) {

            const projectCode =
                card.dataset.project || "";

            const projectStatus =
                card.dataset.status || "";

            const cardText =
                normalizeText(card.textContent);

            const matchesSearch =
                !searchValue ||
                cardText.includes(searchValue);

            const matchesProject =
                selectedProject === "all" ||
                projectCode === selectedProject;

            const matchesStatus =
                selectedStatus === "all" ||
                projectStatus === selectedStatus;

            const visible =
                matchesSearch &&
                matchesProject &&
                matchesStatus;

            if (visible) {

                card.classList.remove("hidden");
                visibleCount++;

            } else {

                card.classList.add("hidden");

            }

        });


        if (showMessage) {

            showToast(
                "Đã lọc dữ liệu: " + visibleCount + " dự án phù hợp",
                "filter_alt"
            );

        }

    }


    if (projectSearch) {

        projectSearch.addEventListener("input", function () {
            filterProjects(false);
        });

    }


    /* =====================================================
       GLOBAL SEARCH
    ===================================================== */

    if (globalSearch) {

        globalSearch.addEventListener("keydown", function (event) {

            if (event.key !== "Enter") {
                return;
            }

            const keyword = globalSearch.value.trim();

            if (!keyword) {

                showToast(
                    "Vui lòng nhập nội dung cần tìm kiếm",
                    "search"
                );

                return;
            }

            if (projectSearch) {
                projectSearch.value = keyword;
            }

            filterProjects(true);

        });

    }


    /* =====================================================
       APPLY FILTER
    ===================================================== */

    if (applyFilter) {

        applyFilter.addEventListener("click", function () {

            filterProjects(true);

            if (timeFilter) {

                const selectedText =
                    timeFilter.options[
                        timeFilter.selectedIndex
                    ].textContent;

                showToast(
                    "Đã áp dụng bộ lọc: " + selectedText,
                    "filter_list"
                );

            }

        });

    }


    /* =====================================================
       RESET FILTER
    ===================================================== */

    if (resetFilter) {

        resetFilter.addEventListener("click", function () {

            if (projectSearch) {
                projectSearch.value = "";
            }

            if (projectFilter) {
                projectFilter.value = "all";
            }

            if (statusFilter) {
                statusFilter.value = "all";
            }

            if (timeFilter) {
                timeFilter.value = "q2";
            }

            projectCards.forEach(function (card) {
                card.classList.remove("hidden");
            });

            showToast(
                "Đã đặt lại toàn bộ bộ lọc",
                "restart_alt"
            );

        });

    }


    /* =====================================================
       EXPORT REPORT
    ===================================================== */

    if (exportBtn) {

        exportBtn.addEventListener("click", function () {

            const originalText = exportBtn.innerHTML;

            exportBtn.disabled = true;

            exportBtn.innerHTML = `
                <span class="material-symbols-outlined">
                    progress_activity
                </span>
                <span>Đang chuẩn bị...</span>
            `;

            setTimeout(function () {

                exportBtn.disabled = false;
                exportBtn.innerHTML = originalText;

                showToast(
                    "Báo cáo đã sẵn sàng. Chọn chức năng in để lưu PDF.",
                    "download"
                );

                setTimeout(function () {

                    window.print();

                }, 500);

            }, 900);

        });

    }


    /* =====================================================
       VIEW ALL PROJECTS
    ===================================================== */

    if (viewAllProjects) {

        viewAllProjects.addEventListener("click", function () {

            if (projectSearch) {
                projectSearch.value = "";
            }

            if (projectFilter) {
                projectFilter.value = "all";
            }

            if (statusFilter) {
                statusFilter.value = "all";
            }

            projectCards.forEach(function (card) {
                card.classList.remove("hidden");
            });

            showToast(
                "Đã hiển thị danh mục dự án đầy đủ",
                "folder_open"
            );

            const filterToolbar =
                document.querySelector(".filter-toolbar");

            if (filterToolbar) {

                filterToolbar.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        });

    }


    /* =====================================================
       RISK ACTIONS & MODAL ĐIỀU PHỐI NGUỒN LỰC
    ===================================================== */

    function openResourceModal() {
        if (resourceModal) {
            resourceModal.classList.add("show");
        }
    }

    function closeResourceModalFunc() {
        if (resourceModal) {
            resourceModal.classList.remove("show");
        }
    }

    if (resourceBtn) {

        resourceBtn.addEventListener("click", function () {
            openResourceModal();
        });

    }

    if (closeResourceModal) {
        closeResourceModal.addEventListener("click", closeResourceModalFunc);
    }

    if (cancelResourceModal) {
        cancelResourceModal.addEventListener("click", closeResourceModalFunc);
    }

    if (resourceModal) {
        resourceModal.addEventListener("click", function (e) {
            if (e.target === resourceModal) {
                closeResourceModalFunc();
            }
        });
    }

    if (resourceForm) {
        resourceForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const assigneeSelect = document.getElementById("assigneeSelect");
            const assigneeName = assigneeSelect ? assigneeSelect.options[assigneeSelect.selectedIndex].text.split("(")[0].trim() : "Nhân sự";

            closeResourceModalFunc();

            showToast(
                "Đã điều phối " + assigneeName + " sang PRJ-EDU-04 thành công!",
                "verified"
            );

            // Cập nhật trạng thái hiển thị của thẻ cảnh báo
            const riskCard = document.querySelector(".risk-card");
            if (riskCard) {
                const titleSpan = riskCard.querySelector(".risk-title span");
                const titleSmall = riskCard.querySelector(".risk-title small");
                if (titleSpan) {
                    titleSpan.textContent = "Đã điều phối nhân sự";
                    titleSpan.style.color = "var(--success)";
                }
                if (titleSmall) {
                    titleSmall.textContent = "Đang xử lý";
                    titleSmall.style.color = "var(--success)";
                }
            }
        });
    }


    if (riskDetailBtn) {

        riskDetailBtn.addEventListener("click", function () {

            showToast(
                "Đang mở chi tiết cảnh báo PRJ-EDU-04",
                "report_problem"
            );

        });

    }


    /* =====================================================
       KANBAN FILTER
    ===================================================== */

    if (kanbanFilterBtn) {

        kanbanFilterBtn.addEventListener("click", function () {

            const columns =
                document.querySelectorAll(".kanban-column");

            columns.forEach(function (column) {

                column.style.transition = "box-shadow 0.2s";

                column.style.boxShadow =
                    "0 0 0 2px rgba(37, 99, 235, 0.18)";

            });

            showToast(
                "Đã bật chế độ lọc thẻ Kanban",
                "filter_alt"
            );

            setTimeout(function () {

                columns.forEach(function (column) {
                    column.style.boxShadow = "";
                });

            }, 1200);

        });

    }


    /* =====================================================
       ADD MILESTONE
    ===================================================== */

    if (addMilestoneBtn) {

        addMilestoneBtn.addEventListener("click", function () {

            showToast(
                "Đã mở biểu mẫu thêm mốc công việc mới",
                "add"
            );

        });

    }


    /* =====================================================
       ADD KANBAN CARD
    ===================================================== */

    const addCardButtons =
        document.querySelectorAll(".add-card-btn");

    addCardButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            showToast(
                "Đã mở chức năng thêm thẻ Kanban",
                "add_task"
            );

        });

    });


    /* =====================================================
       KANBAN CARD CLICK
    ===================================================== */

    const kanbanCards =
        document.querySelectorAll(".kanban-card");

    kanbanCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const title =
                card.querySelector("h4");

            if (title) {

                showToast(
                    "Đã chọn: " + title.textContent.trim(),
                    "task_alt"
                );

            }

        });

    });


    /* =====================================================
       GANTT TODAY
    ===================================================== */

    if (todayGanttBtn) {

        todayGanttBtn.addEventListener("click", function () {

            showToast(
                "Đã đưa khung thời gian Gantt về mốc hiện tại",
                "today"
            );

        });

    }


    /* =====================================================
       TOP USER
    ===================================================== */

    const topUserBtn =
        document.getElementById("topUserBtn");

    if (topUserBtn) {

        topUserBtn.addEventListener("click", function () {

            showToast(
                "Tài khoản: Nguyễn Văn An - Quản trị hệ thống",
                "person"
            );

        });

    }


    /* =====================================================
       TOP ICON BUTTONS
    ===================================================== */

    const helpButton =
        document.querySelector(
            '.top-icon-btn[title="Trợ giúp"]'
        );

    if (helpButton) {

        helpButton.addEventListener("click", function () {

            showToast(
                "Đang mở trung tâm trợ giúp",
                "help"
            );

        });

    }


    const notificationButton =
        document.querySelector(
            '.top-icon-btn[title="Thông báo hệ thống"]'
        );

    if (notificationButton) {

        notificationButton.addEventListener("click", function () {

            showToast(
                "Bạn có 1 thông báo mới về PRJ-EDU-04",
                "notifications"
            );

        });

    }


    /* =====================================================
       BREADCRUMB
    ===================================================== */

    const breadcrumbLinks =
        document.querySelectorAll(".breadcrumb-link");

    breadcrumbLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            showToast(
                "Đã chọn: " + link.textContent.trim(),
                "navigate_before"
            );

        });

    });


    /* =====================================================
       SELECT CHANGE
    ===================================================== */

    [projectFilter, statusFilter].forEach(function (select) {
        if (select) {
            select.addEventListener("change", function () {
                filterProjects(false);
            });
        }
    });

});