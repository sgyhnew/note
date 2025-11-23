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
