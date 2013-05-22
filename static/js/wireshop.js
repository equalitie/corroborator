
var wireshop=wireshop||{};(function(wireshop){var self=wireshop
wireshop.__VERSION__='0.5.1';wireshop.$=jQuery.noConflict()
wireshop.USERS_COUNT=43
wireshop.ITEMS_COUNT=82
wireshop.Generator=undefined
wireshop.RendezVous=extend.Class({name:'wireshop.RendezVous',parent:undefined,properties:{expected:undefined,participants:undefined,meetCallbacks:undefined},initialize:function(expected){var self=this
expected=expected===undefined?0:expected
if(typeof(self.expected)=='undefined'){self.expected=0};if(typeof(self.participants)=='undefined'){self.participants=[]};if(typeof(self.meetCallbacks)=='undefined'){self.meetCallbacks=[]};self.expected=expected;},methods:{join:function(participant){var self=this
participant=participant===undefined?null:participant
self.participants.push(participant)
if((self.participants.length==self.expected))
{extend.iterate(self.meetCallbacks,function(c){c(self)},self)}},onMeet:function(callback){var self=this
self.meetCallbacks.push(callback)
if((self.participants.length==self.expected))
{extend.iterate(self.meetCallbacks,function(c){c(self)},self)}}}})
wireshop.loadCss=function(cssUrl){var self=wireshop;wireshop.$(head)[0].appendChild(html.link({'type':'text/css','rel':'stylesheet','href':cssUrl,'media':'screen'}))}
wireshop.extract=function(pageUrl,selector,callback){var self=wireshop;var channel=new channels.AsyncChannel();var future=channel.get(pageUrl);future.onSet(function(v){var container=html.div();extend.iterate(wireshop.$(v),function(node){if((typeof(node)!=typeof('')))
{container.appendChild(node)}},self)
var classes=wireshop.$(selector).attr('class');var dest=callback(wireshop.$(selector,container),wireshop.$('.INCLUDE-ME',container).text());})}
wireshop.error=function(message){var self=wireshop;extend.print(('Wireshop/Error: '+message))}
wireshop.copyAttributes=function(fromSelector,toSelector){var self=wireshop;var attributes=wireshop.$(fromSelector)[0].attributes;extend.iterate(attributes,function(attr){if((attr.name=='class'))
{extend.iterate(attr.value.split(' '),function(c){wireshop.$(toSelector).addClass(c)},self)}
else if(true)
{wireshop.$(toSelector).attr(attr.name,attr.value)}},self)}
wireshop.pick=function(maximum){var self=wireshop;if(extend.isList(maximum))
{return maximum[wireshop.pick((maximum.length-1))]}
else if(extend.isMap(maximum))
{var keys=[];extend.iterate(maximum,function(_,k){keys.push(k)},self)
return maximum[wireshop.pick(keys)]}
else if(true)
{return Math.round((Math.random()*maximum))}}
wireshop.Wireshop=extend.Class({name:'wireshop.Wireshop',parent:undefined,shared:{READY:2,Instance:undefined,state:null,PROCESSING:1,Generator:undefined},properties:{includeRendezVous:undefined},initialize:function(){var self=this
if(typeof(self.includeRendezVous)=='undefined'){self.includeRendezVous=new wireshop.RendezVous()};self.getClass().Instance=self;},methods:{subset:function(fromPage,fromSelector,toSelector,method){var self=this
method=method===undefined?'append':method
if((fromPage===undefined))
{var attributes=wireshop.$(toSelector)[0].attributes;var res=wireshop.$(fromSelector).clone();extend.iterate(attributes,function(attr){if((attr.name=='class'))
{extend.iterate(attr.value.split(' '),function(c){wireshop.$(res).addClass(c)},self)}
else if(true)
{wireshop.$(res).attr(attr.name,attr.value)}},self)
wireshop.$(res).removeClass('REPLACE')
wireshop.$(res).attr('with',null)
wireshop.$(toSelector)[method](res)
self.includeRendezVous.join()}
else if(true)
{wireshop.extract((fromPage+'.html'),fromSelector,function(snippet,script){var code=(('function(){ '+(script||''))+'}');var result=wireshop.$(toSelector,document)[method](snippet);wireshop.$('body').bind('Wireshop/Phase2',function(){var code_function=function(){return eval((('('+code)+')'))}();})
window.setTimeout(function(){self.includeRendezVous.join()},0)
return result})}},process:function(){var self=this
self.processAPPLY()
self.processREPLACE()
wireshop.$('body').bind('Wireshop/Phase1',self.getMethod('process2'))
isProcessing=false;},process2:function(){var self=this
self.processREPEAT()
self.processFAKE()
self.processFILTER()
wireshop.$('body').trigger('Wireshop/Insert')
window.setTimeout(function(){wireshop.$('body').trigger('Wireshop/Phase2')},10)
window.setTimeout(function(){wireshop.$('body').trigger('Wireshop/Ready')
wireshop.$('.NOT_IMPLEMENTED').click(function(){alert('Not implemented yet !')
return false})},10)},processAPPLY:function(){var self=this
extend.iterate(wireshop.$('.APPLY'),function(p){wireshop.$(p).removeClass('APPLY')
var selectors=wireshop.$(p).attr('template').split('|');var count=(parseInt(wireshop.$(p).attr('count'))||1);while((count>0))
{var selector=wireshop.pick(selectors);if((wireshop.$(selector).length==0))
{extend.error(('Template not found:'+selector))}
else if(true)
{var clone=wireshop.$(wireshop.pick(wireshop.$(selector))).clone();if(wireshop.$(p).hasClass('FAKE'))
{wireshop.$(clone).addClass('FAKE')
wireshop.$(clone).attr('fake',wireshop.$(p).attr('fake'))}
wireshop.copyAttributes(p,clone)
wireshop.$(clone).removeClass('APPLY')
wireshop.$(clone).attr({'count':null,'template':null})
wireshop.$(p).after(clone)}
count=(count-1);}
wireshop.$(p).remove()},self)
if((wireshop.$('.APPLY').length>0))
{self.processAPPLY()}},setupREPLACE:function(){var self=this
var to_replace=wireshop.$('.REPLACE');self.includeRendezVous.expected=to_replace.length;self.includeRendezVous.onMeet(function(){window.setTimeout(function(){wireshop.$('body').trigger('Wireshop/Phase1')},10)})
return to_replace},processREPLACE:function(){var self=this
var to_replace=self.setupREPLACE();extend.iterate(to_replace,function(p){var from=wireshop.$(p).attr('with');var sep=from.lastIndexOf('/');if((sep==-1))
{self.subset(undefined,from,p,'replaceWith')}
else if(true)
{self.subset(extend.slice(from,0,sep),extend.slice(from,(sep+1),from.length),p,'replaceWith')}},self)
return to_replace.length},processREPEAT:function(){var self=this
var to_repeat=wireshop.$('.REPEAT');extend.iterate(to_repeat,function(p){var count=parseInt(wireshop.$(p).attr('count'));extend.iterate(extend.range(0,((count-1))),function(){var clone=wireshop.$(p).clone();wireshop.$(clone).removeAttr('count').removeClass('REPEAT')
wireshop.$(p).after(clone)},self)},self)
return to_repeat.length},processFAKE:function(){var self=this
var to_fake=wireshop.$('.FAKE');extend.iterate(to_fake,function(p){if(wireshop.$(p).attr('fake'))
{var to_fake=wireshop.$(p).attr('fake').split(':');if((!self.getClass().Generator))
{extend.error('No generator set')}
extend.iterate(to_fake,function(what){if(self.getClass().Generator.canFake(what))
{self.getClass().Generator.fake(what,p)}
else if(true)
{extend.error(('No generator for fake type:'+what))}},self)
wireshop.$(p).removeClass('FAKE').addClass('faked').removeAttr('fake')}},self)
return to_fake.length},processFILTER:function(){var self=this
var to_filter=wireshop.$('.FILTER');extend.iterate(to_filter,function(p){var to_filter=wireshop.$(p).attr('filter').split(':');filters={'shorten':function(n){var text=wireshop.$(n).text();var l=Math.min(50,text.length);var text=text.substring(0,l);wireshop.$(n).html(text)}};extend.iterate(to_filter,function(what){if((filters[what]===undefined))
{extend.error(('No generator for filter type:'+what))}
else if(true)
{filters[what](p)}},self)
wireshop.$(p).removeClass('FILTER').addClass('faked').removeAttr('filter')},self)
return to_filter.length}}})
wireshop.linkToPage=function(selector,page){var self=wireshop;wireshop.$(selector).click(function(){window.location=(''+page);return false})}
wireshop.setState=function(state,ui){var self=wireshop;ui=ui===undefined?wireshop.$('body'):ui
var ui=wireshop.$(ui);wireshop.$(('.when-'+state),ui).removeClass('hidden')
wireshop.$(('.when-no_'+state),ui).addClass('hidden')
wireshop.$(('.when-not_'+state),ui).addClass('hidden')
wireshop.$(ui).addClass(('is-'+state))}
wireshop.unsetState=function(state,ui){var self=wireshop;ui=ui===undefined?wireshop.$('body'):ui
wireshop.$(('.when-'+state),ui).addClass('hidden')
wireshop.$(('.when-no_'+state),ui).removeClass('hidden')
wireshop.$(('.when-not_'+state),ui).removeClass('hidden')
wireshop.$(ui).removeClass(('is-'+state))}
wireshop.hasAnchor=function(name){var self=wireshop;return(wireshop.getAnchors[name]||false)}
wireshop.getAnchors=function(){var self=wireshop;var url=window.location.toString();var sep=url.indexOf('#');if((sep>=0))
{var res={};extend.iterate(extend.slice(url,(sep+1),url.length).split(),function(key){res[key]=true;},self)
return res}
else if(true)
{return{}}}
wireshop.ready=function(callback){var self=wireshop;wireshop.onReady(callback)}
wireshop.onReady=function(callback){var self=wireshop;wireshop.$('body').bind('Wireshop/Ready',callback)}
wireshop.init=function(){var self=wireshop;wireshop.$(document).ready(function(){new wireshop.Wireshop().process()})}
if(typeof(wireshop.init)!="undefined"){wireshop.init();}})(wireshop);