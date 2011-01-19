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
	if(!isDom(this.Dom)){
		throw "Dom Error";
	}
   }
   ux.Event.prototype = {
        isDom:function(dom){
            if(!(/Object\sHTML/i).test(Object.prototype.toString.call(dom))){
                 return false;
             }
	    return true;
        },
	on:function(e,fun){
		if( document.all ){
			return this.dom.attachEvent( "on" + e , fun );
		}else{
			return this.dom.addEventListener(e,fun,false);
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
	}
    }    
})(window.Ux)
