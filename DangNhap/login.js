// Bật/tắt ẩn hiện mật khẩu
function togglePasswordVisibility() {
    const pwdInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');

    if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        eyeIcon.innerText = 'visibility_off';
    } else {
        pwdInput.type = 'password';
        eyeIcon.innerText = 'visibility';
    }
}

// Xử lý sự kiện đăng nhập & xác thực tài khoản
function triggerAuth() {
    const identifierInput = document.getElementById('identifier').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const btn = document.getElementById('btn-login');
    const text = document.getElementById('btn-login-text');
    const errorBox = document.getElementById('login-error');

    // Hiệu ứng đang xác thực
    btn.disabled = true;
    text.innerText = "Đang xác thực thông tin định danh...";
    if (errorBox) {
        errorBox.style.display = 'none';
    }

    setTimeout(() => {
        // Danh sách tài khoản hợp lệ của nhân viên Trần Thị Bình (NV-002)
        const validIdentifiers = ['nv-002', 'tranbinh', 'tranbinh@company.com'];
        const validPassword = '123456';

        if (validIdentifiers.includes(identifierInput.toLowerCase()) && passwordInput === validPassword) {
            // Lưu Session nhân viên
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userCode', 'NV-002');
            sessionStorage.setItem('userName', 'Trần Thị Bình');

            text.innerText = "Đăng nhập thành công! Đang chuyển hướng...";

            setTimeout(() => {
                window.location.href = '../TongQuan_Staff/tong-quan.html';
            }, 600);
        } else {
            // Xử lý khi nhập sai
            btn.disabled = false;
            text.innerText = "Đăng nhập vào không gian làm việc";

            if (errorBox) {
                errorBox.style.display = 'flex';
            }
        }
    }, 1000);
}

// Chuyển đổi ngôn ngữ (Tiếng Việt / English)
function setLanguage(lang) {
    const viBtn = document.getElementById('lang-vi');
    const enBtn = document.getElementById('lang-en');

    if (lang === 'vi') {
        viBtn.classList.add('active');
        enBtn.classList.remove('active');
    } else {
        enBtn.classList.add('active');
        viBtn.classList.remove('active');
    }

    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });

    document.querySelectorAll('[data-placeholder-' + lang + ']').forEach(el => {
        el.placeholder = el.getAttribute('data-placeholder-' + lang);
    });
}