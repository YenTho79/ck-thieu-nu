// Dữ liệu mẫu (thay thế bằng API hoặc danh sách dữ liệu thực tế của bạn)
const BOOKS_DATA = [
    { title: "Harry Potter và Hòn đá Phù thủy", author: "J.K. Rowling" },
    { title: "Chúa tể những chiếc nhẫn", author: "J.R.R. Tolkien" },
    { title: "Tiểu Hoàng Tử", author: "Antoine de Saint-Exupéry" },
    { title: "Kamienie na szaniec", author: "Aleksander Kamiński" },
    { title: "Bí mật của trí nhớ", author: "Adam Konieczny" }
];

function performSearch() {
    const inputElement = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');
    // Lấy từ khóa và chuyển thành chữ thường để tìm kiếm không phân biệt chữ hoa/thường
    const query = inputElement.value.toLowerCase().trim();

    // Xóa kết quả cũ
    resultsContainer.innerHTML = '';

    if (query === "") {
        resultsContainer.innerHTML = '<p class="initial-message">Vui lòng nhập từ khóa để tìm kiếm.</p>';
        return;
    }

    // Lọc sách theo từ khóa
    const foundBooks = BOOKS_DATA.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
    );

    // Hiển thị kết quả
    if (foundBooks.length > 0) {
        foundBooks.forEach(book => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <h4>${book.title}</h4>
                <p>Tác giả: ${book.author}</p>
            `;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        // Trường hợp không tìm thấy (Không tồn tại)
        resultsContainer.innerHTML = `
            <p class="not-found-message">🚫 Không tìm thấy sách hoặc truyện phù hợp với từ khóa "${inputElement.value}".</p>
        `;
    }
    // --- LOGIC HIỆN/ẨN THANH TÌM KIẾM TRÊN HEADER (cho index.html) ---

function toggleSearchBox() {
    const searchBox = document.getElementById('search-dropdown');
    
    if (searchBox) { // Kiểm tra xem phần tử có tồn tại không
        if (searchBox.style.display === 'none' || searchBox.style.display === '') {
            searchBox.style.display = 'block'; 
            // Cố gắng focus vào input nếu nó tồn tại
            const input = document.getElementById('headerSearchInput');
            if(input) input.focus(); 
        } else {
            searchBox.style.display = 'none';
            // Cố gắng xóa nội dung input khi đóng
            const input = document.getElementById('headerSearchInput');
            if(input) input.value = '';
        }
    }
}

function redirectToSearch() {
    const query = document.getElementById('headerSearchInput').value.trim();
    if (query) {
        // Chuyển hướng đến trang search.html và truyền từ khóa tìm kiếm qua URL
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    } else {
        alert("Vui lòng nhập từ khóa tìm kiếm.");
    }
}

function handleSearchKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        redirectToSearch();
    }
}
// search.js
function toggleSearchBox() {
    // CHÚ Ý: Đổi ID thành 'search-bar-pop'
    const searchBox = document.getElementById('search-bar-pop'); 
    
    if (searchBox) { 
        if (searchBox.style.display === 'none' || searchBox.style.display === '') {
            searchBox.style.display = 'flex'; // Dùng flex để căn chỉnh
            const input = document.getElementById('headerSearchInput');
            if(input) input.focus(); 
            
            // Ẩn logo và navigation control khi thanh tìm kiếm hiện
            document.querySelector('.logo').style.visibility = 'hidden';
            document.querySelector('.navigation_control').style.visibility = 'hidden';
            
        } else {
            searchBox.style.display = 'none';
            const input = document.getElementById('headerSearchInput');
            if(input) input.value = '';
            
            // Hiện lại logo và navigation control khi thanh tìm kiếm đóng
            document.querySelector('.logo').style.visibility = 'visible';
            document.querySelector('.navigation_control').style.visibility = 'visible';
        }
    }
}
// Các hàm redirectToSearch() và handleSearchKey() giữ nguyên.

// --- LOGIC XỬ LÝ KẾT QUẢ TÌM KIẾM (cho search.html) ---
// (Giữ logic tìm kiếm ban đầu của bạn ở đây, ví dụ: performSearch() )
}
