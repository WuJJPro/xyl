// 游戏状态管理
const gameState = {
    gold: 1000,
    screen: 'welcome', // welcome, map, profile, alchemy, shop, characters, dialog
    好感度: {
        师尊: 35,
        师弟: 52,
        魔尊: 0,
        魔尊解锁: false
    },
    currentPill: '回春丹',
    aiMode: false,
    currentLocation: '',
    currentCharacter: '',
    messages: []
};

// 角色数据
const characters = {
    master: {
        name: '玄尘师尊',
        avatar: '<img src="https://img.cdn1.vip/i/68b17e261d349_1756462630.webp" alt="玄尘师尊头像" class="w-full h-full object-cover">',
        fullImage: '<img src="https://img.cdn1.vip/i/68b17e261d349_1756462630.web" alt="玄尘师尊" class="h-[70vh] rounded-lg object-cover shadow-lg">',
        position: 'left',
        bgColor: 'bg-primary/10',
        texts: [
            '灵月，今日的草药采摘得如何了？',
            '你的炼丹术有进步，但仍需精进。',
            '这株清心草颇为罕见，你认得它的药性吗？'
        ]
    },
    junior: {
        name: '夜宸小师弟',
        avatar: '<img src="https://img.cdn1.vip/i/68b17e25aa712_1756462629.webp" alt="夜宸小师弟头像" class="w-full h-full object-cover">',
        fullImage: '<img src="https://img.cdn1.vip/i/68b17e25aa712_1756462629.webp" alt="夜宸小师弟" class="h-[70vh] rounded-lg object-cover shadow-lg">',
        position: 'left',
        bgColor: 'bg-blue-100',
        texts: [
            '师姐！我等你好久了，一起去练剑吧？',
            '师姐的炼丹术越来越厉害了，能不能教教我？',
            '我在后山发现了一种从没见过的草药，师姐要不要看看？'
        ]
    },
    demon: {
        name: '墨渊魔尊',
        avatar: '<img src="https://img.cdn1.vip/i/68b174f7124fc_1756460279.webp" alt="墨渊魔尊头像" class="w-full h-full object-cover">',
        fullImage: '<img src="https://img.cdn1.vip/i/68b174f7124fc_1756460279.webp" alt="墨渊魔尊" class="h-[70vh] rounded-lg object-cover shadow-lg">',
        position: 'left',
        bgColor: 'bg-purple-100',
        texts: [
            '哦？这不是仙门的小药修吗？',
            '你的丹药倒是有些意思，可惜投错了师门。',
            '仙门那群伪君子有什么好？不如跟我回魔界？'
        ]
    }
};

// 地图地点数据
const mapLocations = [
    {
        id: 'clearday-master',
        name: '清修殿',
        icon: 'fa-home',
        iconColor: 'primary',
        description: '师尊平日静修之地，偶尔能遇到他...',
        location: 'clearday',
        character: 'master',
        borderColor: 'pink',
        image: 'https://img.cdn1.vip/i/68b1b6b95f6ae_1756477113.webp'
    },
    {
        id: 'forest-junior1',
        name: '练剑场',
        icon: 'fa-balance-scale',
        iconColor: 'blue-400',
        description: '小师弟常在此练习剑法，或许会遇到他...',
        location: 'forest',
        character: 'junior',
        borderColor: 'blue',
        image: 'https://img.cdn1.vip/i/68b1b6b540ad2_1756477109.webp'
    },
    {
        id: 'market-master',
        name: '药园',
        icon: 'fa-leaf',
        iconColor: 'green-400',
        description: '种植着各种灵药，是你平日工作的地方...',
        location: 'market',
        character: 'master',
        borderColor: 'green',
        image: 'https://img.cdn1.vip/i/68b1b6bcb15c9_1756477116.webp'
    },
    {
        id: 'forest-junior2',
        name: '后山',
        icon: 'fa-tree',
        iconColor: 'teal-400',
        description: '人迹罕至，偶尔会有意外的相遇...',
        location: 'forest',
        character: 'junior',
        borderColor: 'teal',
        image: 'https://img.cdn1.vip/i/68b1b6bfa6f48_1756477119.webp'
    },
    {
        id: 'market-demon',
        name: '仙门集市',
        icon: 'fa-shopping-basket',
        iconColor: 'purple-400',
        description: '可以出售丹药，或许能遇到有趣的人...',
        location: 'market',
        character: 'demon',
        borderColor: 'purple',
        image: 'https://img.cdn1.vip/i/68b1b6c62096c_1756477126.webp'
    },
    {
        id: 'clearday-demon',
        name: '神秘之地',
        icon: 'fa-question-circle',
        iconColor: 'indigo-400',
        description: '被迷雾笼罩的区域，充满未知...',
        location: 'clearday',
        character: 'demon',
        borderColor: 'indigo',
        image: 'https://img.cdn1.vip/i/68b1b6c97a627_1756477129.webp'
    }
];

// 草药数据
const herbs = [
    {
        name: '灵叶草',
        count: 25,
        color: 'green',
        image: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/code_assistant/de895b212a174b27bd3a968630849076~tplv-a9rns2rl98-image.image?rcl=20250814221924B849CDFF34E1CD8D6E1D&rk3s=8e244e95&rrcfp=e75484ac&x-expires=1755785965&x-signature=AuhlMHEq44%2FAzw1eMizi%2BQAgIAQ%3D'
    },
    {
        name: '冰心花',
        count: 18,
        color: 'blue',
        image: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/code_assistant/3153c9a9c39e400b835f3f8eae475513~tplv-a9rns2rl98-image.image?rcl=2025081422193438B0369459A10249D542&rk3s=8e244e95&rrcfp=e75484ac&x-expires=1755785975&x-signature=czKF3JUMWv99Sk8zi5DSuBqHL2g%3D'
    }
];

// 丹药数据
const pills = [
    {
        name: '回春丹',
        count: 12,
        description: '基础疗伤丹药，可恢复少量灵力',
        value: 50,
        color: 'pink',
        image: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/code_assistant/c4e99b991dc74fa4a37c1f0b6b128ba8~tplv-a9rns2rl98-image.image?rcl=202508142220249FC9F6E19E49BCA668B3&rk3s=8e244e95&rrcfp=e75484ac&x-expires=1755786026&x-signature=FaUO679pJqETlJSPJbEKeE%2FnTPs%3D'
    }
];

// 商店物品数据
const shopItems = [
    {
        name: '清心草',
        price: 150,
        description: '带有清冽香气的草药，能平静心神',
        tag: '师尊喜好',
        tagColor: 'primary',
        borderColor: 'pink',
        image: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/code_assistant/2519db0e0256465fb4434ef2323b32d3~tplv-a9rns2rl98-image.image?rcl=20250814221158356896DD9FD56B720388&rk3s=8e244e95&rrcfp=e75484ac&x-expires=1755785519&x-signature=vJtr88X4sJwtH6gp22EXfzXpXVU%3D'
    },
    {
        name: '玲珑果',
        price: 120,
        description: '小巧可爱的果实，味道酸甜可口',
        tag: '师弟喜好',
        tagColor: 'yellow-700',
        bgColor: 'yellow-200',
        borderColor: 'yellow',
        buttonColor: 'yellow-400',
        buttonHoverColor: 'yellow-500',
        image: 'https://p9-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/code_assistant/56a2a21f13034b87ac634ac83c06865d~tplv-a9rns2rl98-image.image?rcl=20250814221209E446BF6152BD93C00A8C&rk3s=8e244e95&rrcfp=e75484ac&x-expires=1755785530&x-signature=9l%2BfhTiwSRooxDQac86F0bAug%2Fk%3D'
    }
];

// 角色详情数据
const characterDetails = {
    master: {
        name: '玄尘师尊',
        title: '仙门长老 · 化神期',
        description: '仙门中最年轻的长老，修为高深，外表清冷孤傲，不苟言笑。负责教导内门弟子修炼，对弟子要求严格。看似冷漠，实则非常关心门下弟子。',
        borderColor: 'primary',
        bgGradientFrom: 'pink-100',
        bgGradientTo: 'pink-200',
        image: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/code_assistant/0efd01372aed436e8819e8b8c40b8a36~tplv-a9rns2rl98-image.image?rcl=20250814221044EA52DCEBE0F5E1A3357F&rk3s=8e244e95&rrcfp=e75484ac&x-expires=1755785444&x-signature=ZjNI1qWMQKkcOZ7GHLVfd9MUn1Q%3D'
    },
    junior: {
        name: '夜宸',
        title: '剑修弟子 · 炼气期五层',
        titleColor: 'blue-500',
        description: '仙门新晋弟子，天赋异禀，尤其在剑术方面进步神速。表面阳光开朗，乖巧懂事，总是"师姐、师姐"地跟在灵月身后。',
        borderColor: 'blue-200',
        bgGradientFrom: 'blue-100',
        bgGradientTo: 'blue-200',
        image: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/code_assistant/8f107430f62449b2abe78df7ce72e85a~tplv-a9rns2rl98-image.image?rcl=202508142211066D46190E355D77B0CFA6&rk3s=8e244e95&rrcfp=e75484ac&x-expires=1755785468&x-signature=N6Kc42LyOmVmlDobNi%2FIAjyk%2F7M%3D'
    }
};