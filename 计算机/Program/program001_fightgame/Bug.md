# 1.3
1.血量和熟练度展示时机在出招后而非菜单前
	状态展示调用位置在`fight()`方法末尾，导致信息滞后，决策时无法参考实时状态
# 1.4
1.`Attribute`类过于臃肿，承担计算逻辑
# 1.5
1.防御菜单按z退出后返回攻击界面而非主菜单 
	menu_defense()返回None后，main()中if skill:条件不成立，但循环结构缺少else分支，导致流程未正确回到主循环顶部
2.防御招式没有输出对应招式名 
	menu_defense()返回完整技能名"基础防御"，但后续代码用'lv1'/'lv2'作为字典键，导致defense_dict[def_name]KeyError 
3.防御判断条件与返回值不匹配
	fight()中判断self.attribute.defense_level == 'lv2'，但menu_defense()返回"进阶防御"，条件永假 
4.防御和攻击同时执行 
	防御逻辑嵌入fight()但未中断攻击流程，导致先防御动画后攻击，违背"防御则本回合不攻击"的设计 
5.消耗扣除位置不统一
	（菜单层vs主循环层） 攻击消耗在main()扣除，防御消耗在menu_defense()扣除，调用逻辑不对称 
6.防御回合伤害和受击显示时报错
	防御回合时 `judge` 方法被传入了 `None` 值，导致 `react(None)` 报错
# 1.6
1.查询skills字典时出现死锁
	调用get_skill(value,key)时
	由于**短路逻辑**，当`value`非空时会优先匹配第一个`if value:`分支
	该条件块成为**死码(Dead Code)**，"在指定分类下查技能"的功能实际不可用。因此将该方法放在get_skill(value)之前
2.进入a攻击的子菜单时，使用d、e、f三种进阶攻击招式时输出的却是进阶防御
	 防御状态跨回合“污染”攻击逻辑self.attribute.defense_level在每一回合没有被重置，导致上一回合的防御状态会“残留”到下一回合，即使你现在选择攻击，也会错误触发防御逻辑
3.`get_skill_cost()` 目前**硬编码**判断，没有真正查询 `skills` 字典
# 1.7
1.将skill完全取代原有旧字典时，在进入菜单时选择技能时报错，提示没有找到对技能的定义
	对于声明的`self._skill_cache = {}`后，需要在大类的__init__中对该变量进行补全，无论是调用遍历函数还是硬编码
2.在攻击回合中，玩家选择技能成功并有输出，但pc选择技能失败报错
	重新配置skill后要重新为pc编写抽取技能的逻辑
# 1.8
1.将skill作为基础配置skill.json外部存储时，读取后。进入攻击回合后，effect正常输出，但是后续出现KeyError，提示技能找不到
	更改damage_相关函数后，应该修改旧的fight和judge接口
2.使用进阶防御技能时报错，提示技能未技能未找到
	接口问题，更新了新的get_skill以及后续函数时未设置新接口，返回了keyerror
3.在攻击时，提示能量改变报错
	enegy_do函数关于constants中的EnergyReason的调用报错。跨文件导入导致的类身份分裂，isinstance无法识别EnergyReason。改为不识别数据类型，只要有字典的value就可调用。后续需要规范库的导入
4.迁移combat文件时报错
	ImportError: cannot import name 'Combat' from partially initialized module 'system.combat' (most likely due to a circular import) (D:\e/myprogram/Program/my/program001_FG\system\combat.py)
	循环导入问题，设置from __future__ import annotations并if TYPE_CHECKING:
    from FG.main import Game
5.`[战斗系统错误] `'Game' object has no attribute 'get_skill'，`[战斗系统错误] "技能 'lv1' 未定义，请检查 skill.json"`
	这是combat中新的战斗系统检测出报告，接口问题
6.结算阶段重复输出
	effect重构，变为str而不在是func，因此build_effect等全部需要删除而不是重复调用，造成结算阶段重复输出
7.行动阶段，输出词条与实际beats对应不符合
	增加了新的招式'枪'并对skill.json的进行了重构，接口问题
8.进入攻击或防御子菜单时提示技能找不到
	1. 主菜单（menu_main）中，选择帮助（h）和逃跑（q）时，返回的是字符串，但是主循环（Game.main）中并没有处理这些字符串。当前主循环只处理了返回字符串（攻击技能）和整数（防御等级）的情况，而帮助和逃跑返回的字符串没有被正确处理。
	2. 在menu_main中，选择帮助（h）时，返回的字符串并没有在Game.main中被使用，而是应该直接显示帮助信息并继续循环。 同样，选择逃跑（q）时，返回的字符串应该触发逃跑逻辑。
	3. 在menu_level中，防御技能返回的是skill_data.level，但skill_data.level是字符串（如'lv1'），而Game.main中期望防御等级是整数。 这会导致在Game.main中执行`defense_level >= 2`时出现类型错误。
	4. 在menu_main中，选择帮助（h）时，返回的字符串会导致Game.main中进入`isinstance(menu_result, str)`分支，从而尝试作为攻击技能处理，这显然是不对的。
	5. 在menu_main中，选择逃跑（q）时，返回的字符串也会进入攻击技能处理分支，导致错误。
	6. 在menu_level中，如果选择返回（z），则返回None，这会导致菜单系统继续运行，但Game.main中会认为没有选择而继续下一回合，这是合理的。但是，如果选择技能，则返回技能名（攻击）或等级字符串（防御），然后菜单栈被清空并重置为主菜单。然而，防御返回的等级字符串（如'lv1'）在Game.main中会被当作整数处理吗？不会，因为它是字符串。
	7. 在Game.main中，防御技能的处理部分，我们期望得到一个整数，但实际上从menu_level返回的是字符串（如'lv1'），所以会报错。**
	8. 另外，在menu_main中，帮助（h）选项返回的字符串并没有被say函数使用，而是直接返回了，导致Game.main中将其当作技能名处理。
	9. 遍历技能缓存时错误地解包了 SkillData 对象。因为 `self.game._skill_cache` 是一个字典，其键是技能名，值是 `SkillData` 对象。  因此不能拆包命名skill_name,而是skill_data.name
9.技能子页面也显示了能量消耗提示
	在_render_menu()中为函数增加show_cost：bool函数
10.无法跳转攻击技能词条
	等级声明levels是一个集合，是无序的。需要转换成有序的列表
11.无法从一级攻击或防御子菜单进入二级等级子菜单
	1.分页问题，硬编码page=0覆盖了参数
	2.choice选项返回的应该是choice选项键而不是name技能名
# 2.0
1.读取防御技能时失败提示没有此技能
	防御有专属等级之分lv1，lv2。menu_level误将防御等级作为int读取，导致技能前均加 2导致防御名改变无法被读取。修改，统一返回skill_name
2.进行等级子菜单后无法选择z退出
	`menu_category` 传递 `None` 给 `_update_state_selection`，导致按z返回了none
## 2.1
1.重构后无法进入category菜单
	重构后 `run()` 循环与 `_run_menu()` 的**时序冲突**导致
2.主菜单含有z返回上级选项且z和q均点击无影响
	1.重构后将z和q视作技能而不是特殊选项，修改render逻辑
	2.在render中渲染控制系统时，在翻页选择对z进行了硬编码。加入参数menu_type判断，当主菜单时不显示z
3.按q退出时重复打印效果
	main和menu输出重复，删去menu中关于choice `==` 'q'的输出，只管返回结果
## 2.2
1.在chanllenge界面无法按z返回上一级
	choice中提前返回了全局变量`__back__`,应该是`z`返回。因此进行二次判定choice == `__back__` or `z`