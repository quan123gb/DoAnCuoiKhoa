/* =========================================================
   PROJECT MANAGEMENT SYSTEM
   REGISTER PAGE - EMPLOYEE REGISTRATION
   LANGUAGE + PASSWORD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       TRANSLATIONS
    ===================================================== */

    const translations = {

        /* =================================================
           VIETNAMESE
        ================================================= */

        vi: {

            brandSubtitle:
                "HỆ THỐNG QUẢN TRỊ DỰ ÁN NỘI BỘ",

            help:
                "Trợ giúp",

            newWorkspace:
                "Đăng ký tài khoản Nhân viên",

            tls:
                "Mã hóa TLS 1.3",

            registerTitle:
                "Đăng ký tài khoản Nhân viên",

            registerSubtitle:
                "Khởi tạo tài khoản dành cho nhân viên mới tham gia vào hệ thống quản lý dự án",

            stepPersonal:
                "Thông tin cá nhân",

            stepSetting:
                "Đang khai báo",

            stepOrganization:
                "Phòng ban & Chức danh",

            stepVerify:
                "Xác thực & Kích hoạt",

            fullName:
                "Họ và tên nhân viên",

            fullNamePlaceholder:
                "vd: Nguyễn Văn An",

            employeeCode:
                "Mã số nhân viên (Mã NV)",

            optional:
                "Bắt buộc",

            employeeCodePlaceholder:
                "vd: NV-1024",

            companyEmail:
                "Email công ty cấp",

            emailPlaceholder:
                "tenban@congty.com",

            internalDomain:
                "Email nội bộ",

            emailHelp:
                "Vui lòng nhập chính xác email do công ty cấp để hệ thống tự động phân quyền dự án.",

            phone:
                "Số điện thoại cá nhân",

            phonePlaceholder:
                "0912 345 678",

            role:
                "Chức danh trong dự án",

            rolePlaceholder:
                "Chọn vị trí / chức danh công việc...",

            rolePM:
                "Trưởng dự án / Quản lý dự án (Project Manager)",

            roleLead:
                "Trưởng nhóm kỹ thuật (Tech Lead / Team Lead)",

            roleDeveloper:
                "Kỹ sư phần mềm (Software Engineer)",

            roleDesigner:
                "Nhà thiết kế sản phẩm (UI/UX Designer)",

            roleQA:
                "Kỹ sư kiểm thử chất lượng (QA/QC Engineer)",

            rolePO:
                "Quản lý sản phẩm / Phân tích nghiệp vụ (PO / BA)",

            password:
                "Mật khẩu đăng nhập",

            passwordPlaceholder:
                "Tối thiểu 10 ký tự, kết hợp ký tự hoa, số và ký hiệu",

            passwordStrength:
                "Độ an toàn mật khẩu:",

            strengthWeak:
                "Yếu",

            strengthMedium:
                "Trung bình",

            strengthGood:
                "Khá mạnh",

            strengthStrong:
                "Mạnh",

            ruleLength:
                "Tối thiểu 10 ký tự",

            ruleCase:
                "Ký tự viết hoa & viết thường",

            ruleNumber:
                "Ít nhất 1 chữ số (0-9)",

            ruleSpecial:
                "Chứa ký tự đặc biệt (!@#$)",

            confirmPassword:
                "Xác nhận mật khẩu",

            confirmPasswordPlaceholder:
                "Nhập lại mật khẩu để khớp bảo mật",

            agreementStart:
                "Tôi đồng ý với",

            usagePolicy:
                "Nội quy lao động & Quy chế CNTT",

            privacyPolicy:
                "Chính sách bảo mật dữ liệu công ty",

            agreementAnd:
                "và",

            nda:
                "Thỏa thuận bảo mật thông tin (NDA)",

            submit:
                "Gửi thông tin đăng ký nhân viên",

            alreadyAccount:
                "Đã có tài khoản nhân viên?",

            loginNow:
                "Đăng nhập hệ thống (ST-LOG01)",

            enterpriseLabel:
                "HỆ THỐNG NHÂN SỰ NỘI BỘ",

            enterpriseTitle:
                "Nền tảng làm việc & quản lý công việc tập trung dành cho Nhân viên",

            isoText:
                "An toàn thông tin & Bảo mật dữ liệu nội bộ",

            feature1Title:
                "Theo dõi tiến độ & Nhận giao việc",

            feature1Text:
                "Quản lý danh sách công việc cá nhân, tiến độ dự án theo sơ đồ Gantt và bảng Kanban trực quan.",

            feature2Title:
                "Bảo mật thông tin & Phân quyền IAM",

            feature2Text:
                "Truy cập đúng thẩm quyền dự án, mã hóa tài liệu công việc và quản lý danh tính nhân sự an toàn.",

            feature3Title:
                "Cộng tác làm việc nhóm",

            feature3Text:
                "Trao đổi công việc tức thì, chia sẻ tài liệu dự án và nhật ký hoạt động nhóm minh bạch 24/7.",

            activationTitle:
                "Quy trình kích hoạt tài khoản Nhân viên",

            activation1:
                "Điền thông tin cá nhân & Mã số nhân viên (Mã NV)",

            activation2:
                "Bộ phận Quản trị / HR kiểm tra và phê duyệt",

            activation3:
                "Đăng nhập, xác thực 2FA và nhận phân quyền làm việc",

            supportTitle:
                "Hỗ trợ Kỹ thuật & Nhân sự (HR)",

            supportText:
                "Hotline nội bộ: 1900 6886 • hr-support@pm-system.internal",

            supportButton:
                "Gửi yêu cầu",

            copyright:
                "Bản quyền 2025 Enterprise Project Management System - Khối Nhân sự & CNTT",

            isoFooter:
                "Chứng nhận ISO/IEC 27001",

            footerPrivacy:
                "Quy định Bảo mật Nội bộ",

            footerTerms:
                "Điều khoản Sử dụng Hệ thống",

            footerContact:
                "Liên hệ HR / IT Helpdesk"
        },


        /* =================================================
           ENGLISH
        ================================================= */

        en: {

            brandSubtitle:
                "INTERNAL PROJECT MANAGEMENT SYSTEM",

            help:
                "Help",

            newWorkspace:
                "Employee Account Registration",

            tls:
                "TLS 1.3 Encryption",

            registerTitle:
                "Employee Account Registration",

            registerSubtitle:
                "Create a new employee account for the project management system",

            stepPersonal:
                "Personal Info",

            stepSetting:
                "In Progress",

            stepOrganization:
                "Department & Role",

            stepVerify:
                "Verification & Activation",

            fullName:
                "Employee Full Name",

            fullNamePlaceholder:
                "e.g. Nguyen Van An",

            employeeCode:
                "Employee ID (Emp Code)",

            optional:
                "Required",

            employeeCodePlaceholder:
                "e.g. NV-1024",

            companyEmail:
                "Company Email",

            emailPlaceholder:
                "yourname@company.com",

            internalDomain:
                "Internal Email",

            emailHelp:
                "Please enter your official company email for automatic project permission assignment.",

            phone:
                "Personal Phone Number",

            phonePlaceholder:
                "0912 345 678",

            role:
                "Project Role",

            rolePlaceholder:
                "Select your role / position...",

            rolePM:
                "Project Manager",

            roleLead:
                "Tech Lead / Team Lead",

            roleDeveloper:
                "Software Engineer",

            roleDesigner:
                "UI/UX Designer",

            roleQA:
                "QA/QC Engineer",

            rolePO:
                "Product Owner / Business Analyst (PO / BA)",

            password:
                "Password",

            passwordPlaceholder:
                "At least 10 characters, including uppercase, numbers and symbols",

            passwordStrength:
                "Password strength:",

            strengthWeak:
                "Weak",

            strengthMedium:
                "Medium",

            strengthGood:
                "Good",

            strengthStrong:
                "Strong",

            ruleLength:
                "At least 10 characters",

            ruleCase:
                "Uppercase & lowercase characters",

            ruleNumber:
                "At least 1 number (0-9)",

            ruleSpecial:
                "Contains special character (!@#$)",

            confirmPassword:
                "Confirm Password",

            confirmPasswordPlaceholder:
                "Re-enter your password",

            agreementStart:
                "I agree to the",

            usagePolicy:
                "Work Regulations & IT Policy",

            privacyPolicy:
                "Company Data Privacy Policy",

            agreementAnd:
                "and",

            nda:
                "Non-Disclosure Agreement (NDA)",

            submit:
                "Submit Employee Registration",

            alreadyAccount:
                "Already have an employee account?",

            loginNow:
                "Sign in (ST-LOG01)",

            enterpriseLabel:
                "INTERNAL HR SYSTEM",

            enterpriseTitle:
                "Centralized work management platform for Employees",

            isoText:
                "Internal Data Security & Information Safety",

            feature1Title:
                "Track Progress & Receive Tasks",

            feature1Text:
                "Manage personal task lists, project progress via Gantt charts and intuitive Kanban boards.",

            feature2Title:
                "Security & IAM Access Control",

            feature2Text:
                "Role-based project access, work document encryption, and secure employee identity management.",

            feature3Title:
                "Team Collaboration",

            feature3Text:
                "Real-time communication, project file sharing, and transparent team activity logs 24/7.",

            activationTitle:
                "Employee Account Activation Process",

            activation1:
                "Fill in personal details & Employee ID",

            activation2:
                "HR / System Administrator reviews and approves",

            activation3:
                "Sign in, set up 2FA and receive workspace access permissions",

            supportTitle:
                "Technical & HR Support",

            supportText:
                "Internal Hotline: 1900 6886 • hr-support@pm-system.internal",

            supportButton:
                "Submit Request",

            copyright:
                "Copyright 2025 Enterprise Project Management System - HR & IT Dept",

            isoFooter:
                "ISO/IEC 27001 Certified",

            footerPrivacy:
                "Internal Privacy Policy",

            footerTerms:
                "System Terms of Use",

            footerContact:
                "Contact HR / IT Helpdesk"
        }

    };


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const btnVietnamese =
        document.getElementById("btnVietnamese");

    const btnEnglish =
        document.getElementById("btnEnglish");

    const passwordInput =
        document.getElementById("pwd-input");

    const passwordToggle =
        document.getElementById("pwd-toggle");

    const passwordEye =
        document.getElementById("passwordEye");

    const strengthText =
        document.getElementById("strengthText");

    const strengthBars =
        document.querySelectorAll(".strength-bar");

    const confirmPassword =
        document.getElementById("confirm-password");

    const confirmIcon =
        document.getElementById("confirmIcon");

    const registerForm =
        document.getElementById("registerForm");


    let currentLanguage = "vi";


    /* =====================================================
       CHANGE LANGUAGE
    ===================================================== */

    function changeLanguage(language) {

        if (!translations[language]) {
            return;
        }

        currentLanguage = language;

        document.documentElement.lang = language;


        const data =
            translations[language];


        /* -----------------------------------------------
           TEXT
        ------------------------------------------------ */

        document
            .querySelectorAll("[data-i18n]")
            .forEach(function (element) {

                const key =
                    element.getAttribute("data-i18n");

                if (data[key] !== undefined) {

                    element.textContent =
                        data[key];

                }

            });


        /* -----------------------------------------------
           PLACEHOLDER
        ------------------------------------------------ */

        document
            .querySelectorAll("[data-placeholder]")
            .forEach(function (element) {

                const key =
                    element.getAttribute("data-placeholder");

                if (data[key] !== undefined) {

                    element.placeholder =
                        data[key];

                }

            });


        /* -----------------------------------------------
           LANGUAGE BUTTON
        ------------------------------------------------ */

        btnVietnamese.classList.toggle(
            "active",
            language === "vi"
        );

        btnEnglish.classList.toggle(
            "active",
            language === "en"
        );


        /* -----------------------------------------------
           TITLE
        ------------------------------------------------ */

        if (language === "vi") {

            document.title =
                "Đăng ký tài khoản Nhân viên - Project Management System";

        } else {

            document.title =
                "Employee Registration - Project Management System";

        }


        /* -----------------------------------------------
           PASSWORD TEXT
        ------------------------------------------------ */

        updatePasswordStrength();


        /* -----------------------------------------------
           PASSWORD ACCESSIBILITY
        ------------------------------------------------ */

        passwordToggle.setAttribute(
            "aria-label",
            passwordInput.type === "password"
                ? (
                    language === "vi"
                        ? "Hiện mật khẩu"
                        : "Show password"
                )
                : (
                    language === "vi"
                        ? "Ẩn mật khẩu"
                        : "Hide password"
                )
        );

    }


    /* =====================================================
       LANGUAGE EVENTS
    ===================================================== */

    btnVietnamese.addEventListener(
        "click",
        function () {

            changeLanguage("vi");

        }
    );


    btnEnglish.addEventListener(
        "click",
        function () {

            changeLanguage("en");

        }
    );


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    passwordToggle.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                passwordEye.textContent =
                    "visibility_off";

                passwordToggle.setAttribute(
                    "aria-label",
                    currentLanguage === "vi"
                        ? "Ẩn mật khẩu"
                        : "Hide password"
                );

            } else {

                passwordInput.type = "password";

                passwordEye.textContent =
                    "visibility";

                passwordToggle.setAttribute(
                    "aria-label",
                    currentLanguage === "vi"
                        ? "Hiện mật khẩu"
                        : "Show password"
                );

            }

        }
    );


    /* =====================================================
       PASSWORD STRENGTH
    ===================================================== */

    function updatePasswordStrength() {

        const password =
            passwordInput.value;


        const hasLength =
            password.length >= 10;

        const hasCase =
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password);

        const hasNumber =
            /[0-9]/.test(password);

        const hasSpecial =
            /[^A-Za-z0-9]/.test(password);


        const ruleLength =
            document.getElementById("ruleLength");

        const ruleCase =
            document.getElementById("ruleCase");

        const ruleNumber =
            document.getElementById("ruleNumber");

        const ruleSpecial =
            document.getElementById("ruleSpecial");


        updateRule(
            ruleLength,
            hasLength
        );

        updateRule(
            ruleCase,
            hasCase
        );

        updateRule(
            ruleNumber,
            hasNumber
        );

        updateRule(
            ruleSpecial,
            hasSpecial
        );


        /* -----------------------------------------------
           DEFAULT STATE
        ------------------------------------------------ */

        if (password.length === 0) {

            setStrengthBars(3);

            strengthText.textContent =
                translations[currentLanguage]
                    .strengthGood;

            return;
        }


        /* -----------------------------------------------
           SCORE
        ------------------------------------------------ */

        let score = 0;


        if (hasLength) {
            score++;
        }

        if (hasCase) {
            score++;
        }

        if (hasNumber) {
            score++;
        }

        if (hasSpecial) {
            score++;
        }


        setStrengthBars(score);


        const data =
            translations[currentLanguage];


        if (score <= 1) {

            strengthText.textContent =
                data.strengthWeak;

        } else if (score === 2) {

            strengthText.textContent =
                data.strengthMedium;

        } else if (score === 3) {

            strengthText.textContent =
                data.strengthGood;

        } else {

            strengthText.textContent =
                data.strengthStrong;

        }

    }


    /* =====================================================
       UPDATE RULE
    ===================================================== */

    function updateRule(element, valid) {

        const icon =
            element.querySelector(
                ".material-symbols-outlined"
            );


        if (valid) {

            element.classList.add("valid");

            icon.textContent =
                "check_circle";

        } else {

            element.classList.remove("valid");

            icon.textContent =
                "radio_button_unchecked";

        }

    }


    /* =====================================================
       STRENGTH BARS
    ===================================================== */

    function setStrengthBars(count) {

        strengthBars.forEach(
            function (bar, index) {

                if (index < count) {

                    bar.classList.add("active");

                } else {

                    bar.classList.remove("active");

                }

            }
        );

    }


    /* =====================================================
       PASSWORD INPUT
    ===================================================== */

    passwordInput.addEventListener(
        "input",
        function () {

            updatePasswordStrength();

            checkPasswordConfirmation();

        }
    );


    /* =====================================================
       CONFIRM PASSWORD
    ===================================================== */

    confirmPassword.addEventListener(
        "input",
        checkPasswordConfirmation
    );


    function checkPasswordConfirmation() {

        const password =
            passwordInput.value;

        const confirm =
            confirmPassword.value;


        /* Giữ icon ban đầu nếu chưa nhập */

        if (confirm.length === 0) {

            confirmIcon.textContent =
                "check_circle";

            confirmIcon.style.color =
                "var(--primary)";

            return;
        }


        if (password === confirm) {

            confirmIcon.textContent =
                "check_circle";

            confirmIcon.style.color =
                "var(--primary)";

        } else {

            confirmIcon.textContent =
                "error";

            confirmIcon.style.color =
                "var(--error)";

        }

    }


    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    changeLanguage("vi");

});