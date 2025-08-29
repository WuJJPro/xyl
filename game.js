// 游戏核心逻辑

// 更新金币
function updateGold(amount) {
    gameState.gold += amount;
    updateGoldDisplay();
    
    if (amount > 0) {
        showNotification(`获得 ${amount} 金币！`);
    } else if (amount < 0) {
        showNotification(`花费 ${-amount} 金币！`);
    }
}

// 开始炼丹
function startAlchemy() {
    const progressEl = document.getElementById('alchemy-progress');
    const startBtn = document.getElementById('start-alchemy');
    
    startBtn.disabled = true;
    startBtn.classList.add('opacity-50', 'cursor-not-allowed');
    
    let progress = 0;
    progressEl.textContent = '0%';
    
    const interval = setInterval(() => {
        progress += 10;
        progressEl.style.borderTopWidth = '4px';
        progressEl.style.transform = `rotate(${progress * 3.6}deg)`;
        progressEl.textContent = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            progressEl.textContent = '完成';
            progressEl.style.borderTopWidth = '0';
            progressEl.style.transform = 'rotate(0)';
            
            showNotification(`成功炼制出 ${gameState.currentPill}！`);
            startBtn.disabled = false;
            startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }, 300);
}

// 选择丹方
function selectPill(pillName) {
    gameState.currentPill = pillName;
    
    document.querySelectorAll('.select-pill').forEach(btn => {
        if (btn.dataset.pill === pillName) {
            btn.classList.add('bg-primary');
            btn.classList.remove('bg-primary/30', 'hover:bg-primary/50');
        } else {
            btn.classList.remove('bg-primary');
            btn.classList.add('bg-primary/30', 'hover:bg-primary/50');
        }
    });
}

// 添加消息到聊天界面
function addMessage(text, sender, characterId = null) {
    const messageContainer = document.getElementById('message-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-appear');
    
    if (sender === 'other') {
        // 对方消息
        const character = characters[characterId];
        messageDiv.innerHTML = `
            <div class="flex items-start gap-2">
                <div class="shrink-0 w-10 h-10 rounded-full overflow-hidden">${character.avatar}</div>
                <div>
                    <div class="${character.bgColor} rounded-t-lg rounded-br-lg px-4 py-2 max-w-[70%]">
                        ${text}
                    </div>
                    <span class="text-xs text-gray-400 ml-2">${getCurrentTime()}</span>
                </div>
            </div>
        `;
    } else {
        // 玩家消息
        messageDiv.innerHTML = `
            <div class="flex items-start justify-end gap-2">
                <div class="text-right">
                    <div class="bg-accent/20 rounded-t-lg rounded-bl-lg px-4 py-2 max-w-[70%]">
                        ${text}
                    </div>
                    <span class="text-xs text-gray-400 mr-2">${getCurrentTime()}</span>
                </div>
                <div class="shrink-0">
                    <div class="w-10 h-10 rounded-full overflow-hidden">
                        <img src="https://picsum.photos/id/64/100/100" alt="你的头像" class="w-full h-full object-cover">
                    </div>
                </div>
            </div>
        `;
    }
    
    messageContainer.appendChild(messageDiv);
    gameState.messages.push({ text, sender, timestamp: new Date() });
    
    // 滚动到底部
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// 获取当前时间
function getCurrentTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

// 显示对话界面
function showVisualDialog(characterId, location) {
    const character = characters[characterId];
    if (!character) return;
    
    // 保存当前状态
    gameState.currentCharacter = characterId;
    gameState.currentLocation = location;
    gameState.messages = [];
    
    // 清空消息容器
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = '';
    
    // 设置背景
    const backgroundEl = document.getElementById('dialog-background');
    backgroundEl.className = '';
    backgroundEl.classList.add('absolute', 'inset-0', `bg-${location}`, 'transition-all', 'duration-1000');
    
    // 设置角色立绘
    document.getElementById('left-character').innerHTML = '';
    document.getElementById('right-character').innerHTML = '';
    
    const characterContainer = document.getElementById(`${character.position}-character`);
    characterContainer.innerHTML = character.fullImage;
    
    // 设置聊天头部
    const chatAvatar = document.getElementById('chat-avatar');
    if (chatAvatar) {
        chatAvatar.innerHTML = character.avatar;
    }
    const chatName = document.getElementById('chat-name');
    if (chatName) {
        chatName.textContent = character.name;
    }
    
    // 显示普通对话
    const randomText = character.texts[Math.floor(Math.random() * character.texts.length)];
    addMessage(randomText, 'other', characterId);
    
    // 显示对话屏幕
    screens.dialog.classList.remove('hidden');
    gameState.screen = 'dialog';
}

// 发送玩家消息
async function sendPlayerMessage() {
    const inputEl = document.getElementById('player-input');
    const sendBtn = document.getElementById('send-message');
    const message = inputEl.value.trim();
    
    if (message) {
        inputEl.value = '';
        addMessage(message, 'player');
        
        // 检查是否开启AI模式
        if (gameState.aiMode) {
            // 显示加载状态
            sendBtn.disabled = true;
            sendBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
            
            try {
                // 调用AI获取回复
                const response = await getAIResponse(message, gameState.currentCharacter);
                addMessage(response, 'other', gameState.currentCharacter);
            } catch (error) {
                console.error('AI回复失败:', error);
                // 使用备用回复
                const fallbackResponse = getFallbackResponse(gameState.currentCharacter);
                addMessage(fallbackResponse, 'other', gameState.currentCharacter);
                showNotification('AI回复失败，使用默认回复');
            } finally {
                // 恢复按钮状态
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<i class="fa fa-paper-plane"></i>';
            }
        } else {
            // 原有的简单回应逻辑
            setTimeout(() => {
                const character = characters[gameState.currentCharacter];
                let response = '';
                
                if (character.name === '玄尘师尊') {
                    response = "我明白了。你的想法有几分道理，不过还需再斟酌。";
                } else if (character.name === '夜宸小师弟') {
                    response = "师姐说的是！我完全同意！那我们接下来要做什么呢？";
                } else {
                    response = "有意思的想法。不过以你现在的能力，恐怕还做不到。";
                }
                
                addMessage(response, 'other', gameState.currentCharacter);
            }, 800);
        }
        
        // 增加好感度
        if (gameState.currentCharacter === 'master') {
            gameState.好感度.师尊 += 1;
        } else if (gameState.currentCharacter === 'junior') {
            gameState.好感度.师弟 += 2;
        } else if (gameState.currentCharacter === 'demon') {
            gameState.好感度.魔尊 += 1;
        }
    }
}

// 出售丹药
function sellPill(pillName, value) {
    updateGold(value);
    showNotification(`成功出售 ${pillName}，获得 ${value} 金币！`);
}

// 购买物品
function buyItem(itemName, price) {
    if (gameState.gold >= price) {
        updateGold(-price);
        showNotification(`成功购买 ${itemName}！`);
    } else {
        showNotification('金币不足，无法购买！');
    }
}

