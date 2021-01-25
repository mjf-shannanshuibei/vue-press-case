# 将主机项目war包部署到虚拟机中
# 一、Docker上启动tomcat

* 环境：Linux centos

## 1.1 docker安装tomcat

从docker hub上获取tomcat，tomcat后面不加上tag，默认下载最新版

```
docker pull tomcat
```

安装指定版本tomcat，具体版本参考docker hub里有的tomcat，这里仅做参考

```
docker pull tomcat:7
```

## 1.2 docker 启动 tomcat

```docker
docker -run -d -p 8080:8080 --name mytomcat tomcat
```

* docker -run：启动容器命令
* -d：后台运行
* -p 端口映射    p1:p2  
  * p1 是 主机访问tomcat端口， p2是docker容器里tomcat的默认端口，p1可以自由设定自己主机上空闲端口。
    * 例如我设置 -p 8888：8080 ，主机访问tomcat：`http:ip地址:8888`

* --name : 给容器起别名
* tomcat 启动的容器名称，有版本一定要指定版本，否则会启动最新版本的容器，没有最新版则会自动下载，例如：`tomcat:7`

## 1.3 新版本Docker里的tomcat注意事项

假如此时安装的是新版本tomcat，启动后配置好完毕后访问出现404，原因：

​	新版本的tomcat文件夹里存在两个 webapps，一个叫`webapps` 默认访问的是这个，但这个是空文件，这就是为什么访问是404的原因，另一个叫`webapps.dist` 这个里面包含了tomcat的默认访问页面，只要`webapps.dist`文件夹改名为`webapps`即可解决404问题。

**操作步骤：**

1. 进入tomcat容器：

```
docker exec -it tomcat别名/tomcat容器Id /bin/bash
```

> 获取Docker正在运行容器的Id
>
> `docker ps`

2. 修改名称

```shell
#1.查看目录
ls
#2.删除webapps
rm -r webapps
#3.更改文件夹名称
mv webapps.dist webapps
#4.退出容器
exit
#5.重启该容器
docker restart to tomcat别名/tomcat容器Id
```

3. 重新刷新网页，tomcat默认页面出现

   

# 二、Docker上启动mysql

## 2.1 安装mysql

与前述tomcat一样，下述出现过的命令都不再给出解释

```
docker pull mysql
```

## 2.2 启动mysql

```
docker -run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root --name mysql01 mysql
```

* -e MYSQL_ROOT_PASSWORD ：设置登录密码，账号默认root

## 2.3 登录mysql

1. docker 进去mysql容器

进入容器

```
docker exec -it mysql容器别名/容器id /bin/bash
```

登录

```
mysql -uroot -p
```

2. 远程登录：跟正常一样，注意ip地址和端口，端口是自己启动mysql容器设置的p1端口，密码也是

## 2.4 给mysql导入sql文件

操作步骤：

1. 拷贝`xxx.sql`进mysql容器的bin目录下(mysql采用别名方式)

```
docker /xxx/xx/xxx.sql mysql01:bin
```

2. 进入mysql容器中，进行确认是否成功
3. 登入mysql
4. 输入：`source /bin/xxx.sql`
5. 查看：`show databases`
6. 完成

# 三、项目部署到虚拟机上

操作步骤：

1. 生成war包
2. 生成数据库
3. 将项目war包导入tomcat
4. 登陆

## 3.1 生成war包

如何生成war包和第二步的生成数据库这里不在说明（生成数据库在第二章内容已告知），这里主要讲生成war包的注意点。

1. 确认虚拟机mysql的版本，假如主机mysql是5.6以上，虚拟机mysql是5.1，你就需要修改下数据库配置文件的 url，当然账号密码有变化页需要更改
2. SpringBoot因为使用的是自动配置，因此打war包时要将tomcat去除，并添加`javax.servlet-api`、`jaxb-api`maven坐标

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
</dependency>

<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
</dependency>

<!-- build下面添加 finalName 命名生成的war包，方便后续使用以及访问 -->
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
    <finalName>blog</finalName>
</build>
```

3. 生成war包

## 3.2 将项目war包导入tomcat

1. 将主机上的war包传入虚拟机中

注意点：我在上传war包上，出现了个错误，耗费了很多时间，这个问题留在该小节注意点中

2. 将虚拟机中的war包传入docker的tomcat容器中

```shell
#操作代码
docker cp /路径/blog.war tomcat容器ID或别名:/usr/local/tomcat/webapps

#以我的举例，我上传路径是桌面：/home/shannanshuibei/Desktop
#/usr/local/tomcat/webapps 可以说是docker tomcat容器里的基本路径
docker cp /home/shannanshuibei/Desktop/blog.war ivantomcat:/usr/local/tomcat/webapps

#进入查看
docker exec -it ivantomcat /bin/bash
#进入tomcat后，就直接默认你进入了 /usr/local/tomcat 文件夹下
cd /webapps
#查看是否有war包
ls
#查看里面是否已经解压完成，即：blog
#应该只会有 blog.war 并没有 blog，有的话就自动解压完成了，我基本都要重新启动容器
#退出
exit
#重启tomcat容器
docker restart ivantomcat
#重复前面步骤，查看webapps是否已经有了 blog和blog.war，有blog 就说明解压成功，就可以主机访问了
#blog就是访问路径了，这也就是为什么之前生成war包添加finalName的原因
虚拟机Ip:8080/blog
```

注意点：

完成上述步骤，如果webapps目录下没有解压`xxx.war`的xxx文件，说明可能war包有问题

```shell
#查看logs文件,因为war包，没有解压，tomcat容器中应该只有 logs文件夹
#1.进入tomcat容器
docker exec -it ivantomcat /bin/bash
#2.进入日志文件夹
cd logs
ls
#3.这里面有多个日志，我们需要查看的是 catalina.时间.log，以我的举例
cat catalina.2020-08-20.log
```

你会可以看到日志的错误信息`java.util.zip.ZipException: error in opening zip file`差不多的错误，就是说明你war包错误，我在这困扰了很长时间，网上百度的结果一般就是 war 文件损坏，而我想我复制进去的war包怎么可能错了，我将war包部署到自己主机上，发现是可以解压的，那时我以为我不是war错误，但事实上最后就是war错误，中间百度了一把巴拉巴拉的东西。

原因是：我虚拟机和主机通过vmware tools 完成的交互，但是我最后发现，虽然我复制进去了，但是war包确实损坏了，损坏的原因我并不知，但是我最后使用了FileZilla工具完成了上传，重复了上述的工作后，我的war项目终于可以访问了



最后在再多提一句：

如果你的war包解压成功，但是访问还是404错误，这时候还用我之前查找问题的方法去看日志文件

```shell
#进入tomcat容器
#查看log文件夹，如果你war包解压成功了，那么肯定是有 log和logs文件的，这时候你查看log里的文件即可
#log文件夹里只有一个日志文件，这就是和logs文件夹的不同之处
cat log/xxxxx.log
```

里面的信息就是你在IDE工具进行编译出现错误，控制台输出信息，然后根据日志文件里的错误信息，进行更改修正，只要你的项目原先没有问题的话，你遇到的错误一般就是我上述提到的那些注意点，mysql错误，pom文件错误。





