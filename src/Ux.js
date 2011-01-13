(function(window,undefined){
   var Ux = function( element , opt ){
          return Ux.$( element , opt );
      };
   Ux.merge = function(desc , obj ){
        if( desc instanceof Array ){
           desc = desc || [] ;
           for( var i=0; i < obj.length;i++ ){
               desc[i] = obj[i];
           }
        }else{
           for(var i  in obj){
               if( obj[i] instanceof Object ){
                     Ux.merge( desc[i] , obj[i] )
               }else{
                  desc[i] = obj[i];
               }
           }
       }
   };
   var selectReg = /^[#\.](\w+)(?:(\:)?(?:not)?\w+)?/ig;
   var doc = document;
   Ux.merge( Ux,{
         $:function( selector , opt ){
              
          },
         getById:function(o){
            return doc.getElementById(o);
         },
         getByTagName:function(o){
            return doc.getElementsByTagName(o);
         },
         getByClassName:function(o){
            if(!!doc.getElementsByClassName){
              return doc.getElementsByClassName(o);
            }else{
               
             }
         }
     });
 }(window));
