# 1

<script setup>
    const someEnvVariable = import.meta.env.VITE_ASSET_SERVER_URL;
</script>

<!-- ![图片](http://lmgzs.fun:441/images/pixiv/84073404_p0.jpg) -->

<!-- ![图片](http://127.0.0.1:3000/images/pixiv/84073404_p0.jpg) -->

<!-- <img src="http://127.0.0.1:3000/images/pixiv/84073404_p0.jpg" alt="图片"> -->

<!-- ![图片](@server/images/pixiv/84073404_p0.jpg) -->

<img src="@server/images/pixiv/84073404_p0.jpg" alt="图片">

```c
@server
```
@server

<!-- <img src="{{ someEnvVariable }}/images/pixiv/84073404_p0.jpg" alt="图片"> -->

<!-- ![图片]({{someEnvVariable}}/images/pixiv/84073404_p0.jpg) -->

<!-- blah blah blah {{ someEnvVariable }} blah blah blah -->
