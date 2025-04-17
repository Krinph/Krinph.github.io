// 药品购买页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const medicineItems = document.querySelectorAll('.medicine-item');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const sortOption = document.getElementById('sort-option');
    
    // 药品点击事件 - 跳转到详情页
    medicineItems.forEach(item => {
        item.addEventListener('click', function() {
            const medicineId = this.getAttribute('data-id');
            window.location.href = `medicine-detail.html?id=${medicineId}`;
        });
    });
    
    // 搜索功能
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        filterMedicines(searchTerm, categoryFilter.value);
    });
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase().trim();
            filterMedicines(searchTerm, categoryFilter.value);
        }
    });
    
    // 分类筛选
    categoryFilter.addEventListener('change', function() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        filterMedicines(searchTerm, this.value);
    });
    
    // 排序功能
    sortOption.addEventListener('change', function() {
        sortMedicines(this.value);
    });
    
    // 筛选药品函数
    function filterMedicines(searchTerm, category) {
        medicineItems.forEach(item => {
            const medicineName = item.querySelector('h3').textContent.toLowerCase();
            const medicineDesc = item.querySelector('.medicine-brief').textContent.toLowerCase();
            const medicineCategory = item.getAttribute('data-category');
            
            const matchesSearch = medicineName.includes(searchTerm) || medicineDesc.includes(searchTerm) || searchTerm === '';
            const matchesCategory = category === 'all' || medicineCategory === category;
            
            if (matchesSearch && matchesCategory) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // 排序药品函数
    function sortMedicines(sortBy) {
        const medicineList = document.querySelector('.medicine-list');
        const items = Array.from(medicineItems);
        
        items.sort((a, b) => {
            if (sortBy === 'price-asc') {
                const priceA = parseFloat(a.querySelector('.medicine-price').textContent.replace('¥', ''));
                const priceB = parseFloat(b.querySelector('.medicine-price').textContent.replace('¥', ''));
                return priceA - priceB;
            } else if (sortBy === 'price-desc') {
                const priceA = parseFloat(a.querySelector('.medicine-price').textContent.replace('¥', ''));
                const priceB = parseFloat(b.querySelector('.medicine-price').textContent.replace('¥', ''));
                return priceB - priceA;
            } else if (sortBy === 'sales') {
                const salesA = parseInt(a.querySelector('.medicine-sales').textContent.match(/\d+/)[0]);
                const salesB = parseInt(b.querySelector('.medicine-sales').textContent.match(/\d+/)[0]);
                return salesB - salesA;
            }
            return 0;
        });
        
        // 重新添加排序后的元素
        items.forEach(item => {
            medicineList.appendChild(item);
        });
    }
});

// 药品详情页脚本
if (document.querySelector('.medicine-detail')) {
    document.addEventListener('DOMContentLoaded', function() {
        // 获取URL参数
        const urlParams = new URLSearchParams(window.location.search);
        const medicineId = urlParams.get('id');
        
        // 在实际应用中，这里应该根据ID从服务器获取药品数据
        // 这里仅做演示，使用静态数据
        
        // 选项卡切换
        const tabHeaders = document.querySelectorAll('.tab-header');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabHeaders.forEach(header => {
            header.addEventListener('click', function() {
                // 移除所有active类
                tabHeaders.forEach(h => h.classList.remove('active'));
                tabPanels.forEach(p => p.classList.remove('active'));
                
                // 添加active类到当前选项卡
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // 缩略图切换
        const thumbnails = document.querySelectorAll('.thumbnail');
        const detailImage = document.getElementById('detail-image');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                detailImage.src = this.src;
            });
        });
        
        // 规格选择
        const specOptions = document.querySelectorAll('.spec-option');
        
        specOptions.forEach(option => {
            option.addEventListener('click', function() {
                specOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                // 更新价格（实际应用中应根据规格变化）
                if (this.textContent === '20袋/盒') {
                    document.getElementById('medicine-price').textContent = '48.5';
                } else {
                    document.getElementById('medicine-price').textContent = '25.8';
                }
            });
        });
        
        // 数量控制
        const minusBtn = document.querySelector('.quantity-btn.minus');
        const plusBtn = document.querySelector('.quantity-btn.plus');
        const quantityInput = document.getElementById('quantity-input');
        
        minusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantityInput.value = quantity - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityInput.value);
            if (quantity < 99) {
                quantityInput.value = quantity + 1;
            }
        });
        
        // 加入购物车按钮
        const addCartBtn = document.querySelector('.btn-add-cart');
        addCartBtn.addEventListener('click', function() {
            const medicineName = document.getElementById('medicine-name').textContent;
            const quantity = document.getElementById('quantity-input').value;
            alert(`已将 ${quantity} 盒 ${medicineName} 加入购物车！`);
        });
        
        // 立即购买按钮
        const buyNowBtn = document.querySelector('.btn-buy-now');
        buyNowBtn.addEventListener('click', function() {
            const medicineName = document.getElementById('medicine-name').textContent;
            const quantity = document.getElementById('quantity-input').value;
            alert(`正在跳转到结算页面，购买 ${quantity} 盒 ${medicineName}...`);
            // 实际应用中应跳转到结算页面
        });
    });
}