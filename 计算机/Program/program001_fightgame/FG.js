FG2.0/点击链接查看和 Kimi 的对话 https://www.kimi.com/share/19ab4dde-b242-8076-8000-0000fae7bdd9
├── config/
│   ├── skills.json       # 所有招式配置
│   └── battle_rules.yaml # 克制关系、伤害公式
├── src/
│   ├── __init__.py
│   ├── main.py           # 入口（精简版）
│   ├── core/
│   │   ├── __init__.py
│   │   ├── game.py       # Game主类（瘦身50%）
│   │   ├── events.py     # 事件定义
│   │   └── resolver.py   # 战斗解析器
│   ├── models/
│   │   ├── __init__.py
│   │   ├── skill.py      # Skill实体
│   │   └── state.py      # BattleState
│   └── systems/
│       ├── __init__.py
│       ├── menu_system.py # 菜单UI
│       ├── unlock_system.py
│       └── logger.py      # 日志/表现层