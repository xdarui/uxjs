(function(Ux){
  if(!Ux){
       Ux = window.Ux = {};
   }
 //浮点数相加
  Ux.FloatMath = {
     pow:function( arg1 , arg2 ){
         if( arg2 >= 0 ){
            return Math.pow( arg1 , arg2 );
         }else{
            return Ux.FloatMath.div( 1 , Math.pow( arg1 , Math.abs( arg2 ) ) );
         }
     },
     add:function(arg1,arg2){
          var r1,r2,m;
          try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
          try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
          m=Math.pow(10,Math.max(r1,r2));
          return (Ux.FloatMath.mul(arg1,m)+Ux.FloatMath.mul(arg2,m))/m;
    },
  //浮点数相减
    sbt:function(arg1,arg2){
     return Ux.FloatMath.add(arg1,-arg2);
    },

 //浮点数相乘
    mul:function(arg1,arg2){
     var m=0,s1=arg1.toString(),s2=arg2.toString();
         try{m+=s1.split(".")[1].length}catch(e){};
         try{m+=s2.split(".")[1].length}catch(e){}
      return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
   },

 //浮点数除
   div:function(arg1,arg2){
      return Ux.FloatMath.mul(arg1,1/arg2);
   }
 }
}(window.Ux));
