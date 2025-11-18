// =======================================================
// Tệp: js/review-display.js (ĐÃ SỬA LỖI REFERENCE ERROR)
// =======================================================

// --- KHỞI TẠO FIREBASE (PHẢI LÀ PHẦN ĐẦU TIÊN) ---
const app = firebase.initializeApp({
    apiKey: "AIzaSyBeu3hd6O4AvqPH6IG2g7FwaGNAxk4ztMo",
    authDomain: "bookreviewapp-9638e.firebaseapp.com",
    projectId: "bookreviewapp-9638e",
    storageBucket: "bookreviewapp-9638e.firebasestorage.app",
    messagingSenderId: "463378223084",
    appId: "1:463378223084:web:2468ab66a2d5757adaf7ac9",
    measurementId: "G-GK8JLDVGYF"
});

const db = app.firestore(); 
const reviewsContainer = document.getElementById('reviewListContainer'); 


// --- HÀM TẢI VÀ HIỂN THỊ ĐÁNH GIÁ ---
async function loadReviews() {
    if (!reviewsContainer) {
        // Log lỗi nếu không tìm thấy container (giúp debug HTML)
        console.error("Lỗi: Không tìm thấy phần tử #reviewListContainer."); 
        return; 
    }

    try {
        // 1. Truy vấn Dữ liệu: Đổi tên biến để tránh lỗi reviews is not defined
        const reviewsSnapshot = await db.collection('reviews')
            .orderBy('ngayDang', 'desc')
            .limit(10)
            .get();

        reviewsContainer.innerHTML = ''; // Xóa thông báo 'Đang tải'

        if (reviewsSnapshot.empty) {
            reviewsContainer.innerHTML = '<p style="text-align: center; color: #888;">Chưa có bài đánh giá nào.</p>';
            return;
        }

        // 2. Lặp qua từng bài đánh giá
        reviewsSnapshot.forEach(doc => {
            const review = doc.data(); 
            
            const starsHTML = '★'.repeat(review.diemSao) + '☆'.repeat(5 - review.diemSao);
            
            // Đảm bảo review.ngayDang tồn tại trước khi gọi toDate()
            const dateStr = review.ngayDang && typeof review.ngayDang.toDate === 'function' 
                            ? review.ngayDang.toDate().toLocaleDateString('vi-VN') 
                            : 'N/A';
            
            const reviewElement = document.createElement('article');
            reviewElement.classList.add('single-review-item'); 
            
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
        reviewsContainer.innerHTML = '<p style="text-align: center; color: red;">Không thể tải bài đánh giá. Lỗi: ' + error.message + '</p>';
    }
}

// Gọi hàm khi toàn bộ trang web tải xong
window.onload = loadReviews;