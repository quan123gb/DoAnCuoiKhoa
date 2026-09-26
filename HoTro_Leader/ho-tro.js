"use strict";

/* =========================================================
   DOM HELPERS
========================================================= */

const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

const $$ = (selector, parent = document) => {
    return [...parent.querySelectorAll(selector)];
};


/* =========================================================
   ELEMENTS
========================================================= */

const sidebar = $("#sidebar");
const sidebarOverlay = $("#sidebarOverlay");
const mobileMenuButton = $("#mobileMenuButton");

const systemToast = $("#systemToast");
const toastTitle = $("#toastTitle");
const toastMessage = $("#toastMessage");
const toastClose = $("#toastClose");

const ticketSearch = $("#ticketSearch");
const categoryFilter = $("#categoryFilter");
const priorityFilter = $("#priorityFilter");
const statusFilter = $("#statusFilter");
const assigneeFilter = $("#assigneeFilter");
const resetFilters = $("#resetFilters");

const selectAllTickets = $("#selectAllTickets");

const ticketRows = $$(".ticket-row");
const ticketCheckboxes = $$(".ticket-checkbox");

const emptyState = $("#emptyState");

const globalSearch = $("#globalSearch");

const modalOverlay = $("#modalOverlay");
const modalClose = $("#modalClose");
const modalCancel = $("#modalCancel");
const modalConfirm = $("#modalConfirm");

const modalTitle = $("#modalTitle");
const modalTicketId = $("#modalTicketId");
const modalBody = $("#modalBody");

const createTicketButton = $("#createTicketButton");
const exportSlaButton = $("#exportSlaButton");

const quickReply = $("#quickReply");
const sendReplyButton = $("#sendReplyButton");
const closePriorityTicket = $("#closePriorityTicket");


/* =========================================================
   STATE
========================================================= */

let currentModalAction = null;
let currentTicketId = null;

let currentPage = 1;

const TOTAL_TICKETS = 68;
const PAGE_SIZE = 5;


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;

function showToast(title, message) {

    if (!systemToast) {
        return;
    }

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    systemToast.classList.remove("hidden");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        hideToast();
    }, 4500);
}

function hideToast() {

    if (!systemToast) {
        return;
    }

    systemToast.classList.add("hidden");
}

if (toastClose) {
    toastClose.addEventListener("click", hideToast);
}


/* =========================================================
   SIDEBAR MOBILE
========================================================= */

function openSidebar() {

    sidebar.classList.add("open");
    sidebarOverlay.classList.add("show");

    document.body.style.overflow = "hidden";
}

function closeSidebar() {

    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("show");

    document.body.style.overflow = "";
}

if (mobileMenuButton) {

    mobileMenuButton.addEventListener("click", () => {

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


/* =========================================================
   SIDEBAR NAVIGATION
========================================================= */

$$(".nav-item").forEach(item => {

    item.addEventListener("click", function (event) {


        const path = this.dataset.path;

        if (path === "dang-xuat") {

            const confirmed = window.confirm(
                "Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?"
            );

            if (confirmed) {

                showToast(
                    "Đăng xuất",
                    "Đang chuyển về trang đăng nhập..."
                );

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 800);

            }

            return;
        }

        $$(".nav-item").forEach(nav => {
            nav.classList.remove("active");
            nav.removeAttribute("aria-current");
        });

        this.classList.add("active");
        this.setAttribute("aria-current", "page");

        if (window.innerWidth <= 992) {
            closeSidebar();
        }

        if (path !== "ho-tro") {

            showToast(
                "Điều hướng",
                `Đã chọn chức năng "${this.textContent.trim()}".`
            );

        }

    });

});


/* =========================================================
   NORMALIZE TEXT
========================================================= */

function normalizeText(value) {

    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .trim();

}


/* =========================================================
   FILTER TICKETS
========================================================= */

function filterTickets() {

    const searchValue = normalizeText(
        ticketSearch ? ticketSearch.value : ""
    );

    const categoryValue = categoryFilter
        ? categoryFilter.value
        : "";

    const priorityValue = priorityFilter
        ? priorityFilter.value
        : "";

    const statusValue = statusFilter
        ? statusFilter.value
        : "";

    const assigneeValue = assigneeFilter
        ? assigneeFilter.value
        : "";

    let visibleCount = 0;

    ticketRows.forEach(row => {

        const rowText = normalizeText(
            row.textContent
        );

        const category = row.dataset.category || "";
        const priority = row.dataset.priority || "";
        const status = row.dataset.status || "";
        const assignee = row.dataset.assignee || "";

        const matchesSearch =
            !searchValue ||
            rowText.includes(searchValue);

        const matchesCategory =
            !categoryValue ||
            category === categoryValue;

        const matchesPriority =
            !priorityValue ||
            priority === priorityValue;

        const matchesStatus =
            !statusValue ||
            status === statusValue;

        const matchesAssignee =
            !assigneeValue ||
            assignee === assigneeValue;

        const visible =
            matchesSearch &&
            matchesCategory &&
            matchesPriority &&
            matchesStatus &&
            matchesAssignee;

        row.style.display = visible ? "" : "none";

        if (visible) {
            visibleCount++;
        }

    });

    if (emptyState) {

        emptyState.classList.toggle(
            "show",
            visibleCount === 0
        );

    }

    updatePaginationInfo(visibleCount);

    updateSelectAllState();

}


/* =========================================================
   FILTER EVENTS
========================================================= */

[
    ticketSearch,
    categoryFilter,
    priorityFilter,
    statusFilter,
    assigneeFilter
].forEach(element => {

    if (!element) {
        return;
    }

    element.addEventListener(
        "input",
        filterTickets
    );

    element.addEventListener(
        "change",
        filterTickets
    );

});


/* =========================================================
   RESET FILTERS
========================================================= */

if (resetFilters) {

    resetFilters.addEventListener("click", () => {

        if (ticketSearch) {
            ticketSearch.value = "";
        }

        if (categoryFilter) {
            categoryFilter.value = "";
        }

        if (priorityFilter) {
            priorityFilter.value = "";
        }

        if (statusFilter) {
            statusFilter.value = "";
        }

        if (assigneeFilter) {
            assigneeFilter.value = "";
        }

        filterTickets();

        showToast(
            "Đã đặt lại",
            "Tất cả bộ lọc đã được đặt về trạng thái mặc định."
        );

    });

}


/* =========================================================
   REMOVE FILTER TAG
========================================================= */

$$(".remove-filter").forEach(button => {

    button.addEventListener("click", () => {

        const filterType = button.dataset.filter;

        if (filterType === "priority") {

            if (priorityFilter) {
                priorityFilter.value = "";
            }

            filterTickets();

        }

        if (filterType === "scope") {

            showToast(
                "Phạm vi dữ liệu",
                "Phạm vi Leader Dự án được hệ thống kiểm soát theo vai trò."
            );

        }

    });

});


/* =========================================================
   SELECT ALL
========================================================= */

function updateSelectAllState() {

    const visibleCheckboxes = ticketRows
        .filter(row => row.style.display !== "none")
        .map(row => $(".ticket-checkbox", row))
        .filter(Boolean);

    if (!selectAllTickets) {
        return;
    }

    if (visibleCheckboxes.length === 0) {

        selectAllTickets.checked = false;
        selectAllTickets.indeterminate = false;
        return;

    }

    const checkedCount =
        visibleCheckboxes.filter(
            checkbox => checkbox.checked
        ).length;

    selectAllTickets.checked =
        checkedCount === visibleCheckboxes.length;

    selectAllTickets.indeterminate =
        checkedCount > 0 &&
        checkedCount < visibleCheckboxes.length;

}


if (selectAllTickets) {

    selectAllTickets.addEventListener("change", () => {

        ticketRows.forEach(row => {

            if (row.style.display === "none") {
                return;
            }

            const checkbox =
                $(".ticket-checkbox", row);

            if (checkbox) {
                checkbox.checked =
                    selectAllTickets.checked;
            }

        });

    });

}


ticketCheckboxes.forEach(checkbox => {

    checkbox.addEventListener(
        "change",
        updateSelectAllState
    );

});


/* =========================================================
   PAGINATION INFO
========================================================= */

function updatePaginationInfo(visibleCount) {

    const visibleStart =
        $("#visibleStart");

    const visibleEnd =
        $("#visibleEnd");

    if (!visibleStart || !visibleEnd) {
        return;
    }

    if (visibleCount === 0) {

        visibleStart.textContent = "0";
        visibleEnd.textContent = "0";

        return;
    }

    visibleStart.textContent = "1";

    visibleEnd.textContent =
        Math.min(
            visibleCount,
            PAGE_SIZE
        );

}


/* =========================================================
   PAGINATION BUTTONS
========================================================= */

const pageButtons =
    $$(".page-button");

pageButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (
            button.classList.contains("disabled") ||
            button.classList.contains("active")
        ) {
            return;
        }

        const pageText =
            button.textContent.trim();

        if (
            pageText === "2" ||
            pageText === "3" ||
            pageText === "14"
        ) {

            currentPage =
                Number(pageText);

            pageButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            showToast(
                "Phân trang",
                `Đang hiển thị trang ${currentPage}.`
            );

        }

    });

});


const prevPage = $("#prevPage");
const nextPage = $("#nextPage");

if (nextPage) {

    nextPage.addEventListener("click", () => {

        showToast(
            "Phân trang",
            "Đang chuyển sang trang tiếp theo."
        );

    });

}

if (prevPage) {

    prevPage.addEventListener("click", () => {

        showToast(
            "Phân trang",
            "Đang chuyển về trang trước."
        );

    });

}


/* =========================================================
   TICKET ACTIONS
========================================================= */

$$("[data-action]").forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        const action =
            button.dataset.action;

        const ticket =
            button.dataset.ticket;

        handleTicketAction(
            action,
            ticket
        );

    });

});


function handleTicketAction(action, ticket) {

    switch (action) {

        case "view":
            openTicketDetail(ticket);
            break;

        case "reply":
            openReplyModal(ticket);
            break;

        case "close":
            openCloseModal(ticket);
            break;

        case "delete":
            deleteTicket(ticket);
            break;

        case "assign":
            openAssignModal(ticket);
            break;

        default:
            break;

    }

}


/* =========================================================
   GET TICKET DATA
========================================================= */

function getTicketData(ticketId) {

    const row =
        ticketRows.find(row => {

            const id =
                $(".ticket-id", row);

            return id &&
                id.textContent.trim() === ticketId;

        });

    if (!row) {
        return null;
    }

    return {

        id: ticketId,

        title:
            $(".ticket-title", row)?.textContent.trim() || "",

        description:
            $(".ticket-description", row)?.textContent.trim() || "",

        sender:
            $(".sender-info span", row)?.textContent.trim() || "",

        senderRole:
            $(".sender-info small", row)?.textContent.trim() || "",

        category:
            $(".category-text", row)?.textContent.trim() || "",

        time:
            $(".time-text", row)?.textContent.trim() || "",

        priority:
            row.dataset.priority || "",

        status:
            row.dataset.status || "",

        assignee:
            row.dataset.assignee || ""

    };

}


/* =========================================================
   MODAL
========================================================= */

function openModal(title, ticketId, body, action) {

    if (!modalOverlay) {
        return;
    }

    modalTitle.textContent = title;
    modalTicketId.textContent = ticketId;
    modalBody.innerHTML = body;

    currentModalAction = action;
    currentTicketId = ticketId;

    modalOverlay.classList.add("show");

    document.body.style.overflow = "hidden";
}

function closeModal() {

    if (!modalOverlay) {
        return;
    }

    modalOverlay.classList.remove("show");

    document.body.style.overflow = "";

    currentModalAction = null;
    currentTicketId = null;
}

if (modalClose) {
    modalClose.addEventListener(
        "click",
        closeModal
    );
}

if (modalCancel) {
    modalCancel.addEventListener(
        "click",
        closeModal
    );
}

if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        event => {

            if (event.target === modalOverlay) {
                closeModal();
            }

        }
    );

}

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});


/* =========================================================
   VIEW DETAIL
========================================================= */

function openTicketDetail(ticketId) {

    const ticket =
        getTicketData(ticketId);

    if (!ticket) {
        return;
    }

    const body = `

        <h3>${escapeHtml(ticket.title)}</h3>

        <p>
            <strong>Người gửi:</strong>
            ${escapeHtml(ticket.sender)}
        </p>

        <p>
            <strong>Vai trò:</strong>
            ${escapeHtml(ticket.senderRole)}
        </p>

        <p>
            <strong>Danh mục:</strong>
            ${escapeHtml(ticket.category)}
        </p>

        <p>
            <strong>Thời gian:</strong>
            ${escapeHtml(ticket.time)}
        </p>

        <p>
            <strong>Mô tả:</strong>
            ${escapeHtml(ticket.description)}
        </p>

        <p>
            <strong>Mã yêu cầu:</strong>
            ${escapeHtml(ticket.id)}
        </p>

    `;

    openModal(
        "Chi tiết ticket",
        ticket.id,
        body,
        "view"
    );

}


/* =========================================================
   REPLY MODAL
========================================================= */

function openReplyModal(ticketId) {

    const ticket =
        getTicketData(ticketId);

    if (!ticket) {
        return;
    }

    const body = `

        <h3>
            Phản hồi ${escapeHtml(ticket.id)}
        </h3>

        <p>
            <strong>
                ${escapeHtml(ticket.title)}
            </strong>
        </p>

        <textarea
            id="modalReplyInput"
            class="modal-reply-input"
            rows="5"
            placeholder="Nhập nội dung phản hồi..."
            style="
                width:100%;
                margin-top:12px;
                padding:12px;
                border:1px solid #c3c6d7;
                border-radius:8px;
                resize:vertical;
                font-family:inherit;
                font-size:14px;
            "
        ></textarea>

    `;

    openModal(
        "Phản hồi nhanh",
        ticket.id,
        body,
        "reply"
    );

}


/* =========================================================
   CLOSE TICKET MODAL
========================================================= */

function openCloseModal(ticketId) {

    const ticket =
        getTicketData(ticketId);

    if (!ticket) {
        return;
    }

    const body = `

        <p>
            Bạn có chắc chắn muốn đóng ticket
            <strong>${escapeHtml(ticket.id)}</strong>?
        </p>

        <p>
            <strong>
                ${escapeHtml(ticket.title)}
            </strong>
        </p>

        <p>
            Sau khi đóng, ticket sẽ được chuyển sang trạng thái
            <strong>Đã đóng</strong>.
        </p>

    `;

    openModal(
        "Đóng ticket",
        ticket.id,
        body,
        "close"
    );

}


/* =========================================================
   ASSIGN MODAL
========================================================= */

function openAssignModal(ticketId) {

    const ticket =
        getTicketData(ticketId);

    if (!ticket) {
        return;
    }

    const body = `

        <p>
            Chọn kỹ thuật viên xử lý
            <strong>${escapeHtml(ticket.id)}</strong>.
        </p>

        <select
            id="assignTechnician"
            style="
                width:100%;
                height:42px;
                margin-top:12px;
                padding:0 10px;
                border:1px solid #c3c6d7;
                border-radius:8px;
                font-family:inherit;
                background:#f8f9ff;
            "
        >

            <option value="minhcuong">
                Lê Minh Cường
            </option>

            <option value="vanan">
                Nguyễn Văn An
            </option>

            <option value="thuylinh">
                Hoàng Thùy Linh
            </option>

        </select>

    `;

    openModal(
        "Gán kỹ thuật viên",
        ticket.id,
        body,
        "assign"
    );

}


/* =========================================================
   MODAL CONFIRM
========================================================= */

if (modalConfirm) {

    modalConfirm.addEventListener(
        "click",
        () => {

            if (!currentModalAction) {
                closeModal();
                return;
            }

            switch (currentModalAction) {

                case "reply":
                    confirmReply();
                    break;

                case "close":
                    confirmClose();
                    break;

                case "assign":
                    confirmAssign();
                    break;

                case "view":
                    closeModal();
                    break;

                default:
                    closeModal();
                    break;

            }

        }
    );

}


/* =========================================================
   CONFIRM REPLY
========================================================= */

function confirmReply() {

    const input =
        $("#modalReplyInput");

    const message =
        input ? input.value.trim() : "";

    if (!message) {

        showToast(
            "Chưa nhập nội dung",
            "Vui lòng nhập nội dung phản hồi trước khi gửi."
        );

        return;
    }

    showToast(
        "Đã gửi phản hồi",
        `Phản hồi cho ${currentTicketId} đã được gửi thành công.`
    );

    closeModal();

}


/* =========================================================
   CONFIRM CLOSE
========================================================= */

function confirmClose() {

    const ticketId =
        currentTicketId;

    const row =
        ticketRows.find(row => {

            const id =
                $(".ticket-id", row);

            return id &&
                id.textContent.trim() === ticketId;

        });

    if (row) {

        row.dataset.status = "closed";

        const statusBadge =
            $(".status-badge", row);

        if (statusBadge) {

            statusBadge.textContent =
                "Đã đóng";

            statusBadge.className =
                "status-badge status-closed";

        }

    }

    showToast(
        "Đã đóng ticket",
        `Ticket ${ticketId} đã được chuyển sang trạng thái Đã đóng.`
    );

    closeModal();

    filterTickets();

}


/* =========================================================
   CONFIRM ASSIGN
========================================================= */

function confirmAssign() {

    const technician =
        $("#assignTechnician");

    if (!technician) {
        closeModal();
        return;
    }

    const selectedText =
        technician.options[
            technician.selectedIndex
        ].textContent.trim();

    const ticketId =
        currentTicketId;

    const row =
        ticketRows.find(row => {

            const id =
                $(".ticket-id", row);

            return id &&
                id.textContent.trim() === ticketId;

        });

    if (row) {

        let assignee =
            $(".assigned-user", row);

        if (!assignee) {

            const button =
                $(".unassigned-button", row);

            if (button) {

                button.outerHTML = `

                    <div class="assigned-user">

                        <div class="small-avatar avatar-primary">
                            ${getInitials(selectedText)}
                        </div>

                        <span>
                            ${escapeHtml(selectedText)}
                        </span>

                    </div>

                `;

            }

        } else {

            assignee.innerHTML = `

                <div class="small-avatar avatar-primary">
                    ${getInitials(selectedText)}
                </div>

                <span>
                    ${escapeHtml(selectedText)}
                </span>

            `;

        }

        const technicianMap = {
            "Lê Minh Cường": "minhcuong",
            "Nguyễn Văn An": "vanan",
            "Hoàng Thùy Linh": "thuylinh"
        };

        row.dataset.assignee =
            technicianMap[selectedText] || "vanan";

    }

    showToast(
        "Gán kỹ thuật viên thành công",
        `Đã gán ${selectedText} xử lý ticket ${ticketId}.`
    );

    closeModal();

}


/* =========================================================
   DELETE TICKET
========================================================= */

function deleteTicket(ticketId) {

    const confirmed =
        window.confirm(
            `Bạn có chắc chắn muốn xóa ${ticketId}?`
        );

    if (!confirmed) {
        return;
    }

    const row =
        ticketRows.find(row => {

            const id =
                $(".ticket-id", row);

            return id &&
                id.textContent.trim() === ticketId;

        });

    if (row) {

        row.remove();

        showToast(
            "Đã xóa bản ghi",
            `Ticket ${ticketId} đã được xóa khỏi danh sách.`
        );

    }

    filterTickets();

}


/* =========================================================
   QUICK ASSIGN
========================================================= */

$$(".quick-assign-button").forEach(button => {

    button.addEventListener("click", () => {

        const technician =
            button.dataset.assign;

        showToast(
            "Đã chọn kỹ thuật viên",
            `Đã chỉ định ${technician} cho ticket #TK-108.`
        );

    });

});


/* =========================================================
   QUICK REPLY
========================================================= */

if (sendReplyButton) {

    sendReplyButton.addEventListener(
        "click",
        () => {

            const message =
                quickReply
                    ? quickReply.value.trim()
                    : "";

            if (!message) {

                showToast(
                    "Chưa nhập phản hồi",
                    "Vui lòng nhập chỉ đạo kỹ thuật trước khi gửi."
                );

                if (quickReply) {
                    quickReply.focus();
                }

                return;
            }

            showToast(
                "Thao tác thành công",
                "Đã gửi phản hồi và gán việc xử lý ticket #TK-108."
            );

            if (quickReply) {
                quickReply.value = "";
            }

        }
    );

}


/* =========================================================
   CLOSE PRIORITY TICKET
========================================================= */

if (closePriorityTicket) {

    closePriorityTicket.addEventListener(
        "click",
        () => {

            const confirmed =
                window.confirm(
                    "Bạn có chắc chắn muốn đóng yêu cầu #TK-108?"
                );

            if (!confirmed) {
                return;
            }

            showToast(
                "Đã đóng yêu cầu",
                "Ticket #TK-108 đã được chuyển sang trạng thái Đã đóng."
            );

        }
    );

}


/* =========================================================
   CREATE TICKET
========================================================= */

if (createTicketButton) {

    createTicketButton.addEventListener(
        "click",
        () => {

            const body = `

                <p>
                    Tạo một yêu cầu hỗ trợ mới trong phạm vi
                    <strong>Leader Dự án</strong>.
                </p>

                <input
                    id="newTicketTitle"
                    type="text"
                    placeholder="Tiêu đề sự cố / yêu cầu"
                    style="
                        width:100%;
                        height:42px;
                        margin-top:12px;
                        padding:0 12px;
                        border:1px solid #c3c6d7;
                        border-radius:8px;
                        font-family:inherit;
                        font-size:14px;
                    "
                >

                <textarea
                    id="newTicketDescription"
                    rows="4"
                    placeholder="Mô tả chi tiết yêu cầu..."
                    style="
                        width:100%;
                        margin-top:10px;
                        padding:12px;
                        border:1px solid #c3c6d7;
                        border-radius:8px;
                        resize:vertical;
                        font-family:inherit;
                        font-size:14px;
                    "
                ></textarea>

            `;

            openModal(
                "Tạo ticket hỗ trợ mới",
                "TICKET MỚI",
                body,
                "create"
            );

        }
    );

}


/* =========================================================
   CREATE CONFIRM
========================================================= */

const originalModalConfirm =
    modalConfirm;

if (originalModalConfirm) {

    originalModalConfirm.addEventListener(
        "click",
        () => {

            if (currentModalAction !== "create") {
                return;
            }

            const titleInput =
                $("#newTicketTitle");

            const descriptionInput =
                $("#newTicketDescription");

            const title =
                titleInput
                    ? titleInput.value.trim()
                    : "";

            const description =
                descriptionInput
                    ? descriptionInput.value.trim()
                    : "";

            if (!title) {

                showToast(
                    "Thiếu thông tin",
                    "Vui lòng nhập tiêu đề ticket."
                );

                return;
            }

            showToast(
                "Tạo ticket thành công",
                "Yêu cầu hỗ trợ mới đã được tạo."
            );

            closeModal();

            if (description) {
                console.log(
                    "Ticket mới:",
                    {
                        title,
                        description
                    }
                );
            }

        }
    );

}


/* =========================================================
   EXPORT SLA
========================================================= */

if (exportSlaButton) {

    exportSlaButton.addEventListener(
        "click",
        () => {

            const report = [
                "BÁO CÁO SLA HỖ TRỢ",
                "====================",
                "",
                "Mã chức năng: LD-ADM06",
                "Phạm vi: Leader",
                "",
                "Tổng yêu cầu: 68",
                "Yêu cầu mới: 14",
                "Đang xử lý: 22",
                "Đã giải quyết & đóng: 32",
                "Tỷ lệ đạt SLA: 96.5%",
                "",
                "Phân bố sự cố:",
                "- Lỗi phần mềm / Bug hệ thống: 42% (28 yêu cầu)",
                "- Quyền truy cập & IAM: 26% (18 yêu cầu)",
                "- Hạ tầng & Máy chủ Dev: 20% (14 yêu cầu)",
                "- Phần cứng & Thiết bị bàn giao: 12% (8 yêu cầu)"
            ].join("\n");

            downloadTextFile(
                "bao-cao-sla-LD-ADM06.txt",
                report
            );

            showToast(
                "Xuất báo cáo thành công",
                "Báo cáo SLA đã được tải xuống."
            );

        }
    );

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

if (globalSearch) {

    globalSearch.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Enter") {
                return;
            }

            const keyword =
                globalSearch.value.trim();

            if (!keyword) {

                showToast(
                    "Tìm kiếm",
                    "Vui lòng nhập từ khóa cần tìm."
                );

                return;
            }

            if (ticketSearch) {
                ticketSearch.value = keyword;
            }

            filterTickets();

            ticketSearch?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            showToast(
                "Tìm kiếm",
                `Đã tìm kiếm với từ khóa "${keyword}".`
            );

        }
    );

}


/* =========================================================
   HELP
========================================================= */

const helpButton =
    $("#helpButton");

if (helpButton) {

    helpButton.addEventListener(
        "click",
        () => {

            openModal(
                "Trợ giúp",
                "LD-ADM06",
                `
                    <h3>Quản lý hỗ trợ</h3>

                    <p>
                        Trang này cho phép Leader tiếp nhận,
                        tìm kiếm, phân loại, gán kỹ thuật viên
                        và xử lý các ticket hỗ trợ.
                    </p>

                    <p>
                        Bạn có thể sử dụng bộ lọc phía trên
                        bảng để nhanh chóng tìm yêu cầu cần xử lý.
                    </p>
                `,
                "view"
            );

        }
    );

}


/* =========================================================
   NOTIFICATION
========================================================= */

const notificationButton =
    $("#notificationButton");

if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        () => {

            showToast(
                "Thông báo",
                "Bạn có 4 yêu cầu hỗ trợ cần kiểm tra."
            );

        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        String(value ?? "");

    return div.innerHTML;

}


/* =========================================================
   INITIALS
========================================================= */

function getInitials(name) {

    return String(name)
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0))
        .slice(-2)
        .join("")
        .toUpperCase();

}


/* =========================================================
   DOWNLOAD TEXT FILE
========================================================= */

function downloadTextFile(
    filename,
    content
) {

    const blob =
        new Blob(
            [content],
            {
                type: "text/plain;charset=utf-8"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const anchor =
        document.createElement("a");

    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);

    anchor.click();

    anchor.remove();

    URL.revokeObjectURL(url);

}


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 992 &&
            sidebar.classList.contains("open")
        ) {

            closeSidebar();

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        filterTickets();

        updateSelectAllState();

        /*
         * Toast mặc định của giao diện gốc được hiển thị
         * khi tải trang. Có thể bỏ đoạn này nếu không muốn.
         */
        setTimeout(() => {

            showToast(
                "Thao tác thành công",
                "Đã gán kỹ thuật viên Lê Minh Cường xử lý ticket #TK-108."
            );

        }, 700);

    }
);