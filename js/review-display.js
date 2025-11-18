// =======================================================
// Tệp: js/review-display.js (ĐÃ GỠ LỖI CÚ PHÁP)
// =======================================================

// Khởi tạo ứng dụng Firebase (SỬ DỤNG LẠI CẤU HÌNH CỦA BẠN)
const app = firebase.initializeApp({
    // Cấu hình Firebase của bạn
    apiKey: "AIzaSyBeu3hd6O4AvqPH6IG2g7FwaGNAxk4ztMo",
    authDomain: "bookreviewapp-9638e.firebaseapp.com",
    projectId: "bookreviewapp-9638e",
    storageBucket: "bookreviewapp-9638e.firebasestorage.app",
    messagingSenderId: "463378223084",
    appId: "1:463378223084:web:2468ab66a2d575adaf7ac9",
    measurementId: "G-GK8JLDVGYF"
});

const db = app.firestore(); 
const reviewsContainer = document.getElementById('reviewListContainer'); 

async function loadReviews() {
    if (!reviewsContainer) {
        console.error("Lỗi: Không tìm thấy phần tử #reviewListContainer.");
        return; 
    }

    try {
        // 1. Truy vấn Dữ liệu: Lấy 10 bài đánh giá mới nhất
        const reviewsSnapshot = await db.collection('reviews')
            .orderBy('ngayDang', 'desc')
            .limit(10)
            .get();

        reviewsContainer.innerHTML = ''; // Xóa thông báo 'Đang tải'

        if (reviewsSnapshot.empty) {
            reviewsContainer.innerHTML = '<p style="text-align: center; color: #888;">Chưa có bài đánh giá nào. Hãy là người đầu tiên!</p>';
            return;
        }

        // 2. Lặp qua từng bài đánh giá và tạo HTML
        reviewsSnapshot.forEach(doc => {
            const review = doc.data(); 
            
            // Xử lý Ngôi sao hiển thị (Ví dụ: 4 sao -> ★★★★☆)
            const starsHTML = '★'.repeat(review.diemSao) + '☆'.repeat(5 - review.diemSao);
            
            // Xử lý Ngày đăng
            const dateStr = review.ngayDang && typeof review.ngayDang.toDate === 'function' 
                            ? review.ngayDang.toDate().toLocaleDateString('vi-VN') 
                            : 'N/A';
            
            const reviewElement = document.createElement('article');
            reviewElement.classList.add('single-review-item'); // Dùng class này để CSS
            
            reviewElement.innerHTML = `
                <div class="review-header">
                    <h3 class="review-title">${review.tieuDe}</h3>
                    <div class="review-rating-display">${starsHTML}</div>
                </div>
                <p class="book-info">Sách: <strong>${review.tenSach}</strong></p>
                <p class="review-content">${review.noiDung}</p>
                <div class="review-meta">
                    <small>Đăng bởi: ${review.tenNguoiDang} vào ${dateStr}</small>
                </div>
            `;
            
            reviewsContainer.appendChild(reviewElement);
        });

    } catch (error) {
        console.error("Lỗi khi tải bài đánh giá (Vui lòng kiểm tra Firebase Rules): ", error);
        // Lỗi thường là 403 (Permission Denied) nếu Rules chưa cho phép đọc
        reviewsContainer.innerHTML = '<p style="text-align: center; color: red;">Không thể tải bài đánh giá. Vui lòng kiểm tra Console (F12).</p>';
    }
}

// Gọi hàm loadReviews khi toàn bộ trang web tải xong
window.onload = loadReviews;