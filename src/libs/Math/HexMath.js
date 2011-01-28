/*
 *
 *  Hex Math  library
 *  author: darrel
 *  msn/mail: xdarui@xdarui.com
 */
(function(ux){
	if(!ux){ ux = window.Ux = {}}
	var check = function(hex){
		if(!(/^(\d|[a-f])+$/i).test(hex)){
			throw hex + "Not a Hex Number !";
			return false;
		}else{
			return true;
 		}
	}
	var toInt = function(Hex){
		return parseInt(Hex,16);
	}
	var toHex = function(Num){
		return parseInt(Num).toString(16);
	}
	ux.HexMath = {
		add:function(a,b){
			if(check(a) && check(b)){
				return toHex(toInt(a) + toInt(b));	
			}		
		},
		sbt:function(a,b){
			if(check(a) && check(b)){
				return toHex(toInt(a) - toInt(b));
			}
		},
		mul:function(a,b){
			if(check(a) && check(b)){
				return toHex(toInt(a) * toInt(b));
			}
		},
		div:function(a,b){
			if(check(a) && check(b)){
				return toHex(toInt(a) / toInt(b));
			}
		},
		mod:function(a,b){
			if(check(a) && check(b)){
				return toHex(toInt(a) % toInt(b));

			}
		}
	}
})(window.Ux);
