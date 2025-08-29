// 事件处理函数

// 初始化事件监听
function initEventListeners() {
    // 开始游戏按钮
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            showScreen('map');
        });
    }
    
    // 导航按钮 - PC端
    document.getElementById('map-btn')?.addEventListener('click', () => showScreen('map'));
    document.getElementById('profile-btn')?.addEventListener('click', () => showScreen('profile'));
    document.getElementById('alchemy-btn')?.addEventListener('click', () => showScreen('alchemy'));
    document.getElementById('shop-btn')?.addEventListener('click', () => showScreen('shop'));
    document.getElementById('characters-btn')?.addEventListener('click', () => showScreen('characters'));
    
    // 移动端菜单
    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    });
    
    // 移动端导航
    document.getElementById('map-btn-mobile')?.addEventListener('click', () => {
        showScreen('map');
        document.getElementById('mobile-menu').classList.add('hidden');
    });
    
    document.getElementById('profile-btn-mobile')?.addEventListener('click', () => {
        showScreen('profile');
        document.getElementById('mobile-menu').classList.add('hidden');
    });
    
    document.getElementById('alchemy-btn-mobile')?.addEventListener('click', () => {
        showScreen('alchemy');
        document.getElementById('mobile-menu').classList.add('hidden');
    });
    
    document.getElementById('shop-btn-mobile')?.addEventListener('click', () => {
        showScreen('shop');
        document.getElementById('mobile-menu').classList.add('hidden');
    });
    
    document.getElementById('characters-btn-mobile')?.addEventListener('click', () => {
        showScreen('characters');
        document.getElementById('mobile-menu').classList.add('hidden');
    });
    
    // 悬浮返回按钮
    document.getElementById('floating-return-btn')?.addEventListener('click', () => {
        showScreen('map');
    });
    
    // 发送消息
    document.getElementById('send-message')?.addEventListener('click', sendPlayerMessage);
    
    // 回车发送
    document.getElementById('player-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendPlayerMessage();
        }
    });
    
    // 快捷回复
    document.querySelectorAll('.quick-reply').forEach(btn => {
        btn.addEventListener('click', () => {
            const inputEl = document.getElementById('player-input');
            inputEl.value = btn.textContent;
            sendPlayerMessage();
        });
    });
    
    // 切换AI模式
    document.getElementById('toggle-ai-mode')?.addEventListener('click', () => {
        gameState.aiMode = !gameState.aiMode;
        const btn = document.getElementById('toggle-ai-mode');
        
        if (gameState.aiMode) {
            btn.classList.remove('bg-secondary/20');
            btn.classList.add('bg-secondary', 'text-white');
            btn.innerHTML = '<i class="fa fa-robot text-xl"></i> <span class="font-bold">AI开启</span>';
            showNotification('已开启AI对话模式 - 使用DeepSeek大模型');
        } else {
            btn.classList.add('bg-secondary/20');
            btn.classList.remove('bg-secondary', 'text-white');
            btn.innerHTML = '<i class="fa fa-robot text-xl"></i> <span class="font-bold">AI对话</span>';
            showNotification('已关闭AI对话模式');
        }
    });
}

// 设置地图地点事件
function setupMapLocations() {
    const locations = document.querySelectorAll('.map-location');
    locations.forEach(location => {
        location.addEventListener('click', function() {
            const locationType = this.dataset.location;
            const characterId = this.dataset.character;
            showVisualDialog(characterId, locationType);
        });
    });
}

// 设置炼丹事件
function setupAlchemyEvents() {
    // 炼丹按钮
    document.getElementById('start-alchemy')?.addEventListener('click', startAlchemy);
    
    // 选择丹方
    document.querySelectorAll('.select-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            selectPill(btn.dataset.pill);
        });
    });
    
    // 出售丹药
    document.querySelectorAll('.sell-pill').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pillName = btn.dataset.pillName;
            const value = parseInt(btn.dataset.value);
            sellPill(pillName, value);
        });
    });
}

// 设置商店事件
function setupShopEvents() {
    // 购买物品
    document.querySelectorAll('.buy-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemName = btn.dataset.itemName;
            const price = parseInt(btn.dataset.price);
            buyItem(itemName, price);
        });
    });
}