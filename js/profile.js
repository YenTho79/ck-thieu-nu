document.addEventListener('DOMContentLoaded', function() {
    // 1. Dữ liệu mặc định (hoặc tải từ Local Storage)
    
    const DEFAULT_PROFILE = {
        avatarUrl: 'images/avatar/default-user.png',
        displayName: 'User Mới Đăng Nhập',
        email: 'user@example.com',
        bio: 'Tôi là một một người yêu sách và thích chia sẻ đánh giá.',
        password: 'password123' // Mật khẩu mẫu
    };

    let userProfile = JSON.parse(localStorage.getItem('currentUserProfile')) || DEFAULT_PROFILE;
    
    // Lưu lại dữ liệu mặc định lần đầu nếu chưa có
    localStorage.setItem('currentUserProfile', JSON.stringify(userProfile));


    // --- HÀM TẢI VÀ HIỂN THỊ THÔNG TIN ---
    function loadProfileData() {
        document.getElementById('currentAvatar').src = userProfile.avatarUrl;
        document.getElementById('displayName').value = userProfile.displayName;
        document.getElementById('email').value = userProfile.email;
        document.getElementById('bio').value = userProfile.bio;
    }

    // --- KHU VỰC 1: ĐỔI ẢNH ĐẠI DIỆN ---
    const avatarUpload = document.getElementById('avatarUpload');
    const saveAvatarBtn = document.getElementById('saveAvatarBtn');

    avatarUpload.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('currentAvatar').src = event.target.result;
                saveAvatarBtn.disabled = false;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    saveAvatarBtn.addEventListener('click', function() {
        const newAvatarUrl = document.getElementById('currentAvatar').src;
        userProfile.avatarUrl = newAvatarUrl;
        localStorage.setItem('currentUserProfile', JSON.stringify(userProfile));
        alert('Ảnh đại diện đã được lưu thành công!');
        saveAvatarBtn.disabled = true;

        // ** CHUYỂN HƯỚNG VỀ TRANG CHỦ **
        window.location.href = 'home.html'; 
    });

    // --- KHU VỰC 2: ĐỔI THÔNG TIN CƠ BẢN ---
    const infoForm = document.getElementById('infoForm');
    infoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        userProfile.displayName = document.getElementById('displayName').value;
        userProfile.email = document.getElementById('email').value;
        userProfile.bio = document.getElementById('bio').value;

        localStorage.setItem('currentUserProfile', JSON.stringify(userProfile));
        alert('Thông tin cá nhân đã được cập nhật thành công!');
        
        // ** CHUYỂN HƯỚNG VỀ TRANG CHỦ **
        window.location.href = 'home.html'; 
    });

    // --- KHU VỰC 3: ĐỔI MẬT KHẨU ---
    const passwordForm = document.getElementById('passwordForm');
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPass = document.getElementById('currentPassword').value;
        const newPass = document.getElementById('newPassword').value;
        const confirmNewPass = document.getElementById('confirmNewPassword').value;

        if (currentPass !== userProfile.password) {
            alert('Mật khẩu hiện tại không đúng!');
            return;
        }

        if (newPass !== confirmNewPass) {
            alert('Mật khẩu mới và Xác nhận mật khẩu mới không khớp!');
            return;
        }

        if (newPass.length < 6) {
             alert('Mật khẩu mới phải có ít nhất 6 ký tự!');
            return;
        }

        userProfile.password = newPass;
        localStorage.setItem('currentUserProfile', JSON.stringify(userProfile));
        alert('Mật khẩu đã được đổi thành công!');
        passwordForm.reset();
        
        // ** CHUYỂN HƯỚNG VỀ TRANG CHỦ **
        window.location.href = 'home.html'; 
    });

    // Tải dữ liệu khi trang load xong
    loadProfileData();
    
});
