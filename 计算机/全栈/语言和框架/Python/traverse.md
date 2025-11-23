针对多重嵌套字典的遍历，举例
```python
skills = { # [category][level][skill_name][``]

    "attack": {

        "lv1": {

            "基础拳": {"cost": 0, "damage": 10, "effect": lambda: print("挥出一拳，拳风袭面门。")},

            "基础剑": {"cost": 0, "damage": 10, "effect": lambda: print("刺出一剑，刺向薄弱处。")},

            "基础刀": {"cost": 0, "damage": 10, "effect": lambda: print("砍出一刀，劈向脑门。")},

        },

        "lv2": {

            "进阶拳": {"cost": 5, "damage": 25, "cooldown": 3, "effect": lambda: print("负手而立，倏然挥出一拳，气动如龙！")},

            "进阶剑": {"cost": 5, "damage": 25, "cooldown": 3, "effect": lambda: print("躬身、出剑，此世间绝无这么快的剑！")},

            "进阶刀": {"cost": 5, "damage": 25, "cooldown": 3, "effect": lambda: print("高高跃起，蓄力下劈。此刀势无可披靡！")},

        },

    },

    "defense": {

        "lv1": {

            "基础防御": {"cost": 0, "effect": lambda: print("气沉丹田,运转自身内力。")},

        },

        "lv2": {

            "进阶防御": {"cost": 5, "effect": lambda: print("吐纳间蕴含天地之力,似乎没有事物可以伤害自身一毫了。")},

        },

    },

}

# 1.遍历所有技能
for category, levels in skills.items():
    print(f"\n【分类】{category}")
    for level, skills_dict in levels.items():
        print(f"  【等级】{level}")
        for skill_name, skill_info in skills_dict.items():
            print(f"    【技能】{skill_name}")
            for key, value in skill_info.items():
                print(f"      {key}: {value}")
                
# 2.函数封装,易于返回
def iterate_skills(skills): 

    """

    遍历所有技能，返回扁平化的技能信息

    返回: list[dict]，每个元素包含完整路径和属性

    """

    result = []

    for category, levels in skills.items():

        for level, skills_dict in levels.items():

            for skill_name, skill_info in skills_dict.items():

                # 创建包含完整路径的副本

                full_info = {

                    "category": category,

                    "level": level,

                    "name": skill_name,

                    **skill_info  # 展开所有属性

                }

                result.append(full_info)

    return result

  

# 使用示例

all_skills = iterate_skills(skills)

for skill in all_skills:

    print(f"{skill['category']}.{skill['level']}.{skill['name']}")

    print(f"  伤害: {skill.get('damage', 'N/A')}")

    print(f"  消耗: {skill.get('cost', 'N/A')}")

    # 调用效果函数

    if 'effect' in skill:

        skill['effect']()
        
# 3.生成器
def skill_generator(skills):    

    """针对数据量大，内存效率高"""

    for category, levels in skills.items():

        for level, skills_dict in levels.items():

            for skill_name, skill_info in skills_dict.items():

                yield {

                    "category": category,

                    "level": level,

                    "name": skill_name,

                    **skill_info

                }

  

# 使用

for skill in skill_generator(skills):

    print(skill)

    # if skill.get("damage", 0) > 20:  # 只处理高伤害技能

    #     print(f"高伤害技能: {skill['name']}")

    #     skill["effect"]()

#4.递归
def traverse_skills(data, path=""): 

    """递归遍历任意深度的嵌套字典"""

    if not isinstance(data, dict):

        # 到达叶子节点

        print(f"{path}: {data if not callable(data) else '<函数>'}")

        return

    for key, value in data.items():

        current_path = f"{path}.{key}" if path else key

        traverse_skills(value, current_path)

  

# 调用

traverse_skills(skills)