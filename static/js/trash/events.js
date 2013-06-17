
var events=events||{};(function(events){var self=events
events.__VERSION__='0.9.4';events.ExceptionHandler=function(e){extend.print(('eventbus.ExceptionHandler: '+e))
throw e}
events.Event=extend.Class({name:'events.Event',parent:undefined,properties:{name:undefined,data:undefined,source:undefined},initialize:function(name,data,source){var self=this
source=source===undefined?undefined:source
if(typeof(self.name)=='undefined'){self.name=undefined};if(typeof(self.data)=='undefined'){self.data=undefined};if(typeof(self.source)=='undefined'){self.source=undefined};self.name=name;self.data=data;self.source=source;},methods:{clone:function(data){var self=this
return new events.Event(self.name,data,self.source)}}})
events.EventSource=extend.Class({name:'events.EventSource',parent:undefined,properties:{name:undefined,handlers:undefined,triggerCount:undefined,_isTriggering:undefined,_toUnbind:undefined},initialize:function(name){var self=this
name=name===undefined?undefined:name
if(typeof(self.handlers)=='undefined'){self.handlers=undefined};if(typeof(self.triggerCount)=='undefined'){self.triggerCount=0};if(typeof(self._isTriggering)=='undefined'){self._isTriggering=false};if(typeof(self._toUnbind)=='undefined'){self._toUnbind=[]};self.name=name;},methods:{getTriggerCount:function(){var self=this
return self.triggerCount},bind:function(callback,order){var self=this
order=order===undefined?-1:order
if((!self.handlers))
{self.handlers=[];}
while((self.handlers.length<(order+1)))
{self.handlers.push(undefined)}
if((order==-1))
{self.handlers.splice(0,0,callback)}
else if(true)
{if(extend.isDefined(self.handlers[order]))
{self.handlers.splice(order,0,callback)}
else if(true)
{self.handlers[order]=callback;}}},bindOnce:function(callback,order){var self=this
order=order===undefined?-1:order
var callback_wrapper=function(data,event,eventSource,callbackWrapper){var res=callback(data,event,eventSource,callback);eventSource.unbind(callbackWrapper)
return res};self.bind(callback_wrapper,order)},forwardTo:function(source,order){var self=this
order=order===undefined?-1:order
return self.bind(source.getMethod('_forwardCallback'),order)},clear:function(){var self=this
self.handlers=undefined;return self},unbind:function(callback){var self=this
if(self._isTriggering)
{self._toUnbind.push(callback)}
else if(true)
{if(self.handlers)
{var index=-1;extend.iterate(self.handlers,function(c,i){if((c==callback))
{index=i;}},self)
if((index>=0))
{self.handlers.splice(index,1)}
else if(true)
{extend.assert((index>=0),'Callback not found in event source')}}}},trigger:function(data,source){var self=this
source=source===undefined?undefined:source
return self.triggerWithEvent(new events.Event(self.name,data,source))},_forwardCallback:function(eventData,event,source,handler){var self=this
return self.triggerWithEvent(event)},triggerWithEvent:function(event){var self=this
if((!self._isTriggering))
{self._isTriggering=true;extend.assert(((self.name=='*')||(event.name==self.name)),((('EventSource.name and given Event.name do not match: '+self.name)+' != ')+event.name))
var data=event.data;extend.iterate(self.handlers,function(h){if(extend.isDefined(h))
{try{h(event.data,event,self,h)}
catch(e){events.ExceptionHandler(e)}}},self)
self._isTriggering=false;while((self._toUnbind.length>0))
{self.unbind(self._toUnbind.pop())}
self.triggerCount=(self.triggerCount+1);}}}})
events.EventStream=extend.Class({name:'events.EventStream',parent:undefined,properties:{RETRY_DELAY:undefined,MAX_RETRIES:undefined,channel:undefined,url:undefined,sources:undefined,errorCount:undefined,onError:undefined,onFailure:undefined,onClose:undefined,isConnected:undefined,isOpen:undefined,_currentFuture:undefined,_lastPosition:undefined},initialize:function(iteratorURL){var self=this
if(typeof(self.RETRY_DELAY)=='undefined'){self.RETRY_DELAY=[2000,3000,4000,5000]};if(typeof(self.MAX_RETRIES)=='undefined'){self.MAX_RETRIES=5};if(typeof(self.channel)=='undefined'){self.channel=new channels.AsyncChannel()};if(typeof(self.sources)=='undefined'){self.sources={}};if(typeof(self.errorCount)=='undefined'){self.errorCount=0};if(typeof(self.onError)=='undefined'){self.onError=function(_){}};if(typeof(self.onFailure)=='undefined'){self.onFailure=function(_){}};if(typeof(self.onClose)=='undefined'){self.onClose=function(_){}};if(typeof(self.isConnected)=='undefined'){self.isConnected=false};if(typeof(self.isOpen)=='undefined'){self.isOpen=false};if(typeof(self._currentFuture)=='undefined'){self._currentFuture=undefined};if(typeof(self._lastPosition)=='undefined'){self._lastPosition=undefined};self.url=iteratorURL;},methods:{bindEvents:function(events){var self=this
extend.iterate(events,function(e){e.bus=this;},self)
return events},start:function(position){var self=this
position=position===undefined?undefined:position
if(((!self.isOpen)&&self.url))
{self.isOpen=true;self.readFromIterator(position)}},on:function(eventName){var self=this
if(extend.isString(eventName))
{if((self.sources[eventName]===undefined))
{self.sources[eventName]=new events.EventSource(eventName);}
extend.assert((self.sources[eventName].name==eventName))
return self.sources[eventName]}
else if(true)
{return self.on(eventName.name)}},reconnect:function(){var self=this
if((!self.isConnected))
{self.errorCount=0;self.readFromIterator(self._lastPosition)}},stop:function(){var self=this
self.isOpen=false;self._currentFuture.cancel()},dispatchEvent:function(event){var self=this
var matches=0;if(extend.isDefined(self.sources[event.name]))
{var callback=self.sources[event.name];try{callback.trigger(event)}
catch(e){events.ExceptionHandler(e)}
matches=(matches+1);}
if(extend.isDefined(self.sources['*']))
{var callback=self.sources['*'];try{callback.trigger(event)}
catch(e){events.ExceptionHandler(e)}
matches=(matches+1);}
return matches},trigger:function(event){var self=this
window.setTimeout(function(){self.dispatchEvent(event)},0)},readFromIterator:function(iteratorPosition){var self=this
iteratorPosition=iteratorPosition===undefined?undefined:iteratorPosition
self.isConnected=true;var bus_url=self.url;iteratorPosition=parseInt(iteratorPosition);iteratorPosition=Math.max(0,iteratorPosition);if(isNaN(iteratorPosition))
{iteratorPosition=undefined;}
if(((iteratorPosition!=undefined)&&((''+iteratorPosition)!='[object]')))
{bus_url=(bus_url+('/'+iteratorPosition));}
var future=self.channel.get(bus_url).onSucceed(function(result){self.isConnected=true;self.errorCount=0;extend.iterate(result.value,function(received_event){if((received_event=='EOF'))
{self.isOpen=false;self.onClose()}
else if(true)
{self.dispatchEvent(received_event)}},self)
if(self.isOpen)
{if((result.position===undefined))
{self._lastPosition=iteratorPosition;self.readFromIterator(iteratorPosition)}
else if(true)
{self._lastPosition=(result.position||iteratorPosition);self.readFromIterator((result.position||iteratorPosition))}}}).onFail(function(){var retry_delay=(self.RETRY_DELAY[self.errorCount]||self.RETRY_DELAY[(self.RETRY_DELAY.length-1)]);self.isConnected=false;self.errorCount=(self.errorCount+1);self.onError(self)
if((self.MAX_RETRIES==-1))
{window.setTimeout(function(){self.readFromIterator((iteratorPosition||0))},retry_delay)}
else if((self.isOpen&&(self.errorCount<self.MAX_RETRIES)))
{window.setTimeout(function(){self.readFromIterator((iteratorPosition||0))},retry_delay)}
else if(true)
{self.onFailure(self)}});self._currentFuture=future;return future}}})
events.EventLogApplet=extend.Class({name:'events.EventLogApplet',parent:undefined,properties:{ui:undefined,bus:undefined,ACTIONS:undefined},initialize:function(bus,selector){var self=this
selector=selector===undefined?'.EventStream':selector
if(typeof(self.ACTIONS)=='undefined'){self.ACTIONS=[]};self.bus=bus;self.ui=$(selector);if((self.ui.length==0))
{var ui_html=undefined;ui_html=html.div({'class':'EventStream w-applet'},html.div({'class':'header w-applet-header'},html.div({'class':'title'},'Event Bus\n')),html.div({'class':'body'},html.ul({'class':'events nolist'},html.li({'class':'hidden'},'&uarr; events\n'))),html.div({'class':'templates hidden'},html.ul(html.li({'class':'event'},html.div({'class':'eventName'},'\n',html.span({'class':'out-name'},'NAME'),'\n',html.span({'class':'out-sourceID'},'SOURCE_ID'),'\n'),html.div({'class':'eventDetails'},html.div({'class':'body'},html.table({'width':'100%','cellpadding':'0','cellspacing':'0'},html.tr({'class':'id'},html.th('ID\n'),html.td(html.div({'class':'out-id'},'ID'),'\n')),html.tr({'class':'name'},html.th('NM\n'),html.td(html.div({'class':'out-name'},'NAME'),'\n')),html.tr({'class':'meta'},html.th('MT\n'),html.td(html.pre({'class':'out-meta'},'META'),'\n')),html.tr({'class':'source'},html.th('SR\n'),html.td(html.pre({'class':'out-source'},'SOURCE'),'\n')),html.tr({'class':'dest'},html.th('DS\n'),html.td(html.pre({'class':'out-dest'},'DEST'),'\n')),html.tr({'class':'data'},html.th('DT\n'),html.td(html.pre({'class':'out-data'},'DATA'),'\n')))))))))
$('body').append(ui_html)
self.ui=$(ui_html);}
self.bindUI()},methods:{bindUI:function(){var self=this
extend.assert(self.bus,'EventLogApplet needs an EventStream to work')
extend.iterate(self.ACTIONS,function(c){actions[c]=$(('.do-'+c),self.ui).click(self.getMethod(c));},self)
$('.header',self.ui).dblclick(function(){$('.events',self.ui).slideToggle()})
self.bus.on('*').bind(function(e,s){self.addEvent(e,s)})
self.addEvent({'name':'EventLogApplet initialized'})},addEvent:function(event,source){var self=this
var view=$('.templates .event',self.ui).clone();$('.out-name',view).html((''+event.name))
$('.out-id',view).html('')
$('.out-sourceID',view).html('')
$('.out-dest',view).html('')
$('.out-meta',view).html('')
$('.out-data',view).html((''+event.data))
$(view).click(function(){$(view).toggleClass('expanded')})
$('.events',self.ui).prepend(view)}}})
events.create=function(sourcesList){var self=events;var sources={};extend.iterate(sourcesList,function(source){sources[source]=new events.EventSource(source);},self)
return sources}
events.init=function(){var self=events;}
if(typeof(events.init)!="undefined"){events.init();}})(events);
