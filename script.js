/* =========================================================
   PROJECT MANAGEMENT SYSTEM
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. KHAI BÁO BIẾN
    ====================================================== */

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mainNav = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    // Biến điều khiển Modal Đăng nhập / Đăng ký Nhân viên
    const authModalOverlay = document.getElementById("authModalOverlay");
    const closeAuthModalBtn = document.getElementById("closeAuthModal");
    const staffTriggers = document.querySelectorAll(".staff-trigger");


    /* =====================================================
       2. XỬ LÝ MENU MOBILE
    ====================================================== */

    if (mobileMenuBtn && mainNav) {

        mobileMenuBtn.addEventListener("click", function () {
            const isOpen = mainNav.classList.toggle("mobile-open");
            mobileMenuBtn.setAttribute("aria-expanded", isOpen);

            const icon = mobileMenuBtn.querySelector(".material-symbols-outlined");
            if (icon) {
                icon.textContent = isOpen ? "close" : "menu";
            }
        });


        /* Đóng menu sau khi chọn liên kết */
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                mainNav.classList.remove("mobile-open");
                mobileMenuBtn.setAttribute("aria-expanded", "false");

                const icon = mobileMenuBtn.querySelector(".material-symbols-outlined");
                if (icon) {
                    icon.textContent = "menu";
                }
            });
        });


        /* Đóng menu khi nhấn phím Escape */
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                mainNav.classList.remove("mobile-open");
                mobileMenuBtn.setAttribute("aria-expanded", "false");

                const icon = mobileMenuBtn.querySelector(".material-symbols-outlined");
                if (icon) {
                    icon.textContent = "menu";
                }
            }
        });
    }


    /* =====================================================
       3. ACTIVE NAVIGATION THEO SCROLL
    ====================================================== */

    const observerOptions = {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }

            const currentId = entry.target.getAttribute("id");

            navLinks.forEach(function (link) {
                const linkTarget = link.getAttribute("href");
                link.classList.toggle(
                    "active",
                    linkTarget === "#" + currentId
                );
            });
        });
    }, observerOptions);

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });


    /* =====================================================
       4. CUỘN MƯỢT KHI CLICK NAV
    ====================================================== */

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            const header = document.getElementById("header");
            const headerHeight = header ? header.offsetHeight : 64;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /* =====================================================
       5. XỬ LÝ POPUP MODAL YÊU CẦU ĐĂNG NHẬP (NHÂN VIÊN)
    ====================================================== */

    function openAuthModal() {
        if (authModalOverlay) {
            authModalOverlay.classList.add("active");
        }
    }

    function closeAuthModal() {
        if (authModalOverlay) {
            authModalOverlay.classList.remove("active");
        }
    }

    // Bắt sự kiện click vào bất kỳ nút/liên kết Nhân viên nào
    staffTriggers.forEach(function (trigger) {
        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            openAuthModal();
        });
    });

    // Nút đóng Modal
    if (closeAuthModalBtn) {
        closeAuthModalBtn.addEventListener("click", closeAuthModal);
    }

    // Đóng Modal khi click ra lớp nền mờ bên ngoài
    if (authModalOverlay) {
        authModalOverlay.addEventListener("click", function (event) {
            if (event.target === authModalOverlay) {
                closeAuthModal();
            }
        });
    }


    /* =====================================================
       6. XỬ LÝ TƯƠNG TÁC CLICK CHO THẺ VAI TRÒ (.role-pill)
    ====================================================== */

    const rolePills = document.querySelectorAll(".role-pill");

    rolePills.forEach(function (pill) {
        pill.addEventListener("click", function (event) {
            event.preventDefault();

            // Kích hoạt trạng thái được chọn
            rolePills.forEach(p => p.classList.remove("active"));
            this.classList.add("active");

            // Mở modal đăng nhập nhân viên
            openAuthModal();
        });
    });


    /* =====================================================
       7. SỰ KIỆN XEM TẤT CẢ TÁC VỤ
    ====================================================== */

    const viewAllTask = document.querySelector(".task-heading a");

    if (viewAllTask) {
        viewAllTask.addEventListener("click", function (event) {
            event.preventDefault();
            openAuthModal();
        });
    }


    /* =====================================================
       8. ĐÓNG MENU KHI THAY ĐỔI KÍCH THƯỚC MÀN HÌNH & ESC
    ====================================================== */

    window.addEventListener("resize", function () {
        if (window.innerWidth > 768 && mainNav) {
            mainNav.classList.remove("mobile-open");

            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute("aria-expanded", "false");
                const icon = mobileMenuBtn.querySelector(".material-symbols-outlined");
                if (icon) {
                    icon.textContent = "menu";
                }
            }
        }
    });

    // Đóng Modal khi bấm phím Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && authModalOverlay && authModalOverlay.classList.contains("active")) {
            closeAuthModal();
        }
    });

});