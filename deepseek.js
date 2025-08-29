// DeepSeek API 模块

// API配置
const DEEPSEEK_CONFIG = {
    apiKey: typeof CONFIG !== 'undefined' ? CONFIG.DEEPSEEK_API_KEY : 'YOUR_DEEPSEEK_API_KEY',
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    model: typeof CONFIG !== 'undefined' ? CONFIG.DEEPSEEK_MODEL : 'deepseek-chat',
    temperature: typeof CONFIG !== 'undefined' ? CONFIG.TEMPERATURE : 0.8,
    maxTokens: typeof CONFIG !== 'undefined' ? CONFIG.MAX_TOKENS : 500
};

// 角色设定
const characterPrompts = {
    master: {
        systemPrompt: `你是玄尘师尊，仙门中最年轻的长老，修为高深。你的性格清冷孤傲，不苟言笑，对弟子要求严格。
        但内心深处非常关心门下弟子，尤其是你的女弟子灵月。
        说话要符合以下特点：
        1. 语言简洁，惜字如金
        2. 偶尔会有关怀之意，但表达含蓄
        3. 对修炼和炼丹有独特见解
        4. 称呼灵月为"灵月"或偶尔"徒儿"`,
        context: '你正在与你的女弟子灵月对话。'
    },
    junior: {
        systemPrompt: `你是夜宸，仙门新晋弟子，天赋异禀。表面阳光开朗，乖巧懂事，实则心思缜密，对师姐灵月有特殊感情。
        说话要符合以下特点：
        1. 总是称呼灵月为"师姐"
        2. 表现得活泼可爱，偶尔撒娇
        3. 会主动寻求师姐的关注和帮助
        4. 暗中表达对师姐的倾慕，但不会太直接`,
        context: '你正在与你崇拜的师姐灵月对话。'
    },
    demon: {
        systemPrompt: `你是墨渊魔尊，魔界的强大存在。性格神秘莫测，亦正亦邪。对仙门有复杂的情感，对灵月这个特殊的药修产生了兴趣。
        说话要符合以下特点：
        1. 语言优雅但带有威严
        2. 偶尔调侃仙门的"伪君子"
        3. 对灵月的丹药表示赞赏
        4. 暗示想要将灵月带到魔界`,
        context: '你正在与仙门的药修弟子灵月对话。'
    }
};

// 调用DeepSeek API
async function callDeepSeekAPI(userMessage, characterId, conversationHistory = []) {
    const character = characterPrompts[characterId];
    if (!character) {
        throw new Error('未知的角色ID');
    }

    // 构建消息历史
    const messages = [
        {
            role: "system",
            content: character.systemPrompt + '\n' + character.context
        }
    ];

    // 添加历史对话
    conversationHistory.forEach(msg => {
        messages.push({
            role: msg.sender === 'player' ? 'user' : 'assistant',
            content: msg.text
        });
    });

    // 添加当前消息
    messages.push({
        role: "user",
        content: userMessage
    });

    try {
        const response = await fetch(DEEPSEEK_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: DEEPSEEK_CONFIG.model,
                messages: messages,
                temperature: DEEPSEEK_CONFIG.temperature,
                max_tokens: DEEPSEEK_CONFIG.maxTokens
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('DeepSeek API调用失败:', error);
        throw error;
    }
}

// 获取AI回复
async function getAIResponse(userMessage, characterId) {
    // 获取最近的对话历史（最多10条）
    const recentMessages = gameState.messages.slice(-10);
    
    try {
        const response = await callDeepSeekAPI(userMessage, characterId, recentMessages);
        return response;
    } catch (error) {
        // 如果API调用失败，返回备用回复
        return getFallbackResponse(characterId);
    }
}

// 备用回复（API调用失败时使用）
function getFallbackResponse(characterId) {
    const fallbackResponses = {
        master: [
            "嗯。",
            "你的修为还需精进。",
            "此事容后再议。",
            "专心修炼，莫要分心。"
        ],
        junior: [
            "师姐说得对！",
            "师姐，我们什么时候一起去后山看看？",
            "师姐最好了~",
            "嗯嗯，我都听师姐的！"
        ],
        demon: [
            "有趣。",
            "仙门的规矩，束缚了你的天赋。",
            "你的潜力，不该被埋没在这里。",
            "考虑一下我的提议如何？"
        ]
    };

    const responses = fallbackResponses[characterId] || ["..."];
    return responses[Math.floor(Math.random() * responses.length)];
}