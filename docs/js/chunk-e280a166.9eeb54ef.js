(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e280a166"],{"568c":function(e,t,n){"use strict";n.r(t);n("b0c0"),n("a4d3"),n("e01a");var o=n("7a23"),r=function(e){return Object(o["w"])("data-v-79401191"),e=e(),Object(o["u"])(),e},i={class:"container-popular-event"},c=r((function(){return Object(o["g"])("h1",{class:"title"},"Eventos Populares",-1)})),a={key:2,class:"container-card"},s={class:"container-img"},l=["src"],u={class:"container-content"},d={class:"container-total-people"},b={class:"container-count-people"},p=r((function(){return Object(o["g"])("h4",null,"Inscritos",-1)})),j={key:0,class:"container-buttons"},h={key:1,class:"container-button--anonimous"},v={key:3,class:"container-no-events"},g=r((function(){return Object(o["g"])("h1",null,"No hay eventos",-1)})),O=[g];function f(e,t,n,r,g,f){var m=Object(o["A"])("PopularModal"),E=Object(o["A"])("ModalNameRegisterInPopularEvent");return Object(o["t"])(),Object(o["f"])("div",i,[g.openPopularModal?(Object(o["t"])(),Object(o["d"])(m,{key:0,openPopularModal:g.openPopularModal,onShowEvent:f.showEvent,event:g.event},null,8,["openPopularModal","onShowEvent","event"])):Object(o["e"])("",!0),g.openNameRegister?(Object(o["t"])(),Object(o["d"])(E,{key:1,onShowNameRegister:f.showNameRegister,openNameRegister:g.openNameRegister,nameRegister:g.nameRegister},null,8,["onShowNameRegister","openNameRegister","nameRegister"])):Object(o["e"])("",!0),c,n.filterPopularEvent.length>1?(Object(o["t"])(),Object(o["f"])("div",a,[Object(o["g"])("div",s,[Object(o["g"])("img",{src:n.filterPopularEvent[0].photo,alt:""},null,8,l)]),Object(o["g"])("div",u,[Object(o["g"])("h4",null,Object(o["C"])(n.filterPopularEvent[0].date),1),Object(o["g"])("h2",null,Object(o["C"])(n.filterPopularEvent[0].name),1),Object(o["g"])("p",null,Object(o["C"])(n.filterPopularEvent[0].description.substring(0,27)+"..."),1),Object(o["g"])("div",d,[Object(o["g"])("div",b,[Object(o["g"])("h4",{onClick:t[0]||(t[0]=function(e){return f.showNameRegister()})}," +"+Object(o["C"])(n.filterPopularEvent[0].joined),1),p]),this.user.email?(Object(o["t"])(),Object(o["f"])("div",j,[Object(o["g"])("button",{onClick:t[1]||(t[1]=function(e){return f.showEvent()}),class:"button-show"},"Ver"),Object(o["g"])("button",{onClick:t[2]||(t[2]=function(e){return f.joinEvent(n.filterPopularEvent[0])}),class:"button-join"}," Unir ")])):(Object(o["t"])(),Object(o["f"])("div",h,[Object(o["g"])("button",{class:"button-show",onClick:t[3]||(t[3]=function(t){return e.getEventInterested(g.event)})}," Ver ")]))])])])):Object(o["e"])("",!0),0===this.filterPopularEvent.length?(Object(o["t"])(),Object(o["f"])("div",v,O)):Object(o["e"])("",!0)])}var m=n("5530"),E=(n("d3b7"),n("3ca3"),n("ddb0"),n("4de4"),n("5502")),P={components:{PopularModal:Object(o["j"])((function(){return n.e("chunk-45d79cad").then(n.bind(null,"a1b4"))})),ModalNameRegisterInPopularEvent:Object(o["j"])((function(){return n.e("chunk-62f9d76e").then(n.bind(null,"5e79"))}))},data:function(){return{openPopularModal:!1,openNameRegister:!1,event:[],nameRegister:{}}},props:{filterPopularEvent:{type:Array}},methods:Object(m["a"])(Object(m["a"])({},Object(E["b"])("event",["joinEventAction"])),{},{showEvent:function(){this.openPopularModal=!this.openPopularModal,this.event=this.filterPopularEvent[0],console.log("Ha llegado al showEvent",this.openPopularModal)},joinEvent:function(e){var t=this,n={id:e.id,name:e.name,schedule:e.schedule,date:e.date,description:e.description,photo:e.photo,joined:e.joined,register:e.register},o=e.register.filter((function(e){return e===t.user.name}));if(!(o.length>0))return n.joined=e.joined+1,e.register.push(this.user.name),this.joinEventAction(n),e.joined=e.joined+1;console.error("Ya te has inscrito")},showNameRegister:function(){this.openNameRegister=!this.openNameRegister,this.nameRegister=this.filterPopularEvent[0].register}}),computed:Object(m["a"])({},Object(E["d"])("auth",["user"]))},w=(n("cf49"),n("d959")),R=n.n(w);const k=R()(P,[["render",f],["__scopeId","data-v-79401191"]]);t["default"]=k},"7cd8":function(e,t,n){},cf49:function(e,t,n){"use strict";n("7cd8")}}]);
//# sourceMappingURL=chunk-e280a166.9eeb54ef.js.map