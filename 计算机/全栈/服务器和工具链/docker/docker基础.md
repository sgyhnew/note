1.概念
	imag 镜像
		容器的模板，用来构建容器，相当于.class文件
	container 容器
		一组组服务
	repository 仓库
		镜像存放地址
2.docker顶层操作流程
	过程：clinet——server——daemon守护进程——容器
	客户端通过连接docker server其内部的守护进程，连接各个容器，各个容器之间相互隔离
	![[Pasted image 20251111141830.png]]
3.docker优势
	1.内核共享，高效运行，充分利用系统资
	2.高效运维，环境直接拷贝运行，不必重新搭建
	3.容器之间相互隔离，对系统兼容性高
4.效率高于虚拟机原因
	直接操作内核而不需要再原有os上实例化一个操作系统![[Pasted image 20251111142130.png]]
5.常用命令
	1.镜像
		pull nginx:1.25  拉取镜像
		images  查看本地镜像
		rmi nginx:1.25  删除镜像
		build -t myapp:1.0 .  构建镜像(Dockerfile所在目录)
		run
			-p 8080:80 主机端口:容器端口
			--name web 给容器命名web
			--network mynet 指定使用mynet网络
			-u 1000:1000 指定uid:gid运行进程
			-it 交互+伪终端
			--rm 容器停止就自动删除
			-e ROOT_PASSWORD=123 注入环境变量
	2.容器
		run -d --name web -p 8080:80 nginx:1.25
			新建并启动
		start/stop/restart web
			启动/停止/重启已有容器
		rm -f web
			强制删除容器
	3.调试
		ps 查看正在运行
		ps -a 查看所有
		logs -f web 实时日志
		exec -it web bash 进入容器
		stats 容器资源占用查询
	4.数据卷和网络
		volume 
			create myvol  创建卷
			ls  查看卷列表
			prune  删除无用卷
		network create mynet  创建网络
		run -d -name app -network mynet nginx 运行容器指定网络
	5.清理
		system prune -a --volumes
	6.保存和迁移
		save -o nginx.tar nginx:1.25
		load -i nginx.tar
		export -o web.tar web  导出快照
		cat web.tar | docker import -web:snapshot 快照导入为镜像  名字:标签
		