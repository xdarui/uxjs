/*
 * Dom Event Driver
 * author: Darrel
 * Msn : xdarui@xdarui.com
 */
(function(ux){
   if( !ux ){ ux = window.Ux = {} }
   if( !ux.Event ){ ux.Event = {} }
 
   ux.Event.DomEvent = function(dom){
   	this.dom = this.isDom(dom)?dom:dom.dom;
	if(!this.isDom(this.dom)){
		alert("Dom Error")
	}
   }
   ux.Event.DomEvent.prototype = {
        isDom:function(dom){
            if(!dom || dom.nodeType != 1){
                 return false;
             }
	    return true;
        },
	on:function(e,fun){
		var me = this;
		if( document.all ){
			return this.dom.attachEvent( "on" + e ,function(){ fun.call(me);} );
		}else{
			return this.dom.addEventListener(e,function(){ fun.call(me);},false);
		}
	},
	un:function(e,fun){
		if( document.all ){
			return this.dom.detachEvent( "on" + e,fun );
		}else{
			return this.dom.removeEventListener(e,fun,false );
		}
	},
	fire:function(e){
		if( document.createEventObject){
			var evt = document.createEventObject();
			return this.dom.fireEvent( 'on' + e , evt );
		}else{
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent(e,true,true);
			return !this.dom.dispatchEvent( evt );
		}
	},
	change:function(fun){
		var ev = document.all ?'input':'propertychange';
		var me = this;
		this.on(ev,function(){
			fun.call(me);
		});
			
	}
    }    
})(window.Ux)
