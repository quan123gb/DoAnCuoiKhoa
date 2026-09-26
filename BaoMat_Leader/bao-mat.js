/* =========================================================
   BAO-MAT.JS
   Chức năng trang Bảo mật
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initSidebar();

    initToast();

    initSecurityScan();

    initPolicySwitches();

    initPolicyActions();

    initSessionActions();

    initAuditFilters();

    initPagination();

    initTopbarActions();

    initGlobalSearch();

    updateCurrentTime();

    setInterval(updateCurrentTime, 1000);

});


/* =========================================================
   SIDEBAR
========================================================= */

function initSidebar() {

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {


            const path =
                link.getAttribute("data-path");

            if (!path) {
                return;
            }

            if (path === "dang-xuat") {

                const confirmed =
                    confirm(
                        "Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?"
                    );

                if (confirmed) {

                    showToast(
                        "Đăng xuất",
                        "Phiên làm việc của bạn đã được kết thúc.",
                        "logout"
                    );

                }

                return;
            }

            navLinks.forEach(function (item) {
                item.classList.remove("active");
                item.removeAttribute("aria-current");
            });

            link.classList.add("active");
            link.setAttribute(
                "aria-current",
                "page"
            );

        });

    });

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;

function initToast() {

    const closeButton =
        document.getElementById("toast-close");

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            hideToast
        );

    }

}


function showToast(
    title,
    message,
    icon = "verified_user"
) {

    const toast =
        document.getElementById("security-toast");

    const titleElement =
        document.getElementById("toast-title");

    const messageElement =
        document.getElementById("toast-message");

    const iconElement =
        document.getElementById("toast-icon");

    if (!toast) {
        return;
    }

    if (titleElement) {
        titleElement.textContent = title;
    }

    if (messageElement) {
        messageElement.textContent = message;
    }

    if (iconElement) {
        iconElement.textContent = icon;
    }

    toast.classList.remove("hidden");

    if (toastTimer) {
        clearTimeout(toastTimer);
    }

    toastTimer =
        setTimeout(function () {
            hideToast();
        }, 5000);

}


function hideToast() {

    const toast =
        document.getElementById("security-toast");

    if (!toast) {
        return;
    }

    toast.classList.add("hidden");

}


/* =========================================================
   SECURITY SCAN
========================================================= */

function initSecurityScan() {

    const scanButton =
        document.getElementById("btn-scan");

    const scanIcon =
        document.getElementById("scan-icon");

    const scanText =
        document.getElementById("scan-text");

    if (!scanButton) {
        return;
    }

    scanButton.addEventListener(
        "click",
        function () {

            if (
                scanButton.classList.contains(
                    "scan-disabled"
                )
            ) {
                return;
            }

            scanButton.classList.add(
                "scan-disabled"
            );

            if (scanIcon) {

                scanIcon.classList.add(
                    "scan-spinning"
                );

            }

            if (scanText) {

                scanText.textContent =
                    "Đang quét hệ thống...";

            }

            setTimeout(function () {

                if (scanIcon) {

                    scanIcon.classList.remove(
                        "scan-spinning"
                    );

                }

                if (scanText) {

                    scanText.textContent =
                        "Đã quét xong (0 lỗ hổng)";

                }

                scanButton.classList.remove(
                    "scan-disabled"
                );

                showToast(
                    "Kiểm toán an ninh hoàn tất",
                    "Toàn bộ 42 phiên và 48 tài khoản hoạt động bình thường, không có mã độc hay cửa sau.",
                    "verified_user"
                );

            }, 1500);

        }
    );

}


/* =========================================================
   POLICY SWITCHES
========================================================= */

function initPolicySwitches() {

    const switches =
        document.querySelectorAll(
            ".switch[role='switch']"
        );

    switches.forEach(function (switchButton) {

        switchButton.addEventListener(
            "click",
            function () {

                const isActive =
                    switchButton.classList.contains(
                        "active"
                    );

                const newState =
                    !isActive;

                switchButton.classList.toggle(
                    "active",
                    newState
                );

                switchButton.setAttribute(
                    "aria-checked",
                    newState ? "true" : "false"
                );

                updateSwitchLabel(
                    switchButton,
                    newState
                );

                const policy =
                    switchButton.getAttribute(
                        "data-policy"
                    );

                const policyNames = {

                    password:
                        "Chính sách mật khẩu mạnh",

                    "2fa":
                        "Xác thực hai lớp (2FA / OTP)",

                    "login-monitor":
                        "Giám sát đăng nhập bất thường",

                    "ip-whitelist":
                        "IP Whitelist"

                };

                const policyName =
                    policyNames[policy] ||
                    "Chính sách bảo mật";

                showToast(
                    newState
                        ? "Đã bật chính sách"
                        : "Đã tắt chính sách",
                    policyName +
                        (newState
                            ? " đã được kích hoạt."
                            : " đã được tắt."),
                    newState
                        ? "toggle_on"
                        : "toggle_off"
                );

            }
        );

    });

}


function updateSwitchLabel(
    switchButton,
    isActive
) {

    const parent =
        switchButton.closest(
            ".policy-control"
        );

    if (!parent) {
        return;
    }

    const label =
        parent.querySelector(
            ".enabled-text, .disabled-text"
        );

    if (!label) {
        return;
    }

    if (isActive) {

        label.classList.remove(
            "disabled-text"
        );

        label.classList.add(
            "enabled-text"
        );

        label.textContent =
            "ĐANG BẬT";

    } else {

        label.classList.remove(
            "enabled-text"
        );

        label.classList.add(
            "disabled-text"
        );

        label.textContent =
            "ĐANG TẮT";

    }

}


/* =========================================================
   POLICY ACTIONS
========================================================= */

function initPolicyActions() {

    const saveButton =
        document.getElementById(
            "savePolicyButton"
        );

    const restoreButton =
        document.getElementById(
            "restorePolicyButton"
        );

    const configIpButton =
        document.getElementById(
            "configIpButton"
        );

    const sessionTimeout =
        document.getElementById(
            "sessionTimeout"
        );


    /* Save */
    if (saveButton) {

        saveButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Lưu thành công",
                    "Chính sách bảo mật tài khoản đã được đồng bộ toàn diện trên máy chủ trung tâm.",
                    "save"
                );

            }
        );

    }


    /* Restore */
    if (restoreButton) {

        restoreButton.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Bạn có chắc chắn muốn khôi phục toàn bộ chính sách về mặc định?"
                    );

                if (!confirmed) {
                    return;
                }

                restoreDefaultPolicies();

                showToast(
                    "Đã khôi phục mặc định",
                    "Các chính sách bảo mật đã được đưa về cấu hình mặc định của hệ thống.",
                    "restore"
                );

            }
        );

    }


    /* IP whitelist */
    if (configIpButton) {

        configIpButton.addEventListener(
            "click",
            function () {

                showIpConfigModal();

            }
        );

    }


    /* Session timeout */
    if (sessionTimeout) {

        sessionTimeout.addEventListener(
            "change",
            function () {

                const value =
                    sessionTimeout.value;

                const text =
                    sessionTimeout.options[
                        sessionTimeout.selectedIndex
                    ].textContent;

                showToast(
                    "Đã cập nhật thời gian phiên",
                    "Thời gian tự động đăng xuất đã được đặt thành " +
                    text +
                    ".",
                    "timer"
                );

            }
        );

    }

}


function restoreDefaultPolicies() {

    const switches =
        document.querySelectorAll(
            ".switch[role='switch']"
        );

    switches.forEach(function (switchButton) {

        const policy =
            switchButton.getAttribute(
                "data-policy"
            );

        if (policy === "ip-whitelist") {

            switchButton.classList.remove(
                "active"
            );

            switchButton.setAttribute(
                "aria-checked",
                "false"
            );

            updateSwitchLabel(
                switchButton,
                false
            );

        } else {

            switchButton.classList.add(
                "active"
            );

            switchButton.setAttribute(
                "aria-checked",
                "true"
            );

            updateSwitchLabel(
                switchButton,
                true
            );

        }

    });

    const timeout =
        document.getElementById(
            "sessionTimeout"
        );

    if (timeout) {
        timeout.value = "30";
    }

}


/* =========================================================
   SESSION ACTIONS
========================================================= */

function initSessionActions() {

    const revokeAllButton =
        document.getElementById(
            "revokeAllButton"
        );

    const refreshButton =
        document.getElementById(
            "refreshSessionsButton"
        );

    const permanentBanButton =
        document.getElementById(
            "permanentBanButton"
        );

    const revokeButtons =
        document.querySelectorAll(
            ".session-revoke-button"
        );


    /* Revoke individual */
    revokeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const user =
                    button.getAttribute(
                        "data-session"
                    ) ||
                    "phiên làm việc";

                const confirmed =
                    confirm(
                        "Bạn có chắc chắn muốn thu hồi phiên của " +
                        user +
                        "?"
                    );

                if (!confirmed) {
                    return;
                }

                const row =
                    button.closest("tr");

                if (row) {

                    row.style.opacity = "0.45";

                    row.style.transition =
                        "opacity 0.3s ease";

                    setTimeout(function () {

                        row.remove();

                    }, 300);

                }

                showToast(
                    "Đã thu hồi phiên",
                    "Phiên đăng nhập của " +
                    user +
                    " đã được thu hồi thành công.",
                    "logout"
                );

            }
        );

    });


    /* Revoke all */
    if (revokeAllButton) {

        revokeAllButton.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Bạn có chắc chắn muốn buộc đăng xuất tất cả 41 phiên làm việc khác không? Người dùng sẽ phải xác thực lại danh tính."
                    );

                if (!confirmed) {
                    return;
                }

                const rows =
                    document.querySelectorAll(
                        "#sessionTableBody tr"
                    );

                rows.forEach(function (row) {

                    const revokeButton =
                        row.querySelector(
                            ".session-revoke-button"
                        );

                    if (revokeButton) {

                        row.style.opacity =
                            "0.4";

                    }

                });

                showToast(
                    "Đã thu hồi phiên",
                    "Đã đăng xuất thành công 41 phiên từ xa. Chỉ giữ lại phiên hiện tại của bạn.",
                    "logout"
                );

            }
        );

    }


    /* Refresh */
    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            function () {

                const icon =
                    refreshButton.querySelector(
                        ".material-symbols-outlined"
                    );

                if (icon) {
                    icon.classList.add(
                        "scan-spinning"
                    );
                }

                refreshButton.disabled = true;

                setTimeout(function () {

                    if (icon) {
                        icon.classList.remove(
                            "scan-spinning"
                        );
                    }

                    refreshButton.disabled =
                        false;

                    showToast(
                        "Đã làm mới",
                        "Danh sách phiên đăng nhập đã được cập nhật theo thời gian thực.",
                        "refresh"
                    );

                }, 800);

            }
        );

    }


    /* Permanent ban */
    if (permanentBanButton) {

        permanentBanButton.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Bạn có chắc chắn muốn cấm vĩnh viễn IP 198.51.100.42?"
                    );

                if (!confirmed) {
                    return;
                }

                showToast(
                    "Đã cấm vĩnh viễn",
                    "Địa chỉ IP 198.51.100.42 đã được thêm vào danh sách chặn vĩnh viễn.",
                    "gpp_bad"
                );

                permanentBanButton.disabled =
                    true;

                permanentBanButton.textContent =
                    "Đã cấm";

                permanentBanButton.style.opacity =
                    "0.6";

            }
        );

    }

}


/* =========================================================
   AUDIT FILTER
========================================================= */

function initAuditFilters() {

    const searchInput =
        document.getElementById(
            "logSearch"
        );

    const eventFilter =
        document.getElementById(
            "eventFilter"
        );

    const userFilter =
        document.getElementById(
            "userFilter"
        );

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyAuditFilters
        );

    }

    if (eventFilter) {

        eventFilter.addEventListener(
            "change",
            applyAuditFilters
        );

    }

    if (userFilter) {

        userFilter.addEventListener(
            "change",
            applyAuditFilters
        );

    }

}


function applyAuditFilters() {

    const searchInput =
        document.getElementById(
            "logSearch"
        );

    const eventFilter =
        document.getElementById(
            "eventFilter"
        );

    const userFilter =
        document.getElementById(
            "userFilter"
        );

    const tableBody =
        document.getElementById(
            "auditTableBody"
        );

    const emptyState =
        document.getElementById(
            "auditEmptyState"
        );

    if (!tableBody) {
        return;
    }

    const searchValue =
        searchInput
            ? normalizeText(searchInput.value)
            : "";

    const eventValue =
        eventFilter
            ? eventFilter.value
            : "all";

    const userValue =
        userFilter
            ? userFilter.value
            : "all";

    const rows =
        Array.from(
            tableBody.querySelectorAll("tr")
        );

    let visibleCount = 0;

    rows.forEach(function (row) {

        const event =
            row.getAttribute(
                "data-event"
            ) || "";

        const user =
            row.getAttribute(
                "data-user"
            ) || "";

        const searchable =
            normalizeText(
                row.getAttribute(
                    "data-search"
                ) || row.textContent
            );

        const matchesSearch =
            !searchValue ||
            searchable.includes(
                searchValue
            );

        const matchesEvent =
            eventValue === "all" ||
            event === eventValue;

        const matchesUser =
            userValue === "all" ||
            user === userValue;

        const visible =
            matchesSearch &&
            matchesEvent &&
            matchesUser;

        row.style.display =
            visible ? "" : "none";

        if (visible) {
            visibleCount++;
        }

    });

    if (emptyState) {

        if (visibleCount === 0) {

            emptyState.classList.add(
                "show"
            );

        } else {

            emptyState.classList.remove(
                "show"
            );

        }

    }

    updateFilteredPagination(
        visibleCount
    );

}


/* =========================================================
   NORMALIZE VIETNAMESE
========================================================= */

function normalizeText(text) {

    return String(text)
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .replace(/đ/g, "d")
        .trim();

}


/* =========================================================
   FILTERED PAGINATION
========================================================= */

function updateFilteredPagination(
    visibleCount
) {

    const start =
        document.getElementById(
            "paginationStart"
        );

    if (!start) {
        return;
    }

    if (visibleCount === 0) {

        start.textContent =
            "0";

    } else {

        start.textContent =
            "1 - " +
            visibleCount;

    }

}


/* =========================================================
   PAGINATION
========================================================= */

let currentPage = 1;

const totalPages = 570;

function initPagination() {

    const pageButtons =
        document.querySelectorAll(
            ".page-button[data-page]"
        );

    const previous =
        document.getElementById(
            "prevPage"
        );

    const next =
        document.getElementById(
            "nextPage"
        );

    pageButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const page =
                    Number(
                        button.getAttribute(
                            "data-page"
                        )
                    );

                goToPage(page);

            }
        );

    });


    if (previous) {

        previous.addEventListener(
            "click",
            function () {

                if (currentPage > 1) {
                    goToPage(
                        currentPage - 1
                    );
                }

            }
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            function () {

                if (currentPage < totalPages) {
                    goToPage(
                        currentPage + 1
                    );
                }

            }
        );

    }

}


function goToPage(page) {

    if (page < 1) {
        page = 1;
    }

    if (page > totalPages) {
        page = totalPages;
    }

    currentPage = page;

    updatePaginationUI();

    showToast(
        "Đã chuyển trang",
        "Đang hiển thị trang " +
        currentPage +
        " của nhật ký kiểm toán.",
        "description"
    );

}


function updatePaginationUI() {

    const pageButtons =
        document.querySelectorAll(
            ".page-button[data-page]"
        );

    pageButtons.forEach(function (button) {

        const page =
            Number(
                button.getAttribute(
                    "data-page"
                )
            );

        button.classList.toggle(
            "active",
            page === currentPage
        );

    });


    const previous =
        document.getElementById(
            "prevPage"
        );

    const next =
        document.getElementById(
            "nextPage"
        );

    if (previous) {

        previous.disabled =
            currentPage === 1;

        previous.classList.toggle(
            "disabled",
            currentPage === 1
        );

    }

    if (next) {

        next.disabled =
            currentPage === totalPages;

        next.classList.toggle(
            "disabled",
            currentPage === totalPages
        );

    }

}


/* =========================================================
   TOPBAR ACTIONS
========================================================= */

function initTopbarActions() {

    const helpButton =
        document.getElementById(
            "helpButton"
        );

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );

    const warningDetailButton =
        document.getElementById(
            "warningDetailButton"
        );

    const remindButton =
        document.getElementById(
            "remindButton"
        );

    const dateButton =
        document.getElementById(
            "dateFilterButton"
        );

    const exportButton =
        document.getElementById(
            "exportLogsButton"
        );


    if (helpButton) {

        helpButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Trợ giúp",
                    "Bạn có thể quản lý chính sách bảo mật, phiên đăng nhập và nhật ký kiểm toán tại trang này.",
                    "help_outline"
                );

            }
        );

    }


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Thông báo",
                    "Có 1 cảnh báo bảo mật đã được hệ thống tự động xử lý.",
                    "notifications"
                );

            }
        );

    }


    if (warningDetailButton) {

        warningDetailButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Cảnh báo bất thường",
                    "Một địa chỉ IP lạ đã bị hệ thống tự động chặn sau 5 lần nhập sai.",
                    "warning"
                );

            }
        );

    }


    if (remindButton) {

        remindButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Đã gửi nhắc nhở",
                    "Thông báo yêu cầu kích hoạt 2FA đã được gửi đến 2 nhân viên chưa hoàn tất.",
                    "mail"
                );

            }
        );

    }


    if (dateButton) {

        dateButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Bộ lọc thời gian",
                    "Hiện đang hiển thị nhật ký của ngày hôm nay.",
                    "calendar_today"
                );

            }
        );

    }


    if (exportButton) {

        exportButton.addEventListener(
            "click",
            exportAuditLogs
        );

    }

}


/* =========================================================
   EXPORT AUDIT LOG
========================================================= */

function exportAuditLogs() {

    const rows =
        document.querySelectorAll(
            "#auditTableBody tr"
        );

    let csv =
        "Thời gian,Người dùng,Hành động,Thiết bị,Địa chỉ IP,Trạng thái\n";

    rows.forEach(function (row) {

        if (
            row.style.display === "none"
        ) {
            return;
        }

        const cells =
            row.querySelectorAll("td");

        if (cells.length < 6) {
            return;
        }

        const time =
            cells[0].innerText
                .replace(/\n/g, " ")
                .trim();

        const user =
            cells[1].innerText
                .replace(/\n/g, " ")
                .trim();

        const action =
            cells[2].innerText
                .replace(/\n/g, " ")
                .trim();

        const device =
            cells[3].innerText
                .replace(/\n/g, " ")
                .trim();

        const ip =
            cells[4].innerText
                .replace(/\n/g, " ")
                .trim();

        const status =
            cells[5].innerText
                .replace(/\n/g, " ")
                .trim();

        const values = [
            time,
            user,
            action,
            device,
            ip,
            status
        ];

        csv +=
            values
                .map(csvEscape)
                .join(",") +
            "\n";

    });


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
        "nhat-ky-bao-mat.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);


    showToast(
        "Xuất nhật ký thành công",
        "Tệp CSV nhật ký bảo mật đã được tạo và tải xuống.",
        "download"
    );

}


function csvEscape(value) {

    const text =
        String(value)
            .replace(/\r?\n|\r/g, " ");

    if (
        text.includes(",") ||
        text.includes('"')
    ) {

        return '"' +
            text.replace(
                /"/g,
                '""'
            ) +
            '"';

    }

    return text;

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

function initGlobalSearch() {

    const search =
        document.getElementById(
            "globalSearch"
        );

    if (!search) {
        return;
    }

    search.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Enter"
            ) {
                return;
            }

            const value =
                search.value.trim();

            if (!value) {

                showToast(
                    "Tìm kiếm",
                    "Vui lòng nhập từ khóa cần tìm.",
                    "search"
                );

                return;
            }

            const logSearch =
                document.getElementById(
                    "logSearch"
                );

            if (logSearch) {

                logSearch.value =
                    value;

                applyAuditFilters();

                document
                    .querySelector(
                        ".audit-table"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

            }

            showToast(
                "Đã thực hiện tìm kiếm",
                "Đang tìm kiếm với từ khóa: " +
                value,
                "search"
            );

        }
    );

}


/* =========================================================
   CURRENT TIME
========================================================= */

function updateCurrentTime() {

    const element =
        document.getElementById(
            "currentTime"
        );

    if (!element) {
        return;
    }

    const now =
        new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");

    const date =
        String(
            now.getDate()
        ).padStart(2, "0");

    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");

    const year =
        now.getFullYear();

    element.textContent =
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        " " +
        date +
        "/" +
        month +
        "/" +
        year;

}


/* =========================================================
   IP CONFIG MODAL
========================================================= */

function showIpConfigModal() {

    removeExistingModal();

    const overlay =
        document.createElement("div");

    overlay.className =
        "modal-overlay show";

    overlay.id =
        "dynamicModal";

    overlay.innerHTML = `
        <div class="modal">

            <div class="modal-header">

                <div class="modal-title">

                    <span class="material-symbols-outlined">
                        lan
                    </span>

                    Cấu hình IP Whitelist

                </div>

                <button
                    type="button"
                    class="modal-close"
                    id="modalClose"
                >
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </button>

            </div>

            <div class="modal-body">

                <p>
                    Chỉ cho phép các địa chỉ IP được phê duyệt
                    truy cập tài nguyên bảo mật cao.
                </p>

                <label
                    style="
                        display:block;
                        margin-bottom:6px;
                        font-size:12px;
                        font-weight:600;
                        color:#0b1c30;
                    "
                >
                    Địa chỉ IP được phép
                </label>

                <input
                    type="text"
                    id="ipWhitelistInput"
                    value="118.69.182.45"
                    placeholder="Ví dụ: 118.69.182.45"
                    style="
                        width:100%;
                        height:40px;
                        border:1px solid #e2e8f0;
                        border-radius:8px;
                        padding:0 12px;
                        outline:none;
                        font-family:Inter,sans-serif;
                    "
                >

            </div>

            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary small-btn"
                    id="modalCancel"
                >
                    Hủy
                </button>

                <button
                    type="button"
                    class="btn btn-primary small-btn"
                    id="modalSave"
                >
                    <span class="material-symbols-outlined">
                        save
                    </span>

                    Lưu cấu hình
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(
        overlay
    );


    const close =
        document.getElementById(
            "modalClose"
        );

    const cancel =
        document.getElementById(
            "modalCancel"
        );

    const save =
        document.getElementById(
            "modalSave"
        );


    function closeModal() {

        overlay.classList.remove(
            "show"
        );

        setTimeout(function () {

            overlay.remove();

        }, 200);

    }


    if (close) {
        close.addEventListener(
            "click",
            closeModal
        );
    }

    if (cancel) {
        cancel.addEventListener(
            "click",
            closeModal
        );
    }

    if (save) {

        save.addEventListener(
            "click",
            function () {

                const input =
                    document.getElementById(
                        "ipWhitelistInput"
                    );

                const ip =
                    input
                        ? input.value.trim()
                        : "";

                if (!ip) {

                    alert(
                        "Vui lòng nhập địa chỉ IP."
                    );

                    return;
                }

                closeModal();

                showToast(
                    "Đã lưu IP Whitelist",
                    "Địa chỉ IP " +
                    ip +
                    " đã được thêm vào danh sách được phép.",
                    "lan"
                );

            }
        );

    }


    overlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target === overlay
            ) {
                closeModal();
            }

        }
    );

}


/* =========================================================
   REMOVE EXISTING MODAL
========================================================= */

function removeExistingModal() {

    const existing =
        document.getElementById(
            "dynamicModal"
        );

    if (existing) {
        existing.remove();
    }

}


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /* ESC đóng toast */
        if (
            event.key === "Escape"
        ) {

            hideToast();

            const modal =
                document.getElementById(
                    "dynamicModal"
                );

            if (modal) {
                modal.remove();
            }

        }

        /* Ctrl + K focus search */
        if (
            (event.ctrlKey ||
                event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            const search =
                document.getElementById(
                    "globalSearch"
                );

            if (search) {
                search.focus();
            }

        }

    }
);