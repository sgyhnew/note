1.全局配置文件位于 ~/.gitconfig中，局部配置位于待上传文件的.git/config中
2.全局配置
	git config --global user.name "Your Name"
	git config --global user.email "you@example.com"
	git config --global init.defaultBranch main              默认分支main
	git config --global core.quotepath false                  关闭转义8进制
	git config --global i18n.commitEncoding utf-8        提交信息utf-8
	git config --global i18n.logOutputEncoding utf-8   日志信息utf-8
3.首次上传
	git init
		在当前路径下新建.git仓库骨架
	git remote add origin http
		连接远程仓库url,若所选非main分支可远程拉取仓库所有分支和标签到本地再选择
		git fetch
		git branch -a
		git checkout main``
	git add .
		将该路径下所有文件加入暂存区，也可只选择部分文件
		git add file/dir
		也可删除暂存区
		git reset head
		或者彻底删除历史中的目标目录，包括本地文件
		git filter-repo --path obsidian --invert-paths --force
	git commit -m '提交说明'
	git push -u origin main
4.更新hub
	git add .
	git commit -m ‘更新说明’
	git push origin main
5.下载hub
	首次下载
		git clone https
		cd 仓库名
	后续更新
		1.确保远端已添加
			git remote -v
		2.若没有则添加
			git remote add https
		3.取回并合并
			git pull origin main
		
		