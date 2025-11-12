1.unittest是python自带的一个单元测试框架
	1.1框架framework，为解决一类事物的功能集合。
	1.2pytest是第三方框架，区别于unittest
	1.3单元测试一般由开发完成，对于测试来说，只负责自动化脚本执行，来运行、管理多个测试用例‘
2.为什么使用unittest框架
	2.1能够组织多个用例执行
	2.2提供丰富断言方法
	2.3能够生成测试报告
3.unittest核心要素(组成)
	3.1TestCase(核心) 
		测试用例，是unittest框架的组成部分，并非手工和自动化中测试所写的用例 Test Case
		作用:
			每个TestCase都是一个代码，在这个代码文件中来书写真正的用例代码
	3.2TestSuite 
		测试套件，用来管理、打包(组装)多个TestCase
	3.3TestRunner 
		测试执行，用来执行TestSuite
	3.4TestLoader 
		测试加载，其作用是对TestRunner功能的补充
	3.5Fixture
		测试夹具，书写在TestCase代码中，是一个代码结构，可以在每个方法执行前后都会执行的内容。
		例: 登录的测试用例：1.打开浏览器2.输入网址
		