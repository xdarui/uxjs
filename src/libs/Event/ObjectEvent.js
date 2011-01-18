/*
 * Object Event Driver
 * author:darrel
 * msn:xdarui@xdarui.com
 */
(function(ux){
   if(!ux){  ux = window.Ux = {};}
   if(!ux.Event){ ux.Event = {}  };
   ux.Event.ObjectEvent = function(obj){
     /*   if( obj ){
             this.bind(obj);
        }*/
      var evlist = {};
      return {
          bind:function(obj){
               if( obj ){
                    this.target = obj;
                    obj.EventManager = this;
               }else{
                    this.target = this;
                 }
              if(obj && obj.events){
                   var evs = obj.events;
                   for(var o in evs){
                         this.on(o,evs[o]);
                  }
               }
           },
          on:function(e,f){
               if(evlist[e]){
                   evlist[e].push(f);
                }else{
                   evlist[e] = [f];
                }
           },
         fire:function(e,callback,each){
 		var es = evlist[e];
                if(es){
                    for(var i=0;i<es.length;i++){
                           var fun = es[i] || function(){};
                           fun.call(this.target);
                           if(each && callback){ callback.call(this.target); }
                       }
                     if(!each){ if(callback){ callback.call(this.target); }  }
                  }else{
                       if(callback){ callback.call(this.target); }
                   }
             
           },
        un:function(e,callback){
             if( evlist[e] ){
                    delete evlist[e];
               }
             if( callback ){ callback.call(this.target); }
          }
         
       }
   }
 })(window.Ux);
