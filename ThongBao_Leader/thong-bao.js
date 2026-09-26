/* =========================================================
   THÔNG BÁO - JAVASCRIPT
   Không sử dụng Tailwind
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const toast = document.getElementById("toastNotification");
    const toastClose = document.getElementById("toastClose");

    const composeForm = document.getElementById("composeForm");
    const titleInput = document.getElementById("titleInput");
    const contentInput = document.getElementById("contentInput");
    const audienceInput = document.getElementById("audienceInput");

    const composerTitle = document.getElementById("composerTitle");
    const composerSubtitle = document.getElementById("composerSubtitle");
    const submitButtonText = document.getElementById("submitButtonText");

    const newNotificationButton =
        document.getElementById("newNotificationButton");

    const previewButton =
        document.getElementById("previewButton");

    const saveDraftButton =
        document.getElementById("saveDraftButton");

    const refreshButton =
        document.getElementById("refreshButton");

    const notificationSearch =
        document.getElementById("notificationSearch");

    const priorityFilter =
        document.getElementById("priorityFilter");

    const audienceFilter =
        document.getElementById("audienceFilter");

    const notificationList =
        document.getElementById("notificationList");

    const schedulePicker =
        document.getElementById("schedulePicker");

    const scheduleRadios =
        document.querySelectorAll('input[name="schedule"]');

    // MODAL TEMPLATE ELEMENTS
    const templateButton = document.getElementById("templateButton");
    const templateModal = document.getElementById("templateModal");
    const closeTemplateModal = document.getElementById("closeTemplateModal");
    const btnCancelTemplate = document.getElementById("btnCancelTemplate");
    const useTemplateButtons = document.querySelectorAll(".use-template-btn");

    // BIẾN THEO DÕI THÔNG BÁO ĐANG CHỈNH SỬA
    let editingCard = null;


    /* =====================================================
       TOAST
    ====================================================== */

    function showToast(title, message) {
        if (!toast) return;

        const toastTitle = toast.querySelector(".toast-content strong");
        const toastMessage = toast.querySelector(".toast-content span");

        if (toastTitle) toastTitle.textContent = title;
        if (toastMessage) toastMessage.textContent = message;

        toast.classList.remove("hidden");

        clearTimeout(window.toastTimer);
        window.toastTimer = setTimeout(function () {
            hideToast();
        }, 5000);
    }

    function hideToast() {
        if (!toast) return;
        toast.classList.add("hidden");
    }

    if (toastClose) {
        toastClose.addEventListener("click", hideToast);
    }


    /* =====================================================
       MODAL CÀI ĐẶT MẪU THÔNG BÁO
    ====================================================== */

    function openTemplateModal() {
        if (templateModal) {
            templateModal.classList.remove("hidden");
        }
    }

    function closeTemplateModalFunc() {
        if (templateModal) {
            templateModal.classList.add("hidden");
        }
    }

    if (templateButton) {
        templateButton.addEventListener("click", openTemplateModal);
    }

    if (closeTemplateModal) {
        closeTemplateModal.addEventListener("click", closeTemplateModalFunc);
    }

    if (btnCancelTemplate) {
        btnCancelTemplate.addEventListener("click", closeTemplateModalFunc);
    }

    if (templateModal) {
        templateModal.addEventListener("click", function (e) {
            if (e.target === templateModal) {
                closeTemplateModalFunc();
            }
        });
    }

    // Chọn sử dụng mẫu
    useTemplateButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const templateItem = btn.closest(".template-item");
            if (!templateItem) return;

            const title = templateItem.dataset.title || "";
            const content = templateItem.dataset.content || "";
            const priority = templateItem.dataset.priority || "normal";
            const audience = templateItem.dataset.audience || "all";

            if (titleInput) titleInput.value = title;
            if (contentInput) contentInput.value = content;
            if (audienceInput) audienceInput.value = audience;

            const priorityRadio = document.querySelector(
                'input[name="priority"][value="' + priority + '"]'
            );
            if (priorityRadio) priorityRadio.checked = true;

            closeTemplateModalFunc();
            showToast(
                "Đã áp dụng mẫu",
                "Mẫu thông báo đã được đưa vào khung soạn thảo thành công."
            );

            if (titleInput) titleInput.focus();
        });
    });


    /* =====================================================
       NEW NOTIFICATION (RESET FORM TO CREATE MODE)
    ====================================================== */

    function resetComposerForm() {
        editingCard = null;
        if (composeForm) composeForm.reset();

        if (composerTitle) composerTitle.textContent = "Soạn thông báo mới";
        if (composerSubtitle) composerSubtitle.textContent = "Gửi tức thời hoặc đặt lịch phát tự động";
        if (submitButtonText) submitButtonText.textContent = "Gửi thông báo ngay";

        updateSchedulePicker();
    }

    if (newNotificationButton) {
        newNotificationButton.addEventListener("click", function () {
            resetComposerForm();
            if (titleInput) titleInput.focus();
            showToast(
                "Tạo thông báo mới",
                "Bạn có thể nhập nội dung thông báo mới ở khung soạn thảo bên phải."
            );
        });
    }


    /* =====================================================
       SCHEDULE PICKER
    ====================================================== */

    function updateSchedulePicker() {
        const selected = document.querySelector(
            'input[name="schedule"]:checked'
        );
        if (!selected || !schedulePicker) return;

        if (selected.value === "later") {
            schedulePicker.classList.add("visible");
        } else {
            schedulePicker.classList.remove("visible");
        }
    }

    scheduleRadios.forEach(function (radio) {
        radio.addEventListener("change", updateSchedulePicker);
    });

    updateSchedulePicker();


    /* =====================================================
       HELPER: TẠO THẺ THÔNG BÁO MỚI (DOM ELEMENT)
    ====================================================== */

    function createNotificationCard(data) {
        const card = document.createElement("article");
        card.className = "notification-card";
        card.dataset.priority = data.priority;
        card.dataset.audience = data.audience;

        let priorityBadgeHTML = "";
        if (data.priority === "urgent") {
            priorityBadgeHTML = `
                <span class="priority urgent">
                    <span class="material-symbols-outlined">warning</span> Khẩn cấp
                </span>`;
        } else if (data.priority === "important") {
            priorityBadgeHTML = `
                <span class="priority important">
                    <span class="material-symbols-outlined">priority_high</span> Quan trọng
                </span>`;
        } else {
            priorityBadgeHTML = `
                <span class="priority normal">
                    <span class="material-symbols-outlined">info</span> Bình thường
                </span>`;
        }

        let statusHTML = "";
        let timeLabelHTML = "";

        if (data.isScheduled) {
            statusHTML = `
                <span class="status scheduled">
                    <span class="material-symbols-outlined">schedule</span> Đã lên lịch
                </span>`;
            timeLabelHTML = `
                <span class="time-label blue-text">
                    <span class="material-symbols-outlined">alarm</span> Lên lịch: ${data.scheduleDate} ${data.scheduleTime}
                </span>`;
        } else {
            statusHTML = `
                <span class="status sent">
                    <span class="status-dot"></span> Đã gửi
                </span>`;
            timeLabelHTML = `
                <span class="time-label">
                    <span class="material-symbols-outlined">schedule</span> Vừa xong
                </span>`;
        }

        let audienceText = "Toàn thể nhân viên";
        if (data.audience === "dept") audienceText = "Theo phòng ban";
        if (data.audience === "project") audienceText = "Theo dự án cụ thể";
        if (data.audience === "leader") audienceText = "Nhóm Leader & Quản lý";

        card.innerHTML = `
            <div class="notification-header">
                <div class="notification-meta">
                    ${priorityBadgeHTML}
                    <span class="category-label">Thông báo hệ thống</span>
                    ${timeLabelHTML}
                </div>
                ${statusHTML}
            </div>

            <div class="notification-body">
                <h3>${escapeHTML(data.title)}</h3>
                <p>${escapeHTML(data.content)}</p>
            </div>

            <div class="notification-info">
                <div class="info-list">
                    <span>
                        <span class="material-symbols-outlined">group</span>
                        Đối tượng: <strong>${audienceText}</strong>
                    </span>
                    <span>
                        <span class="material-symbols-outlined">cell_tower</span>
                        Kênh: <strong>Email + In-app</strong>
                    </span>
                    <span>
                        <span class="material-symbols-outlined">account_circle</span>
                        Người gửi: <strong>Nguyễn Văn An (Leader)</strong>
                    </span>
                </div>
                ${data.isScheduled ? `<span class="schedule-note">Sẽ kích hoạt tự động theo lịch</span>` : `
                <div class="read-ratio">
                    <span>Đã đọc: <strong>0/48 NV</strong> (0%)</span>
                    <div class="small-progress"><div style="width:0%"></div></div>
                </div>`}
            </div>

            <div class="notification-footer">
                <div class="mini-avatars">
                    <div class="mini-avatar blue">VA</div>
                </div>
                <div class="card-actions">
                    <button class="card-button edit-button">
                        <span class="material-symbols-outlined">edit</span>
                        Chỉnh sửa
                    </button>
                    ${data.isScheduled ? `
                    <button class="card-button danger cancel-schedule-button">
                        <span class="material-symbols-outlined">event_busy</span>
                        Hủy lịch
                    </button>` : `
                    <button class="card-button copy-button">
                        <span class="material-symbols-outlined">content_copy</span>
                        Sao chép
                    </button>`}
                    <button class="card-button danger delete-button">
                        <span class="material-symbols-outlined">delete</span>
                        Xóa
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       SUBMIT FORM (THÊM MỚI HOẶC CẬP NHẬT & ĐƯA LÊN ĐẦU)
    ====================================================== */

    if (composeForm) {
        composeForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const title = titleInput ? titleInput.value.trim() : "";
            const content = contentInput ? contentInput.value.trim() : "";
            const audience = audienceInput ? audienceInput.value : "all";

            if (!title) {
                showToast("Thiếu thông tin", "Vui lòng nhập tiêu đề thông báo.");
                if (titleInput) titleInput.focus();
                return;
            }

            if (!content) {
                showToast("Thiếu thông tin", "Vui lòng nhập nội dung thông báo.");
                if (contentInput) contentInput.focus();
                return;
            }

            const priorityChecked = document.querySelector('input[name="priority"]:checked');
            const priority = priorityChecked ? priorityChecked.value : "normal";

            const scheduleChecked = document.querySelector('input[name="schedule"]:checked');
            const isScheduled = scheduleChecked && scheduleChecked.value === "later";

            const scheduleDateVal = document.getElementById("scheduleDate")?.value || "";
            const scheduleTimeVal = document.getElementById("scheduleTime")?.value || "";

            const formData = {
                title: title,
                content: content,
                priority: priority,
                audience: audience,
                isScheduled: isScheduled,
                scheduleDate: scheduleDateVal,
                scheduleTime: scheduleTimeVal
            };

            if (editingCard) {
                // CHẾ ĐỘ CHỈNH SỬA: Cập nhật dữ liệu thẻ đang chọn
                editingCard.dataset.priority = priority;
                editingCard.dataset.audience = audience;

                const h3 = editingCard.querySelector(".notification-body h3");
                const p = editingCard.querySelector(".notification-body p");
                if (h3) h3.textContent = title;
                if (p) p.textContent = content;

                // Cập nhật nhãn thời gian / trạng thái
                const statusSpan = editingCard.querySelector(".status");
                if (statusSpan) {
                    if (isScheduled) {
                        statusSpan.className = "status scheduled";
                        statusSpan.innerHTML = `<span class="material-symbols-outlined">schedule</span> Đã lên lịch`;
                    } else {
                        statusSpan.className = "status sent";
                        statusSpan.innerHTML = `<span class="status-dot"></span> Đã gửi`;
                    }
                }

                // QUAN TRỌNG: Di chuyển thông báo đã sửa LÊN ĐẦU DANH SÁCH
                if (notificationList) {
                    notificationList.prepend(editingCard);
                }

                showToast(
                    "Đã cập nhật",
                    "Thông báo đã được chỉnh sửa và đưa lên đầu danh sách."
                );

                resetComposerForm();
            } else {
                // CHẾ ĐỘ TẠO MỚI: Tạo thẻ mới và PREPEND lên đầu danh sách
                const newCard = createNotificationCard(formData);

                if (notificationList) {
                    notificationList.prepend(newCard);
                }

                showToast(
                    isScheduled ? "Đã lên lịch" : "Thao tác thành công",
                    isScheduled
                        ? "Thông báo đã được lên lịch và xuất hiện trên đầu danh sách."
                        : "Thông báo đã gửi thành công và xuất hiện ở đầu danh sách."
                );

                resetComposerForm();
            }
        });
    }


    /* =====================================================
       SAVE DRAFT
    ====================================================== */

    if (saveDraftButton) {
        saveDraftButton.addEventListener("click", function () {
            const title = titleInput ? titleInput.value.trim() : "";

            if (!title) {
                showToast("Không thể lưu", "Vui lòng nhập tiêu đề trước khi lưu bản nháp.");
                if (titleInput) titleInput.focus();
                return;
            }

            showToast(
                "Đã lưu bản nháp",
                "Nội dung thông báo đã được lưu vào danh sách bản nháp."
            );
        });
    }


    /* =====================================================
       PREVIEW
    ====================================================== */

    if (previewButton) {
        previewButton.addEventListener("click", function () {
            const title = titleInput ? titleInput.value.trim() : "";
            const content = contentInput ? contentInput.value.trim() : "";

            if (!title && !content) {
                showToast("Chưa có nội dung", "Hãy nhập tiêu đề hoặc nội dung trước khi xem trước.");
                return;
            }

            alert(
                "XEM TRƯỚC THÔNG BÁO\n\n" +
                "Tiêu đề: " + (title || "(Chưa có tiêu đề)") + "\n\n" +
                "Nội dung:\n" + (content || "(Chưa có nội dung)")
            );
        });
    }


    /* =====================================================
       EVENT DELEGATION: CHỈNH SỬA, HỦY LỊCH, XÓA, SAO CHÉP
    ====================================================== */

    if (notificationList) {
        notificationList.addEventListener("click", function (event) {
            const target = event.target;
            const card = target.closest(".notification-card");
            if (!card) return;

            // 1. CHỈNH SỬA THÔNG BÁO
            const editBtn = target.closest(".edit-button, .edit-draft");
            if (editBtn) {
                editingCard = card;

                const titleText = card.querySelector(".notification-body h3")?.textContent.trim() || "";
                const contentText = card.querySelector(".notification-body p")?.textContent.trim() || "";
                const cardPriority = card.dataset.priority || "normal";
                const cardAudience = card.dataset.audience || "all";

                if (titleInput) titleInput.value = titleText;
                if (contentInput) contentInput.value = contentText;
                if (audienceInput) audienceInput.value = cardAudience;

                const priorityRadio = document.querySelector(
                    `input[name="priority"][value="${cardPriority}"]`
                );
                if (priorityRadio) priorityRadio.checked = true;

                if (composerTitle) composerTitle.textContent = "Chỉnh sửa thông báo";
                if (composerSubtitle) composerSubtitle.textContent = "Cập nhật dữ liệu và đưa lên đầu";
                if (submitButtonText) submitButtonText.textContent = "Cập nhật & Đưa lên đầu";

                showToast(
                    "Đang chỉnh sửa",
                    "Đã nạp dữ liệu thông báo vào khung soạn thảo."
                );

                if (titleInput) {
                    titleInput.focus();
                    titleInput.scrollIntoView({ behavior: "smooth", block: "center" });
                }
                return;
            }

            // 2. HỦY LỊCH GỬI
            const cancelScheduleBtn = target.closest(".cancel-schedule-button");
            if (cancelScheduleBtn) {
                const confirmed = confirm("Bạn có chắc chắn muốn hủy lịch gửi thông báo này không?");
                if (confirmed) {
                    const statusSpan = card.querySelector(".status");
                    if (statusSpan) {
                        statusSpan.className = "status draft-status";
                        statusSpan.innerHTML = `<span class="material-symbols-outlined">event_busy</span> Đã hủy lịch`;
                    }

                    cancelScheduleBtn.remove();

                    showToast("Đã hủy lịch", "Đã hủy lịch phát thông báo thành công.");
                }
                return;
            }

            // 3. XÓA THÔNG BÁO / XÓA NHÁP
            const deleteBtn = target.closest(".delete-button, .delete-draft");
            if (deleteBtn) {
                const confirmed = confirm("Bạn có chắc chắn muốn xóa thông báo này?");
                if (confirmed) {
                    if (editingCard === card) {
                        resetComposerForm();
                    }
                    card.remove();
                    showToast("Đã xóa", "Thông báo đã được xóa khỏi hệ thống.");
                }
                return;
            }

            // 4. SAO CHÉP THÔNG BÁO
            const copyBtn = target.closest(".copy-button");
            if (copyBtn) {
                const titleText = card.querySelector("h3")?.textContent.trim() || "Thông báo";
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(titleText);
                }
                showToast("Đã sao chép", `Đã sao chép tiêu đề: "${titleText}"`);
                return;
            }

            // 5. THU HỒI THÔNG BÁO
            const recallBtn = target.closest(".recall-button");
            if (recallBtn) {
                const confirmed = confirm("Bạn có chắc chắn muốn thu hồi thông báo đã gửi này?");
                if (confirmed) {
                    const statusSpan = card.querySelector(".status");
                    if (statusSpan) {
                        statusSpan.className = "status draft-status";
                        statusSpan.innerHTML = "Đã thu hồi";
                    }
                    showToast("Đã thu hồi", "Thông báo đã được thu hồi thành công.");
                }
                return;
            }
        });
    }


    /* =====================================================
       SEARCH + FILTER
    ====================================================== */

    function filterNotifications() {
        const keyword = notificationSearch ? notificationSearch.value.trim().toLowerCase() : "";
        const priority = priorityFilter ? priorityFilter.value : "";
        const audience = audienceFilter ? audienceFilter.value : "";

        const cards = notificationList ? notificationList.querySelectorAll(".notification-card") : [];
        let visibleCount = 0;

        cards.forEach(function (card) {
            const cardText = card.textContent.toLowerCase();
            const cardPriority = card.dataset.priority || "";
            const cardAudience = card.dataset.audience || "";

            const matchesKeyword = !keyword || cardText.includes(keyword);
            const matchesPriority = !priority || cardPriority === priority;
            const matchesAudience = !audience || cardAudience === audience;

            const visible = matchesKeyword && matchesPriority && matchesAudience;

            if (visible) {
                card.classList.remove("hidden");
                visibleCount++;
            } else {
                card.classList.add("hidden");
            }
        });

        showNoResults(visibleCount === 0);
    }

    function showNoResults(show) {
        let emptyMessage = document.querySelector(".no-results");
        if (show) {
            if (!emptyMessage && notificationList) {
                emptyMessage = document.createElement("div");
                emptyMessage.className = "no-results";
                emptyMessage.innerHTML = `
                    <span class="material-symbols-outlined">search_off</span>
                    <div>Không tìm thấy thông báo phù hợp.</div>
                `;
                notificationList.appendChild(emptyMessage);
            }
        } else {
            if (emptyMessage) emptyMessage.remove();
        }
    }

    if (notificationSearch) notificationSearch.addEventListener("input", filterNotifications);
    if (priorityFilter) priorityFilter.addEventListener("change", filterNotifications);
    if (audienceFilter) audienceFilter.addEventListener("change", filterNotifications);


    /* =====================================================
       REFRESH
    ====================================================== */

    if (refreshButton) {
        refreshButton.addEventListener("click", function () {
            refreshButton.classList.add("rotating");

            setTimeout(function () {
                refreshButton.classList.remove("rotating");
                if (notificationSearch) notificationSearch.value = "";
                if (priorityFilter) priorityFilter.value = "";
                if (audienceFilter) audienceFilter.value = "";

                filterNotifications();
                showToast("Đã làm mới", "Danh sách thông báo đã được cập nhật.");
            }, 700);
        });
    }


    /* =====================================================
       CATEGORY TABS
    ====================================================== */

    const categoryTabs = document.querySelectorAll(".category-tab");
    categoryTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            categoryTabs.forEach(item => item.classList.remove("active"));
            tab.classList.add("active");
        });
    });


    /* =====================================================
       GLOBAL SEARCH & NOTIFICATION HEADER BUTTON
    ====================================================== */

    const globalSearch = document.getElementById("globalSearch");
    if (globalSearch) {
        globalSearch.addEventListener("input", function () {
            const keyword = globalSearch.value.trim().toLowerCase();
            if (notificationSearch) {
                notificationSearch.value = keyword;
                filterNotifications();
            }
        });
    }

    const notificationButton = document.getElementById("notificationButton");
    if (notificationButton) {
        notificationButton.addEventListener("click", function () {
            showToast("Thông báo hệ thống", "Bạn đang có 3 thông báo mới chưa đọc.");
        });
    }

});