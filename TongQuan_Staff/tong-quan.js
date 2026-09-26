/* =========================================================
   TỔNG QUAN - NHÂN VIÊN DỰ ÁN
   Không sử dụng thư viện JavaScript bên ngoài
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initSidebarNavigation();
    initTaskTabs();
    initTaskCheckboxes();
    initTaskButtons();
    initGlobalSearch();
    initHeaderButtons();
    initScheduleButton();
    initNotificationLinks();
    initResourceLinks();

});


/* =========================================================
   TOAST
========================================================= */

function showToast(message, type = "success") {

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    const toastIcon = document.getElementById("toastIcon");

    if (!toast || !toastMessage || !toastIcon) {
        return;
    }

    toastMessage.textContent = message;

    if (type === "error") {

        toastIcon.textContent = "error";
        toastIcon.style.color = "#fca5a5";

    } else if (type === "info") {

        toastIcon.textContent = "info";
        toastIcon.style.color = "#93c5fd";

    } else {

        toastIcon.textContent = "check_circle";
        toastIcon.style.color = "#86efac";

    }

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2800);
}


/* =========================================================
   SIDEBAR NAVIGATION
========================================================= */

function initSidebarNavigation() {

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(function (item) {

        item.addEventListener("click", function (event) {


            const path = item.dataset.path;

            if (path === "dang-xuat") {

                const confirmed = confirm(
                    "Bạn có chắc chắn muốn đăng xuất không?"
                );

                if (confirmed) {

                    showToast(
                        "Đã thực hiện đăng xuất.",
                        "info"
                    );

                }

                return;
            }

            navItems.forEach(function (nav) {
                nav.classList.remove("active");
            });

            item.classList.add("active");

            if (path !== "tong-quan-cua-toi") {

                showToast(
                    "Đã chọn: " + item.innerText.trim(),
                    "info"
                );

            }

        });

    });

}


/* =========================================================
   TASK TABS
========================================================= */

function initTaskTabs() {

    const tabs = document.querySelectorAll(".task-tab");
    const tasks = document.querySelectorAll(".task-card");

    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            tabs.forEach(function (item) {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            const filter = tab.dataset.filter;

            tasks.forEach(function (task) {

                const status = task.dataset.status;

                if (filter === "all") {

                    task.classList.remove("hidden");

                } else if (filter === status) {

                    task.classList.remove("hidden");

                } else if (
                    filter === "done" &&
                    task.dataset.done === "true"
                ) {

                    task.classList.remove("hidden");

                } else {

                    task.classList.add("hidden");

                }

            });

        });

    });

}


/* =========================================================
   TASK CHECKBOX
========================================================= */

function initTaskCheckboxes() {

    const checkboxes = document.querySelectorAll(
        ".task-checkbox input"
    );

    checkboxes.forEach(function (checkbox) {

        checkbox.addEventListener("change", function () {

            const task = checkbox.closest(".task-card");

            if (!task) {
                return;
            }

            const title = task.querySelector("h3");

            if (checkbox.checked) {

                task.dataset.done = "true";

                if (title) {

                    title.style.textDecoration = "line-through";
                    title.style.opacity = "0.55";

                }

                showToast(
                    "Đã đánh dấu nhiệm vụ hoàn thành."
                );

            } else {

                task.dataset.done = "false";

                if (title) {

                    title.style.textDecoration = "none";
                    title.style.opacity = "1";

                }

                showToast(
                    "Đã bỏ đánh dấu hoàn thành.",
                    "info"
                );

            }

        });

    });

}


/* =========================================================
   TASK BUTTONS
========================================================= */

function initTaskButtons() {

    const reviewButtons = document.querySelectorAll(
        ".review-btn"
    );

    reviewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const task = button.closest(".task-card");

            const title = task
                ? task.querySelector("h3")
                : null;

            const taskName = title
                ? title.textContent.trim()
                : "nhiệm vụ";

            showToast(
                "Đã gửi \"" + taskName + "\" để Review."
            );

        });

    });


    const continueButtons = document.querySelectorAll(
        ".continue-btn"
    );

    continueButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            showToast(
                "Đang mở nhiệm vụ để tiếp tục làm.",
                "info"
            );

        });

    });


    const qaButtons = document.querySelectorAll(
        ".qa-btn"
    );

    qaButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            showToast(
                "Đang mở chi tiết Design QA.",
                "info"
            );

        });

    });


    const moreButtons = document.querySelectorAll(
        ".more-btn"
    );

    moreButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            showToast(
                "Đã mở tùy chọn nhiệm vụ.",
                "info"
            );

        });

    });

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

function initGlobalSearch() {

    const search = document.getElementById(
        "globalSearch"
    );

    if (!search) {
        return;
    }

    search.addEventListener("input", function () {

        const keyword = search.value
            .trim()
            .toLowerCase();

        const tasks = document.querySelectorAll(
            ".task-card"
        );

        if (!keyword) {

            tasks.forEach(function (task) {
                task.classList.remove("hidden");
            });

            return;
        }

        tasks.forEach(function (task) {

            const title = task.dataset.title
                ? task.dataset.title.toLowerCase()
                : "";

            const content = task.textContent
                .toLowerCase();

            if (
                title.includes(keyword) ||
                content.includes(keyword)
            ) {

                task.classList.remove("hidden");

            } else {

                task.classList.add("hidden");

            }

        });

    });

}


/* =========================================================
   HEADER BUTTONS
========================================================= */

function initHeaderButtons() {

    const quickReportBtn =
        document.getElementById("quickReportBtn");

    if (quickReportBtn) {

        quickReportBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Đang mở biểu mẫu báo cáo nhanh.",
                    "info"
                );

            }
        );

    }


    const helpBtn =
        document.getElementById("helpBtn");

    if (helpBtn) {

        helpBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Khu vực trợ giúp đang được mở.",
                    "info"
                );

            }
        );

    }


    const notificationBtn =
        document.getElementById("notificationBtn");

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Bạn có 3 thông báo mới.",
                    "info"
                );

            }
        );

    }


    const exportBtn =
        document.getElementById("exportReportBtn");

    if (exportBtn) {

        exportBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Đang chuẩn bị báo cáo cá nhân.",
                    "info"
                );

            }
        );

    }


    const workLogBtn =
        document.getElementById("workLogBtn");

    if (workLogBtn) {

        workLogBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Đang mở chức năng Log giờ làm.",
                    "info"
                );

            }
        );

    }

}


/* =========================================================
   SCHEDULE
========================================================= */

function initScheduleButton() {

    const button =
        document.getElementById("addScheduleBtn");

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        function () {

            showToast(
                "Đang mở biểu mẫu thêm lịch hẹn / xin vắng mặt.",
                "info"
            );

        }
    );

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function initNotificationLinks() {

    const link =
        document.getElementById("allNotifications");

    if (link) {

        link.addEventListener(
            "click",
            function (event) {

                showToast(
                    "Đang mở danh sách tất cả thông báo.",
                    "info"
                );

            }
        );

    }


    const viewAllTasks =
        document.getElementById("viewAllTasks");

    if (viewAllTasks) {

        viewAllTasks.addEventListener(
            "click",
            function (event) {


                showToast(
                    "Đang mở toàn bộ 12 nhiệm vụ được giao.",
                    "info"
                );

            }
        );

    }

}


/* =========================================================
   RESOURCE LINKS
========================================================= */

function initResourceLinks() {

    const resourceItems =
        document.querySelectorAll(".resource-item");

    resourceItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function (event) {

              

                const title =
                    item.querySelector("strong");

                const name = title
                    ? title.textContent.trim()
                    : "tài nguyên";

                showToast(
                    "Đang mở " + name + ".",
                    "info"
                );

            }
        );

    });

}


/* =========================================================
   PROJECT LINKS
========================================================= */

document.addEventListener("click", function (event) {

    const projectLink =
        event.target.closest(".project-footer a");

    if (!projectLink) {
        return;
    }


    showToast(
        "Đang mở thông tin dự án.",
        "info"
    );

});


/* =========================================================
   RESPONSIVE SIDEBAR
========================================================= */

function createMobileMenuButton() {

    if (window.innerWidth > 700) {
        return;
    }

    if (document.getElementById("mobileMenuButton")) {
        return;
    }

    const button =
        document.createElement("button");

    button.id = "mobileMenuButton";
    button.className = "mobile-menu-button";

    button.innerHTML =
        '<span class="material-symbols-outlined">menu</span>';

    document.body.appendChild(button);

    button.addEventListener(
        "click",
        function () {

            const sidebar =
                document.querySelector(".sidebar");

            if (sidebar) {
                sidebar.classList.toggle(
                    "mobile-open"
                );
            }

        }
    );

}


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener("resize", function () {

    if (window.innerWidth <= 700) {

        createMobileMenuButton();

    }

});


/* =========================================================
   INITIAL MOBILE MENU
========================================================= */

createMobileMenuButton();