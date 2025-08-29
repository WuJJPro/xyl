// UI 管理函数

// DOM 元素
let screens = {};

// 切换屏幕
function showScreen(screenName) {
    // 隐藏所有屏幕
    Object.keys(screens).forEach(key => {
        screens[key].classList.add('hidden');
    });
    
    // 显示目标屏幕
    screens[screenName].classList.remove('hidden');
    gameState.screen = screenName;
    
    // 更新导航按钮状态
    updateNavButtons(screenName);
    
    // 根据屏幕加载内容
    switch(screenName) {
        case 'map':
            renderMapScreen();
            break;
        case 'profile':
            renderProfileScreen();
            break;
        case 'alchemy':
            renderAlchemyScreen();
            break;
        case 'shop':
            renderShopScreen();
            break;
        case 'characters':
            renderCharactersScreen();
            break;
    }
}

// 更新导航按钮状态
function updateNavButtons(activeScreen) {
    // 移除所有按钮的活跃状态
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('nav-button-active');
    });
    
    // 设置当前屏幕按钮为活跃
    switch(activeScreen) {
        case 'map':
            document.getElementById('map-btn').classList.add('nav-button-active');
            break;
        case 'profile':
            document.getElementById('profile-btn').classList.add('nav-button-active');
            break;
        case 'alchemy':
            document.getElementById('alchemy-btn').classList.add('nav-button-active');
            break;
        case 'shop':
            document.getElementById('shop-btn').classList.add('nav-button-active');
            break;
        case 'characters':
            document.getElementById('characters-btn').classList.add('nav-button-active');
            break;
    }
}

// 渲染地图界面
function renderMapScreen() {
    const mapScreen = document.getElementById('map-screen');
    mapScreen.innerHTML = `
        <div class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-6 md:p-10 shadow-2xl border border-primary/30 h-full">
            <h2 class="text-[clamp(1.8rem,4vw,3rem)] font-bold mb-8 text-shadow-glow text-center">仙门地图</h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                ${mapLocations.map(location => `
                    <div class="map-location bg-white/80 rounded-xl p-5 border-2 border-${location.borderColor}-100 hover:border-${location.borderColor}-300 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 card-shadow" data-location="${location.location}" data-character="${location.character}">
                        <div class="w-full h-48 bg-gradient-to-br from-${location.borderColor}-100 to-${location.borderColor}-200 rounded-lg mb-4 overflow-hidden">
                            <img src="${location.image}" alt="${location.name}场景" class="w-full h-full object-cover">
                        </div>
                        <h3 class="text-xl font-bold mb-2 flex items-center">
                            <i class="fa ${location.icon} text-${location.iconColor} mr-2"></i> ${location.name}
                        </h3>
                        <p class="text-dark/80">${location.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // 重新绑定地图点击事件
    const locations = document.querySelectorAll('.map-location');
    locations.forEach(location => {
        location.addEventListener('click', function() {
            const locationType = this.dataset.location;
            const characterId = this.dataset.character;
            showVisualDialog(characterId, locationType);
        });
    });
}

// 渲染个人界面
function renderProfileScreen() {
    const profileScreen = document.getElementById('profile-screen');
    profileScreen.innerHTML = `
        <div class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-6 md:p-10 shadow-2xl border border-primary/30 h-full">
            <h2 class="text-[clamp(1.8rem,4vw,3rem)] font-bold mb-8 text-shadow-glow text-center">个人信息</h2>
            
            <div class="flex flex-col lg:flex-row gap-8">
                <!-- 主角信息 -->
                <div class="lg:w-1/3 bg-white/80 rounded-xl p-6 border border-primary/30 card-shadow">
                    <div class="text-center mb-6">
                        <div class="w-40 h-40 rounded-full border-4 border-primary/70 mx-auto mb-4 overflow-hidden">
                            <img src="https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/code_assistant/79e7179ffc0b49f88751399588e5e14c~tplv-a9rns2rl98-image.image?rcl=20250814221508CDDA694D2E38BF2EEDF0&amp;rk3s=8e244e95&amp;rrcfp=e75484ac&amp;x-expires=1755785709&amp;x-signature=2zkoRUTNAiKFSExzFEOIaTiNoU8%3D" alt="主角灵月头像" class="w-full h-full object-cover">
                        </div>
                        <h3 class="text-2xl font-bold">灵月 (你)</h3>
                        <p class="text-dark/80">药修 · 炼气期三层</p>
                    </div>
                    
                    <div class="space-y-4 mt-8">
                        <div class="flex justify-between items-center">
                            <span class="text-lg">修为进度</span>
                            <div class="w-2/3 bg-pink-100 rounded-full h-3">
                                <div class="bg-primary h-3 rounded-full" style="width: 30%"></div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-lg">炼丹术</span>
                            <div class="w-2/3 bg-purple-100 rounded-full h-3">
                                <div class="bg-secondary h-3 rounded-full" style="width: 45%"></div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-lg">草药知识</span>
                            <div class="w-2/3 bg-yellow-100 rounded-full h-3">
                                <div class="bg-accent h-3 rounded-full" style="width: 60%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 好感度面板 -->
                <div class="lg:w-2/3 bg-white/80 rounded-xl p-6 border border-primary/30 card-shadow">
                    <h3 class="text-xl font-bold mb-6 flex items-center">
                        <i class="fa fa-heart text-primary mr-2"></i> 角色好感度
                    </h3>
                    
                    <div class="space-y-8">
                        <!-- 师尊 -->
                        <div class="flex items-center gap-6 p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
                            <div class="w-20 h-20 rounded-full border-2 border-primary/70 overflow-hidden">
                                <img src="https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/code_assistant/0fae5d8f5d514362a9b9dc50014d81c0~tplv-a9rns2rl98-image.image?rcl=20250814221528F4602D54EC25C149BA00&amp;rk3s=8e244e95&amp;rrcfp=e75484ac&amp;x-expires=1755785729&amp;x-signature=%2F8oqg2gIcGAX8oHhukgYB9q9JNQ%3D" alt="玄尘师尊头像" class="w-full h-full object-cover">
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between items-center mb-2">
                                    <h4 class="font-bold text-xl">玄尘师尊</h4>
                                    <span class="text-accent text-lg">好感度: ${gameState.好感度.师尊}/100</span>
                                </div>
                                <div class="w-full bg-pink-100 rounded-full h-3 mb-3">
                                    <div class="bg-primary h-3 rounded-full" style="width: ${gameState.好感度.师尊}%"></div>
                                </div>
                                <p class="text-dark/70">清冷出尘，修为高深，对弟子要求严格但内心关怀</p>
                            </div>
                            <button class="view-character-details bg-primary/30 hover:bg-primary/50 text-white py-2 px-4 rounded-full transition-colors" data-character="master">
                                详情
                            </button>
                        </div>
                        
                        <!-- 小师弟 -->
                        <div class="flex items-center gap-6 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                            <div class="w-20 h-20 rounded-full border-2 border-blue-300 overflow-hidden">
                                <img src="https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/code_assistant/02d2ff9f9a3540729636a8c40fea989b~tplv-a9rns2rl98-image.image?rcl=20250814221540F4602D54EC25C149C391&amp;rk3s=8e244e95&amp;rrcfp=e75484ac&amp;x-expires=1755785740&amp;x-signature=YHcBN2o2hEhF7BQfYQvY%2Bbp2Zx8%3D" alt="夜宸小师弟头像" class="w-full h-full object-cover">
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between items-center mb-2">
                                    <h4 class="font-bold text-xl">夜宸小师弟</h4>
                                    <span class="text-accent text-lg">好感度: ${gameState.好感度.师弟}/100</span>
                                </div>
                                <div class="w-full bg-blue-100 rounded-full h-3 mb-3">
                                    <div class="bg-blue-400 h-3 rounded-full" style="width: ${gameState.好感度.师弟}%"></div>
                                </div>
                                <p class="text-dark/70">表面乖巧，实则心思缜密，总爱跟在你身后师姐师姐地叫</p>
                            </div>
                            <button class="view-character-details bg-blue-400/30 hover:bg-blue-400/50 text-white py-2 px-4 rounded-full transition-colors" data-character="junior">
                                详情
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 重新绑定查看详情事件
    document.querySelectorAll('.view-character-details').forEach(btn => {
        btn.addEventListener('click', () => {
            showScreen('characters');
        });
    });
}

// 渲染炼丹界面
function renderAlchemyScreen() {
    const alchemyScreen = document.getElementById('alchemy-screen');
    alchemyScreen.innerHTML = `
        <div class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-6 md:p-10 shadow-2xl border border-primary/30 h-full">
            <h2 class="text-[clamp(1.8rem,4vw,3rem)] font-bold mb-8 text-shadow-glow text-center">炼丹房</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- 草药列表 -->
                <div class="bg-white/80 rounded-xl p-6 border border-primary/30 card-shadow">
                    <h3 class="text-xl font-bold mb-6 flex items-center">
                        <i class="fa fa-pagelines text-primary mr-2"></i> 草药库存
                    </h3>
                    
                    <div class="space-y-4 max-h-[600px] overflow-y-auto scrollbar-hide pr-2">
                        ${herbs.map(herb => `
                            <div class="flex justify-between items-center p-3 bg-${herb.color}-50 rounded hover:bg-${herb.color}-100 transition-colors">
                                <div class="flex items-center">
                                    <img src="${herb.image}" alt="${herb.name}" class="w-8 h-8 rounded-full mr-3">
                                    <span class="text-lg">${herb.name}</span>
                                </div>
                                <span class="bg-${herb.color}-100 px-3 py-1 rounded text-sm">x${herb.count}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- 炼丹炉 -->
                <div class="bg-white/80 rounded-xl p-6 border border-primary/30 card-shadow flex flex-col items-center justify-center">
                    <h3 class="text-xl font-bold mb-8 flex items-center">
                        <i class="fa fa-fire text-primary mr-2"></i> 炼丹炉
                    </h3>
                    
                    <div class="relative mb-8">
                        <div class="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center animate-pulse-slow">
                            <img src="https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/code_assistant/39f0bc10839746abb2070804239b0ef8~tplv-a9rns2rl98-image.image?rcl=20250814221405AEF3CD9A7549237EEED3&amp;rk3s=8e244e95&amp;rrcfp=e75484ac&amp;x-expires=1755785646&amp;x-signature=yuk3hTCpZf3U653ptZFOZd1VsnM%3D" alt="炼丹炉" class="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover">
                        </div>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div id="alchemy-progress" class="w-24 h-24 rounded-full border-4 border-primary/30 border-t-primary flex items-center justify-center text-2xl font-bold">
                                开始
                            </div>
                        </div>
                    </div>
                    
                    <div class="w-full max-w-xs mb-6">
                        <h4 class="text-center font-bold mb-3">选择丹方</h4>
                        <div class="grid grid-cols-3 gap-2">
                            <button class="select-pill bg-primary/30 hover:bg-primary/50 text-white py-2 px-1 rounded transition-colors text-sm bg-primary" data-pill="回春丹">回春丹</button>
                            <button class="select-pill bg-primary/30 hover:bg-primary/50 text-white py-2 px-1 rounded transition-colors text-sm" data-pill="凝神丹">凝神丹</button>
                            <button class="select-pill bg-primary/30 hover:bg-primary/50 text-white py-2 px-1 rounded transition-colors text-sm" data-pill="清心丹">清心丹</button>
                        </div>
                    </div>
                    
                    <button id="start-alchemy" class="bg-primary hover:bg-primary/80 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
                        开始炼丹 <i class="fa fa-play ml-1"></i>
                    </button>
                </div>
                
                <!-- 丹药列表 -->
                <div class="bg-white/80 rounded-xl p-6 border border-primary/30 card-shadow">
                    <h3 class="text-xl font-bold mb-6 flex items-center">
                        <i class="fa fa-flask text-primary mr-2"></i> 丹药库存
                    </h3>
                    
                    <div class="space-y-5 max-h-[600px] overflow-y-auto scrollbar-hide pr-2">
                        ${pills.map(pill => `
                            <div class="p-4 bg-${pill.color}-50 rounded hover:bg-${pill.color}-100 transition-colors">
                                <div class="flex justify-between items-center mb-2">
                                    <h4 class="font-bold text-lg">${pill.name}</h4>
                                    <div class="flex items-center">
                                        <span class="text-accent mr-3">x${pill.count}</span>
                                        <button class="sell-pill bg-secondary/70 hover:bg-secondary text-sm px-3 py-1 rounded" data-pill-name="${pill.name}" data-value="${pill.value}">出售</button>
                                    </div>
                                </div>
                                <div class="flex items-center mb-2">
                                    <img src="${pill.image}" alt="${pill.name}" class="w-8 h-8 rounded-full mr-3">
                                    <p class="text-dark/70">${pill.description}</p>
                                </div>
                                <p class="text-xs text-accent mt-2">价值: ${pill.value} 金币</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 重新绑定事件
    setupAlchemyEvents();
}

// 渲染商店界面
function renderShopScreen() {
    const shopScreen = document.getElementById('shop-screen');
    shopScreen.innerHTML = `
        <div class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-6 md:p-10 shadow-2xl border border-primary/30 h-full">
            <h2 class="text-[clamp(1.8rem,4vw,3rem)] font-bold mb-8 text-shadow-glow text-center">神秘商店</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${shopItems.map(item => `
                    <div class="bg-white rounded-xl overflow-hidden border border-${item.borderColor}-100 hover:border-${item.borderColor}-300 transition-all duration-300 transform hover:-translate-y-2 card-shadow">
                        <div class="h-52 bg-gradient-to-br from-${item.borderColor}-100 to-${item.borderColor}-200 flex items-center justify-center">
                            <img src="${item.image}" alt="${item.name}" class="h-full w-full object-cover">
                        </div>
                        <div class="p-5">
                            <div class="flex justify-between items-start mb-3">
                                <h3 class="font-bold text-xl">${item.name}</h3>
                                <span class="${item.bgColor ? `bg-${item.bgColor}` : 'bg-' + item.tagColor + '/20'} text-${item.tagColor} text-sm px-3 py-1 rounded">${item.tag}</span>
                            </div>
                            <p class="text-sm text-dark/70 mb-4">${item.description}</p>
                            <div class="flex justify-between items-center">
                                <span class="text-accent font-bold text-lg">${item.price} 金币</span>
                                <button class="buy-item ${item.buttonColor ? `bg-${item.buttonColor} hover:bg-${item.buttonHoverColor}` : 'bg-primary hover:bg-primary/80'} text-white text-sm py-2 px-4 rounded transition-colors" data-item-name="${item.name}" data-price="${item.price}">
                                    购买
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // 重新绑定购买事件
    setupShopEvents();
}

// 渲染人物介绍界面
function renderCharactersScreen() {
    const charactersScreen = document.getElementById('characters-screen');
    charactersScreen.innerHTML = `
        <div class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-6 md:p-10 shadow-2xl border border-primary/30 h-full">
            <h2 class="text-[clamp(1.8rem,4vw,3rem)] font-bold mb-8 text-shadow-glow text-center">人物介绍</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                ${Object.keys(characterDetails).map(key => {
                    const char = characterDetails[key];
                    return `
                        <div class="bg-white rounded-xl overflow-hidden border border-${char.borderColor}/30 card-shadow">
                            <div class="h-64 bg-gradient-to-br from-${char.bgGradientFrom} to-${char.bgGradientTo} flex items-center justify-center">
                                <img src="${char.image}" alt="${char.name}" class="h-full w-full object-cover">
                            </div>
                            <div class="p-6">
                                <h3 class="text-2xl font-bold mb-2">${char.name}</h3>
                                <p class="${char.titleColor ? 'text-' + char.titleColor : 'text-accent'} mb-4">${char.title}</p>
                                
                                <div class="mb-6">
                                    <h4 class="font-bold mb-2 text-lg">人物简介</h4>
                                    <p class="text-dark/80 leading-relaxed">
                                        ${char.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// 显示通知
function showNotification(message) {
    const notification = document.getElementById('notification');
    document.getElementById('notification-text').textContent = message;
    notification.classList.remove('translate-x-full');
    
    // 3秒后隐藏
    setTimeout(() => {
        notification.classList.add('translate-x-full');
    }, 3000);
}

// 更新金币显示
function updateGoldDisplay() {
    document.getElementById('gold-count').textContent = gameState.gold;
}