
/*
 *  DOM事件处理模型
 */
Ux.lib.Event=function(el){
	this.el = el || Ux.getBody
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
 