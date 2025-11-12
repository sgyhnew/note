---
tags:
---
1.selenium3.X版本调用
	基于edge的调用:
		from selenium import webdriver
		from selenium.webdriver.edge.service import Service
		driver_path = 'D:/e/tool/edgedriver/msedgedriver.exe'
		service = Service(executable_path=driver_path)
		driver = webdriver.Edge(service=service)
	8种定位方式:
		![[Pasted image 20251103100009.png]]
		定位到一个网页元素后，有输入框使用send_keys()，没有输入框，如果是按钮就用click()进行点击。
		很多时候页面的元素可能是没有id的，没有唯一标识，需求评审的时候可以跟开发约定，网页的元素尽量要有唯一的id和name。            
2.py调用操作函数
	2.1元素常用操作方式
		![[Pasted image 20251103100504.png]]
	2.2浏览器常用操作方式
		![[Pasted image 20251103100623.png]]
	2.3模拟鼠标常用操作方式
		在Selenium中将操作鼠标的方法封装在ActionChanis类中。因此在调用时需要先实例化对象：
		from selenium.webdriver.common.action_chains import Actionchains
		action = ActionChains(driver)
		![[Pasted image 20251103140640.png]]
		![[Pasted image 20251103140719.png]]
	2.4模拟键盘操作方式
		在Selenium中将操作键盘的方法封装在Keys类中。
		from selenium.webdriver.common.keys import Keys
		![[Pasted image 20251103142928.png]]
	2.5模拟选择框操作方式
		Select类是Selenium为操作select标签特殊封装的。需要先实例化对象
		from selenium.webdriver.support.select import Select
		select = Select(driver.find_element(By.ID,'selectA'))
		![[Pasted image 20251103160826.png]]
	2.6JS脚本
		driver.execute_script(js) pythoni通过selenium调用javascript
			1.js=window.scrollTo(0,0) 滑动到像素(0,0)的位置，即滑动到最顶层	
			2.js=arguments[0].scrollTop = arguments[0].scrollHeight 将最底部的值赋给最顶部，实现滑动到底部
			3.js=window.open(‘’)
		例：drvier.evecute_script(‘retrun arguments[0].scrollTop;’,scroll)
3.等待
	3.1定义：
		定位页面元素时，因多种原因导致元素未找到，需要进程一直等待的过程
	3.2原因:
		1.网速慢2.服务器处理请求慢3.代理，配置等
	3.3强制等待:
		import time
		time.sleep(10)
	3.4隐式等待：
		定义:
			定位元素时，若能直接定位则直接返回元素，不触发等待；若不能则每隔一段时间检查一次，直到达到最大时间。若在最大时间仍未找到元素，则异常 NoSuchElementException
		调用：
			driver.implicitly_wait(timeout) (timeout：为等待最大时长，单位：秒) ，driver.implicitly_wait(10) ，最长等待10秒。
		说明：
			隐式等待只需要
			4.，设置一次，就会作用于全局所有的元素。
	3.5显示等待:
		定义:
			定位元素时，若能直接定位则直接返回元素，不触发等待；若不能则每隔一段时间检查一次，直到最大时间。若在最大时间仍未找到元素，则异常 TimeoutException
4.实例
	4.1 单选框
		![[Pasted image 20251103143142.png]]
		driver.find_element(By.ID,'female').click()
	4.2 弹框处理
		![[Pasted image 20251103150229.png]]
		driver.find_element(By.ID,'confirm').click()
		win = driver.switch_to.alert()
		win.accept()    
	4.3 下拉选择框
		s1 = Select(driver.find_element(By.ID,''))
		s1.select_by_index(2) 选择第3个选项
		s1.select_by_value('') 选择名字为‘’的项
	4.4 滚动条
		Selenium中没有直接提供操纵滚动条的方法，但是可以使用其他方式模拟
		1.调用JavaScript
			scroll = driver.find_element(By.CLASS_NAME ,'')
			y = driver.execute_script('return arguments[0].scrollTop'; ,scroll)
			while 1:
				driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight;' ,scroll)
				time.sleep(5)
				new_y = driver.execute_script('return arguments[0].scrollTop' ,scroll)
			if new_y = y:
				break
			y = new_y
			其思路为先获取初始滚动值y，然后在滚动后将当前滚动位置赋值给new_y，循环。直到滚动到页面底部，y=new_y
			2.
		2.调用ActionChains
			actions =ActionChains(driver)
			actions.scroll_by_amount(0,500).perform()
			time.sleep(2)
			滚动500像素值
	4.5 窗口截图
		在Selenium中，提供了截图方法，需要进行截图时我们只需要调用即可方法：driver.get_screenshot_as_file(img_path) 
	4.6 cookies登录
	4.7 上传文件
		file_path=Path(Path.cwd(), '上传下载.html')
		driver.get('file://'+str(file_path))
		upload_button = driver.find_element(By.XPATH, '//*[@name="upload"]')
		upload_button.send_keys(str(file_path))
* 5.几个概念的差别
	5.1显示等待和隐式等待的区别：
		1.作用域不同：
			隐式等待为全局元素，显示等待为目标单个元素
		2.使用方法不同：
			隐式等待直接通过驱动对象调用，而显示等待方法封装在WebDriverWait类中
	5.2driver.switch_to.alert()和driver.switch_to.window()的区别：
		前者用于切换到一个JavaScript弹窗，如alert、confirm或prompt等。后者用于切换到一个新的标签页或窗口。
		alert = driver.switch_to.alert()
		print(alert.text)  # 输出弹窗中的文本
		alert.accept()     # 接受弹窗
		driver.switch_to.window(driver.window_handles[-1]) 切换到新打开的窗口
6.自动化测试时掩盖爬虫特征 npx extract-stealth-eviations
7.

