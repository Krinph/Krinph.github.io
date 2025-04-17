// 首页脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取药品购买和AI问诊菜单项
    const buyMedicineItem = document.getElementById('buy-medicine');
    const aiConsultationItem = document.getElementById('ai-consultation');
    
    // 药品购买点击事件
    buyMedicineItem.addEventListener('click', function() {
        window.location.href = '../medicine/medicine.html';
    });
    
    // AI问诊点击事件
    aiConsultationItem.addEventListener('click', function() {
        window.location.href = '../ai-consultation/ai-consultation.html';
    });
});