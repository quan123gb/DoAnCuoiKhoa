/* =========================================================
   TÀI NGUYÊN & TÀI LIỆU
   JAVASCRIPT THUẦN
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;

    /* =====================================================
       TOAST SYSTEM
    ====================================================== */

    const toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    body.appendChild(toastContainer);

    function showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.className = "toast " + type;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(function () {
            toast.remove();
        }, 3000);
    }

    /* =====================================================
       MODAL MANAGER
    ====================================================== */

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("show");
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove("show");
        }
    }

    // Gắn sự kiện đóng modal cho tất cả nút data-close
    document.querySelectorAll("[data-close]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const targetId = btn.getAttribute("data-close");
            closeModal(targetId);
        });
    });

    // Đóng modal khi click ra ngoài card
    document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) {
                overlay.classList.remove("show");
            }
        });
    });

    /* =====================================================
       MOBILE SIDEBAR TOGGLE
    ====================================================== */

    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const overlay = document.querySelector(".page-overlay");

    function closeSidebar() {
        body.classList.remove("sidebar-open");
        if (overlay) overlay.classList.remove("show");
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", function () {
            body.classList.toggle("sidebar-open");
            if (overlay) {
                overlay.classList.toggle("show", body.classList.contains("sidebar-open"));
            }
        });
    }

    if (overlay) {
        overlay.addEventListener("click", function () {
            closeSidebar();
        });
    }

    /* =====================================================
       SIDEBAR NAVIGATION
    ====================================================== */

    const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            const path = link.getAttribute("data-path");
            if (path === "dang-xuat") {
                showToast("Đã chọn chức năng Đăng xuất.", "warning");
            } else if (path !== "tai-nguyen-tai-lieu") {
                showToast("Đang chuyển đến: " + link.textContent.trim(), "success");
            }
            closeSidebar();
        });
    });

    /* =====================================================
       GLOBAL SEARCH & DOCUMENT SEARCH
    ====================================================== */

    const globalSearch = document.querySelector("#globalSearch");
    const documentSearch = document.querySelector("#documentSearch");
    const documentTable = document.querySelector(".document-table");
    let tableRows = Array.from(document.querySelectorAll(".document-table tbody tr"));

    function filterDocuments() {
        const keyword = documentSearch ? documentSearch.value.trim().toLowerCase() : "";
        let visibleCount = 0;

        tableRows.forEach(function (row) {
            const text = row.textContent.toLowerCase();
            const matched = !keyword || text.includes(keyword);
            row.style.display = matched ? "" : "none";
            if (matched) visibleCount++;
        });

        const visibleCountElement = document.querySelector("[data-visible-count]");
        if (visibleCountElement) {
            visibleCountElement.textContent = visibleCount;
        }
    }

    if (globalSearch) {
        globalSearch.addEventListener("input", function () {
            if (documentSearch) {
                documentSearch.value = globalSearch.value;
                filterDocuments();
            }
        });
    }

    if (documentSearch) {
        documentSearch.addEventListener("input", filterDocuments);
    }

    /* =====================================================
       CATEGORY TABS FILTER
    ====================================================== */

    const categoryTabs = document.querySelectorAll(".category-tab");

    categoryTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            categoryTabs.forEach(function (item) {
                item.classList.remove("active");
            });
            tab.classList.add("active");

            const category = tab.getAttribute("data-category");
            let count = 0;

            tableRows.forEach(function (row) {
                const rowCategory = row.getAttribute("data-category");
                const matched = (category === "all" || rowCategory === category);
                row.style.display = matched ? "" : "none";
                if (matched) count++;
            });

            const visibleCount = document.querySelector("[data-visible-count]");
            if (visibleCount) {
                visibleCount.textContent = count;
            }
        });
    });

    /* =====================================================
       SELECT FILTER & SORTING
    ====================================================== */

    const projectFilter = document.querySelector("#projectFilter");
    const formatFilter = document.querySelector("#formatFilter");
    const sortFilter = document.querySelector("#sortFilter");

    function applyCombinedFilters() {
        const pVal = projectFilter ? projectFilter.value : "all";
        const fVal = formatFilter ? formatFilter.value : "all";
        let count = 0;

        tableRows.forEach(function (row) {
            const rowProject = row.getAttribute("data-project");
            const rowFormat = row.getAttribute("data-format");

            const pMatch = (pVal === "all" || rowProject === pVal || (pVal === "internal" && !rowProject));
            const fMatch = (fVal === "all" || rowFormat === fVal);

            const matched = pMatch && fMatch;
            row.style.display = matched ? "" : "none";
            if (matched) count++;
        });

        const visibleCount = document.querySelector("[data-visible-count]");
        if (visibleCount) {
            visibleCount.textContent = count;
        }
    }

    if (projectFilter) projectFilter.addEventListener("change", applyCombinedFilters);
    if (formatFilter) formatFilter.addEventListener("change", applyCombinedFilters);

    if (sortFilter) {
        sortFilter.addEventListener("change", function () {
            const sortVal = sortFilter.value;
            const tbody = document.querySelector(".document-table tbody");

            tableRows.sort(function (a, b) {
                const nameA = a.querySelector(".document-name strong") ? a.querySelector(".document-name strong").textContent.trim() : "";
                const nameB = b.querySelector(".document-name strong") ? b.querySelector(".document-name strong").textContent.trim() : "";

                if (sortVal === "name-asc") {
                    return nameA.localeCompare(nameB);
                }
                return 0;
            });

            tableRows.forEach(function (row) {
                tbody.appendChild(row);
            });

            showToast("Đã áp dụng quy tắc sắp xếp mới.", "success");
        });
    }

    /* =====================================================
       VIEW TOGGLE (LIST / GRID)
    ====================================================== */

    const viewButtons = document.querySelectorAll(".view-toggle button");
    const documentSection = document.querySelector(".document-section");

    viewButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            viewButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const viewMode = btn.getAttribute("data-view");
            if (viewMode === "grid") {
                documentSection.classList.add("grid-view");
                showToast("Đã chuyển sang chế độ hiển thị Lưới.", "success");
            } else {
                documentSection.classList.remove("grid-view");
                showToast("Đã chuyển sang chế độ hiển thị Danh sách.", "success");
            }
        });
    });

    /* =====================================================
       STAR ICON TOGGLE & KPI UPDATE
    ====================================================== */

    function updateStarredKpi() {
        const starredCount = document.querySelectorAll('.star-icon[data-starred="true"]').length;
        const starredKpi = document.getElementById("starredKpiCount");
        if (starredKpi) {
            starredKpi.textContent = starredCount;
        }
    }

    function bindStarEvents() {
        const starIcons = document.querySelectorAll(".star-icon");
        starIcons.forEach(function (icon) {
            icon.onclick = function (e) {
                e.stopPropagation();
                const current = icon.getAttribute("data-starred") === "true";
                if (current) {
                    icon.setAttribute("data-starred", "false");
                    icon.classList.remove("starred");
                    showToast("Đã bỏ ghim tài liệu khỏi danh sách ưu tiên.", "success");
                } else {
                    icon.setAttribute("data-starred", "true");
                    icon.classList.add("starred");
                    showToast("Đã ghim tài liệu vào danh sách ưu tiên.", "success");
                }
                updateStarredKpi();
            };
        });
    }

    bindStarEvents();
    updateStarredKpi();

    /* =====================================================
       SELECT ALL CHECKBOXES
    ====================================================== */

    const selectAll = document.querySelector("#selectAll");
    if (selectAll) {
        selectAll.addEventListener("change", function () {
            const checkboxes = document.querySelectorAll(".document-checkbox");
            checkboxes.forEach(function (cb) {
                const row = cb.closest("tr");
                if (row && row.style.display !== "none") {
                    cb.checked = selectAll.checked;
                }
            });
        });
    }

    /* =====================================================
       ROW SELECTION & DETAIL CARD SYNC
    ====================================================== */

    let activeSelectedRow = document.querySelector(".document-table tbody tr.selected-row");

    function bindRowSelection() {
        tableRows.forEach(function (row) {
            row.addEventListener("click", function (e) {
                if (e.target.closest(".document-checkbox") || e.target.closest(".star-icon") || e.target.closest(".row-actions")) {
                    return;
                }

                tableRows.forEach(r => r.classList.remove("selected-row"));
                row.classList.add("selected-row");
                activeSelectedRow = row;

                const nameEl = row.querySelector(".document-name strong");
                const versionEl = row.querySelector(".version-tag");
                const metaSize = row.querySelector("td:nth-child(6) small");
                const formatType = row.querySelector("td:nth-child(6) strong");

                if (nameEl) {
                    document.getElementById("detailFileName").textContent = nameEl.textContent.trim();
                }
                if (versionEl) {
                    document.getElementById("detailVersionBadge").textContent = versionEl.textContent.trim() + " ACTIVE";
                }
                if (metaSize && formatType) {
                    document.getElementById("detailFileMeta").textContent = formatType.textContent.trim() + " • " + metaSize.textContent.trim();
                }
            });
        });
    }

    bindRowSelection();

    /* =====================================================
       ROW ACTIONS (PREVIEW, DOWNLOAD, CONTEXT MENU)
    ====================================================== */

    let activeContextRow = null;
    const contextMenu = document.getElementById("rowContextMenu");

    function bindRowButtons() {
        // Nút Xem trước
        document.querySelectorAll('button[title="Xem trước"]').forEach(function (btn) {
            btn.onclick = function (e) {
                e.stopPropagation();
                const row = btn.closest("tr");
                const docName = row.querySelector(".document-name strong").textContent.trim();
                const docMeta = row.querySelector(".document-name small").textContent.trim();

                document.getElementById("previewDocName").textContent = docName;
                document.getElementById("previewDocMeta").textContent = "Mã tài liệu: " + docMeta;
                openModal("previewModal");
            };
        });

        // Nút Tải xuống
        document.querySelectorAll('button[title="Tải xuống"]').forEach(function (btn) {
            btn.onclick = function (e) {
                e.stopPropagation();
                const row = btn.closest("tr");
                const docName = row.querySelector(".document-name strong").textContent.trim();
                showToast("Đang chuẩn bị tải xuống: " + docName, "success");
            };
        });

        // Nút Thao tác khác (Context Menu)
        document.querySelectorAll(".more-actions-btn").forEach(function (btn) {
            btn.onclick = function (e) {
                e.stopPropagation();
                activeContextRow = btn.closest("tr");
                const rect = btn.getBoundingClientRect();
                if (contextMenu) {
                    contextMenu.style.top = (rect.bottom + 4) + "px";
                    contextMenu.style.left = (rect.left - 120) + "px";
                    contextMenu.classList.add("show");
                }
            };
        });
    }

    bindRowButtons();

    // Ẩn context menu khi click ra ngoài
    document.addEventListener("click", function () {
        if (contextMenu) contextMenu.classList.remove("show");
    });

    // Các sự kiện trên Context Menu
    if (contextMenu) {
        document.getElementById("ctxPreview").onclick = function () {
            if (activeContextRow) {
                const btn = activeContextRow.querySelector('button[title="Xem trước"]');
                if (btn) btn.click();
            }
        };

        document.getElementById("ctxDownload").onclick = function () {
            if (activeContextRow) {
                const btn = activeContextRow.querySelector('button[title="Tải xuống"]');
                if (btn) btn.click();
            }
        };

        document.getElementById("ctxShare").onclick = function () {
            openModal("shareModal");
        };

        document.getElementById("ctxStar").onclick = function () {
            if (activeContextRow) {
                const star = activeContextRow.querySelector(".star-icon");
                if (star) star.click();
            }
        };
    }

    /* =====================================================
       HEADER BUTTONS (REPORT, PERMISSION, SYNC, UPLOAD)
    ====================================================== */

    // Báo cáo nhanh
    const quickReportBtn = document.querySelector(".quick-report-button");
    if (quickReportBtn) {
        quickReportBtn.addEventListener("click", function () {
            openModal("quickReportModal");
        });
    }

    const submitQuickReportBtn = document.getElementById("submitQuickReportBtn");
    if (submitQuickReportBtn) {
        submitQuickReportBtn.addEventListener("click", function () {
            closeModal("quickReportModal");
            showToast("Đã gửi báo cáo tiến độ công việc thành công!", "success");
        });
    }

    // Yêu cầu cấp quyền
    const permissionBtn = document.querySelector('[data-action="permission"]');
    if (permissionBtn) {
        permissionBtn.addEventListener("click", function () {
            openModal("permissionModal");
        });
    }

    const submitPermissionBtn = document.getElementById("submitPermissionBtn");
    if (submitPermissionBtn) {
        submitPermissionBtn.addEventListener("click", function () {
            closeModal("permissionModal");
            showToast("Yêu cầu cấp quyền đã được chuyển tới Quản trị viên.", "success");
        });
    }

    // Đồng bộ Cloud
    const syncBtn = document.querySelector('[data-action="sync"]');
    if (syncBtn) {
        syncBtn.addEventListener("click", function () {
            const icon = syncBtn.querySelector("span");
            if (icon) icon.style.animation = "spin 1s linear infinite";
            showToast("Đang tiến hành đồng bộ dữ liệu với Cloud...", "warning");

            setTimeout(function () {
                if (icon) icon.style.animation = "";
                showToast("Đồng bộ dữ liệu thành công! Mọi tệp tin đã cập nhật.", "success");
            }, 1800);
        });
    }

    // Tải lên tài liệu mới
    const uploadBtn = document.querySelector('[data-action="upload"]');
    if (uploadBtn) {
        uploadBtn.addEventListener("click", function () {
            openModal("uploadModal");
        });
    }

    const confirmUploadBtn = document.getElementById("confirmUploadBtn");
    if (confirmUploadBtn) {
        confirmUploadBtn.addEventListener("click", function () {
            const fileInput = document.getElementById("uploadFileInput");
            if (fileInput && fileInput.files.length > 0) {
                const fileName = fileInput.files[0].name;
                const project = document.getElementById("uploadProjectSelect").value;
                const category = document.getElementById("uploadCategorySelect").value;

                // Thêm một hàng mới vào bảng dữ liệu
                const tbody = document.querySelector(".document-table tbody");
                const tr = document.createElement("tr");
                tr.setAttribute("data-category", category);
                tr.setAttribute("data-project", project);
                tr.setAttribute("data-format", "pdf");

                tr.innerHTML = `
                    <td class="check-column"><input type="checkbox" class="document-checkbox"></td>
                    <td class="star-column"><span class="material-symbols-outlined star-icon" data-starred="false">star</span></td>
                    <td>
                        <div class="document-name">
                            <div class="file-icon pdf"><span class="material-symbols-outlined">description</span></div>
                            <div>
                                <strong>${fileName}</strong>
                                <small>DOC-NEW-01</small>
                            </div>
                        </div>
                    </td>
                    <td><span class="project-tag blue">${project}</span><small>Mới tải lên</small></td>
                    <td><span class="version-tag">v1.0</span></td>
                    <td><strong>Tệp tin mới</strong><small>2.5 MB</small></td>
                    <td><strong>Trần Thị Bình</strong><small>Vừa xong</small></td>
                    <td><span class="permission-tag write">Read / Write</span></td>
                    <td class="action-column">
                        <div class="row-actions">
                            <button type="button" title="Xem trước"><span class="material-symbols-outlined">visibility</span></button>
                            <button type="button" title="Tải xuống"><span class="material-symbols-outlined">download</span></button>
                            <button type="button" title="Thao tác khác" class="more-actions-btn"><span class="material-symbols-outlined">more_vert</span></button>
                        </div>
                    </td>
                `;

                tbody.insertBefore(tr, tbody.firstChild);
                tableRows = Array.from(document.querySelectorAll(".document-table tbody tr"));

                bindStarEvents();
                bindRowSelection();
                bindRowButtons();

                closeModal("uploadModal");
                showToast("Đã tải lên tệp " + fileName + " thành công!", "success");
            } else {
                showToast("Vui lòng chọn ít nhất 1 tệp tin từ máy tính.", "error");
            }
        });
    }

    /* =====================================================
       TOPBAR ICON BUTTONS (HELP & NOTIFICATIONS)
    ====================================================== */

    const helpBtn = document.querySelector('.icon-button[title="Trợ giúp"]');
    if (helpBtn) {
        helpBtn.addEventListener("click", function () {
            showToast("Trung tâm trợ giúp: Liên hệ support@project.com nếu gặp sự cố.", "warning");
        });
    }

    const notifBtn = document.querySelector(".notification-button");
    if (notifBtn) {
        notifBtn.addEventListener("click", function () {
            showToast("Bạn có 3 thông báo mới chưa đọc trong dự án.", "success");
        });
    }

    /* =====================================================
       BOTTOM CARD BUTTONS (FIGMA, SHARE, CLOUD FOLDER, SLA)
    ====================================================== */

    const figmaBtn = document.querySelector('[data-action="figma"]');
    if (figmaBtn) {
        figmaBtn.addEventListener("click", function () {
            showToast("Đang mở bản vẽ thiết kế trên Figma Enterprise...", "success");
        });
    }

    const shareBtn = document.querySelector('[data-action="share"]');
    if (shareBtn) {
        shareBtn.addEventListener("click", function () {
            openModal("shareModal");
        });
    }

    const copyShareLinkBtn = document.getElementById("copyShareLinkBtn");
    if (copyShareLinkBtn) {
        copyShareLinkBtn.addEventListener("click", function () {
            const input = document.getElementById("shareLinkInput");
            if (input) {
                input.select();
                showToast("Đã sao chép liên kết tài liệu vào khay nhớ tạm!", "success");
            }
        });
    }

    const openCloudFolderBtn = document.getElementById("openCloudFolderBtn");
    if (openCloudFolderBtn) {
        openCloudFolderBtn.addEventListener("click", function () {
            showToast("Đang kết nối tới thư mục gốc Google Drive Enterprise...", "success");
        });
    }

    const viewSlaGuideBtn = document.getElementById("viewSlaGuideBtn");
    if (viewSlaGuideBtn) {
        viewSlaGuideBtn.addEventListener("click", function () {
            showToast("Đang mở Sổ tay Quy chuẩn Đặt tên & Bảo mật Tài liệu (SLA).", "warning");
        });
    }

    /* =====================================================
       QUICK FOLDERS INTERACTION
    ====================================================== */

    document.querySelectorAll(".folder-card").forEach(function (folder) {
        folder.addEventListener("click", function (e) {
            if (e.target.closest(".folder-more-btn")) return;
            const folderName = folder.getAttribute("data-folder");
            showToast("Đã lọc tài liệu thuộc thư mục: " + folderName, "success");

            if (projectFilter) {
                if (folderName === "PRJ-ECOMM-01" || folderName === "PRJ-HRM-02") {
                    projectFilter.value = folderName;
                    applyCombinedFilters();
                }
            }
        });
    });

    const viewAllFoldersBtn = document.getElementById("viewAllFoldersBtn");
    if (viewAllFoldersBtn) {
        viewAllFoldersBtn.addEventListener("click", function () {
            showToast("Đang tải danh sách toàn bộ 12 thư mục dự án...", "success");
        });
    }

    /* =====================================================
       PAGINATION BUTTONS
    ====================================================== */

    const pageNumBtns = document.querySelectorAll(".page-num-btn");
    const currentPageText = document.getElementById("currentPageText");

    pageNumBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            pageNumBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            if (currentPageText) {
                currentPageText.textContent = btn.textContent.trim();
            }
            showToast("Đã chuyển sang trang " + btn.textContent.trim(), "success");
        });
    });

    const prevPageBtn = document.getElementById("prevPageBtn");
    const nextPageBtn = document.getElementById("nextPageBtn");

    if (nextPageBtn) {
        nextPageBtn.addEventListener("click", function () {
            showToast("Đang xem trang tiếp theo.", "success");
        });
    }

});