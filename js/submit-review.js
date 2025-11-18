// =======================================================
// Tệp: submit_review.js
// =======================================================

// Khởi tạo ứng dụng Firebase (sử dụng cú pháp Compat)
const app = firebase.initializeApp({
    apiKey: "AIzaSyBeu3hd6O4AvqPH6IG2g7FwaGNAxk4ztMo",
    authDomain: "bookreviewapp-9638e.firebaseapp.com",
    projectId: "bookreviewapp-9638e",
    storageBucket: "bookreviewapp-9638e.firebasestorage.app",
    messagingSenderId: "463378223084",
    appId: "1:463378223084:web:2468ab66a2d575adaf7ac9",
    measurementId: "G-GK8JLDVGYF"
});

// Kết nối với Firestore Database
const db = app.firestore(); 

// ----------------------------------------------------
// PHẦN I: LOGIC XỬ LÝ SAO (Rating)
// ----------------------------------------------------
let currentRating = 0;
// Lấy Form và các phần tử
const newReviewForm = document.getElementById('newReviewForm'); 
const stars = document.querySelectorAll('.rating-stars .fa-star');
const ratingInput = document.getElementById('ratingValue');

// Hàm tô màu sao (Đã có trong code của bạn)
function updateStars(rating) {
    stars.forEach(star => {
        if (parseInt(star.dataset.rating) <= rating) {
            star.classList.add('checked'); 
            star.style.color = 'gold'; 
        } else {
            star.classList.remove('checked');
            star.style.color = '#ccc';
        }
    });
}

stars.forEach(star => {
    star.addEventListener('click', () => {
        currentRating = parseInt(star.dataset.rating); 
        ratingInput.value = currentRating; 
        updateStars(currentRating); 
    });
});

// ----------------------------------------------------
// PHẦN II: LOGIC GỬI DỮ LIỆU LÊN FIREBASE
// ----------------------------------------------------

newReviewForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    // Kiểm tra điểm sao trước khi gửi
    if (ratingInput.value === "0") {
        alert("Vui lòng chọn điểm đánh giá (1 đến 5 sao).");
        return; 
    }
    
    // Thu thập dữ liệu từ các ID đã gán trong HTML
    const reviewData = {
        tieuDe: document.getElementById('reviewTitle').value,
        tenSach: document.getElementById('bookTitle').value,
        tenNguoiDang: document.getElementById('reviewerName').value || 'Ẩn danh',
        noiDung: document.getElementById('reviewText').value,
        diemSao: parseInt(ratingInput.value),
        ngayDang: firebase.firestore.FieldValue.serverTimestamp() // Lấy thời gian từ Server
    };

    // Gửi lên Firestore Collection "reviews"
    try {
        await db.collection("reviews").add(reviewData);
        alert('Đăng bài đánh giá thành công! Dữ liệu đã được lưu trữ.');
        
        // Reset Form và sao
        newReviewForm.reset(); 
        updateStars(0); 
    } catch (error) {
        console.error("Lỗi khi thêm bài đánh giá: ", error);
        alert('Đã xảy ra lỗi khi đăng bài: ' + error.message);
    }
});