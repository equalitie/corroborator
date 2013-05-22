
var extend=extend||{};(function(extend){var self=extend
extend.__VERSION__='2.3.21';extend.Counters={'Instances':0,'Classes':0}
extend.Class=function(declaration){var self=extend;var full_name=declaration.name;var class_object=function(){if((!((arguments.length==1)&&(arguments[0]=='__Extend_SubClass__'))))
{var properties=class_object.listProperties()
for(var prop in properties){this[prop]=properties[prop];}
if(this.initialize)
{return this.initialize.apply(this,arguments)}}};class_object.isClass=function(){return true};class_object._parent=declaration.parent;class_object._name=declaration.name;class_object._properties={'all':{},'inherited':{},'own':{}};class_object._shared={'all':{},'inherited':{},'own':{}};class_object._operations={'all':{},'inherited':{},'own':{},'fullname':{}};class_object._methods={'all':{},'inherited':{},'own':{},'fullname':{}};class_object.getName=function(){return class_object._name};class_object.getParent=function(){return class_object._parent};class_object.id=extend.Counters.Classes;extend.Counters.Classes=(extend.Counters.Classes+1);class_object.isSubclassOf=function(c){var parent=this;while(parent)
{if((parent==c))
{return true}
parent=parent.getParent();}
return false};class_object.hasInstance=function(o){return(extend.isDefined(o.getClass)&&o.getClass().isSubclassOf(class_object))};class_object.bindMethod=function(object,methodName){var this_method=object[methodName];return function(){var a=arguments;if((a.length==0))
{return this_method.call(object)}
else if((a.length==1))
{return this_method.call(object,a[0])}
else if((a.length==2))
{return this_method.call(object,a[0],a[1])}
else if((a.length==3))
{return this_method.call(object,a[0],a[1],a[2])}
else if((a.length==4))
{return this_method.call(object,a[0],a[1],a[2],a[3])}
else if((a.length==5))
{return this_method.call(object,a[0],a[1],a[2],a[3],a[4])}
else if(true)
{var args=[object].concat(arguments);return this_method.apply(object,args)}}};class_object.bindCallback=function(object,methodName){var this_method=object[methodName];return function(){var a=arguments;if((a.length==0))
{return this_method.call(object,this)}
else if((a.length==1))
{return this_method.call(object,a[0],this)}
else if((a.length==2))
{return this_method.call(object,a[0],a[1],this)}
else if((a.length==3))
{return this_method.call(object,a[0],a[1],a[2],this)}
else if((a.length==4))
{return this_method.call(object,a[0],a[1],a[2],a[3],this)}
else if((a.length==5))
{return this_method.call(object,a[0],a[1],a[2],a[3],a[4],this)}
else if(true)
{var args=[object].concat(arguments);return this_method.apply(object,args)}}};class_object.getOperation=function(name){var this_operation=class_object[name];return function(){return this_operation.apply(class_object,arguments)}};class_object.listMethods=function(o,i){if((o===undefined))
{o=true;}
if((i===undefined))
{i=true;}
if((o&&i))
{return class_object._methods.all}
else if(((!o)&&i))
{return class_object._methods.inherited}
else if((o&&(!i)))
{return class_object._methods.own}
else if(true)
{return{}}};class_object.listOperations=function(o,i){if((o===undefined))
{o=true;}
if((i===undefined))
{i=true;}
if((o&&i))
{return class_object._operations.all}
else if(((!o)&&i))
{return class_object._operations.inherited}
else if((o&&(!i)))
{return class_object._operations.own}
else if(true)
{return{}}};class_object.listShared=function(o,i){if((o===undefined))
{o=true;}
if((i===undefined))
{i=true;}
if((o&&i))
{return class_object._shared.all}
else if(((!o)&&i))
{return class_object._shared.inherited}
else if((o&&(!i)))
{return class_object._shared.own}
else if(true)
{return{}}};class_object.listProperties=function(o,i){if((o===undefined))
{o=true;}
if((i===undefined))
{i=true;}
if((o&&i))
{return class_object._properties.all}
else if(((!o)&&i))
{return class_object._properties.inherited}
else if((o&&(!i)))
{return class_object._properties.own}
else if(true)
{return{}}};class_object.proxyWithState=function(o){var proxy={};var constr=undefined;var wrapper=function(f){return function(){return f.apply(o,arguments)}};var proxy_object=function(){return class_object.prototype.initialize.apply(o,arguments)};proxy_object.prototype=proxy;for(var key in class_object.prototype){var w=wrapper(class_object.prototype[key])
if(key=="initialize"){constr=w}
proxy[key]=w
proxy_object[key]=w}
proxy_object.getSuper=function(){return class_object.getParent().proxyWithState(o)};return proxy_object};if(declaration.parent!=undefined){for(var name in declaration.parent._operations.fullname){var operation=declaration.parent._operations.fullname[name]
class_object._operations.fullname[name]=operation
class_object[name]=operation}
for(var name in declaration.parent._operations.all){var operation=declaration.parent[name]
class_object[name]=operation
class_object._operations.all[name]=operation
class_object._operations.inherited[name]=operation}
for(var name in declaration.parent._methods.all){var method=declaration.parent._methods.all[name]
class_object._methods.all[name]=method
class_object._methods.inherited[name]=method}
for(var name in declaration.parent._shared.all){var attribute=declaration.parent._shared.all[name]
class_object[name]=attribute
class_object._shared.all[name]=attribute
class_object._shared.inherited[name]=attribute}
for(var name in declaration.parent._properties.all){var prop=declaration.parent._properties.all[name]
class_object._properties.all[name]=prop
class_object._properties.inherited[name]=prop}}
if(declaration.operations!=undefined){for(var name in declaration.operations){var operation=declaration.operations[name]
class_object[name]=operation
class_object[full_name+"_"+name]=operation
class_object._operations.all[name]=operation
class_object._operations.all[name]=operation
class_object._operations.own[name]=operation
class_object._operations.fullname[full_name+"_"+name]=operation}}
if(declaration.methods!=undefined){for(var name in declaration.methods){var method=declaration.methods[name]
class_object._methods.all[name]=method
class_object._methods.own[name]=method}}
if(declaration.shared!=undefined){for(var name in declaration.shared){var attribute=declaration.shared[name]
class_object[name]=attribute
class_object._shared.all[name]=attribute
class_object._shared.own[name]=attribute}}
if(declaration.properties!=undefined){for(var name in declaration.properties){var attribute=declaration.properties[name]
class_object._properties.all[name]=attribute
class_object._properties.own[name]=attribute}}
var instance_proto={};if(declaration.parent)
{instance_proto=new declaration.parent('__Extend_SubClass__');instance_proto.constructor=class_object;}
instance_proto.isInstance=undefined;instance_proto.getClass=function(){return class_object};instance_proto.isClass=function(){return false};instance_proto._methodCache=undefined;instance_proto.getMethod=function(methodName){var this_object=this;if((!this_object.__methodCache))
{this_object.__methodCache={};}
if(this_object.__methodCache[methodName])
{return this_object.__methodCache[methodName]}
else if(true)
{var m=class_object.bindMethod(this_object,methodName);this_object.__methodCache[methodName]=m;return m}};instance_proto.getCallback=function(methodName){var this_object=this;var this_object=this;if((!this_object.__methodCache))
{this_object.__methodCache={};}
var callback_name=(methodName+'_k');if(this_object.__methodCache[callback_name])
{return this_object.__methodCache[callback_name]}
else if(true)
{var m=class_object.bindCallback(this_object,methodName);this_object.__methodCache[callback_name]=m;return m}};instance_proto.isInstance=function(c){return c.hasInstance(this)};if(declaration.initialize)
{instance_proto.initialize=declaration.initialize;}
else if(true)
{instance_proto.instance_proto={};}
instance_proto.getSuper=function(c){if((typeof(this._extendProxyWithState)=='undefined'))
{this._extendProxyWithState=extend.createMapFromItems([c.id,c.proxyWithState(this)]);}
else if((typeof(this._extendProxyWithState[c.id])=='undefined'))
{this._extendProxyWithState[c.id]=c.proxyWithState(this);}
return this._extendProxyWithState[c.id]};if(declaration.operations!=undefined){for(var name in declaration.operations){instance_proto[name]=instance_proto[full_name+"_"+name]=class_object.getOperation(name)}}
if(declaration.methods!=undefined){for(var name in declaration.methods){instance_proto[name]=instance_proto[full_name+"_"+name]=declaration.methods[name]}}
if(declaration.initialize!=undefined){instance_proto.initialize=instance_proto[full_name+"_initialize"]=declaration.initialize}
class_object.prototype=instance_proto;if(declaration.name)
{if((extend.Registry!=undefined))
{extend.Registry[declaration.name]=class_object;}}
return class_object}
extend.Protocol=function(pdata){var self=extend;}
extend.Singleton=function(sdata){var self=extend;}
extend.ErrorCallback=undefined
extend.DebugCallback=undefined
extend.PrintCallback=undefined
extend.Nothing=new Object()
extend.Timeout=new Object()
extend.Error=new Object()
extend.FLOW_CONTINUE=new Object()
extend.FLOW_BREAK=new Object()
extend.FLOW_RETURN=new Object()
extend.invoke=function(t,f,args,extra){var self=extend;var meta=f['__meta__'];var actual_args=[];extend.iterate(extra['*'],function(v){args.push(v)},self)
extend.iterate(extra['**'],function(v,k){extra[k]=v;},self)
extend.iterate(args,function(v){actual_args.push(args)},self)
var start=args.length;while((start<meta.arity))
{var arg=meta.arguments[start];actual_args.push(extra[arg.name])
start=(start+1);}
return f.apply(t,actual_args)}
extend.str=function(v){var self=extend;return(''+v)}
extend.range=function(start,end,step){var self=extend;step=step===undefined?1:step
var result=[];if(start<end){for(var i=start;i<end;i+=step){result.push(i);}}
else if(start>end){for(var i=start;i>end;i-=step){result.push(i);}}
return result}
extend.sliceArguments=function(args,index){var self=extend;var res=[];while(index<args.length){res.push(args[index++])}
return res}
extend.len=function(value){var self=extend;if(extend.isList(value))
{return value.length}
else if(extend.isObject(value))
{if(value.length)
{return value.length}
else if(value.__len__)
{return value.__len__()}
else if(true)
{var c=0;for(var _ in value){c+=1};return c}}
else if(true)
{return null}}
extend.iterate=function(value,callback,context){var self=extend;if(!value){return}
if(value.forEach){try{result=value.forEach(callback)}catch(e){if(e===extend.FLOW_CONTINUE){}
else if(e===extend.FLOW_BREAK){return}
else if(e===extend.FLOW_RETURN){return}
else{throw e}}}else if(value.length!=undefined){var length=undefined;if(typeof(value.length)=="function"&&typeof(value.get)=="function"){length=value.length()
for(var i=0;i<length;i++){var result=undefined;try{result=callback.call(context,value.get(i),i);}catch(e){if(e===extend.FLOW_CONTINUE){}
else if(e===extend.FLOW_BREAK){return}
else if(e===extend.FLOW_RETURN){return}
else{throw e}}
if(!(result===undefined)){return result}}}else{length=value.length;for(var i=0;i<length;i++){var result=undefined;try{result=callback.call(context,value[i],i);}catch(e){if(e===extend.FLOW_CONTINUE){}
else if(e===extend.FLOW_BREAK){return}
else if(e===extend.FLOW_RETURN){return}
else{throw e}}
if(!(result===undefined)){return result}}}}else{for(var k in value){var result=undefined;try{result=callback.call(context,value[k],k);}catch(e){if(e===extend.FLOW_CONTINUE){}
else if(e===extend.FLOW_BREAK){return}
else if(e===extend.FLOW_RETURN){return}
else{throw e}}
if(!(result===undefined)){return result}}}}
extend.access=function(value,index){var self=extend;if((index>=0))
{return value[index]}
else if(true)
{if((((typeof(value)=='string')||extend.isList(value))||(value&&extend.isNumber(value.length))))
{return value[value.length+index]}
else if(true)
{throw new Exception(('extend.access:Type not supported:'+value))}}}
extend.keys=function(value){var self=extend;if((extend.isString(value)||extend.isNumber(value)))
{return null}
else if(true)
{var res=[];for(var k in value){res.push(k);}
return res}}
extend.values=function(value){var self=extend;if((extend.isString(value)||extend.isNumber(value)))
{return null}
else if(true)
{var res=[];for(var k in value){res.push(value[k]);}
return res}}
extend.copy=function(value){var self=extend;if(extend.isList(value))
{return[].concat(value)}
else if(extend.isObject(value))
{var r={};extend.iterate(value,function(v,k){r[k]=v;},self)
return r}
else if(true)
{return value}}
extend.find=function(enumerable,value){var self=extend;var res=[];var found=-1;extend.iterate(enumerable,function(v,k){if(((v==value)&&(found==-1)))
{found=k;throw extend.FLOW_BREAK;}},self)
return found}
extend.findLike=function(enumerable,predicate){var self=extend;var res=[];var found=-1;extend.iterate(enumerable,function(v,k){if((predicate(v)&&(found==-1)))
{found=k;throw extend.FLOW_BREAK;}},self)
return found}
extend.first=function(enumerable,predicate){var self=extend;var i=extend.findLike(enumerable,predicate);if((i>=0))
{return enumerable[i]}
else if(true)
{return null}}
extend.replace=function(container,original,replacement){var self=extend;if(extend.isString(container))
{while((container.indexOf(original)!=-1))
{container=container.replace(original,replacement);}}
else if(true)
{extend.error('extend.replace only supports string for now')}
return container}
extend.slice=function(value,start,end){var self=extend;start=start===undefined?0:start
end=end===undefined?undefined:end
if(extend.isString(value))
{if((end===undefined))
{end=value.length;}
if((start<0))
{start=(value.length+start);}
if((end<0))
{end=(value.length+end);}
return value.substring(start,end)}
else if(extend.isList(value))
{if((end===undefined))
{end=value.length;}
if((start<0))
{start=(value.length+start);}
if((end<0))
{end=(value.length+end);}
return value.slice(start,end)}
else if((extend.isObject(value)&&extend.isDefined(value.length)))
{var res=[];if((end===undefined))
{end=value.length;}
if((start<0))
{start=(value.length+start);}
if((end<0))
{end=(value.length+end);}
var i=start;while((i<end))
{res.push(value[i])}
return res}
else if(true)
{throw('Unsupported type for slice:'+value)}}
extend.isIn=function(value,list){var self=extend;if(extend.isList(list))
{if(list.some){return list.some(function(v){return v==value});}else{for(var i=0;i<list.length;i++){if(list[i]==value){return true}}
return false}}
else if(extend.isMap(list))
{for(var i in list){if(list[i]==value){return true}}
return false}
else if(true)
{return false}}
extend.createMapFromItems=function(items){var self=extend;items=extend.sliceArguments(arguments,0)
var result={}
for(var i=0;i<items.length;i++){result[items[i][0]]=items[i][1]}
return result}
extend.type=function(value){var self=extend;return typeof(value)}
extend.isDefined=function(value){var self=extend;return(!(value===undefined))}
extend.isList=function(value){var self=extend;return value instanceof Array}
extend.isNumber=function(value){var self=extend;return(typeof(value)=='number')}
extend.isString=function(value){var self=extend;return(typeof(value)=='string')}
extend.isMap=function(value){var self=extend;return!!(!(value===null)&&typeof value=="object"&&!extend.isList(value))}
extend.isIterable=function(value){var self=extend;return extend.isList(value)||value&&typeof(value.length)=="number";}
extend.isFunction=function(value){var self=extend;return!!(typeof value=="function")}
extend.isObject=function(value){var self=extend;return!!(typeof value=="object")}
extend.isInstance=function(value,ofClass){var self=extend;ofClass=ofClass===undefined?undefined:ofClass
if(ofClass)
{var is_instance=false;is_instance=value instanceof ofClass;return((extend.isDefined(value.getClass)&&value.isInstance(ofClass))||is_instance)}
else if(true)
{return extend.isDefined(value.getClass)}}
extend.getMethodOf=function(instance,name){var self=extend;return instance[name]}
extend.getClassOf=function(instance){var self=extend;return instance.getClass()}
extend.print=function(args){var self=extend;args=extend.sliceArguments(arguments,0)
var pr_func=eval('print');if((((typeof(console)=='undefined')&&(typeof(pr_func)==='undefined'))&&(extend.PrintCallback===undefined)))
{return null}
var res='';for(var i=0;i<args.length;i++){var val=args[i]
if(val!=undefined&&typeof(val)=="object"&&val.toSource!=undefined){val=val.toSource()}
if(i<args.length-1){res+=val+" "}
else{res+=val}}
if((extend.PrintCallback===undefined))
{if((typeof(console)!='undefined'))
{console.log(res)}
else if(((typeof(document)=='undefined')&&(typeof(pr_func)!='undefined')))
{pr_func(res)}}
else if(true)
{extend.PrintCallback(res)}}
extend.error=function(message){var self=extend;if(extend.ErrorCallback)
{extend.ErrorCallback(message)}
else if(true)
{extend.print(('[!] '+message))}}
extend.debug=function(message){var self=extend;if(extend.DebugCallback)
{extend.DebugCallback(message)}
else if(true)
{extend.print(('[ ] '+message))}}
extend.assert=function(predicate,message){var self=extend;if((!predicate))
{extend.error(message)}}
extend.fail=function(message){var self=extend;extend.error(message)
return false}
extend.sprintf=function(){var self=extend;var str_repeat=function(i,m){for(var o=[];m>0;o[--m]=i);return(o.join(''));};var i=0,a,f=arguments[i++],o=[],m,p,c,x;while(f){if(m=/^[^\x25]+/.exec(f))o.push(m[0]);else if(m=/^\x25{2}/.exec(f))o.push('%');else if(m=/^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)){if(((a=arguments[m[1]||i++])==null)||(a==undefined))throw("Too few arguments.");if(/[^s]/.test(m[7])&&(typeof(a)!='number'))
throw("Expecting number but found "+typeof(a));switch(m[7]){case'b':a=a.toString(2);break;case'c':a=String.fromCharCode(a);break;case'd':a=parseInt(a);break;case'e':a=m[6]?a.toExponential(m[6]):a.toExponential();break;case'f':a=m[6]?parseFloat(a).toFixed(m[6]):parseFloat(a);break;case'o':a=a.toString(8);break;case's':a=((a=String(a))&&m[6]?a.substring(0,m[6]):a);break;case'u':a=Math.abs(a);break;case'x':a=a.toString(16);break;case'X':a=a.toString(16).toUpperCase();break;}
a=(/[def]/.test(m[7])&&m[2]&&a>0?'+'+a:a);c=m[3]?m[3]=='0'?'0':m[3].charAt(1):' ';x=m[5]-String(a).length;p=m[5]?str_repeat(c,x):'';o.push(m[4]?a+p:p+a);}
else{throw("Huh ?!");}
f=f.substring(m[0].length);}
return o.join('');}
extend.Registry={}
extend.getClass=function(name){var self=extend;return extend.Registry[name]}
extend.getParentClass=function(object){var self=extend;return extend.Registry[name]}
extend.getClasses=function(){var self=extend;return extend.Registry}
extend.getMethod=function(name,object){var self=extend;}
extend.getSuperMethod=function(name,object){var self=extend;}
extend.getChildrenOf=function(aClass){var self=extend;var res={};var values=extend.getClasses()
for(key in values){if(values[key]!=aClass&&values[key].isSubclassOf(aClass))
{res[key]=values[key]}}
return res}
extend.strip=function(value){var self=extend;return value.replace(/^\s\s*/,'').replace(/\s\s*$/,'');}
extend.merge=function(value,otherValue){var self=extend;if(extend.isList(value))
{extend.assert(extend.isList(otherValue),'extend.merge(a,b) b expected to be a list')
extend.iterate(otherValue,function(v){if((extend.find(value,v)==-1))
{value.push(v)}},self)}
else if(extend.isMap(value))
{extend.assert(extend.isMap(otherValue),'extend.merge(a,b) b expected to be a map')
extend.iterate(otherValue,function(v,k){if((value[k]==undefined))
{value[k]=v;}},self)}
else if(true)
{extend.error('extend.merge(a,_) expects a to be a list or a map')}
return value}
extend.car=function(list){var self=extend;if((list.length>0))
{return list[0]}
else if(true)
{return null}}
extend.cdr=function(list){var self=extend;if((list.length==0))
{return null}
else if((list.length==1))
{return[]}
else if(true)
{return extend.slice(list,1,undefined)}}
extend.map=function(iterable,callback){var self=extend;var result=null;if(extend.isList(iterable))
{if(iterable.map)
{result=iterable.map(callback);}
else if(true)
{result=[];extend.iterate(iterable,function(e,k){result.push(callback(e,k))},self)}}
else if(extend.isIterable(iterable))
{result=[];extend.iterate(iterable,function(e,k){result.push(callback(e,k))},self)}
else if(true)
{result={};extend.iterate(iterable,function(e,k){result[k]=callback(e,k);},self)}
return result}
extend.filter=function(iterable,callback){var self=extend;var result=null;if(extend.isList(iterable))
{if(iterable.filter)
{result=iterable.filter(callback);}
else if(true)
{result=[];extend.iterate(iterable,function(e,k){if(callback(e,k))
{result.push(e)}},self)}}
else if(extend.isIterable(iterable))
{result=[];extend.iterate(iterable,function(e,k){if(callback(e,k))
{result.push(e)}},self)}
else if(true)
{result={};extend.iterate(iterable,function(e,k){if(callback(e,k))
{result[k]=e;}},self)}
return result}
extend.reduce=function(iterable,callback){var self=extend;var res=undefined;var i=0;extend.iterate(iterable,function(e,k){if((i==0))
{res=e;}
else if(true)
{res=callback(res,e,k);}
i=(i+1);},self)
return res}
extend.foldl=function(iterable,seed,callback){var self=extend;var first=true;var result=seed;extend.iterate(iterable,function(e,k){result=callback(result,e,k);},self)
return result}
extend.extendPrimitiveTypes=function(){var self=extend;String.prototype.__len__=function(){return this.length};Array.prototype.extend=function(array){extend.iterate(array,function(e){this.append(e)},self)};Array.prototype.append=function(e){this.push(e)};Array.prototype.insert=function(e,i){this.splice(i,e)};Array.prototype.slice=function(){};Array.prototype.__iter__=function(){return this.length};Array.prototype.__len__=function(){return this.length};Object.prototype.keys=function(){var result=[];for(var k in this){var key=k;result.push(key)}
return result};Object.prototype.items=function(){var result=[];for(var k in this){var key=k;result.push([key,this[key]])}
return result};Object.prototype.values=function(){var result=[];for(var k in this){var key=k;result.push([key,this[key]])}
return result};Object.prototype.hasKey=function(key){return(typeof(this[key])!='undefined')};Object.prototype.get=function(key){return this[key]};Object.prototype.set=function(key,value){this[key]=value;return this};Object.prototype.setDefault=function(key,value){if((typeof(this[key])!='undefined'))
{return this[key]}
else if(true)
{this[key]=value;return value}};Object.prototype.__iter__=function(){};Object.prototype.__len__=function(){return this.keys().length};}
extend.init=function(){var self=extend;}
if(typeof(extend.init)!="undefined"){extend.init();}})(extend);