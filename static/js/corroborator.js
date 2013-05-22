
corroborator=(function(){if(typeof(corroborator)!="undefined"){return corroborator};
var $=jQuery.noConflict();var layout={OPTIONS:{independentColumns:true,},UIS:{columns:".columns .col",overlayBody:".overlay > .body",},
init:function(){for(var k in layout.UIS){layout.UIS[k]=$(layout.UIS[k]);}
$(window).resize(layout.relayout);layout.relayout()},relayout:function(){var height=0;var bodies=[];layout.UIS.columns.each(function(){var header=$(this).find(">.header");var body=$(this).find(">.body");if(layout.OPTIONS.independentColumns){body.css("top",header.height());}else{bodies.push(body);height=Math.max(height,header.height());}});if(!layout.OPTIONS.independentColumns){bodies.map(function(v){v.css("top",height);});}
layout.UIS.overlayBody.each(function(){var ui=$(this);var footer=ui.next(".footer");if(footer.length>0){ui.css("bottom",footer[0].clientHeight)}});}}
var widgets={bindI18N:function(ui){ui=$(ui);
ui.find(".toggle > span").click(function(event){
event.stopPropagation();
ui.attr("lang",$(this).attr("lang"));});}}
return{widgets:widgets,layout:layout,init:function(){layout.init();$(".i18n").each(function(){widgets.bindI18N(this)});}}})();
