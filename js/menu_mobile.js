$(function(){
    
    $('#header .navigation_control').click(function(){
      if($('#header').hasClass('active-menu-mobile')) {
        $('#header').removeClass('active-menu-mobile');
      } else {
        $('#header').addClass('active-menu-mobile');
      }
		$('#navigation').slideToggle();
	});

    $('#header #navigation .menu > li').each(function(){
		if($(this).find('.sub-menu').length<1) return;
		$(this).addClass('parent')
		 $(this).append('<a href="#" class="ico-collapse"></a>').find('.ico-collapse').html('<i class="icon-down-open"></i>')
		 	.click(function(){

 					$(this).prev().slideToggle();
 					return false;
				}
			);

		});
document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.getElementById('profile-container');
    const userAvatarDisplay = document.getElementById('user-avatar-display');
    const logoutButton = document.getElementById('logout-button');
    const loginRegisterButtons = document.querySelector('.gbtn'); // Chọn khối Đăng ký/Đăng nhập cũ

    // Dữ liệu mẫu mặc định
    const DEFAULT_AVATAR = 'images/avatar/default-user.png';
    const DEFAULT_PROFILE = {
        avatarUrl: DEFAULT_AVATAR,
        displayName: 'Độc giả'
    };

    // Hàm cập nhật trạng thái
    function updateLoginStatus() {
        const userProfile = JSON.parse(localStorage.getItem('currentUserProfile'));

        if (userProfile && userProfile.email) { // Kiểm tra Đã đăng nhập
            // 1. Hiển thị Profile Icon
            if (profileContainer) profileContainer.style.display = 'flex';
            
            // 2. Cập nhật ảnh đại diện
            if (userAvatarDisplay) {
                userAvatarDisplay.src = userProfile.avatarUrl || DEFAULT_AVATAR;
                userAvatarDisplay.title = userProfile.displayName || DEFAULT_PROFILE.displayName;
            }

            // 3. Ẩn nút Đăng ký/Đăng nhập cũ (trong div.gbtn)
            if (loginRegisterButtons) loginRegisterButtons.style.display = 'none';

        } else {
            // Ẩn Profile Icon và hiện nút Đăng nhập/Đăng ký cũ
            if (profileContainer) profileContainer.style.display = 'none';
            if (loginRegisterButtons) loginRegisterButtons.style.display = 'block';
        }
    }
    
    // Xử lý Đăng xuất (giữ nguyên logic trước đó)
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUserProfile');
            alert('Bạn đã đăng xuất thành công!');
            updateLoginStatus(); 
            window.location.href = 'home.html'; 
        });
    }

    // Chạy khi trang tải
    updateLoginStatus();
});

// LƯU Ý: Nếu bạn có nút Đăng nhập/Đăng ký cũ, bạn cần thêm logic ẩn/hiện chúng ở đây
}); 
