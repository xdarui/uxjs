Ux.ui.Panel=Ux.extend(Ux.ui.Form,{
	xtype:'panel',
	buttons:[],
	buttonAlign:'right',
	render:function(dom){
		var c = this.getConfig();
		var f = new Ux.ui.Form(c);
		f.render(dom)
		this.el = f.getEl();
		this.renderItems(this.getBody())
		var b = new Ux.ui.Component({
			renderTo:this.el
		})
		b.addClass('Form-buttom align-' + this.buttonAlign)
		
		for(var btn,i=0;btn=this.buttons[i++];){
			btn.renderTo = b.getEl()
			new Ux.ui.Button(btn)
		}
		
	}
})
Ux.reg('panel',Ux.ui.Panel)