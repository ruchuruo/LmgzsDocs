# Godot Engine 游戏指定渲染驱动程序启动

查看包括的有效选项
```cmd
game.exe --rendering-driver xxx
```
```log
>Unknown rendering driver 'xxx', aborting.
Valid options are 'vulkan', 'd3d12', 'opengl3', 'opengl3_angle' and 'dummy'.
```

使用 `opengl3_angle`
```cmd
game.exe --rendering-driver opengl3_angle
```
