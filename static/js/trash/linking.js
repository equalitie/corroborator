
var linking=linking||{};(function(linking){var self=linking
linking.__VERSION__='0.6.1';linking.PATH_KEY='__path__'
linking.$=jQuery
linking.State=extend.Class({name:'linking.State',parent:undefined,properties:{onStateChanged:undefined,onStateUpdated:undefined,currentState:undefined,_delayedUpdate:undefined},initialize:function(){var self=this
if(typeof(self.onStateChanged)=='undefined'){self.onStateChanged=new events.EventSource('state.changed')};if(typeof(self.onStateUpdated)=='undefined'){self.onStateUpdated=new events.EventSource('state.updated')};if(typeof(self.currentState)=='undefined'){self.currentState={}};if(typeof(self._delayedUpdate)=='undefined'){self._delayedUpdate={}};},methods:{bind:function(changedCallback,updatedCallback){var self=this
updatedCallback=updatedCallback===undefined?null:updatedCallback
self.onStateChanged.bind(changedCallback)
if(updatedCallback)
{self.onStateUpdated.bind(updatedCallback)}
changedCallback(self.getInitialEvent())},enableLinks:function(ui){var self=this
linking.enableLinks(self,ui)},get:function(key){var self=this
key=key===undefined?undefined:key
if(extend.isDefined(key))
{return self.currentState[key]}
else if(true)
{return self.currentState}},getValues:function(){var self=this
return self.get()},getPath:function(){var self=this
return self.get(linking.PATH_KEY)},setPath:function(value){var self=this
return self.update(linking.PATH_KEY,value)},setDefaults:function(defaults){var self=this
extend.iterate(defaults,function(v,k){if((!extend.isDefined(self.currentState[k])))
{self.currentState[k]=v;}},self)},remove:function(keys){var self=this
var result={};var removed=[];var count=0;if(extend.isString(keys))
{keys=extend.createMapFromItems([keys,true]);}
else if(extend.isList(keys))
{var k={};extend.iterate(keys,function(_){k[_]=true;},self)
keys=k;}
extend.iterate(self.currentState,function(v,k){if(extend.isDefined(keys[k]))
{removed.push(k)}
else if(true)
{result[k]=(''+v);count=(count+1);}},self)
self.currentState=result;return self._applyStateUpdate({'values':self.currentState,'added':[],'removed':removed,'updated':[],'count':count})},update:function(values,v){var self=this
if(extend.isString(values))
{return self.update(extend.createMapFromItems([values,v]))}
var updated=[];var added=[];var existing=[];var count=0;extend.iterate(self.currentState,function(v,k){existing.push(k)
count=(count+1);},self)
extend.iterate(values,function(v,k){var index=extend.find(existing,k);if((existing==-1))
{added.push(k)
self.currentState[k]=(''+v);count=(count+1);}
else if(true)
{if((values[k]!=self.currentState[k]))
{updated.push(k)
self.currentState[k]=values[k];}}},self)
return self._applyStateUpdate({'values':self.currentState,'added':added,'removed':[],'updated':updated,'count':count})},set:function(values,v){var self=this
if(extend.isString(values))
{if(extend.isDefined(v))
{return self.set(extend.createMapFromItems([values,v]))}
else if(true)
{return self.setPath(values)}}
var added=[];var updated=[];var new_state={};var existing=[];var count=0;extend.iterate(self.currentState,function(v,k){existing.push(k)},self)
extend.iterate(values,function(v,k){var index=extend.find(existing,k);if((existing==-1))
{added.push(k)
new_state[k]=(''+v);}
else if(true)
{if((values[k]!=self.currentState[k]))
{updated.push(k)}
new_state[k]=values[k];existing.splice(index,1)}
count=(count+1);},self)
self.currentState=new_state;return self._applyStateUpdate({'values':new_state,'added':added,'removed':existing,'updated':updated,'count':count})},getInitialEvent:function(){var self=this
var values={};var added=[];extend.iterate(self.currentState,function(v,k){values[k]=v;added.push(k)},self)
return self._applyStateUpdate({'values':values,'added':added,'removed':[],'updated':[],'count':added.length},false)},delayUpdate:function(){var self=this
self._delayedUpdate=(delayedUpdate||{'added':{},'updated':{},'removed':{},'values':{}});},applyUpdate:function(){var self=this
if(self._delayedUpdate)
{self._applyStateUpdate(self._delayedUpdate)}
self._delayedUpdate=undefined;},_applyStateUpdate:function(update,trigger){var self=this
trigger=trigger===undefined?true:trigger
if((((update.added.length+update.updated.length)+update.removed.length)>0))
{var has_changed=(((update.added.length+update.removed.length)+update.updated.length)!=0);var added_dict={};var updated_dict={};var removed_dict={};var changed_dict={};extend.iterate(update.added,function(_){added_dict[_]=true;changed_dict[_]=true;},self)
extend.iterate(update.updated,function(_){updated_dict[_]=true;changed_dict[_]=true;},self)
extend.iterate(update.removed,function(_){removed_dict[_]=true;changed_dict[_]=true;},self)
update.added=added_dict;update.updated=updated_dict;update.changed=changed_dict;update.removed=removed_dict;if(trigger)
{self.onStateUpdated.trigger(update,self)
if(has_changed)
{self.onStateChanged.trigger(update,self)}}
return update}
else if(true)
{return false}},fromString:function(text){var self=this
return self.getClass().FromString(text)},asString:function(){var self=this
return self.getClass().AsString(self.currentState)}},operations:{FromString:function(url,pathSep,itemSep,valueSep){var self=this;pathSep=pathSep===undefined?'?':pathSep
itemSep=itemSep===undefined?'&':itemSep
valueSep=valueSep===undefined?'=':valueSep
res={};var path_sep_i=url.indexOf(pathSep);if((path_sep_i==-1))
{res[linking.PATH_KEY]=url;}
else if(true)
{res[linking.PATH_KEY]=extend.slice(url,0,path_sep_i);url=extend.slice(url,(path_sep_i+1),undefined);extend.iterate(url.split('&'),function(key_value){var equal=key_value.indexOf('=');if((equal!=-1))
{var key=decodeURIComponent(extend.slice(key_value,0,equal));var value=decodeURIComponent(extend.slice(key_value,(equal+1),undefined));res[key]=value;}
else if(true)
{var key=decodeURIComponent(key_value);res[key]='';}},self)}
return res},AsString:function(values,pathSep,itemSep,valueSep){var self=this;pathSep=pathSep===undefined?'?':pathSep
itemSep=itemSep===undefined?'&':itemSep
valueSep=valueSep===undefined?'=':valueSep
var result=undefined;var path='';var rest=[];extend.iterate(values,function(value,key){if((key==linking.PATH_KEY))
{path=value;}
else if(true)
{if(value)
{var r=((encodeURIComponent(key)+valueSep)+encodeURIComponent(value));rest.push(r)}}},self)
rest=rest.join(itemSep);if(((path.length>0)&&(rest.length>0)))
{return((path+pathSep)+rest)}
else if(((path.length==0)&&(rest.length>0)))
{return(pathSep+rest)}
else if(((path.length>0)&&(rest.length==0)))
{return path}
else if(true)
{return''}}}})
linking.URLState=extend.Class({name:'linking.URLState',parent:linking.State,shared:{Instance:null,MODE_HTML5_HISTORY:'html5-history',MODE_HASHCHANGE:'hashchange'},properties:{mode:undefined,prefix:undefined},initialize:function(prefix){var self=this
prefix=prefix===undefined?'':prefix
self.getSuper(linking.URLState.getParent())()
self.onStateChanged.bind(self.getMethod('_doStateChanged'))
if((extend.isDefined(window.history)&&extend.isDefined(window.history.pushState)))
{self.mode=self.getClass().MODE_HTML5_HISTORY;linking.$(window).bind('popstate',function(event){self._onURLHashChanged(event)})}
else if(true)
{self.mode=self.getClass().MODE_HASHCHANGE;linking.$(window).on('hashchange',function(event){self._onURLHashChanged(event)})}
self._onURLHashChanged()},methods:{_onURLHashChanged:function(event){var self=this
var part=((document.location.pathname+document.location.search)+document.location.hash);if((part.indexOf(self.prefix)==0))
{part=extend.slice(part,self.prefix.length,undefined);}
self.set(self.fromString(part))},getPath:function(){var self=this
return self.get(linking.PATH_KEY)},setPath:function(value){var self=this
var res=self.update(linking.PATH_KEY,value);return res},setDefaults:function(defaults){var self=this
self.getSuper(linking.URLState.getParent()).setDefaults(defaults)
self._doStateChanged()},getLocation:function(){var self=this
return document.location},_doStateChanged:function(event){var self=this
if((self.mode==self.getClass().MODE_HTML5_HISTORY))
{window.history.pushState(self.get(),'Update',self.getURL())}
else if(true)
{var current_href=self.getLocation().href;var new_href=self.getURL();if((current_href!=new_href))
{self.getLocation().href=new_href;}}},getURL:function(){var self=this
var res=self.asString();return res}},operations:{Set:function(value){var self=this;return self.Install().set(value)},FromString:function(url,pathSep,itemSep,valueSep){return linking.State.FromString.apply(linking.URLState,arguments);},AsString:function(values,pathSep,itemSep,valueSep){return linking.State.AsString.apply(linking.URLState,arguments);},Install:function(){var self=this;if((!self.Instance))
{self.Instance=new linking.URLState();}
return self.Instance}}})
linking.URLHashState=extend.Class({name:'linking.URLHashState',parent:linking.URLState,initialize:function(){var self=this
if(true){var __super__=self.getSuper(linking.URLHashState.getParent());__super__.initialize.apply(__super__,arguments)}},methods:{_onURLHashChanged:function(event){var self=this
var hash=document.location.hash;var query=hash.indexOf('?');if((query!=-1))
{hash=extend.slice(hash,0,query);}
if((hash&&(hash[0]=='#')))
{hash=extend.slice(hash,1,undefined);}
self.set(self.fromString(hash))},_doStateChanged:function(event){var self=this
if((self.mode==self.getClass().MODE_HTML5_HISTORY))
{window.history.pushState(self.get(),'Update',self.getURL())}
else if(true)
{var current_href=self.getLocation().href;var new_href=self.getURL();if((current_href!=new_href))
{self.getLocation().href=new_href;}}},getURL:function(){var self=this
var hash=self.asString();var href=self.getLocation().href;var res=href;if((hash.length>0))
{var i=href.indexOf('#');if((i>0))
{res=((extend.slice(href,0,i)+'#')+hash);}
else if(true)
{res=((href+'#')+hash);}}
else if(true)
{var i=href.indexOf('#');if((i>0))
{res.href=extend.slice(href,0,(i+1));}}
return res}},operations:{FromString:function(url,pathSep,itemSep,valueSep){return linking.State.FromString.apply(linking.URLHashState,arguments);},Set:function(value){return linking.URLState.Set.apply(linking.URLHashState,arguments);},Install:function(){return linking.URLState.Install.apply(linking.URLHashState,arguments);},AsString:function(values,pathSep,itemSep,valueSep){return linking.State.AsString.apply(linking.URLHashState,arguments);}}})
linking._onLinkClicked=function(link,state){var self=linking;link=linking.$(link);var href=link.attr('href');if((href[0]=='#'))
{if(((href.length>1)&&(href[1]=='+')))
{state.update(state.fromString(extend.slice(href,2,undefined)))}
else if(((href.length>1)&&(href[1]=='-')))
{state.remove(state.fromString(extend.slice(href,2,undefined)))}
else if(true)
{state.set(state.fromString(extend.slice(href,1,undefined)))}
return false}
else if(true)
{return true}}
linking.enableLinks=function(state,context){var self=linking;context=context===undefined?null:context
extend.assert(((state&&state.isInstance)&&state.isInstance(linking.State)),'State must be an instance of linking.State')
var callback=function(event){event.preventDefault()
return linking._onLinkClicked(this,state)};if(linking.$(context).is('a.internal'))
{return linking.$(context).click(callback).length}
else if(true)
{return linking.$('a.internal',context).click(callback).length}}
linking.init=function(){var self=linking;}
if(typeof(linking.init)!="undefined"){linking.init();}})(linking);