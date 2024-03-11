import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as n,e as r}from"./app-DWfSWoLm.js";const i={},o=r(`<h1 id="翻转字符串" tabindex="-1"><a class="header-anchor" href="#翻转字符串"><span>翻转字符串</span></a></h1><p><strong>问题描述</strong></p><p>请实现一个算法，在不使用【额外数据结构和储存空间】的情况下，翻转一个给定的字符串(可以使用单个过程变量)。</p><p>给定一个string，请返回一个string，为翻转后的字符串。保证字符串的长度小于等于5000。</p><p><strong>解题思路</strong></p><p>翻转字符串其实是将一个字符串以中间字符为轴，前后翻转，即将str[len]赋值给str[0],将str[0] 赋值 str[len]。</p><p><strong>源码参考</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>func reverString(s string) (string, bool) {
    str := []rune(s)
    l := len(str)
    if l &gt; 5000 {
        return s, false
    }
    for i := 0; i &lt; l/2; i++ {
        str[i], str[l-1-i] = str[l-1-i], str[i]
    }
    return string(str), true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码解析</strong></p><p>以字符串长度的1/2为轴，前后赋值</p>`,10),a=[o];function s(l,p){return e(),n("div",null,a)}const g=t(i,[["render",s],["__file","翻转字符串.html.vue"]]),m=JSON.parse('{"path":"/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E7%BF%BB%E8%BD%AC%E5%AD%97%E7%AC%A6%E4%B8%B2.html","title":"翻转字符串","lang":"zh-CN","frontmatter":{"description":"翻转字符串 问题描述 请实现一个算法，在不使用【额外数据结构和储存空间】的情况下，翻转一个给定的字符串(可以使用单个过程变量)。 给定一个string，请返回一个string，为翻转后的字符串。保证字符串的长度小于等于5000。 解题思路 翻转字符串其实是将一个字符串以中间字符为轴，前后翻转，即将str[len]赋值给str[0],将str[0] 赋值...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E7%BF%BB%E8%BD%AC%E5%AD%97%E7%AC%A6%E4%B8%B2.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"翻转字符串"}],["meta",{"property":"og:description","content":"翻转字符串 问题描述 请实现一个算法，在不使用【额外数据结构和储存空间】的情况下，翻转一个给定的字符串(可以使用单个过程变量)。 给定一个string，请返回一个string，为翻转后的字符串。保证字符串的长度小于等于5000。 解题思路 翻转字符串其实是将一个字符串以中间字符为轴，前后翻转，即将str[len]赋值给str[0],将str[0] 赋值..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-11T04:42:17.000Z"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2024-03-11T04:42:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"翻转字符串\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-11T04:42:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E7%BF%BB%E8%BD%AC%E5%AD%97%E7%AC%A6%E4%B8%B2.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E7%BF%BB%E8%BD%AC%E5%AD%97%E7%AC%A6%E4%B8%B2.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"翻转字符串"}],["meta",{"property":"og:description","content":"翻转字符串 问题描述 请实现一个算法，在不使用【额外数据结构和储存空间】的情况下，翻转一个给定的字符串(可以使用单个过程变量)。 给定一个string，请返回一个string，为翻转后的字符串。保证字符串的长度小于等于5000。 解题思路 翻转字符串其实是将一个字符串以中间字符为轴，前后翻转，即将str[len]赋值给str[0],将str[0] 赋值..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-11T04:42:17.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-11T04:42:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"翻转字符串\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-11T04:42:17.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1710132137000,"updatedTime":1710132137000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":0.65,"words":194},"filePathRelative":"golang/核心知识点/翻转字符串.md","localizedDate":"2024年3月11日","autoDesc":true}');export{g as comp,m as data};
