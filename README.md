# 仙缘录 - 乙女仙侠游戏

## 游戏简介
《仙缘录》是一款女性向仙侠恋爱游戏。玩家扮演药修弟子灵月，在仙门中修炼成长，与不同性格的角色展开浪漫故事。

## DeepSeek AI对话功能设置

### 1. 获取API密钥
1. 访问 [DeepSeek平台](https://platform.deepseek.com)
2. 注册账号并登录
3. 在控制台创建API密钥

### 2. 配置API密钥
1. 打开 `config.js` 文件
2. 将 `YOUR_DEEPSEEK_API_KEY` 替换为你的实际API密钥：
   ```javascript
   DEEPSEEK_API_KEY: 'sk-你的实际密钥'
   ```

### 3. 使用AI对话
1. 进入游戏后，点击地图上的任意位置进入对话界面
2. 点击右上角的机器人图标开启AI模式
3. 当AI模式开启时，角色会使用DeepSeek大模型生成智能回复
4. 每个角色都有独特的性格设定：
   - **玄尘师尊**：清冷孤傲，惜字如金
   - **夜宸小师弟**：活泼可爱，对师姐有特殊感情
   - **墨渊魔尊**：神秘莫测，想要拉拢灵月

### 4. 注意事项
- 需要网络连接才能使用AI对话功能
- API调用可能产生费用，请查看DeepSeek的计费说明
- 如果API调用失败，会使用默认回复

## 游戏特色
- 精美的视觉小说风格界面
- 三位性格迥异的可攻略角色
- 炼丹系统和商店系统
- 好感度系统
- 支持AI智能对话

## 技术架构
- 前端：原生JavaScript + Tailwind CSS
- AI对话：DeepSeek API
- 模块化设计，易于扩展

## 文件结构
```
仙缘录/
├── index.html          # 游戏主页面
├── config.js          # 配置文件（API密钥）
├── gameData.js        # 游戏数据
├── deepseek.js        # AI对话模块
├── ui.js              # UI管理
├── game.js            # 游戏逻辑
├── events.js          # 事件处理
├── main.js            # 主程序
└── styles.css         # 样式文件
```