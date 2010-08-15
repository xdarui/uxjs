/*!
 * 
 * Ux JS Library 1.0
 * Copyright(c) 2010 xdarui.
 * xdarui@xdarui.com
 * 
 */

Ux = {
	version:'1.0',
	author:'xdarui'
}
Ux.apply = function(o,p){
	if(arguments[2]){
		for(var i=2;i<arguments.length;i++){
			Ux.apply(o,arguments[i])
		}
	}
	if(o && p && typeof p == 'object'){
		for(var c in p){
			o[c]=p[c]
		}
	}
	
};
Ux.applyIf = function(o,p){
	if(arguments[2]){
		for(var i=2;i<arguments.length;i++){
			Ux.applyIf(o,arguments[i])
		}
	}
	if(o && p && typeof p == 'object'){
		for(var c in p){
			if(o.hasOwnProperty(c)){
				o[c]=p[c]
			}
		}
	}
	
};
(function(){
	var autoid=1000,
	toString = Object.prototype.toString,
        ua = navigator.userAgent.toLowerCase(),
        check = function(r){
            return r.test(ua);
        },
        DOC = document,
        isStrict = DOC.compatMode == "CSS1Compat",
        isOpera = check(/opera/),
        isChrome = check(/\bchrome\b/),
        isWebKit = check(/webkit/),
        isSafari = !isChrome && check(/safari/),
        isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2
        isSafari3 = isSafari && check(/version\/3/),
        isSafari4 = isSafari && check(/version\/4/),
        isIE = !isOpera && check(/msie/),
        isIE7 = isIE && check(/msie 7/),
        isIE8 = isIE && check(/msie 8/),
        isIE6 = isIE && !isIE7 && !isIE8,
        isGecko = !isWebKit && check(/gecko/),
        isGecko2 = isGecko && check(/rv:1\.8/),
        isGecko3 = isGecko && check(/rv:1\.9/),
        isBorderBox = isIE && !isStrict,
        isWindows = check(/windows|win32/),
        isMac = check(/macintosh|mac os x/),
        isAir = check(/adobeair/),
        isLinux = check(/linux/),
        isSecure = /^https/i.test(window.location.protocol);
	Ux.apply(Ux,{
		/*
		 * 兼容浏览器和操作系统
		 */
		isIE:isIE,
		/*
		 * 浏览器对象
		 */
		doc:DOC,
		getBody: function(){
			return document.getElementsByTagName('body')[0]
		},
		/*
		 * 常用方法
		 */
		override : function(origclass, overrides){
            if(overrides){
                var p = origclass.prototype;
                Ux.apply(p, overrides);
                if(Ux.isIE && overrides.hasOwnProperty('toString')){
                    p.toString = overrides.toString;
                }
            }
        },
		id:function(dom){
			if(!dom || !dom.id){
				dom={}
				dom.id = "ux-gen-" + (++autoid)
			}
			return dom.id
		},
		get:function(id){
			return document.getElementById(id) ||function(arguments){
				if(arguments[1]){
					return document.getElementsByName(id)
				}else{
					return document.getElementsByName(id)[arguments[1]]
				}
			}(arguments)
		},
		getConfig:function(config){
			var c={}
			for(var o in config){
				if(typeof config[o] !='function' && o!='renderTo' && o != 'items'){
					c[o] = config[o]
				}
			}
			return c
		},
		/*
		 *注册xtype
		 */
		reg:function(xtype,classname){
			if(!Ux.reglist){
				Ux.reglist=[]
			}
			Ux.reglist[xtype] = classname
		},
		/*
		 * 生成结点
		 */
		createDom:function(c){
		    if(c.el && c.el.xtype){
		       c.dom = c.el.dom
		    }else if(typeof c.el == 'string'){
		       c.dom = c.el
		    }
		     if(!c.dom){
				c.dom = Ux.getBody()
			}
		    var o,dom = (typeof c.dom == 'object')?c.dom:Ux.get(c.dom)
			if(typeof c=='string' || c.tagtype=='string'){
				o =  Ux.DOC.createTextNode(o);
			}else{
				o = document.createElement(c.tagtype || 'div')
				o.id = c.id || Ux.id()
			}
			var regtext = /dom|el|ctype/
			for(var attr in c){
				if(attr=='cls'){
					o.className = c['cls']
				}else if(c[attr]!= undefined && !regtext.test(attr)){
				   if(c.width){o.style.width=c.width}
				   if(c.height){o.style.height=c.height}
				   if (!!!o.setAttribute(attr,c[attr])){   
				         o[attr] = c[attr]
				   }
				}
			}
			dom.appendChild(o)
			return new Ux.lib.Element(o);
		},
		/*
		 * 动态库加载
		 * 
		 */
		loadBase:function(xtype){
			  if(!Ux.reglist[xtype]){
				  var o = document.createElement('script')
				  var src= 'UxJs/' + xtype + '.js'
				  o.setAttribute('src',src)
				  o.setAttribute('type','text/javascript')
				  var body = document.body || document.documentElement
				  body.appendChild(o)
			 }
			},
		 /*
			* 生成对象 
			*
			*/
		getBean:function(xtype,config){
			Ux.loadBase(xtype)
			var o = Ux.reglist[xtype]
			return new o(config)
		},
		/**
		 *枚举对象并执行回调
		 <pre><code>
		    fn = function(obj,objname){
				  alert('scope: ' + this +'\n' + 'obj: ' + obj +'\n' + 'objname: ' + objname +'\n' )
			}
			// var list = ['a','ab','abc']
			var list ={
			  	'a':'funa',
				'b':'funb'
		    } 
		    Ux.each(list,fn)
		  </code></pre>
		 *@param {Object[]} objs 可枚举对象或对象数组
		 *@param {Function} fn  回调函数
		 *@param {Scope} scope 执行域
		 */
		 each:function(objs,fn,scope){
		 	  if (objs.length != undefined) {
			  	for (var i = 0, obj; obj = objs[i++];) {
					fn.call(scope || obj,obj,i)
				}
			  }else{
			  	for(var obj in objs){
					fn.call(scope||objs[obj],objs[obj],obj)
				}
			  }
		 	},
		/**
		 * 创建包
		 */
		makePackage:function(){
			for(var i=0,o;o=arguments[i++];){
				 var d = o.split('.'),
				      U = Ux
				if(d[0]!='Ux'){
					  throw 'Unable to regist the package of  \'' + d[0] + '\', Please contact to Web Master. ' + o
					  break;
					}
				 for(var j=1;j<d.length;j++){
				 	  if(!U[d[j]]){
				 	  	  U = U[d[j]] = {}
				 	  	}
				 	}
				}
			},
	    /*
	     * 创建多包
	     */
		makePackages:function(){
			var args = arguments,arg
			for(var i=0;arg=arguments[i++];){
				Ux.makePackage(arg)
			}
		},
		/*
		 * 继承（参考ExtJs 3.2 http://www.extjs.com/） 
		 */
		extend:function(sb, sp, overrides){
			var io = function(){
				   return Ux.apply(io,o)
			    }
		    var oc = Object.prototype.constructor;
			if(typeof sp == 'object'){
                    overrides = sp;
                    sp = sb;
                    sb = overrides.constructor != oc ? overrides.constructor : function(){sp.apply(this, arguments);};
                }
			var F = function(){},
                    sbp,
                    spp = sp.prototype;
					F.prototype = spp;
					sbp = sb.prototype = new F();
					sbp.constructor = sb;
					sb.superclass = spp;
					if (spp.constructor == oc) {
						spp.constructor = sp;
					}
                sb.override = function(o){
                    Ux.override(sb, o);
                };
                sbp.superclass = sbp.supr = (function(){
                    return spp;
                })();
               // sbp.override = io;
                Ux.override(sb, overrides);
                sb.extend = function(o){return Ux.extend(sb, o);};
                return sb;
		},
		isArray:function(n){
			return typeof n == 'object' && !!n.length
		}
	})
	    String.prototype.trim=function(){      
		    return this.replace(/(^\s*)|(\s*$)/g, '');   
		}
})();

/*
 * ajax
 */
Ux.makePackages('Ux.lib','Ux.ui')

Ux.lib.Ajax=function(){
	
	function setHeader(o){
		var _setHeaders=function(headers){
			for(var h in headers){
			    if(/;$/.test(headers[h])){
					o.Ajax(h, headers[h] +'charset=' + ajax.coding);
				}else{
					o.Ajax.setRequestHeader(h, headers[h] + ';charset=' + ajax.coding);
				}
				
			}
		}
		_setHeaders(ajax.defaultHeaders)
		if(ajax.headers){
			_setHeaders(ajax.headers)
		}
	}
	function getAjaxObject(){
		    var Ajax
		     try {
                if (window.XMLHttpRequest) {
                     Ajax =  new XMLHttpRequest();
                } else {
                    if (window.ActiveXObject) {
                        try {
                             Ajax = new ActiveXObject("Msxml2.XMLHTTP");
                        } catch (e) {
                            try {
                                 Ajax = new ActiveXObject("Microsoft.XMLHTTP");
                            } catch (e) {
                               throw 'Create Ajax Error .' + e
                            }
                        }
                    }
                }
            }catch(e){
				throw 'Create Ajax Error .' + e
	   }
	   return {
	   	Ajax:Ajax,
		transId:++ajax.transId
	   }
	}
	function iniHeader(label,value){
		ajax.headers = ajax.headers||{}
		ajax.headers[label] = value
	}
	function doRequest(method, url, callback, data){
		var o = getAjaxObject() || null
		if (o) {
			o.Ajax.open(method.toUpperCase(), url, ajax.asynchronous)
			setHeader(o)
			if(ajax.asynchronous){
				handlerAjaxReady(o)
			}
			o.Ajax.send(data || null)
			if(!ajax.asynchronous){
				var request = o.Ajax
		 	if (request.readyState == 4) { 
		        if (request.status == 200) {
					ajax.success.call(ajax, request)
				}else{
					ajax.failure.call(ajax,request)
				}
		    }
			}
		}
	}

	function handlerAjaxReady(o){
		var request = o.Ajax
		 request.onreadystatechange = function(){
		 	if (request.readyState == 4) { 
		        if (request.status == 200) {
					ajax.success.call(ajax, request)
				}else{
					ajax.failure.call(ajax,request)
				}
		    }
		 }
	}
	var ajax = {
		/**
         * @cfg {String} method GET 或者 POST,默认GET.
         */
		method:'POST',
		/**
		 * @cfg {String} url 请求URL
		 */
		url:'',
		/**
		 * @cfg {Boolean} asynchronous 是否为异步，默认为true
		 */
		asynchronous:true,
		/**
		 * @cfg {Number} timeout 设置超时，默认为5000ms
		 */
		timeout:5000,
		success:function(){},
		failure:function(){},
		/**
		 * 默认请求头
		 * @cfg {Object} defaultHeaders
		 */
		defaultHeaders:{ 
		  'Content-Type' :'application/x-www-form-urlencoded',
		  'Accept-Charset':this.coding   /*无效？*/
		  },
		/**
		 * @cfg {Boolean} cache 是否缓存,默认为false
		 */
		headers:{},
		cache:true,
		/**
		 * 编码类型
		 * @param {String} coding
		 */
		coding:'UTF-8',
		/**
		 * private
		 */
		transId:0,
		/**
		 * 启动一个ajax请求
		 */
		request:function(o){
			var me = this
			Ux.applyIf(me,o)
			if(!o.data){
				if(o.xml || o.params){
					var hds = me.headers ||{}
					if(!hds || !hds['ContentType']){
						iniHeader('ContentType',o.xml ?  'text/xml' :'application/json')
						o.data = o.xml || o.params
					}
				}
			}
			return doRequest(me.method,me.url,o.data)
		}
	};
	return ajax;
}();



/*
 *  DOM事件处理模型
 */
Ux.lib.Event=function(dom){
	this.dom = dom || Ux.getBody
}
Ux.lib.Event.prototype={
	/**
	 * 获取鼠标事件激活时所在的位置
	 * @param {Event Object} e
	 * @return {@link Ux.util.Position}
	 */
    getXY:function(ev){
		/*
		 * to do
		 */
	},
	/**
	 * 获取鼠标事件激活时的滚珠增量
	 * @param {Event Object} ev
	 */
	getWheel:function(ev){
		/*
		 * to do
		 */
	},
	/**
	 * 获取键盘事件激活时的按键
	 * @param {Event Object} ev
	 */
	getKey:function(ev){
		/*
		 * to do
		 */
	},
	/**
     * 获得DOM事件源
     * @param {DOMEvent} event
     * @return {DOMElement}
	 */
	getEl: function(e){
		return e.srcElement || e.target
	},
	/**
	 * 增加事件监听
	 * @param {String} evname 事件名（无on开头）
	 * @param {DOMElement} dom 事件源
	 * @param {Function} fn 事件处理函数
	 * @param {Boolean} [userCapure] default false
	 */
   on:function(evname,dom,fn,userCapure){
   	   var me = this
	   userCapure = userCapure || false 
   	   if(typeof evname =='object'){
	   	  var e = evname
	   	  Ux.each(e,function(){
		  	 Ux.on(e.evname,e.dom||dom,e.fn||fn,e.userCapure||userCapure)
		  })
	   }else{
	   	 if(!me.listeners){
		 	me.listeners=[]
		 }
		 evname = evname.toLowerCase()
		 if(dom.addEventListener){
		 	 this.events.push([evname,dom, fn, useCapture]);
			 dom.addEventListener(evname, fn, useCapture);
			 /*
			  * 标准浏览器中事件监听方法
			  */
		 }else if(dom.attachEvent){
		 	 this.events.push([evname,dom, fn, useCapture]);
			 dom.attachEvent('on' + evname, fn);
			  /*
			  * IE方法  在IE中事件名必需以on开头
			  */
		 }else{
		 	throw 'unknow Event regiest method . You can report the requestion to Ux .'
		 }
	   }  
   },
	/**
	 * 移除事件监听
	 * @param {String} evname 事件名（无on开头）
	 * @param {DOMElement} dom 事件源
	 * @param {Function} fn 事件处理函数
	 * @param {Boolean} [userCapure] default false
	 */
   un:function(evname,dom,fn,userCapure){
	   userCapure = userCapure || false
	   evname = evname.toLowerCase()
	   if (dom.removeEventListener) {
            dom.removeEventListener(evname, fn, useCapture);
        } else if (dom.detachEvent) {
            dom.detachEvent('on' + evname, fn);
        }else{
			throw 'unknow Event remove method . You can report the requestion to Ux .'
		}
		this.events[evname] = 'removed listener'
   },
   /**
    * 检测是否已经注意事件
    * @param {String} evname 事件名（无on开头）
    * @return {Boolean}
    */
   hasListener:function(evname){
   	   var e = this.events[evname.toLowerCase()]
	   return typeof e =='object' && e.events.length > 0
   },
   /**
   * 取消浏览器对事件的默认处理.
   * @param {DOMEvent} event
   */
    preventDefault : function(ev) {
        if(ev.preventDefault)
            ev.preventDefault();
        ev.returnValue = false;
    }
}


/* 
 * ------------------------------------------------------------------> dom <-------------------------------
 */
//Ux.lib.Element
Ux.lib.Element = function(dom){
    this.get(dom)
}
Ux.lib.Element = Ux.extend(Ux.lib.Event,{
    xtype:'element',
	get:function(dom){
		this.el = Ux.get(dom)
	},
	getEl:function(){
	    return this
	},
	destory:function(){
	    this.dom.parentNode.removeChild(this.dom)
	},
	addClass:function(cls){
	    var me = this
	    if(Ux.isArray(cls)){
	      Ux.each(cls,function(c){
	         me.addClass(c)
	      })
	    }else{
	     this.dom.className = this.dom.className +  " " + cls
	    }
	},
	firstChild:function(){
	   return this.dom.firstChild
	},
	removeClass:function(cls){
		this.el.className = this.el.className.replace(cls,"")
	},
	on:function(evname,fn,userCapure){
		this.spupperclass.on(evname,this.el,fn,userCapure)
	},
	un:function(evname,dom,fn,userCapure){
		this.spupperclass.un(evname,this.el,fn,userCapure)
	}
})


 Ux.Object=function(config){
 	me = config
	this.events = this.events || {}
	if(me.listeners){
		this.on(me.listeners)
		delete me.listeners
	} 
   this.initComponent(config)
}

Ux.Object.prototype={
	xtype:'object',
	on:function(name,fun){
		var me = this,o={}
		o[name] = fun
		Ux.apply(me.events,o)
	},
	un:function(o){
		var me = this
		if(typeof o !='string'){
			for(var i=0;i<o.length;i++){
				me.un(o[i])
			}
		}else{
			me = me.events
			delete me[o]
		}
	},
	fire:function(n){
		if (Ux.isArray(n)) {
			for (var i = 0; i < n.length; i++) {
				this.fire(n[i])
			}
		}
		else {
			var me = this, 
				fun = 'on' + n.replace(/^[a-z]/, n.charAt(0).toUpperCase())
				fun = (typeof me[fun] == 'function')?me[fun]:function(){}
				fun.call(me,me)
				fun   =   me.events[n] || function(){}
			    fun.call(me,me)
		}
	},
	getXtype:function(){return this.xtype},
	initComponent:function(){
		}
}
Ux.reg('object',Ux.Object)
/*
 * 
 * HTML模板
 */
Ux.Template = Ux.extend(Ux.Object,{
	reg:/\{([\w-]+)\}/g,
	html:'',
	compile:function(){
	    me = this,values=me.data
       return me.html.replace(me.reg, function(m,name){
	   	      return Ux.isArray(values)?values[parseInt(name,10)]:values[name]
              })
	   this.fire('compile')
	},
	render:function(el){
		this.fire('render')
		el.innerHTML = this.compile(this)
		this.fire('rendered')
	}
})
/*
 * 组件内容
 *
 
Ux.ui.Component = function(config){
	this.initComponent(config)
} 
*/

//Ux.extend(Ux.ui.Component,Ux.Object,{
Ux.ui.Component=Ux.extend(Ux.Object,{
	border:false,
	bg:true,
	xtype:'component',
	closeAction:'hide',
	alignAction:'left',
	initComponent: function(c){
		Ux.apply(this,c)
		if (this.renderTo) {
			this.render(this.renderTo)
			delete this.renderTo
		}
	},
   hide:function(){
   	 this.el.addClass('hide')
	 this.fire('hide')
   },
   getEl:function(){
   	return this.el
   },
   getConfig:function(){
   	return Ux.getConfig(this);
   },
   renderItems:function(el){
   	   var me  = this
   	  if(this.items){
	   	 for(var i=0,p;p=this.items[i++];){
		 	if(!p.xtype){
				p.xtype = 'component'
			}
			var o =  Ux.reglist[p.xtype]
			p = new o(p)
			p.ownerCt = me
		 	p.render(el)
		 }
	   }
   },
   close:function(){
   	   var regclose = /hide|destory/,
	       me = this
	   if(regclose.test(me.closeAction)){
	   	    me[me.closeAction]()
	   }
   	    /*
   	    * 隐藏组件
   	    */
   },
   destory:function(){
   	  /*
   	   * 激活销毁事件
   	   */
   },
   render:function(el){
		this.el  = Ux.createDom({
			el:el,
			id:this.id,
			width:this.width,
			height:this.height,
			cls:'align-' + this.alignAction,
			innerHTML:this.html
		})
	   if(this.border){
	        this.el.addClass('Component-border')
	   }
	   if(this.extCls){
	   	   this.el.addClass(this.extCls)
	   }
	   if(this.bg){
	   	   this.el.addClass('Component-bg')
	   }
	   this.renderItems(this.getEl())
	}
});
Ux.reg('component',Ux.ui.Component)



Ux.ui.Mask=Ux.extend(Ux.ui.Component,{
	border:true,
	html:'正在加载，请稍等·',
	height:32,
	width:220,
	extCls:'mask',
	xtype:'mask',
	shadow:true,
	dym:true,
	updateMsg:function(msg){
		this.el.dom.firstChild.firstChild.innerHTML=msg
		this.fire('updatemsg')
	},
	close:function(){
	   this.el.destory()
	},
	render:function(){
		this.fire(['render'])
		var height,body,me = this
	      
	    body = Ux.isIE? document.body:document.documentElement
	    height = body.clientHeight > body.scrollHeight ? body.clientHeight : height = body.scrollHeight
	    height = window.screen.availHeight > height ? window.screen.availHeight : height
		me.el = Ux.createDom({
			innerHTML:'<div class=\'loading-mask-bg\' style=\'width:'+ me.width +'px\'><div class=\'loading-mask\'>' + me.html + '</div></div>'
		})
		if(!Ux.isIE){
			me.el.dom.firstChild.firstChild.style.width = (me.width - 42) + 'px' 
		}
		if (me.shadow) {
			Ux.createDom({
				el: me.el,
				cls: 'loading-mask-out',
				height: height,
				width: Ux.isIE ? document.body.clientWidth : document.documentElement.clientWidth
			})
		}
	  this.fire('rendered')
	}
})
Ux.reg('mask',Ux.ui.Mask)
Ux.ui.Button=Ux.extend(Ux.ui.Component,{
	xtype:'button',
	render:function(dom){
		this.el = Ux.createDom({
			el:dom,
			id:this.id,
			width:this.width,
			height:this.height,
			tagtype:'input',
			type:'submit',
			value:this.text,
			cls:"Button"
		})
		if(!!this.handler){
			/*me = this
			this.el.onclick=function(){
				me.handler.call(me,dom.text)
			}*/
		}
	}
})

Ux.reg('button',Ux.ui.Button)

Ux.ui.Form = Ux.extend(Ux.ui.Component,{
	title:'no title',
	border:true,
	xtype:'form',
	singel:false,
	getBody:function(){
		return this.single?this.el.dom:this.getEl().dom.firstChild.nextSibling;
	},
	render:function(dom){
		var c = this.getConfig()
		if(!this.single){
			c.items=[{
			bg:false,
			extCls:'Form-title',
			html:this.title
		             },{
			extCls:'Form-body',
		    html:this.html
		             }]
			delete c.html
			c.extCls='From'		 
		}else{
			c.items=[]
			c.extCls='singleForm'
		}
		var form = new Ux.ui.Component(c)
	    	form.render(dom)
		this.el = form.getEl();
       this.renderItems(this.getBody())
	}
})
Ux.reg('form',Ux.ui.Form)

Ux.ui.Panel=Ux.extend(Ux.ui.Form,{
	xtype:'panel',
	buttons:[],
	buttonAlign:'right',
	render:function(dom){
		var c = this.getConfig();
		var f = new Ux.ui.Form(c);
		f.render(dom)
		this.el = f.getEl();
	//	this.renderItems(this.getBody())
		var b = new Ux.ui.Component({
			renderTo:this.el
		})
		b.getEl().addClass('Form-buttom align-' + this.buttonAlign)
		
		for(var btn,i=0;btn=this.buttons[i++];){
			btn.renderTo = b.getEl()
			new Ux.ui.Button(btn)
		}
		
	}
})
Ux.reg('panel',Ux.ui.Panel)


Ux.ui.tabPanel=Ux.extend(Ux.ui.Form,{
	tabWidth:50,
	single:true,
	activeTab:0,
	_atived:function(){
		var fun = this.events['actived'] || function(){}
		   // arg = Array.prototype.slice.call(arguments,0)
		
		fun.apply(this,arguments)
	},
	active:function(d){
		var node = d.parentNode.firstChild
		var p=-1,html
		do{
			node.className = "tab_not_selected_title Form-title"
			if(node==d){
				var n = this.panel_list.firstChild.firstChild
				for(var i=0;i<this.items.length;i++){
					if(i== ++p){
						n.className = "tab_selected_panel"
						n.style.display="block"
						html = n.innerHTML
					}else{
						n.style.display="none"
					}
					n = n.nextSibling
				}
            }
		}while(node = node.nextSibling)
		d.className = "tab_selected_title Form-title"		
	},
	renderItems:function(){
		var me = this
		for(var i=0;o=this.items[i++];){
			var c = Ux.createDom({
			   ctype:'li',
			   id:o.id||Ux.id(),
			   el:this.title_list.dom.firstChild,
			   innerHTML: o.title
		     });
			 c.dom.onclick=function(){
			 	me.active(this)
				me._atived(this.id,this.innerHTML)
			 }
			 if(i==this.activeTab){
			 	c.addClass("tab_selected_title")
			 }else{
			 	c.addClass("tab_not_selected_title")
			 }
			 c.addClass("Form-title")
			 var c= Ux.createDom({
			   tagtype:'li',
			   el:this.panel_list.dom.firstChild,
			   cls: "tab_selected_panel"
		     });
			 if(i!=this.activeTab){
			 	c.dom.style.display="none"
			 }
			 o.single=true
			 o.ownerCt = this
			 o.renderTo=c
			 new Ux.ui.Form(o)
		}
	},
	render:function(el){
		this.fire('render')
		var c = this.getConfig()
		var p = new Ux.ui.Component(c)
		p.render(el)
		this.el = p.getEl()
		this.title_list = Ux.createDom({
			wdith:c.width,
			el:p.getEl(),
			cls:"tab_title"
		});
		c = Ux.createDom({
			tagtype:'ul',
			width:c.width,
			el:this.title_list,
			cls:"tab_ul_title"
		});
		this.panel_list = Ux.createDom({
			wdith:c.width,
			el:p.getEl()
		});
	   c = Ux.createDom({
			tagtype:'ul',
			el:this.panel_list,
			cls:"tab_ul_panel"
		});
	   this.renderItems(this.el)
	   this.fire('rendered')
	}
})
Ux.reg('tabpanel',Ux.ui.tabPanel)

/*
 * ------------------------------------------------------------------>field<-------------------------------
 */

Ux.makePackage('Ux.ui.Field')
Ux.ui.Field=Ux.extend(Ux.ui.Component,{
    xtype:'field',
	disabledCls:'Field-disabled',
	fouceCls:'Field-fouce',
	errCls:'Field-err',
	allBlank:true,
	emptyMsg:'此项为必填项！',
	fieldLabel:'',
	defaultValue:'',
	showErr:function(err){
		this.msgel.innerHTML = err
	},
	render:function(el){
		this.el  = Ux.createDom({
			el:el
		})
	    Ux.createDom({
			el:this.el
		})
		this.msgel = Ux.createDom({
			el:this.el,
			cls:'hide'
		})
	}
})
Ux.reg('field',Ux.ui.Field)

Ux.ui.Textfield=Ux.extend(Ux.ui.Field,{
      xtype:'textfield',
      render:function(dom){
           this.superclass
      }
})
Ux.reg('textfield',Ux.ui.Textfield)
/* 
 * ------------------------------------------------------------------> data <-------------------------------
 */
Ux.makePackages('Ux.data.JSON')
Ux.data.JSON.prototype={
	decode:function(o){
		   /*
		    * eval ("(" + o + ")") 和  eval(o) 是一样的效果 ，不过带()更加安全。
		    */
		return eval("(" + o + ")")
	}
}

