'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const slugify = require('transliteration').slugify; // 引入transliteration中的slugify方法
const striptags = require('./strip-tags'); // 引入刚刚的工具类
const md = require('markdown-it')()
const vueLoaderConfig = require('./vue-loader.conf')
const MarkdownItAnchor = require('markdown-it-anchor')
const MarkdownItCheckbox = require('markdown-it-task-checkbox')
const MarkdownItToc = require("markdown-it-toc-done-right")
const MarkdownItContainer = require('markdown-it-container')
const isProd = process.env.NODE_ENV === 'production';

/**
 * 由于cheerio在转换汉字时会出现转为Unicode的情况,所以我们编写convert方法来保证最终转码正确
 * @param  {[String]} str e.g  &#x6210;&#x529F;
 * @return {[String]}     e.g  成功
 */
function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

/**
 * 由于v-pre会导致在加载时直接按内容生成页面.但是我们想要的是直接展示组件效果,通过正则进行替换
 * hljs是highlight.js中的高亮样式类名
 * @param  {[type]} render e.g '<code v-pre class="test"></code>' | '<code></code>'
 * @return {[type]}        e.g '<code class="hljs test></code>'   | '<code class="hljs></code>'
 */
function wrap(render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
}

const vueMarkdown = {
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function () {
      return '<table class="table">'
    }
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)
    // MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
    // ```html `` 给这种样式加个class hljs
    //  但是markdown-it 有个bug fence整合attr的时候直接加载class数组上而不是class的值上
    //  markdown-it\lib\renderer.js 71行 这么修改可以修复bug
    //  tmpAttrs[i] += ' ' + options.langPrefix + langName; --> tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
    // const fence = MarkdownIt.renderer.rules.fence
    // MarkdownIt.renderer.rules.fence = function(...args){
    //   args[0][args[1]].attrJoin('class', 'hljs')
    //   var a = fence(...args)
    //   return a
    // }

    // ```code`` 给这种样式加个class code_inline
    const code_inline = MarkdownIt.renderer.rules.code_inline
    MarkdownIt.renderer.rules.code_inline = function(...args){
      args[0][args[1]].attrJoin('class', 'code_inline')
      return code_inline(...args)
    }
    return source
  },
  use: [
    [MarkdownItAnchor,{
      level: 2, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
      slugify: slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
      permalink: true, // 开启标题锚点功能
      permalinkBefore: true, // 在标题前创建锚点
      // renderPermalink:
    }],
    [MarkdownItToc,{
      level:1,
      listType:'ul',
      listClass:'markdown_toc',
      format:function format(x, htmlencode) {
        return `<span>${htmlencode(x)}</span>`;
      }
    }],
    [MarkdownItContainer, 'demo', {
      validate: params => params.trim().match(/^demo\s*(.*)$/),
      render: function(tokens, idx) {
        var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
        // nesting === 1表示标签开始
        if (tokens[idx].nesting === 1) {
          // 获取正则捕获组中的描述内容,即::: demo xxx中的xxx
          var description = (m && m.length > 1) ? m[1] : '';
          // 获得内容
          var content = tokens[idx + 1].content;
          // 解析过滤解码生成html字符串
          var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
          // 获取script中的内容
          var script = striptags.fetch(content, 'script');
          // 获取style中的内容
          var style = striptags.fetch(content, 'style');
          // 组合成prop参数,准备传入组件
          var jsfiddle = { html: html, script: script, style: style };
          // 是否有描述需要渲染
          var descriptionHTML = description
            ? md.render(description)
            : '';

          // 将jsfiddle对象转换为字符串,并将特殊字符转为转义序列
          jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));
          // 起始标签,写入demo-block模板开头,并传入参数
          //TODO：demo-block 里的组件代码不支持单标签闭合，否则无法渲染后面的数据
          // return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
          //           // <div class="jsfiddle" slot="jsfiddle">${jsfiddle}</div>
          //           <div class="source" slot="desc">${html}</div>
          //           ${descriptionHTML}
          //           <div class="highlight" slot="highlight">`;
          return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                    ${descriptionHTML}
                    <div class="highlight" slot="highlight">`;
        }
        //否则闭合标签
        return `</div></demo-block>\n`
      }
    }],
    [require('markdown-it-container'), 'tip'],
    [require('markdown-it-container'), 'warning'],
    [MarkdownItCheckbox,{
      divWrap: true,
      divClass: 'cb',
      idPrefix: 'cbx_',
      disabled:true,
      ulClass: 'task-list',
      liClass: 'task-list-item'
    }]
  ]
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  // context: path.resolve(__dirname, '../'),
  entry: {
    app: './example/main.js'  //示例文档时的配置
    // app: './package/index.js'  //打包发布的时候修改的配置
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('example'),
    }
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: vueMarkdown
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('example'), resolve('test'),resolve('packages')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // node: {
  //   // prevent webpack from injecting useless setImmediate polyfill because Vue
  //   // source contains it (although only uses it if it's native).
  //   setImmediate: false,
  //   // prevent webpack from injecting mocks to Node native modules
  //   // that does not make sense for the client
  //   dgram: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty',
  //   child_process: 'empty'
  // }
}
