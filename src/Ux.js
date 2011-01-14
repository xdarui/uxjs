(function(window,undefined){
     Ux  = window.Ux = function( element , opt ){
          return new ux( element , opt );
      };
     Ux.merge = function(desc , obj ){
        if( desc instanceof Array ){
           desc = desc || [] ;
           for( var i=0; i < obj.length;i++ ){
               desc[i] = obj[i];
           }
        }else{
           for(var i  in obj){
                  desc[i] = obj[i];
           }
       }
      return desc;
   };
   var doc = document;
   String.prototype.trim = function(){
      return this.replace(/(^\s*)|(\s*$)/g,"");
   }
   Ux.merge(Ux,{
      version:'1.0.0.1',
      hasClass:function(cls){
         return (this.length==1) && ( new RegExp("(^|\\s)"+ cls +"($|\\s)","i").test(this.el.className) );
      },
      html:function(h){
      
        if(this.length==1){
           if(h){
               
               this.el.innerHTML = h;
               return this;
           }else{
               return this.el.innerHTML.trim();
           }
         }
         return this
      },
      css:function(a,v){
        if(this.length==1){
           if(v != undefined){
              this.el.style[a] = v;
              return this;
           }else{
              return this.el.style[a];
             }
         }
      },
      hide:function(){
         this.css('display','none');
         return this;
      },
      show:function(){
         this.css('display','');
         return this;
      },
      getById : function(o){
            return [].concat(doc.getElementById(o));
         },
      getByTagName : function(o){
            return [].concat(doc.getElementsByTagName(o));
         },
      getByClassName : function(o){
            if(!!doc.getElementsByClassName){
                return doc.getElementsByClassName(o);
             }else{
                var el = [];
                var elo = Ux.getByTagName("*");
                for(var i=0;i<elo.length;i++){
                    if(elo[i].className && new RegExp("(^|\\s)"+ cls +"($|\\s)","i").test(elo[i].className)){
                      el.push(elo[i])
                    }
                }
                return el;
             }
       }
     
   });
   
    var ux = function(e,o){
         var el,
             len,get,
             reg = /(#|\.|~|^)?(\w+)/i;
             var op = reg.exec(e);
             if(op[1] == '#'){
                get = Ux.getById;
             }else if( op[1] == '.'){
                get = Ux.getByClassName;
             }else if( op[1] == undefined ){
                get = Ux.getByTagName;
             }
         
         el = get(op[2]);
         len = el.length;
         if(el.length == 1){
            el = el[0];
            len=1;
         }
        return Ux.merge({
                el:el,
                length:len
             },Ux);
     }
 }(window));
