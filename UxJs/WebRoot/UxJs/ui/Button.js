Ux.ui.Button=Ux.extend(Ux.ui.Component,{
	xtype:'button',
	render:function(dom){
		this.el = Ux.createDom({
			dom:dom,
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