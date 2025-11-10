document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newReviewForm');
    const stars = document.querySelectorAll('.rating-stars span');
    const ratingInput = document.getElementById('ratingValue');

    // --- Logic Đánh giá Sao ---
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            // Cập nhật trạng thái sao
            stars.forEach((s, index) => {
                s.classList.toggle('selected', index < rating);
            });
        });
    });

    // --- Logic Gửi Form và Lưu trữ ---
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (ratingInput.value === '0') {
                alert('Vui lòng chọn số sao đánh giá!');
                return;
            }

            const newReview = {
                id: Date.now(),
                title: document.getElementById('reviewTitle').value,
                book: document.getElementById('bookTitle').value,
                author: document.getElementById('reviewerName').value,
                rating: parseInt(ratingInput.value),
                description: document.getElementById('reviewText').value,
                date: new Date().toLocaleDateString('vi-VN'),
                avatar: 'images/avatar/default.png' // Sử dụng ảnh mặc định
            };

            let reviews = JSON.parse(localStorage.getItem('bookReviews')) || [];
            
            // Thêm đánh giá mới vào đầu danh sách (để hiển thị mới nhất trước)
            reviews.unshift(newReview);
            
            localStorage.setItem('bookReviews', JSON.stringify(reviews));

            alert('Đánh giá của bạn đã được đăng thành công! Chuyển đến trang danh sách.');
            
            // Chuyển hướng
            window.location.href = 'review-page.html'; 
            
        });
        // ... trong logic submit form ...
const userProfile = JSON.parse(localStorage.getItem('currentUserProfile')) || {};
const defaultAvatar = 'images/avatar/default-user.png';

const newReview = {
    // ... các trường dữ liệu khác ...
    // *** Điểm mấu chốt: GÁN ảnh hiện tại từ profile ***
    avatar: userProfile.avatarUrl || defaultAvatar 
};
// ... lưu newReview vào bookReviews ...
    }
    
});