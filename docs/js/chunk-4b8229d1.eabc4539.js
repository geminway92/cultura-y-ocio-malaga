(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b8229d1"],{"05ac":function(e,t,n){"use strict";n("28b7")},"28b7":function(e,t,n){},"568c":function(e,t,n){"use strict";n.r(t);n("b0c0"),n("a4d3"),n("e01a");var o=n("7a23"),r=function(e){return Object(o["w"])("data-v-542cfcc8"),e=e(),Object(o["u"])(),e},i={class:"container-popular-event"},c=r((function(){return Object(o["g"])("h1",{class:"title"},"Eventos Populares",-1)})),a={key:2,class:"container-card"},s={class:"container-img"},l=["src"],u={class:"container-content"},p={class:"container-total-people"},d={class:"container-count-people"},b=r((function(){return Object(o["g"])("h4",null,"Inscritos",-1)})),j={class:"container-buttons"},g={key:3,class:"container-no-events"},h=r((function(){return Object(o["g"])("h1",null,"No hay eventos",-1)})),v=[h];function O(e,t,n,r,h,O){var f=Object(o["A"])("PopularModal"),m=Object(o["A"])("ModalNameRegisterInPopularEvent");return Object(o["t"])(),Object(o["f"])("div",i,[h.openPopularModal?(Object(o["t"])(),Object(o["d"])(f,{key:0,openPopularModal:h.openPopularModal,onShowEvent:O.showEvent,event:h.event},null,8,["openPopularModal","onShowEvent","event"])):Object(o["e"])("",!0),h.openNameRegister?(Object(o["t"])(),Object(o["d"])(m,{key:1,onShowNameRegister:O.showNameRegister,openNameRegister:h.openNameRegister,nameRegister:h.nameRegister},null,8,["onShowNameRegister","openNameRegister","nameRegister"])):Object(o["e"])("",!0),c,n.filterPopularEvent.length>1?(Object(o["t"])(),Object(o["f"])("div",a,[Object(o["g"])("div",s,[Object(o["g"])("img",{src:n.filterPopularEvent[0].photo,alt:""},null,8,l)]),Object(o["g"])("div",u,[Object(o["g"])("h4",null,Object(o["C"])(n.filterPopularEvent[0].date),1),Object(o["g"])("h2",null,Object(o["C"])(n.filterPopularEvent[0].name),1),Object(o["g"])("p",null,Object(o["C"])(n.filterPopularEvent[0].description.substring(0,27)+"..."),1),Object(o["g"])("div",p,[Object(o["g"])("div",d,[Object(o["g"])("h4",{onClick:t[0]||(t[0]=function(e){return O.showNameRegister()})},"+"+Object(o["C"])(n.filterPopularEvent[0].joined),1),b]),Object(o["g"])("div",j,[Object(o["g"])("button",{onClick:t[1]||(t[1]=function(e){return O.showEvent()}),class:"button-show"},"Ver"),Object(o["g"])("button",{onClick:t[2]||(t[2]=function(e){return O.joinEvent(n.filterPopularEvent[0])}),class:"button-join"},"Unir")])])])])):Object(o["e"])("",!0),0===this.filterPopularEvent.length?(Object(o["t"])(),Object(o["f"])("div",g,v)):Object(o["e"])("",!0)])}var f=n("5530"),m=(n("d3b7"),n("3ca3"),n("ddb0"),n("4de4"),n("5502")),E={components:{PopularModal:Object(o["j"])((function(){return n.e("chunk-3ad41680").then(n.bind(null,"a1b4"))})),ModalNameRegisterInPopularEvent:Object(o["j"])((function(){return n.e("chunk-50835c8f").then(n.bind(null,"5e79"))}))},data:function(){return{openPopularModal:!1,openNameRegister:!1,event:[],nameRegister:{}}},props:{filterPopularEvent:{type:Array}},methods:Object(f["a"])(Object(f["a"])({},Object(m["b"])("event",["joinEventAction"])),{},{showEvent:function(){this.openPopularModal=!this.openPopularModal,this.event=this.filterPopularEvent[0],console.log("Ha llegado al showEvent",this.openPopularModal)},joinEvent:function(e){var t=this,n={id:e.id,name:e.name,schedule:e.schedule,date:e.date,description:e.description,photo:e.photo,joined:e.joined,register:e.register},o=e.register.filter((function(e){return e===t.user.name}));if(console.log(o,"existe"),!(o.length>0))return n.joined=e.joined+1,e.register.push(this.user.name),this.joinEventAction(n),console.log(n,"Resp de filtro para id"),e.joined=e.joined+1;console.error("Ya te has inscrito")},showNameRegister:function(){this.openNameRegister=!this.openNameRegister,this.nameRegister=this.filterPopularEvent[0].register,console.log(this.nameRegister)}}),computed:Object(f["a"])({},Object(m["d"])("auth",["user"]))},P=(n("05ac"),n("6b0d")),R=n.n(P);const w=R()(E,[["render",O],["__scopeId","data-v-542cfcc8"]]);t["default"]=w}}]);
//# sourceMappingURL=chunk-4b8229d1.eabc4539.js.map