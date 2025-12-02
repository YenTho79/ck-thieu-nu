// -------------------------------------------------------
// Hiển thị danh sách đánh giá từ Firestore
// -------------------------------------------------------

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
const boardLead = document.querySelector('.board-header .lead');

function renderStars(score) {
    const safeScore = Math.max(0, Math.min(5, Number(score) || 0));
    return '&#9733;'.repeat(safeScore) + '&#9734;'.repeat(5 - safeScore);
}

async function loadReviews() {
    if (!reviewsContainer) {
        console.error('Không tìm thấy #reviewListContainer.');
        return;
    }

    if (boardLead) {
        boardLead.innerHTML = '<i class="fas fa-hourglass-half"></i> Đang tải đánh giá...';
    }

    try {
        const reviewsSnapshot = await db.collection('reviews')
            .orderBy('ngayDang', 'desc')
            .limit(10)
            .get();

        reviewsContainer.innerHTML = '';

        if (reviewsSnapshot.empty) {
            reviewsContainer.innerHTML = '<p style="text-align: center; color: #888;">Chưa có bài đánh giá nào.</p>';
            if (boardLead) {
                boardLead.innerHTML = '<i class="fas fa-circle-info"></i> Hãy là người đầu tiên chia sẻ.';
            }
            return;
        }

        reviewsSnapshot.forEach(doc => {
            const review = doc.data();
            const starsHTML = renderStars(review.diemSao);
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
                    <small>Đăng bởi ${review.tenNguoiDang} vào ${dateStr}</small>
                </div>
            `;
            reviewsContainer.appendChild(reviewElement);
        });

        if (boardLead) {
            boardLead.innerHTML = '<i class="fas fa-check-circle"></i> Đã cập nhật mới nhất';
        }
    } catch (error) {
        console.error('Lỗi khi tải bài đánh giá:', error);
        reviewsContainer.innerHTML = '<p style="text-align: center; color: red;">Không thể tải bài đánh giá. Lỗi: ' + error.message + '</p>';
        if (boardLead) {
            boardLead.innerHTML = '<i class="fas fa-circle-exclamation"></i> Lỗi tải dữ liệu';
        }
    }
}

window.onload = loadReviews;
