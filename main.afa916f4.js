// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var data = localStorage.getItem('data');
var xObject = JSON.parse(data); //把字符串变成对象

var hashMap = xObject || [{
  logo: 'A',
  url: 'https://www.acfun.cn'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com'
}, {
  logo: 'D',
  url: 'https://www.douban.com/'
}, {
  logo: 'G',
  url: 'https://github.com/'
}, {
  logo: 'T',
  url: 'https://www.toutiao.com/'
}, {
  logo: 'Z',
  url: 'https://www.zhihu.com/'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //正则匹配 删除以/开头的内容
}; //render函数：遍历哈希表 渲染页面


var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n    <li>\n      <div class=\"site\">   \n        <div class=\"logo\">".concat(node.logo, "</div>  \n        <div class=\"link\">").concat(simplifyUrl(node.url), "</div>  \n        <div class=\"close\">\n          <svg class=\"icon\">\n            <use xlink:href=\"#icon-close\"></use>\n          </svg>\n        </div>\n      </div>\n    </li>")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      //阻止冒泡
      e.stopPropagation();
      hashMap.splice(index, 1);
      render(); //重新渲染
    });
  });
};

render(); //渲染页面

$('.addButton').on('click', function () {
  var url = window.prompt('请输入您想要添加的网址：'); //得到用户输入的那一串字符

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap); //把hashMap里的对象存成字符串

  localStorage.setItem('data', string); //在本地的存储里设置一个x，其值为string  
}; //监听键盘事件


var keyboardLink = function keyboardLink(e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url, "_self");
    }
  }
};

$(document).on('keypress', keyboardLink);
$('.globalHeader input').on('keypress', function (e) {
  e.stopPropagation();
}); //解决键盘输入跳转BUG

startTime();

function startTime() {
  var today = new Date();
  var y = today.getFullYear();
  var M = today.getMonth() + 1;
  var d = today.getDate();
  var w = today.getDay();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']; // add a zero in front of numbers<10

  m = checkTime(m);
  s = checkTime(s);
  var status;

  if (h >= 5 && h < 11) {
    status = "早上好！现在是  ";
  } else if (h >= 11 && h < 13) {
    status = "中午好！现在是  ";
  } else if (h >= 13 && h < 18) {
    status = "下午好！现在是  ";
  } else {
    status = "晚上好！现在是  ";
  }

  $('#currentTime').html(status + y + '年' + M + '月' + d + "日 " + h + '时' + m + '分' + s + '秒 ' + week[w]); //可改变格式

  t = setTimeout(startTime, 500);

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }

    return i;
  }
}
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.afa916f4.js.map