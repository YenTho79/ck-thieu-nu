// Dữ liệu mẫu (chuyển các bài đánh giá tĩnh cũ của bạn thành JSON)
const initialReviews = [
    { id: 1, title: 'Quidditch sau nhiều năm', book: 'Quidditch Qua Các Thời Đại', author: 'Ewelina Nowak', rating: 4, description: 'Tôi quay lại thế giới phù thủy để xem Quidditch đổi thay thế nào sau từng mùa giải; những pha tranh chấp quyết liệt và cảm giác hoài niệm khiến cuốn sách vẫn giữ trọn sức hút.', date: '10/11/2025', avatar: 'images/avatar/1.jpg' },
    { id: 2, title: 'Liệu bạn có an toàn ngay trong nhà?', book: 'Kẻ Gần Kề', author: 'Daniel Ciupała', rating: 5, description: 'Một câu chuyện giật gân đặt ra câu hỏi về niềm tin giữa những người thân cận nhất; mỗi chương lại đẩy nhân vật đến giới hạn và buộc họ xác định đâu mới là nơi trú ẩn thật sự.', date: '08/11/2025', avatar: 'images/avatar/2.jpeg' },
    { id: 3, title: 'Cuốn sách tuyệt vời về lịch sử Ba Lan', book: 'Kamienie na szaniec', author: 'Adam Konieczny', rating: 5, description: 'Tác phẩm được kể như một bản tường thuật giàu chất liệu tư liệu với những nhân vật có thật. Câu chuyện dựa trên nhật ký của chàng hướng đạo sinh mang bí danh Zośka...', date: '05/11/2025', avatar: 'images/avatar/3.jpeg' }
];

// Hàm khởi tạo dữ liệu mẫu nếu Local Storage trống
function initializeReviews() {
    if (!localStorage.getItem('bookReviews')) {
        localStorage.setItem('bookReviews', JSON.stringify(initialReviews));
    }
}

// Hàm render sao
function renderStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span class="fas fa-star ${i <= rating ? 'filled' : ''}"></span>`;
    }
    return `<div class="review-rating">${starsHtml}</div>`;
}

// Hàm tải và hiển thị đánh giá
function loadReviews() {
    const container = document.getElementById('reviewListContainer');
    const reviews = JSON.parse(localStorage.getItem('bookReviews')) || [];
    
    container.innerHTML = ''; 

    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review';
        
        reviewDiv.innerHTML = `
            <div class="review_info col_60p">
                <a href="#"><h4>${review.title}</h4></a>
                <div class="description">
                    ${renderStars(review.rating)}
                    <p>Đánh giá sách: <strong>${review.book}</strong></p>
                    <p>${review.description.substring(0, 250)}...</p>
                    <small>Đăng bởi ${review.author} vào: ${review.date}</small>
                </div>
            </div>
            <div class="review_author col_40p">
                <div class="avatar">
                    <img alt="ảnh đại diện" src="${review.avatar || 'images/avatar/default-user.png'}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;"/>
                </div>
                <h4>${review.author}</h4>
            </div>
        `;
        container.appendChild(reviewDiv);
    });

    if (reviews.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 30px;">Chưa có bài đánh giá nào. Hãy là người đầu tiên!</p>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeReviews(); 
    loadReviews();      
    // ... trong hàm loadReviews ...
reviews.forEach(review => {
    // ... tạo reviewDiv ...
    reviewDiv.innerHTML = `
        <img alt="ảnh đại diện" src="${review.avatar || defaultAvatar}" .../>
        `;
    // ...
});
});