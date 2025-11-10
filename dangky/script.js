document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const registrationForm = document.getElementById('registrationForm');

    // ... (Giữ nguyên logic Toggle Password) ...

    // Form Submission (CẬP NHẬT PHẦN CHUYỂN HƯỚNG)
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn chặn form gửi đi mặc định
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                // *** Mô phỏng đăng ký thành công (thực tế cần kiểm tra server) ***
                console.log('Đăng ký thành công! Đang chuyển hướng về trang chủ gốc...');
                alert('Đăng ký thành công! Bạn sẽ được chuyển đến trang chủ.');
                
                // *** CHUYỂN HƯỚNG ĐẾN INDEX.HTML Ở THƯ MỤC GỐC ***
                window.location.href = '../index.html'; 
                
            } else {
                alert('Vui lòng điền đầy đủ thông tin Tên đăng nhập và Mật khẩu.');
            }
        });
    }
});