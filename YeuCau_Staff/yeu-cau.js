/* =========================================================
   HO-TRO.JS
   Project Management System - Phân hệ Nhân viên
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

    const ticketRows = document.querySelectorAll(".ticket-row");
    const ticketTableBody = document.getElementById("ticketTableBody");

    const ticketSearch = document.getElementById("ticketSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const priorityFilter = document.getElementById("priorityFilter");
    const projectFilter = document.getElementById("projectFilter");

    const refreshBtn = document.getElementById("refreshBtn");

    const ticketTabs = document.querySelectorAll(".ticket-tab");

    const feedbackInput = document.getElementById("feedbackInput");

    const closeTicketBtn =
        document.getElementById("closeTicketBtn");

    const requestMoreBtn =
        document.getElementById("requestMoreBtn");

    const attachBtn =
        document.getElementById("attachBtn");

    const quickReportBtn =
        document.getElementById("quickReportBtn");

    const newTicketBtn =
        document.getElementById("newTicketBtn");

    const newTicketModal =
        document.getElementById("newTicketModal");

    const newTicketForm =
        document.getElementById("newTicketForm");

    const faqBtn =
        document.getElementById("faqBtn");

    const historyBtn =
        document.getElementById("historyBtn");

    const helpBtn =
        document.getElementById("helpBtn");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const globalSearch =
        document.getElementById("globalSearch");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    const toastIcon =
        document.getElementById("toastIcon");


    /* =====================================================
       DATA
    ====================================================== */

    const ticketData = {

        "TK-2025-089": {

            title:
                "Nâng cấp Figma Enterprise & cấp 2 editor seats Sprint 4",

            detailTitle:
                "Nâng cấp Figma Enterprise & cấp 2 editor seats Sprint 4",

            project:
                "PRJ-ECOMM-01",

            category:
                "License & Bản quyền",

            priority:
                "P1 - Khẩn cấp",

            status:
                "Đang xử lý",

            technician:
                "Lê H. Nam (IT Helpdesk)",

            sla:
                "Còn 1h 45m"

        },

        "TK-2025-084": {

            title:
                "Lỗi timeout Webhook Sandbox MoMo/VNPAY staging",

            detailTitle:
                "Lỗi không kết nối được Webhook Sandbox MoMo/VNPAY môi trường staging",

            project:
                "PRJ-ECOMM-01",

            category:
                "Vướng mắc kỹ thuật",

            priority:
                "P2 - Mức cao",

            status:
                "Chờ bạn phản hồi",

            technician:
                "Đặng Minh Tuấn (DevOps)",

            sla:
                "Còn 4h 30m"

        },

        "TK-2025-078": {

            title:
                'Đề nghị cấp màn hình rời Dell UltraSharp 27" 4K test UI',

            detailTitle:
                'Đề nghị cấp màn hình rời Dell UltraSharp 27" 4K test UI',

            project:
                "Nội bộ công ty",

            category:
                "Thiết bị phần cứng",

            priority:
                "P3 - Trung bình",

            status:
                "Đã duyệt mua sắm",

            technician:
                "Nguyễn T. Hà (Hành chính IT)",

            sla:
                "Hạn 22/06"

        },

        "TK-2025-065": {

            title:
                "Cấp quyền GitHub Repo Design-Tokens và PRJ-HRM-02",

            detailTitle:
                "Cấp quyền GitHub Repo Design-Tokens và PRJ-HRM-02",

            project:
                "PRJ-HRM-02",

            category:
                "Cấp quyền truy cập",

            priority:
                "P2 - Cao",

            status:
                "Đã hoàn thành",

            technician:
                "Đỗ Q. Hùng (DevOps Eng)",

            sla:
                "Đã xong (5★)"

        }

    };


    /* =====================================================
       TOAST
    ====================================================== */

    let toastTimer = null;

    function showToast(message, type = "success") {

        if (!toast || !toastMessage) {
            return;
        }

        clearTimeout(toastTimer);

        toastMessage.textContent = message;

        if (toastIcon) {

            if (type === "error") {

                toastIcon.textContent = "error";
                toastIcon.style.color = "#f87171";

            } else if (type === "warning") {

                toastIcon.textContent =
                    "warning";

                toastIcon.style.color =
                    "#fbbf24";

            } else {

                toastIcon.textContent =
                    "check_circle";

                toastIcon.style.color =
                    "#4ade80";
            }

        }

        toast.classList.add("show");

        toastTimer = setTimeout(function () {

            toast.classList.remove("show");

        }, 3000);
    }


    /* =====================================================
       SIDEBAR MOBILE
    ====================================================== */

    function openSidebar() {

        sidebar.classList.add("open");
        sidebarOverlay.classList.add("show");
        document.body.classList.add("no-scroll");

    }


    function closeSidebar() {

        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("show");
        document.body.classList.remove("no-scroll");

    }


    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener(
            "click",
            openSidebar
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =====================================================
       SIDEBAR ACTIVE MENU
    ====================================================== */

    const sidebarLinks =
        document.querySelectorAll(".sidebar .menu-link");

    sidebarLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

          

            const path =
                link.dataset.path;

            if (path === "dang-xuat") {

                const confirmLogout =
                    window.confirm(
                        "Bạn có chắc muốn đăng xuất không?"
                    );

                if (confirmLogout) {

                    showToast(
                        "Đã thực hiện đăng xuất.",
                        "success"
                    );

                }

                return;
            }

            sidebarLinks.forEach(function (item) {

                item.classList.remove("active");

            });

            link.classList.add("active");

            if (window.innerWidth <= 900) {
                closeSidebar();
            }

            showToast(
                "Đã chọn: " +
                link.textContent.trim(),
                "success"
            );

        });

    });


    /* =====================================================
       SELECT TICKET
    ====================================================== */

    function selectTicket(ticketId) {

        const data =
            ticketData[ticketId];

        if (!data) {
            return;
        }

        ticketRows.forEach(function (row) {

            row.classList.remove("selected");

        });

        const selectedRow =
            document.querySelector(
                '.ticket-row[data-id="' +
                ticketId +
                '"]'
            );

        if (selectedRow) {

            selectedRow.classList.add("selected");

        }

        updateDetailPanel(data);

    }


    function updateDetailPanel(data) {

        const detailTitle =
            document.getElementById("detailTitle");

        const detailCode =
            document.querySelector(".detail-code");

        const detailPriority =
            document.querySelector(".detail-priority");

        const detailFeedback =
            document.querySelector(".detail-feedback");

        const detailInfo =
            document.querySelectorAll(
                ".detail-info-grid strong"
            );

        if (detailTitle) {

            detailTitle.textContent =
                data.detailTitle;

        }

        if (detailCode) {

            const id =
                Object.keys(ticketData)
                    .find(function (key) {

                        return ticketData[key] === data;

                    });

            if (id) {
                detailCode.textContent = id;
            }

        }

        if (detailPriority) {

            detailPriority.textContent =
                data.priority;

        }

        if (detailFeedback) {

            detailFeedback.textContent =
                data.status;

        }

        if (detailInfo.length >= 4) {

            detailInfo[1].textContent =
                data.technician;

            detailInfo[2].textContent =
                data.project;

            detailInfo[3].textContent =
                data.sla;

        }

    }


    ticketRows.forEach(function (row) {

        row.addEventListener("click", function () {

            const ticketId =
                row.dataset.id;

            selectTicket(ticketId);

        });

    });


    /* =====================================================
       VIEW BUTTONS
    ====================================================== */

    const viewButtons =
        document.querySelectorAll(".view-ticket");

    viewButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            const ticketId =
                button.dataset.ticket;

            selectTicket(ticketId);

            const detailCard =
                document.querySelector(
                    ".ticket-detail-card"
                );

            if (
                window.innerWidth <= 1100 &&
                detailCard
            ) {

                detailCard.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       FILTER
    ====================================================== */

    function filterTickets() {

        const keyword =
            ticketSearch.value
                .trim()
                .toLowerCase();

        const category =
            categoryFilter.value;

        const priority =
            priorityFilter.value;

        const project =
            projectFilter.value;

        let visibleCount = 0;


        ticketRows.forEach(function (row) {

            const id =
                row.dataset.id.toLowerCase();

            const title =
                row
                    .querySelector(".ticket-title")
                    ?.textContent
                    .toLowerCase() || "";

            const rowText =
                row.textContent.toLowerCase();

            const rowCategory =
                row.dataset.category;

            const rowPriority =
                row.dataset.priority;

            const rowProject =
                row.dataset.project;


            const matchesKeyword =
                !keyword ||
                id.includes(keyword) ||
                title.includes(keyword) ||
                rowText.includes(keyword);

            const matchesCategory =
                !category ||
                rowCategory === category;

            const matchesPriority =
                !priority ||
                rowPriority === priority;

            const matchesProject =
                !project ||
                rowProject === project;


            const visible =
                matchesKeyword &&
                matchesCategory &&
                matchesPriority &&
                matchesProject;


            row.style.display =
                visible ? "" : "none";


            if (visible) {
                visibleCount++;
            }

        });


        updateEmptyState(visibleCount);

    }


    function updateEmptyState(count) {

        const oldEmpty =
            document.querySelector(".no-result-row");

        if (oldEmpty) {
            oldEmpty.remove();
        }

        if (count === 0) {

            const row =
                document.createElement("tr");

            row.className =
                "no-result-row";

            row.innerHTML = `
                <td colspan="7">
                    <div class="empty-state">
                        <span class="material-symbols-outlined">
                            search_off
                        </span>

                        <strong>
                            Không tìm thấy yêu cầu hỗ trợ
                        </strong>

                        <span>
                            Hãy thử thay đổi từ khóa hoặc bộ lọc.
                        </span>
                    </div>
                </td>
            `;

            ticketTableBody.appendChild(row);

        }

    }


    if (ticketSearch) {

        ticketSearch.addEventListener(
            "input",
            filterTickets
        );

    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterTickets
        );

    }


    if (priorityFilter) {

        priorityFilter.addEventListener(
            "change",
            filterTickets
        );

    }


    if (projectFilter) {

        projectFilter.addEventListener(
            "change",
            filterTickets
        );

    }


    /* =====================================================
       TABS
    ====================================================== */

    ticketTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            ticketTabs.forEach(function (item) {

                item.classList.remove("active");

            });

            tab.classList.add("active");

            const tabType =
                tab.dataset.tab;

            ticketRows.forEach(function (row) {

                const status =
                    row.dataset.status;

                let visible = true;

                if (tabType === "all") {

                    visible = true;

                } else if (tabType === "processing") {

                    visible =
                        status === "processing" ||
                        status === "feedback";

                } else if (tabType === "feedback") {

                    visible =
                        status === "feedback";

                } else if (tabType === "completed") {

                    visible =
                        status === "completed";

                } else if (tabType === "draft") {

                    visible = false;

                }

                row.dataset.tabVisible =
                    visible ? "true" : "false";

            });

            applyAllFilters();

        });

    });


    function applyAllFilters() {

        const activeTab =
            document.querySelector(
                ".ticket-tab.active"
            );

        const tabType =
            activeTab
                ? activeTab.dataset.tab
                : "processing";

        const keyword =
            ticketSearch.value
                .trim()
                .toLowerCase();

        const category =
            categoryFilter.value;

        const priority =
            priorityFilter.value;

        const project =
            projectFilter.value;

        let visibleCount = 0;


        ticketRows.forEach(function (row) {

            const id =
                row.dataset.id.toLowerCase();

            const title =
                row
                    .querySelector(".ticket-title")
                    ?.textContent
                    .toLowerCase() || "";

            const rowText =
                row.textContent.toLowerCase();

            const matchesKeyword =
                !keyword ||
                id.includes(keyword) ||
                title.includes(keyword) ||
                rowText.includes(keyword);

            const matchesCategory =
                !category ||
                row.dataset.category === category;

            const matchesPriority =
                !priority ||
                row.dataset.priority === priority;

            const matchesProject =
                !project ||
                row.dataset.project === project;


            let matchesTab = true;

            if (tabType === "all") {

                matchesTab = true;

            } else if (tabType === "processing") {

                matchesTab =
                    row.dataset.status === "processing" ||
                    row.dataset.status === "feedback";

            } else if (tabType === "feedback") {

                matchesTab =
                    row.dataset.status === "feedback";

            } else if (tabType === "completed") {

                matchesTab =
                    row.dataset.status === "completed";

            } else if (tabType === "draft") {

                matchesTab = false;

            }


            const visible =
                matchesKeyword &&
                matchesCategory &&
                matchesPriority &&
                matchesProject &&
                matchesTab;


            row.style.display =
                visible ? "" : "none";


            if (visible) {
                visibleCount++;
            }

        });


        updateEmptyState(visibleCount);

    }


    /* =====================================================
       REFRESH
    ====================================================== */

    if (refreshBtn) {

        refreshBtn.addEventListener(
            "click",
            function () {

                refreshBtn.classList.add("loading");

                setTimeout(function () {

                    refreshBtn.classList.remove("loading");

                    ticketSearch.value = "";
                    categoryFilter.value = "";
                    priorityFilter.value = "";
                    projectFilter.value = "";

                    const processingTab =
                        document.querySelector(
                            '.ticket-tab[data-tab="processing"]'
                        );

                    ticketTabs.forEach(function (tab) {

                        tab.classList.remove("active");

                    });

                    if (processingTab) {
                        processingTab.classList.add("active");
                    }

                    applyAllFilters();

                    showToast(
                        "Danh sách Ticket đã được làm mới."
                    );

                }, 700);

            }
        );

    }


    /* =====================================================
       PAGINATION
    ====================================================== */

    const paginationButtons =
        document.querySelectorAll(
            ".pagination .page-number"
        );

    paginationButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                paginationButtons.forEach(
                    function (item) {

                        item.classList.remove("active");

                    }
                );

                button.classList.add("active");

                showToast(
                    "Đã chuyển sang trang " +
                    button.textContent.trim() +
                    "."
                );

            }
        );

    });


    /* =====================================================
       SORT
    ====================================================== */

    const sortBtn =
        document.getElementById("sortBtn");

    let sortAscending = true;

    if (sortBtn) {

        sortBtn.addEventListener(
            "click",
            function () {

                sortAscending =
                    !sortAscending;

                const rows =
                    Array.from(
                        ticketTableBody.querySelectorAll(
                            ".ticket-row"
                        )
                    );

                rows.sort(function (a, b) {

                    const idA =
                        a.dataset.id;

                    const idB =
                        b.dataset.id;

                    return sortAscending
                        ? idA.localeCompare(idB)
                        : idB.localeCompare(idA);

                });

                rows.forEach(function (row) {

                    ticketTableBody.appendChild(row);

                });

                showToast(
                    sortAscending
                        ? "Đã sắp xếp tăng dần."
                        : "Đã sắp xếp giảm dần."
                );

            }
        );

    }


    /* =====================================================
       FEEDBACK
    ====================================================== */

    if (closeTicketBtn) {

        closeTicketBtn.addEventListener(
            "click",
            function () {

                const message =
                    feedbackInput.value.trim();

                if (!message) {

                    showToast(
                        "Vui lòng nhập kết quả kiểm tra trước khi đóng Ticket.",
                        "warning"
                    );

                    feedbackInput.focus();

                    return;
                }


                const confirmed =
                    window.confirm(
                        "Bạn xác nhận đã kiểm tra và muốn đóng Ticket này?"
                    );

                if (!confirmed) {
                    return;
                }


                closeTicketBtn.disabled = true;

                setTimeout(function () {

                    const selected =
                        document.querySelector(
                            ".ticket-row.selected"
                        );

                    if (selected) {

                        selected.dataset.status =
                            "completed";

                        const status =
                            selected.querySelector(
                                ".status"
                            );

                        if (status) {

                            status.className =
                                "status status-completed";

                            status.innerHTML = `
                                <span class="material-symbols-outlined">
                                    check
                                </span>
                                Đã hoàn thành
                            `;

                        }

                    }

                    closeTicketBtn.disabled =
                        false;

                    feedbackInput.value = "";

                    showToast(
                        "Ticket đã được đóng thành công."
                    );

                    applyAllFilters();

                }, 600);

            }
        );

    }


    /* =====================================================
       REQUEST MORE
    ====================================================== */

    if (requestMoreBtn) {

        requestMoreBtn.addEventListener(
            "click",
            function () {

                const message =
                    feedbackInput.value.trim();

                if (!message) {

                    showToast(
                        "Vui lòng nhập nội dung yêu cầu hỗ trợ thêm.",
                        "warning"
                    );

                    feedbackInput.focus();

                    return;
                }

                showToast(
                    "Đã gửi yêu cầu hỗ trợ thêm cho kỹ thuật viên."
                );

                feedbackInput.value = "";

            }
        );

    }


    /* =====================================================
       ATTACH FILE
    ====================================================== */

    if (attachBtn) {

        attachBtn.addEventListener(
            "click",
            function () {

                const input =
                    document.createElement("input");

                input.type = "file";

                input.accept =
                    ".png,.jpg,.jpeg,.gif,.log,.txt,.pdf";

                input.multiple = true;

                input.addEventListener(
                    "change",
                    function () {

                        if (
                            input.files &&
                            input.files.length
                        ) {

                            showToast(
                                "Đã chọn " +
                                input.files.length +
                                " tệp đính kèm."
                            );

                        }

                    }
                );

                input.click();

            }
        );

    }


    /* =====================================================
       MODAL
    ====================================================== */

    function openModal() {

        newTicketModal.classList.add("show");
        document.body.classList.add("no-scroll");

        const titleInput =
            document.getElementById(
                "newTicketTitle"
            );

        if (titleInput) {
            setTimeout(function () {
                titleInput.focus();
            }, 100);
        }

    }


    function closeModal() {

        newTicketModal.classList.remove("show");
        document.body.classList.remove("no-scroll");

    }


    if (newTicketBtn) {

        newTicketBtn.addEventListener(
            "click",
            openModal
        );

    }


    if (quickReportBtn) {

        quickReportBtn.addEventListener(
            "click",
            openModal
        );

    }


    document
        .querySelectorAll("[data-close-modal]")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                closeModal
            );

        });


    if (newTicketModal) {

        newTicketModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === newTicketModal
                ) {

                    closeModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                newTicketModal.classList.contains("show")
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       CREATE NEW TICKET
    ====================================================== */

    if (newTicketForm) {

        newTicketForm.addEventListener(
            "submit",
            function (event) {


                const title =
                    document
                        .getElementById(
                            "newTicketTitle"
                        )
                        .value
                        .trim();

                const category =
                    document
                        .getElementById(
                            "newTicketCategory"
                        )
                        .value;

                const priority =
                    document
                        .getElementById(
                            "newTicketPriority"
                        )
                        .value;

                const project =
                    document
                        .getElementById(
                            "newTicketProject"
                        )
                        .value;

                const description =
                    document
                        .getElementById(
                            "newTicketDescription"
                        )
                        .value
                        .trim();


                if (!title || !description) {

                    showToast(
                        "Vui lòng nhập đầy đủ thông tin.",
                        "warning"
                    );

                    return;

                }


                const newTicketId =
                    "TK-" +
                    new Date().getFullYear() +
                    "-" +
                    String(
                        Math.floor(
                            Math.random() * 900
                        ) + 100
                    );


                ticketData[newTicketId] = {

                    title: title,

                    detailTitle: title,

                    project: project,

                    category: category,

                    priority: priority,

                    status: "Đang xử lý",

                    technician:
                        "Đang chờ phân công",

                    sla:
                        "Đang xác định"

                };


                closeModal();

                newTicketForm.reset();

                showToast(
                    "Đã tạo yêu cầu " +
                    newTicketId +
                    " thành công."
                );

            }
        );

    }


    /* =====================================================
       FAQ
    ====================================================== */

    if (faqBtn) {

        faqBtn.addEventListener(
            "click",
            function () {

                const faqSection =
                    document.querySelector(
                        ".support-icon.faq"
                    );

                if (faqSection) {

                    faqSection
                        .closest(".support-card")
                        .scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                }

                showToast(
                    "Đã chuyển tới khu vực Câu hỏi thường gặp."
                );

            }
        );

    }


    /* =====================================================
       HISTORY
    ====================================================== */

    if (historyBtn) {

        historyBtn.addEventListener(
            "click",
            function () {

                const completedTab =
                    document.querySelector(
                        '.ticket-tab[data-tab="completed"]'
                    );

                if (completedTab) {

                    completedTab.click();

                    completedTab.scrollIntoView({
                        behavior: "smooth",
                        inline: "center"
                    });

                }

                showToast(
                    "Đang hiển thị các Ticket đã hoàn thành."
                );

            }
        );

    }


    /* =====================================================
       HELP
    ====================================================== */

    if (helpBtn) {

        helpBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Trung tâm trợ giúp: xem FAQ hoặc tạo Ticket mới."
                );

            }
        );

    }


    /* =====================================================
       NOTIFICATION
    ====================================================== */

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Bạn có 3 thông báo mới."
                );

            }
        );

    }


    /* =====================================================
       GLOBAL SEARCH
    ====================================================== */

    if (globalSearch) {

        globalSearch.addEventListener(
            "input",
            function () {

                const value =
                    globalSearch.value
                        .trim()
                        .toLowerCase();

                if (
                    value.includes("ticket") ||
                    value.includes("hỗ trợ") ||
                    value.includes("sự cố") ||
                    value.includes("tk-")
                ) {

                    ticketSearch.value =
                        globalSearch.value;

                    filterTickets();

                }

            }
        );

    }


    /* =====================================================
       FAQ LINKS
    ====================================================== */

    document
        .querySelectorAll(".faq-link")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {


                    showToast(
                        "Đang mở hướng dẫn FAQ."
                    );

                }
            );

        });


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    const initialTicket =
        document.querySelector(
            ".ticket-row.selected"
        );

    if (initialTicket) {

        selectTicket(
            initialTicket.dataset.id
        );

    }


    /* =====================================================
       INITIAL FILTER
    ====================================================== */

    applyAllFilters();

});