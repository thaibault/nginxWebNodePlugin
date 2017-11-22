'use strict';
(function(a,b){'object'==typeof exports&&'object'==typeof module?module.exports=b(require('babel-runtime/core-js/promise'),require('babel-runtime/regenerator'),require('babel-runtime/core-js/get-iterator'),require('babel-runtime/helpers/asyncToGenerator'),require('babel-runtime/helpers/classCallCheck'),require('child_process'),require('clientnode'),function(){try{return require('source-map-support/register')}catch(a){}}()):'function'==typeof define&&define.amd?define('nginxwebnodeplugin',['babel-runtime/core-js/promise','babel-runtime/regenerator','babel-runtime/core-js/get-iterator','babel-runtime/helpers/asyncToGenerator','babel-runtime/helpers/classCallCheck','child_process','clientnode','source-map-support/register'],b):'object'==typeof exports?exports.nginxwebnodeplugin=b(require('babel-runtime/core-js/promise'),require('babel-runtime/regenerator'),require('babel-runtime/core-js/get-iterator'),require('babel-runtime/helpers/asyncToGenerator'),require('babel-runtime/helpers/classCallCheck'),require('child_process'),require('clientnode'),function(){try{return require('source-map-support/register')}catch(a){}}()):a.nginxwebnodeplugin=b(a['babel-runtime/core-js/promise'],a['babel-runtime/regenerator'],a['babel-runtime/core-js/get-iterator'],a['babel-runtime/helpers/asyncToGenerator'],a['babel-runtime/helpers/classCallCheck'],a.child_process,a.clientnode,a['source-map-support/register'])})(this,function(a,b,c,d,e,f,g,h){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=0)}([function(a,b,c){a.exports=c(1)},function(a,b,c){'use strict';(function(a){function d(a){return a&&a.__esModule?a:{default:a}}var e=c(3),f=d(e),g=c(4),h=d(g),i=c(5),j=d(i),k=c(6),l=d(k),m=c(7),n=d(m),o=c(8),p=c(9),q=d(p);b.__esModule=!0,b.Nginx=void 0;try{c(10)}catch(a){}var r=b.Nginx=function(){function b(){(0,n.default)(this,b)}return b.loadService=function(){var c=(0,l.default)(f.default.mark(function c(d,e,g){var i;return f.default.wrap(function(c){for(;;)switch(c.prev=c.next){case 0:if(e.hasOwnProperty('nginx')){c.next=19;break}return e.nginx=(0,o.spawn)('nginx',[],{cwd:a.cwd(),env:a.env,shell:!0,stdio:'inherit'}),e.nginx.reload=function(){return new j.default(function(a,b){return(0,o.exec)('nginx -s reload',{shell:!0},function(c,d,e){c?(c.standardErrorOutput=e,b(c)):a(d)})})},i=new j.default(function(a,b){for(var c=q.default.closeEventNames,d=Array.isArray(c),f=0,c=d?c:(0,h.default)(c);;){var i;if(d){if(f>=c.length)break;i=c[f++]}else{if(f=c.next(),f.done)break;i=f.value}var j=i;e.nginx.on(j,q.default.getProcessCloseHandler(a,g.server.proxy.optional?a:b,{reason:e.nginx,process:e.nginx}))}}),c.prev=4,c.next=7,b.checkReachability(g.server);case 7:c.next=18;break;case 9:if(c.prev=9,c.t0=c['catch'](4),!g.server.proxy.optional){c.next=17;break}console.warn('Nginx couldn\'t be started but was marked as optional.'),e.nginx=null,i=null,c.next=18;break;case 17:throw c.t0;case 18:return c.abrupt('return',{name:'nginx',promise:i});case 19:return c.abrupt('return',e.nginx);case 20:case'end':return c.stop();}},c,this,[[4,9]])}));return function(){return c.apply(this,arguments)}}(),b.shouldExit=function(){var a=(0,l.default)(f.default.mark(function a(c,d){return f.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(null===c.nginx){a.next=4;break}return c.nginx.kill('SIGINT'),a.next=4,b.checkReachability(d.server,!0);case 4:return delete c.nginx,a.abrupt('return',c);case 6:case'end':return a.stop();}},a,this)}));return function(){return a.apply(this,arguments)}}(),b.checkReachability=function(){var a=(0,l.default)(f.default.mark(function a(b){var c,d=1<arguments.length&&void 0!==arguments[1]&&arguments[1],e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:3,g=3<arguments.length&&void 0!==arguments[3]?arguments[3]:0.1,h=4<arguments.length&&void 0!==arguments[4]?arguments[4]:[100,101,102,200,201,202,203,204,205,206,207,208,226,300,301,302,303,304,305,306,307,308],i=5<arguments.length&&void 0!==arguments[5]?arguments[5]:{redirect:'manual'};return f.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!(0<b.proxy.ports.length)){a.next=5;break}return c='http'+(443===b.proxy.ports[0]?'s':'')+'://'+(b.application.hostName+':')+(''+b.proxy.ports[0]),a.next=4,d?q.default.checkUnreachability(c,!0,e,g,h,i):q.default.checkReachability(c,!0,h,e,g,i);case 4:return a.abrupt('return',a.sent);case 5:return a.abrupt('return',{});case 6:case'end':return a.stop();}},a,this)}));return function(){return a.apply(this,arguments)}}(),b}();b.default=r}).call(b,c(2))},function(a){function b(){throw new Error('setTimeout has not been defined')}function c(){throw new Error('clearTimeout has not been defined')}function d(a){if(j===setTimeout)return setTimeout(a,0);if((j===b||!j)&&setTimeout)return j=setTimeout,setTimeout(a,0);try{return j(a,0)}catch(b){try{return j.call(null,a,0)}catch(b){return j.call(this,a,0)}}}function e(a){if(k===clearTimeout)return clearTimeout(a);if((k===c||!k)&&clearTimeout)return k=clearTimeout,clearTimeout(a);try{return k(a)}catch(b){try{return k.call(null,a)}catch(b){return k.call(this,a)}}}function f(){o&&m&&(o=!1,m.length?n=m.concat(n):p=-1,n.length&&g())}function g(){if(!o){var a=d(f);o=!0;for(var b=n.length;b;){for(m=n,n=[];++p<b;)m&&m[p].run();p=-1,b=n.length}m=null,o=!1,e(a)}}function h(a,b){this.fun=a,this.array=b}function i(){}var j,k,l=a.exports={};(function(){try{j='function'==typeof setTimeout?setTimeout:b}catch(a){j=b}try{k='function'==typeof clearTimeout?clearTimeout:c}catch(a){k=c}})();var m,n=[],o=!1,p=-1;l.nextTick=function(a){var b=Array(arguments.length-1);if(1<arguments.length)for(var c=1;c<arguments.length;c++)b[c-1]=arguments[c];n.push(new h(a,b)),1!==n.length||o||d(g)},h.prototype.run=function(){this.fun.apply(null,this.array)},l.title='browser',l.browser=!0,l.env={},l.argv=[],l.version='',l.versions={},l.on=i,l.addListener=i,l.once=i,l.off=i,l.removeListener=i,l.removeAllListeners=i,l.emit=i,l.prependListener=i,l.prependOnceListener=i,l.listeners=function(){return[]},l.binding=function(){throw new Error('process.binding is not supported')},l.cwd=function(){return'/'},l.chdir=function(){throw new Error('process.chdir is not supported')},l.umask=function(){return 0}},function(a){a.exports=b},function(a){a.exports=c},function(b){b.exports=a},function(a){a.exports=d},function(a){a.exports=e},function(a){a.exports=f},function(a){a.exports=g},function(a){if('undefined'==typeof h){var b=new Error('Cannot find module "source-map-support/register"');throw b.code='MODULE_NOT_FOUND',b}a.exports=h}])});