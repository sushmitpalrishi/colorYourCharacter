(function(window) {

function ToggleClass(e){
    this.e = e;
    this.tabs = e.querySelectorAll('.p_tab');
    this.blocks = e.querySelectorAll('.tab-block > div');
    this._initevent();
}

 ToggleClass.prototype = {
     _initevent:function(){
         var self = this,
         initAction = function(e){
             e.stopPropagation();
             if(classie.has(this,'active')){
                 //do nothing
             }
             else if(!classie.has(this,'active')){
                 self.makeInactive();
                 classie.add(this,'active');
                 self.showblock(this);
             }
         }


         for (var i = 0; i < this.tabs.length; i++) {
             this.tabs[i].addEventListener('click', initAction, false);
             this.tabs[i].addEventListener('touchstart', initAction, false);
         }
        },
         showblock : function(_this){

             _class = _this.getAttribute('id');
             _element = document.querySelector('.'+_class);
             classie.add(_element,'show');
        },
        makeInactive: function(){
         for(var i=0; i < this.tabs.length; i ++){
             classie.remove(this.tabs[i],'active')
             classie.remove(this.blocks[i],'show')
         }
        }
 }
     window.ToggleClass = ToggleClass;

})(window);