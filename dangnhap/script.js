document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('toggleLoginPassword');
    const passwordInput = document.getElementById('login-password');
    const loginForm = document.getElementById('loginForm');

    // **1. Password Visibility Toggle**
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            // Lấy ID của input mật khẩu từ form Đăng nhập
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle the eye icon (show/hide)
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // **2. Logic Đăng nhập và Chuyển hướng**
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn chặn form gửi đi mặc định
            
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            // *** Ở đây bạn cần kiểm tra username/password với database ***
            // *** Hiện tại chỉ là mô phỏng thành công ***
            
            if (username && password) {
                console.log('Đăng nhập thành công! Đang chuyển hướng về trang chủ gốc...');
                alert('Đăng nhập thành công! Chào mừng trở lại.');
                
                // *** CHUYỂN HƯỚNG ĐẾN INDEX.HTML Ở THƯ MỤC GỐC ***
                // Đường dẫn tương đối từ /dangnhap/index.html lên thư mục gốc là '../index.html'
                window.location.href = '../index.html'; 
                
            } else {
                alert('Vui lòng điền đầy đủ Tên đăng nhập và Mật khẩu.');
            }
        });
    }
});