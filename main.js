// 主程序入口

// 确保页面完全加载后再执行
window.addEventListener('load', function() {
    // 配置Tailwind主题
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    primary: '#FF9EBB', // 柔和粉色
                    secondary: '#B69FFF', // 淡紫色
                    accent: '#FFD166', // 淡金色
                    light: '#FFF5F8', // 浅粉色背景
                    dark: '#7B61AA', // 深紫色文字
                    neutral: '#FDF2F7' // 极浅粉色
                },
                fontFamily: {
                    fantasy: ['Garamond', 'Georgia', 'serif'],
                    sans: ['Noto Sans SC', 'sans-serif']
                },
                backgroundImage: {
                    'clearday': 'linear-gradient(135deg, #FFEFF5 0%, #FFD6E5 100%)',
                    'forest': 'linear-gradient(135deg, #F0F7FF 0%, #D9E7FF 100%)',
                    'market': 'linear-gradient(135deg, #FFF5FF 0%, #F0E5FF 100%)',
                }
            }
        }
    };
    
    // 模拟加载过程
    setTimeout(function() {
        document.getElementById('loader').classList.add('opacity-0', 'pointer-events-none');
        document.getElementById('loader').style.transition = 'opacity 0.5s ease-out';
        
        // 显示页面内容
        setTimeout(function() {
            document.getElementById('loader').style.display = 'none';
            document.querySelector('header').classList.remove('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            document.getElementById('footer').classList.remove('hidden');
        }, 500);
    }, 1000);
    
    // 初始化screens对象
    setTimeout(function() {
        screens = {
            welcome: document.getElementById('welcome-screen'),
            map: document.getElementById('map-screen'),
            profile: document.getElementById('profile-screen'),
            alchemy: document.getElementById('alchemy-screen'),
            shop: document.getElementById('shop-screen'),
            characters: document.getElementById('characters-screen'),
            dialog: document.getElementById('dialog-screen')
        };
        
        // 初始化事件监听
        initEventListeners();
    }, 1500);
});