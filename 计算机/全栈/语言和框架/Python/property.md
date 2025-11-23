# 1 
`property()` 是一个**内置函数**，作用是把**方法调用**伪装成**属性访问**。它接收三个主要参数：读取、写入、删除
```python
property(fget=get_def, fset=set_def, fdel=del_def)
```

作用是优化逻辑，减少冗余
```python
p = Player()
#隐式调用
score = property(get_score, set_score)

p.score = 90     #set_score(p, 90)
print(p.score)   #get_score(p)

#显示调用
p.set_score(90)       
print(p.get_score()) 
```
在不改变调用代码的前提下，让属性读写操作自动触发指定的方法，实现数据封装和逻辑控制
# 2

可使用@装饰器写法
```python
class Player:
    @property
    def score(self):
    ······
        return self._score

    @score.setter
    def score(self, value):
	······
        self._score = value
# 使用（代码完全相同）
p = Player()
p.score = 90
print(p.score)
```