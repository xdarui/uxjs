Ux.ui.Form = Ux.extend(Ux.ui.Component,{
	title:'no title',
	border:true,
	xtype:'form',
	singel:false,
	getBody:function(){
		return this.single?this.el:this.getEl().firstChild.nextSibling;
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
		//this.getBody.
	}
})
Ux.reg('form',Ux.ui.Form)