// 对话剧情系统

// 对话数据结构
const dialogues = {
    // 玄尘师尊对话
    master: {
        // 初次见面
        firstMeet: {
            id: 'master_first_meet',
            conditions: {
                minAffection: 0,
                maxAffection: 10,
                location: 'clearday',
                notSeen: true
            },
            dialogue: [
                {
                    speaker: 'master',
                    text: '你便是新入门的药修弟子？',
                    emotion: 'neutral'
                },
                {
                    speaker: 'player',
                    text: '弟子灵月，拜见师尊。',
                    emotion: 'respectful'
                },
                {
                    speaker: 'master',
                    text: '嗯。听闻你在药理一道颇有天赋。',
                    emotion: 'neutral'
                },
                {
                    speaker: 'master',
                    text: '既入我门下，当勤勉修行，不可懈怠。',
                    emotion: 'serious'
                }
            ],
            choices: [
                {
                    text: '弟子定当努力，不负师尊期望。',
                    affectionChange: 2,
                    nextDialogue: 'master_first_meet_good'
                },
                {
                    text: '师尊看起来好严肃，有点害怕...',
                    affectionChange: 0,
                    nextDialogue: 'master_first_meet_nervous'
                }
            ]
        },
        
        // 第一次见面 - 积极回应
        master_first_meet_good: {
            dialogue: [
                {
                    speaker: 'master',
                    text: '很好。明日卯时，来清修殿寻我。',
                    emotion: 'approve'
                },
                {
                    speaker: 'master',
                    text: '我会亲自指导你的修行。',
                    emotion: 'neutral'
                }
            ],
            result: {
                affectionChange: 3,
                unlock: 'daily_training'
            }
        },
        
        // 第一次见面 - 紧张回应
        master_first_meet_nervous: {
            dialogue: [
                {
                    speaker: 'master',
                    text: '...我有那么可怕？',
                    emotion: 'confused'
                },
                {
                    speaker: 'player',
                    text: '不、不是的！只是师尊气势太强了...',
                    emotion: 'flustered'
                },
                {
                    speaker: 'master',
                    text: '罢了。日后相处久了，你便知我并非严苛之人。',
                    emotion: 'soft'
                }
            ],
            result: {
                affectionChange: 1
            }
        },
        
        // 日常修炼
        daily_training: {
            id: 'master_daily_training',
            conditions: {
                minAffection: 15,
                location: 'clearday',
                unlocked: 'daily_training'
            },
            dialogue: [
                {
                    speaker: 'master',
                    text: '今日要炼制回春丹，你可准备好了？',
                    emotion: 'neutral'
                },
                {
                    speaker: 'player',
                    text: '师尊，我已经备好了所需药材。',
                    emotion: 'confident'
                },
                {
                    speaker: 'master',
                    text: '火候控制是关键，看好了。',
                    emotion: 'teaching'
                }
            ],
            choices: [
                {
                    text: '认真观察师尊的手法',
                    affectionChange: 2,
                    nextDialogue: 'master_training_success'
                },
                {
                    text: '偷偷看师尊的侧脸',
                    affectionChange: 1,
                    nextDialogue: 'master_training_distracted'
                }
            ]
        },
        
        // 高好感度特殊事件
        moonnight_event: {
            id: 'master_moonnight',
            conditions: {
                minAffection: 50,
                location: 'clearday',
                special: 'fullmoon' // 满月之夜触发
            },
            dialogue: [
                {
                    speaker: 'master',
                    text: '今夜月色正好，随我来。',
                    emotion: 'gentle'
                },
                {
                    speaker: 'player',
                    text: '师尊要带我去哪里？',
                    emotion: 'curious'
                },
                {
                    speaker: 'master',
                    text: '山巅有一处秘境，月圆之夜会开出昙花。',
                    emotion: 'soft'
                },
                {
                    speaker: 'master',
                    text: '那是炼制筑基丹的主药，也是...我想与你分享的景色。',
                    emotion: 'tender'
                }
            ],
            result: {
                affectionChange: 10,
                unlock: 'secret_garden',
                item: '月光昙花'
            }
        }
    },
    
    // 夜宸小师弟对话
    junior: {
        // 初次见面
        firstMeet: {
            id: 'junior_first_meet',
            conditions: {
                minAffection: 0,
                maxAffection: 10,
                location: 'forest',
                notSeen: true
            },
            dialogue: [
                {
                    speaker: 'junior',
                    text: '哇！你就是新来的师姐吗？',
                    emotion: 'excited'
                },
                {
                    speaker: 'player',
                    text: '你是...？',
                    emotion: 'curious'
                },
                {
                    speaker: 'junior',
                    text: '我叫夜宸，是去年入门的弟子。',
                    emotion: 'cheerful'
                },
                {
                    speaker: 'junior',
                    text: '师姐长得真好看！比山下画本里的仙女还美！',
                    emotion: 'admiring'
                }
            ],
            choices: [
                {
                    text: '小师弟嘴真甜，谢谢夸奖。',
                    affectionChange: 3,
                    nextDialogue: 'junior_first_meet_happy'
                },
                {
                    text: '别贫嘴了，好好练剑吧。',
                    affectionChange: 1,
                    nextDialogue: 'junior_first_meet_strict'
                }
            ]
        },
        
        // 练剑邀请
        sword_practice: {
            id: 'junior_sword_practice',
            conditions: {
                minAffection: 20,
                location: 'forest'
            },
            dialogue: [
                {
                    speaker: 'junior',
                    text: '师姐！今天能陪我练剑吗？',
                    emotion: 'hopeful'
                },
                {
                    speaker: 'player',
                    text: '我是药修，剑法并不精通...',
                    emotion: 'hesitant'
                },
                {
                    speaker: 'junior',
                    text: '没关系的！我可以教师姐！',
                    emotion: 'eager'
                },
                {
                    speaker: 'junior',
                    text: '而且...和师姐在一起，做什么都开心。',
                    emotion: 'shy'
                }
            ],
            choices: [
                {
                    text: '那就麻烦小师弟了。',
                    affectionChange: 5,
                    nextDialogue: 'junior_practice_together'
                },
                {
                    text: '我还是在旁边看你练吧。',
                    affectionChange: 2,
                    nextDialogue: 'junior_practice_watch'
                }
            ]
        },
        
        // 受伤事件
        injured_event: {
            id: 'junior_injured',
            conditions: {
                minAffection: 40,
                special: 'junior_injured'
            },
            dialogue: [
                {
                    speaker: 'player',
                    text: '夜宸！你怎么受伤了？',
                    emotion: 'worried'
                },
                {
                    speaker: 'junior',
                    text: '师姐...我没事的，只是小伤...',
                    emotion: 'weak'
                },
                {
                    speaker: 'player',
                    text: '都流这么多血了还说没事！快，我给你上药。',
                    emotion: 'anxious'
                },
                {
                    speaker: 'junior',
                    text: '师姐...你会担心我，我好开心...',
                    emotion: 'happy'
                },
                {
                    speaker: 'junior',
                    text: '如果受伤能让师姐这样关心我，那这点痛不算什么。',
                    emotion: 'gentle'
                }
            ],
            result: {
                affectionChange: 8,
                unlock: 'junior_confession'
            }
        }
    },
    
    // 墨渊魔尊对话
    demon: {
        // 初次相遇
        firstMeet: {
            id: 'demon_first_meet',
            conditions: {
                minAffection: 0,
                location: 'market',
                notSeen: true
            },
            dialogue: [
                {
                    speaker: 'demon',
                    text: '有趣，仙门何时出了这般灵秀的药修？',
                    emotion: 'intrigued'
                },
                {
                    speaker: 'player',
                    text: '你是谁？这里是仙门重地！',
                    emotion: 'alert'
                },
                {
                    speaker: 'demon',
                    text: '小丫头警惕性倒是不错。',
                    emotion: 'amused'
                },
                {
                    speaker: 'demon',
                    text: '我不过是个...对你的丹药感兴趣的过客罢了。',
                    emotion: 'mysterious'
                }
            ],
            choices: [
                {
                    text: '你到底想做什么？',
                    affectionChange: 1,
                    nextDialogue: 'demon_first_suspicious'
                },
                {
                    text: '你对丹药有研究？',
                    affectionChange: 3,
                    nextDialogue: 'demon_first_interested'
                }
            ]
        },
        
        // 身份暴露
        identity_reveal: {
            id: 'demon_identity',
            conditions: {
                minAffection: 30,
                special: 'demon_identity_reveal'
            },
            dialogue: [
                {
                    speaker: 'demon',
                    text: '看来瞒不住了，你已经察觉到了吧？',
                    emotion: 'serious'
                },
                {
                    speaker: 'player',
                    text: '你...你是魔族！',
                    emotion: 'shocked'
                },
                {
                    speaker: 'demon',
                    text: '准确地说，是魔尊墨渊。',
                    emotion: 'proud'
                },
                {
                    speaker: 'demon',
                    text: '怎么，害怕了？',
                    emotion: 'teasing'
                }
            ],
            choices: [
                {
                    text: '我应该告诉师门...',
                    affectionChange: -5,
                    nextDialogue: 'demon_threat'
                },
                {
                    text: '你为什么要接近我？',
                    affectionChange: 5,
                    nextDialogue: 'demon_confession'
                }
            ]
        },
        
        // 魔尊告白
        demon_confession: {
            dialogue: [
                {
                    speaker: 'demon',
                    text: '起初只是觉得你的丹药特殊，但现在...',
                    emotion: 'gentle'
                },
                {
                    speaker: 'demon',
                    text: '我发现更有趣的是你这个人。',
                    emotion: 'tender'
                },
                {
                    speaker: 'demon',
                    text: '跟我走吧，仙魔殊途不过是世人偏见。',
                    emotion: 'sincere'
                },
                {
                    speaker: 'demon',
                    text: '在魔界，你可以自由地追求丹道极致，我会护你周全。',
                    emotion: 'protective'
                }
            ],
            result: {
                affectionChange: 10,
                unlock: 'demon_route'
            }
        }
    }
};

// 获取可用对话
function getAvailableDialogues(characterId, location) {
    const characterDialogues = dialogues[characterId];
    if (!characterDialogues) return [];
    
    const available = [];
    
    for (const key in characterDialogues) {
        const dialogue = characterDialogues[key];
        if (dialogue.conditions && checkDialogueConditions(dialogue, characterId, location)) {
            available.push(dialogue);
        }
    }
    
    return available;
}

// 检查对话条件
function checkDialogueConditions(dialogue, characterId, location) {
    const conditions = dialogue.conditions;
    const affection = getCharacterAffection(characterId);
    
    // 检查好感度
    if (conditions.minAffection !== undefined && affection < conditions.minAffection) {
        return false;
    }
    if (conditions.maxAffection !== undefined && affection > conditions.maxAffection) {
        return false;
    }
    
    // 检查地点
    if (conditions.location && conditions.location !== location) {
        return false;
    }
    
    // 检查是否已看过
    if (conditions.notSeen && hasSeenDialogue(dialogue.id)) {
        return false;
    }
    
    // 检查解锁条件
    if (conditions.unlocked && !isUnlocked(conditions.unlocked)) {
        return false;
    }
    
    // 检查特殊条件
    if (conditions.special && !checkSpecialCondition(conditions.special)) {
        return false;
    }
    
    return true;
}

// 获取角色好感度
function getCharacterAffection(characterId) {
    switch (characterId) {
        case 'master': return gameState.好感度.师尊;
        case 'junior': return gameState.好感度.师弟;
        case 'demon': return gameState.好感度.魔尊;
        default: return 0;
    }
}

// 检查是否看过对话
function hasSeenDialogue(dialogueId) {
    return gameState.seenDialogues && gameState.seenDialogues.includes(dialogueId);
}

// 检查是否解锁
function isUnlocked(unlockId) {
    return gameState.unlocked && gameState.unlocked.includes(unlockId);
}

// 检查特殊条件
function checkSpecialCondition(condition) {
    // 这里可以添加各种特殊条件的检查
    switch (condition) {
        case 'fullmoon':
            // 检查是否是满月（示例）
            return Math.random() < 0.3; // 30%概率触发
        case 'junior_injured':
            // 检查小师弟是否受伤
            return gameState.events && gameState.events.junior_injured;
        case 'demon_identity_reveal':
            // 检查是否到了揭露身份的时机
            return gameState.好感度.魔尊 >= 30;
        default:
            return false;
    }
}

// 标记对话已看
function markDialogueSeen(dialogueId) {
    if (!gameState.seenDialogues) {
        gameState.seenDialogues = [];
    }
    if (!gameState.seenDialogues.includes(dialogueId)) {
        gameState.seenDialogues.push(dialogueId);
    }
}

// 解锁内容
function unlockContent(unlockId) {
    if (!gameState.unlocked) {
        gameState.unlocked = [];
    }
    if (!gameState.unlocked.includes(unlockId)) {
        gameState.unlocked.push(unlockId);
    }
}