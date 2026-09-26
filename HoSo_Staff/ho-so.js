/* =========================================================
   HỒ SƠ CÁ NHÂN & KỸ NĂNG - ST-PRO01
   JavaScript độc lập
   Không sử dụng Tailwind
   Không sử dụng event.preventDefault()
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CHUYỂN TAB (TAB SYSTEM)
       ===================================================== */

    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const targetId = this.getAttribute("data-tab");

            tabButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            tabPanels.forEach(function (panel) {
                panel.classList.remove("active");
            });

            this.classList.add("active");

            const targetPanel = document.getElementById(targetId);

            if (targetPanel) {
                targetPanel.classList.add("active");
            }

        });

    });


    /* =====================================================
       DỮ LIỆU MẶC ĐỊNH & LƯU TRỮ HỒ SƠ
       ===================================================== */

    const DEFAULT_PROFILE = {
        fullname: "Trần Thị Bình",
        title: "Nhân viên phát triển dự án",
        email: "binh.tran@example.com",
        phone: "0901 234 567",
        address: "Cần Thơ, Việt Nam",
        languages: "Tiếng Việt, English",
        bio: "Tôi là nhân viên phát triển dự án với kinh nghiệm tham gia vào nhiều dự án phần mềm và quản lý công việc nhóm.\n\nTôi yêu thích việc tổ chức công việc, phối hợp với các thành viên và tìm kiếm các giải pháp hiệu quả cho dự án."
    };

    /* Tạo chữ cái viết tắt cho Avatar dựa trên tên */
    function calculateInitials(name) {
        if (!name) return "TB";
        const words = name.trim().split(/\s+/);
        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }
        const firstLetter = words[0].charAt(0);
        const lastLetter = words[words.length - 1].charAt(0);
        return (firstLetter + lastLetter).toUpperCase();
    }

    /* Đọc dữ liệu từ localStorage hoặc trả về mặc định */
    function getStoredProfile() {
        const stored = localStorage.getItem("userProfile");
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                return DEFAULT_PROFILE;
            }
        }
        return DEFAULT_PROFILE;
    }

    /* Hiển thị dữ liệu hồ sơ lên giao diện */
    function renderProfile(profile) {
        const initials = calculateInitials(profile.fullname);

        // Avatars
        const sidebarAvatar = document.getElementById("sidebar-avatar");
        const topbarAvatar = document.getElementById("topbar-avatar");
        const profileLargeAvatar = document.getElementById("profile-large-avatar");

        if (sidebarAvatar) sidebarAvatar.textContent = initials;
        if (topbarAvatar) topbarAvatar.textContent = initials;
        if (profileLargeAvatar) profileLargeAvatar.textContent = initials;

        // Names
        const sidebarUserName = document.getElementById("sidebar-user-name");
        const topbarUserName = document.getElementById("topbar-user-name");
        const profileCardName = document.getElementById("profile-card-name");
        const infoFullname = document.getElementById("info-fullname");

        if (sidebarUserName) sidebarUserName.textContent = profile.fullname;
        if (topbarUserName) topbarUserName.textContent = profile.fullname;
        if (profileCardName) profileCardName.textContent = profile.fullname;
        if (infoFullname) infoFullname.textContent = profile.fullname;

        // Title
        const profileCardTitle = document.getElementById("profile-card-title");
        if (profileCardTitle) profileCardTitle.textContent = profile.title;

        // Email
        const profileCardEmail = document.getElementById("profile-card-email");
        const infoEmail = document.getElementById("info-email");
        if (profileCardEmail) profileCardEmail.textContent = profile.email;
        if (infoEmail) infoEmail.textContent = profile.email;

        // Phone
        const profileCardPhone = document.getElementById("profile-card-phone");
        const infoPhone = document.getElementById("info-phone");
        if (profileCardPhone) profileCardPhone.textContent = profile.phone;
        if (infoPhone) infoPhone.textContent = profile.phone;

        // Address & Languages
        const infoAddress = document.getElementById("info-address");
        const infoLanguages = document.getElementById("info-languages");
        if (infoAddress) infoAddress.textContent = profile.address;
        if (infoLanguages) infoLanguages.textContent = profile.languages;

        // Bio (Giới thiệu)
        const aboutTextContainer = document.getElementById("about-text-container");
        if (aboutTextContainer && profile.bio) {
            const paragraphs = profile.bio.split("\n\n");
            aboutTextContainer.innerHTML = "";
            paragraphs.forEach(function (pText) {
                if (pText.trim() !== "") {
                    const p = document.createElement("p");
                    p.textContent = pText.trim();
                    aboutTextContainer.appendChild(p);
                }
            });
        }
    }

    // Khởi tạo hiển thị khi vào trang
    let currentProfile = getStoredProfile();
    renderProfile(currentProfile);


    /* =====================================================
       QUẢN LÝ MODAL CHỈNH SỬA HỒ SƠ
       ===================================================== */

    const editModal = document.getElementById("edit-profile-modal");
    const btnEditProfile = document.getElementById("btn-edit-profile");
    const btnCloseModal = document.getElementById("btn-close-modal");
    const btnCancelModal = document.getElementById("btn-cancel-modal");
    const btnSaveProfile = document.getElementById("btn-save-profile");

    const inputFullname = document.getElementById("input-fullname");
    const inputTitle = document.getElementById("input-title");
    const inputEmail = document.getElementById("input-email");
    const inputPhone = document.getElementById("input-phone");
    const inputAddress = document.getElementById("input-address");
    const inputLanguages = document.getElementById("input-languages");
    const inputBio = document.getElementById("input-bio");

    /* Mở Modal và nạp giá trị hiện tại vào ô nhập */
    function openModal() {
        if (!editModal) return;

        currentProfile = getStoredProfile();

        if (inputFullname) inputFullname.value = currentProfile.fullname || "";
        if (inputTitle) inputTitle.value = currentProfile.title || "";
        if (inputEmail) inputEmail.value = currentProfile.email || "";
        if (inputPhone) inputPhone.value = currentProfile.phone || "";
        if (inputAddress) inputAddress.value = currentProfile.address || "";
        if (inputLanguages) inputLanguages.value = currentProfile.languages || "";
        if (inputBio) inputBio.value = currentProfile.bio || "";

        editModal.classList.add("active");
    }

    /* Đóng Modal */
    function closeModal() {
        if (editModal) {
            editModal.classList.remove("active");
        }
    }

    /* Nút Chỉnh sửa hồ sơ mở Modal */
    if (btnEditProfile) {
        btnEditProfile.addEventListener("click", openModal);
    }

    /* Đóng Modal khi bấm nút đóng hoặc hủy */
    if (btnCloseModal) {
        btnCloseModal.addEventListener("click", closeModal);
    }

    if (btnCancelModal) {
        btnCancelModal.addEventListener("click", closeModal);
    }

    /* Đóng khi bấm ra ngoài khung modal */
    if (editModal) {
        editModal.addEventListener("click", function (event) {
            if (event.target === editModal) {
                closeModal();
            }
        });
    }

    /* Hiển thị thông báo Toast thành công */
    function showToast(message) {
        const toast = document.getElementById("toast-notification");
        const toastMsg = document.getElementById("toast-message");
        if (toast && toastMsg) {
            toastMsg.textContent = message || "Cập nhật thông tin thành công!";
            toast.classList.add("show");
            setTimeout(function () {
                toast.classList.remove("show");
            }, 3000);
        }
    }

    /* Xử lý bấm nút Lưu Thay Đổi */
    if (btnSaveProfile) {
        btnSaveProfile.addEventListener("click", function () {

            const updatedProfile = {
                fullname: inputFullname ? inputFullname.value.trim() : "",
                title: inputTitle ? inputTitle.value.trim() : "",
                email: inputEmail ? inputEmail.value.trim() : "",
                phone: inputPhone ? inputPhone.value.trim() : "",
                address: inputAddress ? inputAddress.value.trim() : "",
                languages: inputLanguages ? inputLanguages.value.trim() : "",
                bio: inputBio ? inputBio.value.trim() : ""
            };

            // Kiểm tra các trường bắt buộc cơ bản
            if (!updatedProfile.fullname || !updatedProfile.email) {
                alert("Vui lòng điền đầy đủ Họ và tên và Email.");
                return;
            }

            // Lưu vào localStorage và cập nhật giao diện
            localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
            currentProfile = updatedProfile;
            renderProfile(currentProfile);

            closeModal();
            showToast("Hồ sơ cá nhân đã được cập nhật thành công!");

        });
    }


    /* =====================================================
       NÚT XEM CHI TIẾT
       ===================================================== */

    const detailButton = document.querySelector(".text-button");

    if (detailButton) {

        detailButton.addEventListener("click", function () {

            const historyTab = document.querySelector(
                '.tab-button[data-tab="history"]'
            );

            if (historyTab) {
                historyTab.click();
            }

        });

    }


    /* =====================================================
       NÚT XUẤT BÁO CÁO
       ===================================================== */

    const exportButton = document.querySelector(".outline-button");

    if (exportButton) {

        exportButton.addEventListener("click", function () {

            alert(
                "Đang chuẩn bị báo cáo đánh giá hiệu suất."
            );

        });

    }


    /* =====================================================
       CÁC NÚT SIDEBAR
       ===================================================== */

    const sidebarItems = document.querySelectorAll(
        ".sidebar-nav .nav-item"
    );

    sidebarItems.forEach(function (item) {

        item.addEventListener("click", function () {

            sidebarItems.forEach(function (navItem) {
                navItem.classList.remove("active");
            });

            this.classList.add("active");

        });

    });

});