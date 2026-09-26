/* =========================================================
   PROJECT MANAGEMENT
   LỊCH LÀM VIỆC & DEADLINE
   JavaScript thuần - không sử dụng Tailwind
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeCalendar();

    initializeSidebar();

    initializeTopbar();

    initializeCalendarControls();

    initializeFilters();

    initializeActions();

    initializeNotes();

    initializeModal();

    initializeNotifications();

    initializeKeyboardShortcuts();

});


/* =========================================================
   APPLICATION STATE
========================================================= */

const appState = {

    currentDate: new Date(2025, 5, 18),

    selectedDate: new Date(2025, 5, 18),

    currentView: "month",

    projectFilter: "all",

    eventTypeFilter: "all",

    searchText: "",

    mobileSidebarOpen: false

};


/* =========================================================
   EVENT DATA
========================================================= */

const calendarEvents = [

    {
        id: 1,
        date: "2025-06-09",
        time: "09:00",
        title: "Standup W23",
        project: "ecomm",
        type: "meeting"
    },

    {
        id: 2,
        date: "2025-06-10",
        time: "14:00",
        title: "User Testing",
        project: "ecomm",
        type: "meeting"
    },

    {
        id: 3,
        date: "2025-06-12",
        time: "10:00",
        title: "Sync BE API",
        project: "ecomm",
        type: "meeting"
    },

    {
        id: 4,
        date: "2025-06-13",
        time: "17:00",
        title: "Nộp bản vẽ sơ bộ",
        project: "hrm",
        type: "design"
    },

    {
        id: 5,
        date: "2025-06-16",
        time: "09:00",
        title: "Daily ECOMM",
        project: "ecomm",
        type: "meeting"
    },

    {
        id: 6,
        date: "2025-06-16",
        time: "15:00",
        title: "Wireframe VNPAY",
        project: "ecomm",
        type: "design"
    },

    {
        id: 7,
        date: "2025-06-17",
        time: "09:30",
        title: "Review Tech Lead",
        project: "ecomm",
        type: "meeting"
    },

    {
        id: 8,
        date: "2025-06-17",
        time: "16:00",
        title: "Fix responsive",
        project: "ecomm",
        type: "design"
    },

    {
        id: 9,
        date: "2025-06-18",
        time: "09:00",
        title: "Standup",
        project: "ecomm",
        type: "meeting"
    },

    {
        id: 10,
        date: "2025-06-18",
        time: "10:30",
        title: "Design Critique",
        project: "ecomm",
        type: "meeting"
    },

    {
        id: 11,
        date: "2025-06-18",
        time: "17:00",
        title: "UI Kit v2 - Deadline",
        project: "ecomm",
        type: "urgent"
    },

    {
        id: 12,
        date: "2025-06-18",
        time: "14:00",
        title: "Tokens v1.4",
        project: "ecomm",
        type: "design"
    },

    {
        id: 13,
        date: "2025-06-19",
        time: "09:00",
        title: "PV Trainee",
        project: "hrm",
        type: "meeting"
    },

    {
        id: 14,
        date: "2025-06-19",
        time: "12:00",
        title: "Proto MoMo",
        project: "ecomm",
        type: "design"
    },

    {
        id: 15,
        date: "2025-06-20",
        time: "16:00",
        title: "Nghiệm thu S4",
        project: "ecomm",
        type: "sprint"
    },

    {
        id: 16,
        date: "2025-06-20",
        time: "17:00",
        title: "Chốt Timesheet",
        project: "hrm",
        type: "neutral"
    },

    {
        id: 17,
        date: "2025-06-23",
        time: "09:00",
        title: "Kick-off Sprint 5",
        project: "ecomm",
        type: "sprint"
    },

    {
        id: 18,
        date: "2025-06-23",
        time: "17:00",
        title: "Nộp Benchmark HRM",
        project: "hrm",
        type: "design"
    },

    {
        id: 19,
        date: "2025-06-24",
        time: "14:00",
        title: "Thảo luận luồng Admin",
        project: "hrm",
        type: "meeting"
    },

    {
        id: 20,
        date: "2025-06-25",
        time: "17:00",
        title: "Final Review Đơn hàng",
        project: "hrm",
        type: "design"
    },

    {
        id: 21,
        date: "2025-06-27",
        time: "16:00",
        title: "Design Retro",
        project: "ecomm",
        type: "meeting"
    },

    {
        id: 22,
        date: "2025-06-30",
        time: "15:00",
        title: "Đánh giá KPI tháng 06",
        project: "hrm",
        type: "sprint"
    }

];


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function padNumber(number) {
    return String(number).padStart(2, "0");
}


function formatDateKey(date) {
    return [
        date.getFullYear(),
        padNumber(date.getMonth() + 1),
        padNumber(date.getDate())
    ].join("-");
}


function isSameDate(dateA, dateB) {
    return (
        dateA.getFullYear() === dateB.getFullYear() &&
        dateA.getMonth() === dateB.getMonth() &&
        dateA.getDate() === dateB.getDate()
    );
}


function getMonday(date) {
    const result = new Date(date);
    const day = result.getDay();
    const difference = day === 0 ? -6 : 1 - day;
    result.setDate(result.getDate() + difference);
    result.setHours(0, 0, 0, 0);
    return result;
}


function getWeekNumber(date) {
    const tempDate = new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        )
    );
    const dayNumber = tempDate.getUTCDay() || 7;
    tempDate.setUTCDate(
        tempDate.getUTCDate() + 4 - dayNumber
    );
    const yearStart = new Date(
        Date.UTC(
            tempDate.getUTCFullYear(),
            0,
            1
        )
    );
    return Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
}


function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   TOAST
========================================================= */

function showToast(title, message, type = "info") {

    const container = document.getElementById("toastContainer");

    if (!container) return;

    const icons = {
        success: "check_circle",
        info: "info",
        warning: "warning",
        error: "error"
    };

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    toast.innerHTML = `
        <div class="toast-icon">
            <span class="material-symbols-outlined">
                ${icons[type] || icons.info}
            </span>
        </div>
        <div class="toast-content">
            <div class="toast-title">
                ${escapeHtml(title)}
            </div>
            <div class="toast-message">
                ${escapeHtml(message)}
            </div>
        </div>
        <button type="button" class="toast-close" aria-label="Đóng">
            <span class="material-symbols-outlined">
                close
            </span>
        </button>
    `;

    container.appendChild(toast);

    const closeButton = toast.querySelector(".toast-close");

    function removeToast() {
        toast.classList.add("removing");
        setTimeout(function () {
            toast.remove();
        }, 250);
    }

    closeButton.addEventListener("click", removeToast);
    setTimeout(removeToast, 4000);

}


/* =========================================================
   CALENDAR INITIALIZATION
========================================================= */

function initializeCalendar() {

    updateCalendarHeaderTitles();

    renderCalendar();

    renderMiniCalendar();

}


function updateCalendarHeaderTitles() {

    const titleEl = document.getElementById("calendarTitle");

    const miniTitleEl = document.getElementById("miniCalendarTitle");

    const weekLabelEl = document.getElementById("calendarWeekLabel");


    const monthStr = padNumber(appState.currentDate.getMonth() + 1);

    const yearStr = appState.currentDate.getFullYear();


    if (titleEl) {
        titleEl.textContent = `Tháng ${monthStr} / ${yearStr}`;
    }


    if (miniTitleEl) {
        miniTitleEl.textContent = `Tháng ${monthStr} / ${yearStr}`;
    }


    if (weekLabelEl) {

        const monday = getMonday(appState.currentDate);

        const sunday = new Date(monday);

        sunday.setDate(sunday.getDate() + 6);


        const weekNum = getWeekNumber(appState.currentDate);


        const startStr = `${padNumber(monday.getDate())}/${padNumber(monday.getMonth() + 1)}`;

        const endStr = `${padNumber(sunday.getDate())}/${padNumber(sunday.getMonth() + 1)}/${sunday.getFullYear()}`;


        weekLabelEl.innerHTML = `Tuần ${weekNum} <span>(${startStr} - ${endStr})</span>`;

    }

}


/* =========================================================
   RENDER MAIN CALENDAR
========================================================= */

function renderCalendar() {

    const grid = document.getElementById("calendarGrid");

    if (!grid) return;


    grid.innerHTML = "";

    grid.className = "calendar-grid";


    if (appState.currentView === "schedule") {

        renderScheduleView(grid);

        return;

    }


    if (appState.currentView === "week") {
        grid.classList.add("week-mode");
    }

    if (appState.currentView === "day") {
        grid.classList.add("day-mode");
    }


    const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];


    weekdays.forEach(function (weekday, index) {

        const header = document.createElement("div");

        header.className = "calendar-weekday";


        if (index >= 5) {
            header.classList.add("weekend");
        }


        header.textContent = weekday;

        grid.appendChild(header);

    });


    const year = appState.currentDate.getFullYear();

    const month = appState.currentDate.getMonth();


    const firstDay = new Date(year, month, 1);

    const lastDay = new Date(year, month + 1, 0);


    let startOffset = firstDay.getDay() - 1;

    if (startOffset < 0) startOffset = 6;


    const daysInMonth = lastDay.getDate();

    const previousMonthLastDay = new Date(year, month, 0).getDate();


    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;


    const currentWeekStart = getMonday(appState.selectedDate);

    const currentWeekEnd = new Date(currentWeekStart);

    currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);


    let renderedCount = 0;


    for (let index = 0; index < totalCells; index++) {

        const dayCell = document.createElement("div");

        dayCell.className = "calendar-day";


        let cellDate;


        if (index < startOffset) {

            const day = previousMonthLastDay - startOffset + index + 1;

            cellDate = new Date(year, month - 1, day);

            dayCell.classList.add("other-month");

        } else {

            const day = index - startOffset + 1;

            cellDate = new Date(year, month, day);


            if (day > daysInMonth) {

                cellDate = new Date(year, month + 1, day - daysInMonth);

                dayCell.classList.add("other-month");

            }

        }


        const dateKey = formatDateKey(cellDate);

        const isToday = isSameDate(cellDate, appState.selectedDate);

        const inCurrentWeek = cellDate >= currentWeekStart && cellDate <= currentWeekEnd;


        if (isToday) dayCell.classList.add("today");

        if (inCurrentWeek) dayCell.classList.add("current-week");

        if (cellDate.getDay() === 0 || cellDate.getDay() === 6) {
            dayCell.classList.add("weekend");
        }


        if (appState.currentView === "day" && !isToday) {
            dayCell.style.display = "none";
        }


        if (appState.currentView === "week" && !inCurrentWeek) {
            dayCell.style.display = "none";
        }


        dayCell.dataset.date = dateKey;


        /* Day header */

        const dayHeader = document.createElement("div");

        dayHeader.className = "day-header";


        const dayNumber = document.createElement("span");

        dayNumber.className = "day-number";

        dayNumber.textContent = cellDate.getDate();


        const addButton = document.createElement("button");

        addButton.type = "button";

        addButton.className = "day-add-button";

        addButton.innerHTML = `<span class="material-symbols-outlined">add_circle</span>`;

        addButton.title = "Tạo ghi chú / Deadline";


        addButton.addEventListener("click", function (event) {

            event.stopPropagation();

            appState.selectedDate = new Date(cellDate);

            openCreateModal(
                "Tạo ghi chú / Deadline",
                `Tạo deadline cho ngày ${padNumber(cellDate.getDate())}/${padNumber(cellDate.getMonth() + 1)}/${cellDate.getFullYear()}`
            );

        });


        dayHeader.appendChild(dayNumber);

        dayHeader.appendChild(addButton);

        dayCell.appendChild(dayHeader);


        /* Filtered events for day */

        const dayEventsContainer = document.createElement("div");

        dayEventsContainer.className = "day-events";


        const matchedEvents = calendarEvents.filter(function (evt) {

            if (evt.date !== dateKey) return false;

            if (appState.projectFilter !== "all" && evt.project !== appState.projectFilter) {
                return false;
            }

            if (appState.eventTypeFilter !== "all" && evt.type !== appState.eventTypeFilter) {
                return false;
            }

            if (appState.searchText.trim() !== "") {

                const term = appState.searchText.toLowerCase();

                const titleMatch = evt.title.toLowerCase().includes(term);

                const projectMatch = evt.project.toLowerCase().includes(term);

                if (!titleMatch && !projectMatch) return false;

            }

            return true;

        });


        matchedEvents.forEach(function (evt) {

            const evtEl = document.createElement("div");

            evtEl.className = `calendar-event type-${evt.type}`;

            evtEl.innerHTML = `
                <span class="event-time">${escapeHtml(evt.time)}</span>
                <span class="event-title">${escapeHtml(evt.title)}</span>
            `;


            evtEl.addEventListener("click", function (e) {

                e.stopPropagation();

                showToast(
                    `Sự kiện: ${evt.title}`,
                    `Dự án: ${evt.project.toUpperCase()} • Giờ: ${evt.time} (${evt.date})`,
                    "info"
                );

            });


            dayEventsContainer.appendChild(evtEl);

        });


        dayCell.appendChild(dayEventsContainer);


        /* Selection click */

        dayCell.addEventListener("click", function () {

            appState.selectedDate = new Date(cellDate);

            renderCalendar();

            renderMiniCalendar();

        });


        grid.appendChild(dayCell);

        renderedCount++;

    }

}


/* =========================================================
   RENDER SCHEDULE VIEW
========================================================= */

function renderScheduleView(container) {

    const scheduleView = document.createElement("div");

    scheduleView.className = "schedule-view";


    const filteredEvents = calendarEvents.filter(function (evt) {

        if (appState.projectFilter !== "all" && evt.project !== appState.projectFilter) {
            return false;
        }

        if (appState.eventTypeFilter !== "all" && evt.type !== appState.eventTypeFilter) {
            return false;
        }

        if (appState.searchText.trim() !== "") {

            const term = appState.searchText.toLowerCase();

            return (
                evt.title.toLowerCase().includes(term) ||
                evt.project.toLowerCase().includes(term)
            );

        }

        return true;

    }).sort((a, b) => a.date.localeCompare(b.date));


    if (filteredEvents.length === 0) {

        scheduleView.innerHTML = `
            <div class="calendar-empty">
                <span class="material-symbols-outlined">event_busy</span>
                <strong>Không có lịch trình phù hợp</strong>
                <span>Vui lòng chọn bộ lọc khác hoặc kiểm tra từ khóa tìm kiếm.</span>
            </div>
        `;

    } else {

        filteredEvents.forEach(function (evt) {

            const item = document.createElement("div");

            item.className = "schedule-item";

            item.style.display = "flex";

            item.style.alignItems = "center";

            item.style.justifySpaceBetween = "space-between";

            item.style.gap = "15px";


            item.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px;">
                    <div class="calendar-event type-${evt.type}" style="width:auto; padding:6px 10px;">
                        <span class="event-time" style="font-size:10px;">${escapeHtml(evt.date)} • ${escapeHtml(evt.time)}</span>
                        <strong style="font-size:12px;">${escapeHtml(evt.title)}</strong>
                    </div>
                </div>
                <div style="color:#64748b; font-size:10px; font-weight:700;">
                    ${evt.project.toUpperCase()}
                </div>
            `;


            item.addEventListener("click", function () {

                showToast("Chi tiết sự kiện", `${evt.title} (${evt.date} ${evt.time})`, "info");

            });


            scheduleView.appendChild(item);

        });

    }


    container.appendChild(scheduleView);

}


/* =========================================================
   RENDER MINI CALENDAR
========================================================= */

function renderMiniCalendar() {

    const grid = document.getElementById("miniCalendarGrid");

    if (!grid) return;


    grid.innerHTML = "";


    const year = appState.currentDate.getFullYear();

    const month = appState.currentDate.getMonth();


    const firstDay = new Date(year, month, 1);

    const lastDay = new Date(year, month + 1, 0);


    let startOffset = firstDay.getDay() - 1;

    if (startOffset < 0) startOffset = 6;


    const daysInMonth = lastDay.getDate();

    const prevMonthDays = new Date(year, month, 0).getDate();


    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;


    for (let i = 0; i < totalCells; i++) {

        const btn = document.createElement("button");

        btn.type = "button";

        btn.className = "mini-day";


        let cellDate;


        if (i < startOffset) {

            const day = prevMonthDays - startOffset + i + 1;

            cellDate = new Date(year, month - 1, day);

            btn.classList.add("other");

        } else {

            const day = i - startOffset + 1;

            if (day <= daysInMonth) {

                cellDate = new Date(year, month, day);

            } else {

                cellDate = new Date(year, month + 1, day - daysInMonth);

                btn.classList.add("other");

            }

        }


        btn.textContent = cellDate.getDate();


        const dateKey = formatDateKey(cellDate);


        if (isSameDate(cellDate, appState.selectedDate)) {

            btn.classList.add("selected");

        }


        if (isSameDate(cellDate, new Date())) {

            btn.classList.add("today-ring");

        }


        const hasDeadline = calendarEvents.some(
            evt => evt.date === dateKey && (evt.type === "urgent" || evt.type === "design")
        );


        if (hasDeadline) {

            btn.classList.add("has-deadline");

        }


        btn.addEventListener("click", function () {

            appState.selectedDate = new Date(cellDate);

            appState.currentDate = new Date(cellDate);

            updateCalendarHeaderTitles();

            renderCalendar();

            renderMiniCalendar();

        });


        grid.appendChild(btn);

    }

}


/* =========================================================
   SIDEBAR & MOBILE NAVIGATION
========================================================= */

function initializeSidebar() {

    const mobileMenuBtn = document.getElementById("mobileMenuButton");

    const overlay = document.getElementById("mobileOverlay");

    const sidebar = document.getElementById("sidebar");

    const logoutBtn = document.getElementById("logoutButton");


    function toggleMobileSidebar() {

        appState.mobileSidebarOpen = !appState.mobileSidebarOpen;

        if (appState.mobileSidebarOpen) {

            sidebar?.classList.add("mobile-open");

            overlay?.classList.add("open");

        } else {

            sidebar?.classList.remove("mobile-open");

            overlay?.classList.remove("open");

        }

    }


    mobileMenuBtn?.addEventListener("click", toggleMobileSidebar);

    overlay?.addEventListener("click", toggleMobileSidebar);


    logoutBtn?.addEventListener("click", function () {

        if (confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?")) {

            showToast("Đăng xuất thành công", "Đang chuyển hướng về trang đăng nhập...", "success");

            setTimeout(() => {
                window.location.reload();
            }, 1200);

        }

    });

}


/* =========================================================
   TOPBAR CONTROLS
========================================================= */

function initializeTopbar() {

    const searchInput = document.getElementById("globalSearch");

    const quickReportBtn = document.getElementById("quickReportButton");

    const helpBtn = document.getElementById("helpButton");

    const topbarUser = document.getElementById("topbarUser");


    searchInput?.addEventListener("input", function (e) {

        appState.searchText = e.target.value;

        renderCalendar();

        filterSearchableSidebarItems();

    });


    quickReportBtn?.addEventListener("click", function () {

        openCreateModal(
            "Báo cáo nhanh",
            "Gửi báo cáo tiến độ công việc trong ngày cho Project Manager."
        );

    });


    helpBtn?.addEventListener("click", function () {

        showToast(
            "Trợ giúp & Hướng dẫn",
            "Sử dụng các nút bấm trên thanh công cụ để chuyển đổi góc nhìn hoặc lọc công việc.",
            "info"
        );

    });


    topbarUser?.addEventListener("click", function () {

        showToast(
            "Thông tin tài khoản",
            "Trần Thị Bình • NV-002 (UI/UX Designer)",
            "info"
        );

    });

}


function filterSearchableSidebarItems() {

    const term = appState.searchText.toLowerCase().trim();

    const items = document.querySelectorAll(".searchable-item");


    items.forEach(function (item) {

        const searchData = item.dataset.search || item.textContent;

        if (term === "" || searchData.toLowerCase().includes(term)) {

            item.classList.remove("search-hidden");

        } else {

            item.classList.add("search-hidden");

        }

    });

}


/* =========================================================
   CALENDAR NAVIGATION & VIEW SWITCHING
========================================================= */

function initializeCalendarControls() {

    const todayBtn = document.getElementById("todayButton");

    const miniTodayBtn = document.getElementById("miniTodayButton");

    const prevBtn = document.getElementById("previousMonthButton");

    const nextBtn = document.getElementById("nextMonthButton");

    const viewTabs = document.querySelectorAll("#viewTabs .view-tab");


    function goToday() {

        const today = new Date(2025, 5, 18);

        appState.currentDate = new Date(today);

        appState.selectedDate = new Date(today);

        updateCalendarHeaderTitles();

        renderCalendar();

        renderMiniCalendar();

        showToast("Đã về ngày hôm nay", "18/06/2025", "success");

    }


    todayBtn?.addEventListener("click", goToday);

    miniTodayBtn?.addEventListener("click", goToday);


    prevBtn?.addEventListener("click", function () {

        if (appState.currentView === "month" || appState.currentView === "schedule") {

            appState.currentDate.setMonth(appState.currentDate.getMonth() - 1);

        } else if (appState.currentView === "week") {

            appState.currentDate.setDate(appState.currentDate.getDate() - 7);

        } else if (appState.currentView === "day") {

            appState.currentDate.setDate(appState.currentDate.getDate() - 1);

            appState.selectedDate = new Date(appState.currentDate);

        }

        updateCalendarHeaderTitles();

        renderCalendar();

        renderMiniCalendar();

    });


    nextBtn?.addEventListener("click", function () {

        if (appState.currentView === "month" || appState.currentView === "schedule") {

            appState.currentDate.setMonth(appState.currentDate.getMonth() + 1);

        } else if (appState.currentView === "week") {

            appState.currentDate.setDate(appState.currentDate.getDate() + 7);

        } else if (appState.currentView === "day") {

            appState.currentDate.setDate(appState.currentDate.getDate() + 1);

            appState.selectedDate = new Date(appState.currentDate);

        }

        updateCalendarHeaderTitles();

        renderCalendar();

        renderMiniCalendar();

    });


    viewTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            viewTabs.forEach(t => t.classList.remove("active"));

            tab.classList.add("active");


            appState.currentView = tab.dataset.view;

            renderCalendar();

        });

    });

}


/* =========================================================
   FILTERS
========================================================= */

function initializeFilters() {

    const projectSelect = document.getElementById("projectFilter");

    const eventTypeSelect = document.getElementById("eventTypeFilter");


    projectSelect?.addEventListener("change", function (e) {

        appState.projectFilter = e.target.value;

        renderCalendar();

        filterSearchableSidebarItems();

    });


    eventTypeSelect?.addEventListener("change", function (e) {

        appState.eventTypeFilter = e.target.value;

        renderCalendar();

        filterSearchableSidebarItems();

    });

}


/* =========================================================
   ACTION BUTTONS
========================================================= */

function initializeActions() {

    const syncBtn = document.getElementById("syncCalendarButton");

    const requestLeaveBtn = document.getElementById("requestLeaveButton");

    const createDeadlineBtn = document.getElementById("createDeadlineButton");

    const slaBtn = document.getElementById("slaButton");


    syncBtn?.addEventListener("click", function () {

        showToast(
            "Đồng bộ thành công",
            "Đã kết nối và tải 4 sự kiện mới từ Google Calendar.",
            "success"
        );

    });


    requestLeaveBtn?.addEventListener("click", function () {

        openCreateModal(
            "Đặt lịch / Xin nghỉ",
            "Gửi đơn đăng ký nghỉ phép hoặc làm việc remote cho bộ phận HR."
        );

    });


    createDeadlineBtn?.addEventListener("click", function () {

        openCreateModal(
            "Tạo ghi chú / Deadline",
            "Thêm mới mốc bàn giao công việc hoặc sự kiện cá nhân."
        );

    });


    slaBtn?.addEventListener("click", function () {

        showToast(
            "Quy định SLA Deadline",
            "Mọi yêu cầu dời deadline cần gửi trước 24h và có xác nhận của PM.",
            "warning"
        );

    });


    /* Dynamic action buttons in sidebar */

    document.addEventListener("click", function (e) {

        const target = e.target.closest("button");

        if (!target) return;


        const action = target.dataset.action;


        if (action === "open-task") {

            showToast("Mở Task", "Đang chuyển đến giao diện chi tiết Task...", "info");

        } else if (action === "submit-task") {

            showToast("Nộp bài thành công", "Đã gửi bản Prototype cho Leader kiểm tra.", "success");

        } else if (action === "detail-task") {

            showToast("Chi tiết nhiệm vụ", "PRJ-HRM-02 Responsive Mobile", "info");

        } else if (action === "meeting") {

            showToast("Đang vào phòng họp", "Đang kết nối đến Room 302...", "success");

        } else if (action === "meeting-link") {

            showToast("Sao chép liên kết", "Đã chép link Google Meet vào bộ nhớ tạm.", "info");

        }

    });

}


/* =========================================================
   PERSONAL NOTES
========================================================= */

function initializeNotes() {

    const notesList = document.getElementById("notesList");

    const addNoteBtn = document.getElementById("addNoteButton");

    const addNoteFullBtn = document.getElementById("addNoteFullButton");


    notesList?.addEventListener("change", function (e) {

        if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {

            const parentLabel = e.target.closest(".note-item");

            if (e.target.checked) {

                parentLabel?.classList.add("completed");

                showToast("Hoàn thành ghi chú", "Đã đánh dấu hoàn thành.", "success");

            } else {

                parentLabel?.classList.remove("completed");

            }

        }

    });


    function addNewNotePrompt() {

        openCreateModal(
            "Thêm ghi chú cá nhân",
            "Ghi chú này sẽ chỉ hiển thị riêng với bạn."
        );

    }


    addNoteBtn?.addEventListener("click", addNewNotePrompt);

    addNoteFullBtn?.addEventListener("click", addNewNotePrompt);

}


/* =========================================================
   MODAL CONTROLS
========================================================= */

function openCreateModal(title, description) {

    const overlay = document.getElementById("modalOverlay");

    const titleEl = document.getElementById("modalTitle");

    const descEl = document.getElementById("modalDescription");

    const dateInput = document.getElementById("modalDateInput");


    if (titleEl) titleEl.textContent = title;

    if (descEl) descEl.textContent = description;

    if (dateInput) dateInput.value = formatDateKey(appState.selectedDate);


    overlay?.classList.add("open");

    overlay?.setAttribute("aria-hidden", "false");

}


function closeModal() {

    const overlay = document.getElementById("modalOverlay");

    overlay?.classList.remove("open");

    overlay?.setAttribute("aria-hidden", "true");

}


function initializeModal() {

    const overlay = document.getElementById("modalOverlay");

    const closeBtn = document.getElementById("modalClose");

    const cancelBtn = document.getElementById("modalCancel");

    const confirmBtn = document.getElementById("modalConfirm");


    closeBtn?.addEventListener("click", closeModal);

    cancelBtn?.addEventListener("click", closeModal);


    overlay?.addEventListener("click", function (e) {

        if (e.target === overlay) {
            closeModal();
        }

    });


    confirmBtn?.addEventListener("click", function () {

        const titleInput = document.getElementById("modalTitleInput");

        const dateInput = document.getElementById("modalDateInput");

        const timeInput = document.getElementById("modalTimeInput");

        const projectInput = document.getElementById("modalProjectInput");


        const titleValue = titleInput?.value.trim();


        if (!titleValue) {

            showToast("Thiếu thông tin", "Vui lòng nhập tiêu đề trước khi lưu.", "warning");

            return;

        }


        calendarEvents.push({

            id: Date.now(),

            date: dateInput ? dateInput.value : formatDateKey(appState.selectedDate),

            time: timeInput ? timeInput.value : "09:00",

            title: titleValue,

            project: projectInput ? projectInput.value : "ecomm",

            type: "design"

        });


        if (titleInput) titleInput.value = "";


        closeModal();

        renderCalendar();

        renderMiniCalendar();

        showToast("Lưu thành công", `Đã lưu: "${titleValue}"`, "success");

    });

}


/* =========================================================
   NOTIFICATION PANEL
========================================================= */

function initializeNotifications() {

    const notifBtn = document.getElementById("notificationButton");

    const notifPanel = document.getElementById("notificationPanel");

    const markReadBtn = document.getElementById("markNotificationsRead");

    const countBadge = document.getElementById("notificationCount");

    const subtitle = document.getElementById("notificationSubtitle");


    notifBtn?.addEventListener("click", function (e) {

        e.stopPropagation();

        notifPanel?.classList.toggle("open");

    });


    document.addEventListener("click", function (e) {

        if (!notifPanel?.contains(e.target) && !notifBtn?.contains(e.target)) {

            notifPanel?.classList.remove("open");

        }

    });


    markReadBtn?.addEventListener("click", function () {

        const unreadItems = notifPanel?.querySelectorAll(".notification-item.unread");

        unreadItems?.forEach(item => item.classList.remove("unread"));


        if (countBadge) countBadge.style.display = "none";

        if (subtitle) subtitle.textContent = "0 thông báo chưa đọc";


        showToast("Thông báo", "Đã đánh dấu tất cả là đã đọc.", "info");

    });

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function initializeKeyboardShortcuts() {

    document.addEventListener("keydown", function (e) {

        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {

            e.preventDefault();

            const searchInput = document.getElementById("globalSearch");

            searchInput?.focus();

        }


        if (e.key === "Escape") {

            closeModal();

            const notifPanel = document.getElementById("notificationPanel");

            notifPanel?.classList.remove("open");

        }

    });

}