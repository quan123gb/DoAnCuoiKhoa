/* =========================================================
   PROJECT MANAGEMENT SYSTEM
   LEADER DASHBOARD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       0. UTILITIES / MODAL CONTROLLER (MỚI THÊM)
    ====================================================== */

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("active");
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove("active");
        }
    }

    // Đăng ký đóng modal cho tất cả nút [data-close-modal] hoặc bấm ngoài modal
    document.querySelectorAll("[data-close-modal]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const modal = btn.closest(".modal-overlay");
            if (modal) {
                modal.classList.remove("active");
            }
        });
    });

    document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) {
                overlay.classList.remove("active");
            }
        });
    });


    /* =====================================================
       1. SIDEBAR NAVIGATION
    ====================================================== */

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(function (item) {

        item.addEventListener("click", function (event) {

            const page = item.dataset.page;
            const href = item.getAttribute("href");

            /*
             * Xử lý Đăng xuất
             */
            if (page === "logout") {

                const confirmed = confirm(
                    "Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?"
                );

                if (confirmed) {
                    alert("Đã đăng xuất khỏi hệ thống.");
                }

                return;
            }

            /*
             * Nếu thẻ <a> có đường dẫn href hợp lệ, chuyển trang
             */
            if (href && href !== "#" && href !== "javascript:void(0)") {
                return;
            }

            /*
             * Bỏ trạng thái active của tất cả menu
             */
            navItems.forEach(function (nav) {
                nav.classList.remove("active");
            });

            /*
             * Thêm active cho menu được chọn
             */
            item.classList.add("active");

            const pageNames = {
                dashboard: "Tổng quan",
                employees: "Nhân viên",
                projects: "Dự án",
                tasks: "Nhiệm vụ",
                resources: "Tài nguyên",
                members: "Thành viên",
                progress: "Tiến độ dự án",
                timeline: "Khung thời gian",
                notifications: "Thông báo",
                support: "Hỗ trợ",
                security: "Bảo mật",
                account: "Tài khoản cá nhân"
            };

            if (page !== "dashboard" && pageNames[page]) {
                showToast("Bạn đã chọn: " + pageNames[page]);
            }

        });

    });


    /* =====================================================
       2. SEARCH
    ====================================================== */

    const searchInput = document.getElementById("globalSearch");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const keyword = searchInput.value.trim().toLowerCase();

            const projectItems = document.querySelectorAll(".project-item");
            const activityItems = document.querySelectorAll(".activity-item");
            const alertItems = document.querySelectorAll(".alert-item");

            if (keyword === "") {
                projectItems.forEach(function (item) { item.style.display = ""; });
                activityItems.forEach(function (item) { item.style.display = ""; });
                alertItems.forEach(function (item) { item.style.display = ""; });
                return;
            }

            projectItems.forEach(function (item) {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(keyword) ? "" : "none";
            });

            activityItems.forEach(function (item) {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(keyword) ? "" : "none";
            });

            alertItems.forEach(function (item) {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(keyword) ? "" : "none";
            });

        });

    }


    /* =====================================================
       3. FILTER DỰ ÁN
    ====================================================== */

    const filterButtons = document.querySelectorAll(".filter-button");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.textContent.trim();
            const projects = document.querySelectorAll(".project-item");

            if (filter === "Tất cả") {
                projects.forEach(function (project) {
                    project.style.display = "";
                });
                return;
            }

            projects.forEach(function (project) {
                const text = project.textContent.toLowerCase();
                if (
                    text.includes("cần đẩy nhanh") ||
                    text.includes("ưu tiên")
                ) {
                    project.style.display = "";
                } else {
                    project.style.display = "none";
                }
            });

        });

    });


    /* =====================================================
       4. XUẤT BÁO CÁO (ĐÃ ĐƯỢC NÂNG CẤP XUẤT FILE CSV REAL)
    ====================================================== */

    const exportButton = document.getElementById("exportButton");

    if (exportButton) {

        exportButton.addEventListener("click", function () {

            // Thu thập dữ liệu các dự án hiện có
            let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // Thêm BOM UTF-8 cho Excel Việt Nam
            csvContent += "Tên Dự Án,Trưởng Dự Án,Hạn Hoàn Thành,Tiến Độ (%)\n";

            const projects = document.querySelectorAll(".project-item");

            projects.forEach(function (p) {
                const title = p.querySelector("h3") ? p.querySelector("h3").textContent.trim() : "";
                const metaStr = p.querySelector(".project-meta") ? p.querySelector(".project-meta").textContent : "";
                
                // Trích xuất tên leader và deadline từ meta
                const leaderMatch = metaStr.match(/Trưởng dự án:\s*([^\n•]+)/);
                const deadlineMatch = metaStr.match(/Hạn:\s*([^\n•]+)/);
                
                const leader = leaderMatch ? leaderMatch[1].trim() : "N/A";
                const deadline = deadlineMatch ? deadlineMatch[1].trim() : "N/A";
                const progress = p.querySelector(".project-progress-top strong") ? p.querySelector(".project-progress-top strong").textContent.trim() : "0%";

                csvContent += `"${title}","${leader}","${deadline}","${progress}"\n`;
            });

            // Tạo link tải file tự động
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `Bao_Cao_Tong_Quan_Du_An_${new Date().toISOString().slice(0,10)}.csv`);
            document.body.appendChild(link);

            link.click();
            document.body.removeChild(link);

            showToast("Báo cáo đã được xuất và tải xuống thành công!");

        });

    }


    /* =====================================================
       5. THÊM DỰ ÁN MỚI (ĐÃ TÍCH HỢP FORM & MODAL REAL)
    ====================================================== */

    const addProjectButton = document.getElementById("addProjectButton");
    const addProjectForm = document.getElementById("addProjectForm");

    if (addProjectButton) {

        addProjectButton.addEventListener("click", function () {
            openModal("addProjectModal");
        });

    }

    if (addProjectForm) {

        addProjectForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const title = document.getElementById("projectName").value.trim();
            const leader = document.getElementById("projectLeader").value.trim();
            const deadlineVal = document.getElementById("projectDeadline").value;
            const iconSelect = document.getElementById("projectIcon").value.split("|");
            const iconName = iconSelect[0];
            const iconClass = iconSelect[1];
            const progress = parseInt(document.getElementById("projectProgress").value) || 0;

            // Định dạng lại ngày dd/mm/yyyy
            let formattedDeadline = deadlineVal;
            if (deadlineVal) {
                const parts = deadlineVal.split("-");
                if (parts.length === 3) {
                    formattedDeadline = `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
            }

            // Tạo phần tử DOM mới cho dự án
            const projectItem = document.createElement("div");
            projectItem.className = "project-item";

            let statusText = "Đang thực hiện";
            let statusColor = "blue";
            let fillClass = "";

            if (progress >= 90) {
                statusText = "Sắp hoàn tất";
                statusColor = "green";
                fillClass = "green-fill";
            } else if (progress < 50) {
                statusText = "Cần đẩy nhanh";
                statusColor = "orange";
                fillClass = "orange-fill";
            }

            projectItem.innerHTML = `
                <div class="project-main">
                    <div class="project-icon ${iconClass}">
                        <span class="material-symbols-outlined">${iconName}</span>
                    </div>
                    <div class="project-info">
                        <h3>${title}</h3>
                        <div class="project-meta">
                            Trưởng dự án: <strong>${leader}</strong> <span>•</span> Hạn: <strong>${formattedDeadline}</strong>
                        </div>
                    </div>
                </div>
                <div class="project-progress">
                    <div class="project-progress-top">
                        <span class="project-status ${statusColor}">${statusText}</span>
                        <strong>${progress}%</strong>
                    </div>
                    <div class="progress-bar small">
                        <div class="progress-fill ${fillClass}" style="width: ${progress}%;"></div>
                    </div>
                </div>
            `;

            const container = document.getElementById("projectListContainer");
            if (container) {
                container.prepend(projectItem); // Thêm lên đầu danh sách
            }

            // Cập nhật số lượng dự án trên KPI
            const kpiVal = document.getElementById("kpiTotalProjects");
            if (kpiVal) {
                kpiVal.textContent = parseInt(kpiVal.textContent) + 1;
            }

            // Đóng modal và reset form
            closeModal("addProjectModal");
            addProjectForm.reset();

            showToast(`Đã thêm thành công dự án "${title}"!`);
        });

    }


    /* =====================================================
       6. TRỢ GIÚP
    ====================================================== */

    const helpButton = document.getElementById("helpButton");

    if (helpButton) {

        helpButton.addEventListener("click", function () {

            alert(
                "Trợ giúp & Hướng dẫn\n\n" +
                "• Tổng quan: Xem thống kê hệ thống\n" +
                "• Thêm dự án: Nhấn nút 'Thêm dự án mới' ở góc trên\n" +
                "• Xuất báo cáo: Tải danh sách dự án ra file CSV\n" +
                "• Phê duyệt: Bấm 'Xem chi tiết' hoặc truy cập Trung tâm phê duyệt"
            );

        });

    }


    /* =====================================================
       7. THÔNG BÁO
    ====================================================== */

    const notificationButton = document.getElementById("notificationButton");

    if (notificationButton) {

        notificationButton.addEventListener("click", function () {
            alert("Bạn có 2 yêu cầu đang chờ phê duyệt.");
        });

    }


    /* =====================================================
       8. XEM TẤT CẢ HOẠT ĐỘNG
    ====================================================== */

    const viewAllActivities = document.getElementById("viewAllActivities");

    if (viewAllActivities) {

        viewAllActivities.addEventListener("click", function () {
            showToast("Đang mở toàn bộ lịch sử hoạt động hệ thống...");
        });

    }


    /* =====================================================
       9 & 10. PHÊ DUYỆT & TỪ CHỐI TẠI TRANG CHÍNH
    ====================================================== */

    function bindApprovalEvents() {

        document.querySelectorAll(".approve-button").forEach(function (button) {
            button.onclick = function () {
                const alertItem = button.closest(".alert-item");
                if (!alertItem) return;

                const titleElement = alertItem.querySelector("h3");
                const title = titleElement ? titleElement.textContent.trim() : "yêu cầu";

                if (confirm(`Bạn có chắc chắn muốn PHÊ DUYỆT:\n\n"${title}"?`)) {
                    alertItem.style.opacity = "0.5";
                    button.disabled = true;
                    button.textContent = "Đã phê duyệt";
                    showToast(`Đã phê duyệt thành công: ${title}`);
                }
            };
        });

        document.querySelectorAll(".reject-button").forEach(function (button) {
            button.onclick = function () {
                const alertItem = button.closest(".alert-item");
                if (!alertItem) return;

                const titleElement = alertItem.querySelector("h3");
                const title = titleElement ? titleElement.textContent.trim() : "yêu cầu";

                if (confirm(`Bạn có chắc chắn muốn TỪ CHỐI:\n\n"${title}"?`)) {
                    alertItem.style.opacity = "0.5";
                    button.disabled = true;
                    button.textContent = "Đã từ chối";
                    showToast(`Đã từ chối: ${title}`);
                }
            };
        });

    }

    bindApprovalEvents();


    /* =====================================================
       11. XEM CHI TIẾT (ĐÃ NÂNG CẤP HIỂN THỊ MODAL DETAIL)
    ====================================================== */

    function bindDetailButtons() {

        document.querySelectorAll(".detail-button").forEach(function (button) {
            button.onclick = function () {
                const alertItem = button.closest(".alert-item");
                const title = alertItem ? alertItem.querySelector("h3").textContent.trim() : "Chi tiết Yêu cầu";
                const desc = alertItem ? alertItem.querySelector("p").textContent.trim() : "";

                const modalTitle = document.getElementById("detailModalTitle");
                const modalBody = document.getElementById("detailModalBody");

                if (modalTitle && modalBody) {
                    modalTitle.textContent = title;
                    modalBody.innerHTML = `
                        <div style="font-size: 13px; line-height: 1.6;">
                            <p><strong>Loại yêu cầu:</strong> Bổ sung nhân sự & Tài nguyên</p>
                            <p style="margin-top:8px;"><strong>Mô tả chi tiết:</strong> ${desc}</p>
                            <hr style="margin: 12px 0; border: none; border-top: 1px solid #edf0f5;">
                            <p><strong>Người đề xuất:</strong> Phạm Hoàng Nam (Leader Nền tảng học trực tuyến)</p>
                            <p><strong>Thời gian gửi:</strong> Hôm nay, lúc 09:15 AM</p>
                            <p><strong>Mức độ ưu tiên:</strong> <span class="priority warning-priority">Cần xét duyệt</span></p>
                        </div>
                    `;
                    openModal("detailModal");
                }
            };
        });

    }

    bindDetailButtons();


    /* =====================================================
       12. TRUNG TÂM PHÊ DUYỆT (ĐÃ NÂNG CẤP MODAL TẬP TRUNG)
    ====================================================== */

    const approvalCenterButton = document.getElementById("approvalCenterButton");

    if (approvalCenterButton) {

        approvalCenterButton.addEventListener("click", function () {

            const modalList = document.getElementById("approvalModalList");
            if (modalList) {
                // Tạo danh sách các yêu cầu xét duyệt đầy đủ trong modal
                modalList.innerHTML = `
                    <div class="approval-modal-item">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <strong>Cấp quyền AWS Cloud Production</strong>
                            <span class="priority critical-priority">Khẩn cấp</span>
                        </div>
                        <p style="font-size:11px; color:var(--on-surface-variant);">
                            DevOps Hoàng Văn Đức yêu cầu quyền IAM để mở rộng tài nguyên máy chủ cho E-Commerce trước khi kiểm thử tải.
                        </p>
                        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:4px;">
                            <button class="button button-danger-outline modal-reject-btn">Từ chối</button>
                            <button class="button button-danger modal-approve-btn">Phê duyệt ngay</button>
                        </div>
                    </div>

                    <div class="approval-modal-item">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <strong>Bổ sung nhân sự Thiết kế UI/UX</strong>
                            <span class="priority warning-priority">Cần xét duyệt</span>
                        </div>
                        <p style="font-size:11px; color:var(--on-surface-variant);">
                            Dự án Nền tảng học trực tuyến đề xuất bổ sung +1 nhân sự Micro-interaction cho giai đoạn hoàn thiện.
                        </p>
                        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:4px;">
                            <button class="button button-secondary modal-reject-btn">Từ chối</button>
                            <button class="button button-primary modal-approve-btn">Chấp thuận</button>
                        </div>
                    </div>

                    <div class="approval-modal-item">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <strong>Tăng ngân sách mua bản quyền Figma Enterprise</strong>
                            <span class="priority warning-priority">Cần xét duyệt</span>
                        </div>
                        <p style="font-size:11px; color:var(--on-surface-variant);">
                            Đội ngũ UI/UX gửi đề xuất cấp bù kinh phí mua 5 tài khoản Figma Org cho các nhân sự mới nhận việc.
                        </p>
                        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:4px;">
                            <button class="button button-secondary modal-reject-btn">Từ chối</button>
                            <button class="button button-primary modal-approve-btn">Chấp thuận</button>
                        </div>
                    </div>
                `;

                // Bắt sự kiện cho các nút Phê duyệt / Từ chối bên trong modal Trung tâm Phê duyệt
                modalList.querySelectorAll(".modal-approve-btn").forEach(function (btn) {
                    btn.addEventListener("click", function () {
                        const item = btn.closest(".approval-modal-item");
                        item.style.opacity = "0.4";
                        btn.disabled = true;
                        btn.textContent = "Đã phê duyệt";
                        showToast("Đã phê duyệt thành công!");
                    });
                });

                modalList.querySelectorAll(".modal-reject-btn").forEach(function (btn) {
                    btn.addEventListener("click", function () {
                        const item = btn.closest(".approval-modal-item");
                        item.style.opacity = "0.4";
                        btn.disabled = true;
                        btn.textContent = "Đã từ chối";
                        showToast("Đã từ chối yêu cầu.");
                    });
                });
            }

            openModal("approvalCenterModal");

        });

    }


    /* =====================================================
       13. MORE BUTTON (NÚT XEM CHI TIẾT TRẠNG THÁI NHIỆM VỤ)
    ====================================================== */

    const moreButton = document.querySelector(".more-button");

    if (moreButton) {

        moreButton.addEventListener("click", function () {

            const modalTitle = document.getElementById("detailModalTitle");
            const modalBody = document.getElementById("detailModalBody");

            if (modalTitle && modalBody) {
                modalTitle.textContent = "Chi Tiết Phân Bổ Nhiệm Vụ";
                modalBody.innerHTML = `
                    <div style="display:flex; flex-direction:column; gap:10px; font-size:12px;">
                        <div style="display:flex; justify-content:space-between; padding:8px; background:var(--surface-container-low); border-radius:4px;">
                            <span>🔹 <strong>Đang thực hiện:</strong></span>
                            <strong>102 nhiệm vụ (65.4%)</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between; padding:8px; background:var(--surface-container-low); border-radius:4px;">
                            <span>🟢 <strong>Đã hoàn thành:</strong></span>
                            <strong>42 nhiệm vụ (26.9%)</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between; padding:8px; background:var(--surface-container-low); border-radius:4px;">
                            <span>🔴 <strong>Trễ hạn:</strong></span>
                            <strong style="color:var(--error);">8 nhiệm vụ (5.1%)</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between; padding:8px; background:var(--surface-container-low); border-radius:4px;">
                            <span>⚪ <strong>Chờ duyệt:</strong></span>
                            <strong>4 nhiệm vụ (2.6%)</strong>
                        </div>
                    </div>
                `;
                openModal("detailModal");
            }

        });

    }


    /* =====================================================
       14. TOAST MESSAGE
    ====================================================== */

    function showToast(message) {

        const oldToast = document.querySelector(".dashboard-toast");

        if (oldToast) {
            oldToast.remove();
        }

        const toast = document.createElement("div");
        toast.className = "dashboard-toast";
        toast.textContent = message;

        toast.style.position = "fixed";
        toast.style.left = "50%";
        toast.style.bottom = "25px";
        toast.style.transform = "translateX(-50%) translateY(15px)";
        toast.style.zIndex = "3000";
        toast.style.padding = "11px 17px";
        toast.style.borderRadius = "7px";
        toast.style.background = "#213145";
        toast.style.color = "#ffffff";
        toast.style.fontSize = "11px";
        toast.style.fontWeight = "500";
        toast.style.boxShadow = "0 8px 24px rgba(0,0,0,0.18)";
        toast.style.opacity = "0";
        toast.style.transition = "all 0.25s ease";

        document.body.appendChild(toast);

        requestAnimationFrame(function () {
            toast.style.opacity = "1";
            toast.style.transform = "translateX(-50%) translateY(0)";
        });

        setTimeout(function () {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(-50%) translateY(15px)";

            setTimeout(function () {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 250);

        }, 2500);

    }


    /* =====================================================
       15. DONUT CHART HOVER
    ====================================================== */

    const donutSegments = document.querySelectorAll(".donut-segment");

    donutSegments.forEach(function (segment) {

        segment.addEventListener("mouseenter", function () {
            donutSegments.forEach(function (other) {
                if (other !== segment) {
                    other.style.opacity = "0.35";
                }
            });
        });

        segment.addEventListener("mouseleave", function () {
            donutSegments.forEach(function (other) {
                other.style.opacity = "1";
            });
        });

    });


    /* =====================================================
       16. KEYBOARD SHORTCUT
    ====================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.ctrlKey && event.key.toLowerCase() === "k") {
            event.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }

        if (event.key === "Escape") {
            // Đóng tất cả modal khi ấn ESC
            document.querySelectorAll(".modal-overlay.active").forEach(function (m) {
                m.classList.remove("active");
            });

            if (document.activeElement === searchInput) {
                searchInput.value = "";
                searchInput.dispatchEvent(new Event("input"));
                searchInput.blur();
            }
        }

    });

});