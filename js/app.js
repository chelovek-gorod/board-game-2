(()=>{"use strict";var t={d:(e,i)=>{for(var s in i)t.o(i,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};t.d({},{H:()=>A});const e={menuLogo:"MarsGameLogoDarkBg.png",menuButton:"options_button_128x128px.png",menuButtonLock:"options_button_lock_128x128px.png",menuPlayer:"use_player_128x128px.png",menuComputer:"use_computer_128x128px.png",menuNoUser:"use_no_128x128px.png",menuRandom:"use_random_128x128px.png",menuMusicOn:"options_music_on_128x128px.png",menuMusicOff:"options_music_off_128x128px.png",menuEffectsOn:"options_effects_on_128x128px.png",menuEffectsOff:"options_effects_off_128x128px.png",board:"board.svg",dice:"dices_84x84px_mixed_frames.png",dicePointer:"pointer_dice_160x160px.png",pointerPlayerH:"turn_bw_480x120px_32frames.png",pointerPlayerV:"turn_bw_120x480px_32frames.png",tokenPointerHuman:"pointer_token_human_160x160px.png",tokenPointerBot:"pointer_token_bot_160x160px.png",tokenBoat:"token_boat_128x128px.png",tokenButton:"token_button_128x128px.png",tokenCap:"token_cap_128x128px.png",tokenCoin:"token_coin_128x128px.png",tokenCrystal:"token_crystal_128x128px.png",tokenEye:"token_eye_128x128px.png",tokenPlane:"token_plane_128x128px.png",tokenShark:"token_shark_128x128px.png",tokenSkull:"token_skull_128x128px.png",tokenStone:"token_stone_128x128px.png",tokenToy:"token_toy_128x128px.png",tokenUfo:"token_ufo_128x128px.png",tokenWheel:"token_wheel_128x128px.png"},i={dice:"se_dices.mp3",dice2:"se_dices2.mp3",startToken:"se_start_token.mp3",step0:"se_step_0.mp3",step1:"se_step_1.mp3",step2:"se_step_2.mp3",step3:"se_step_3.mp3",step4:"se_step_4.mp3",step5:"se_step_5.mp3",step6:"se_step_6.mp3"},s=120,a=20,r=2500,h=1e3,n=800,o=500,c=900;class l{static instance;constructor(){if(l.instance)return l.instance;this.canvas=document.getElementById("canvas"),this.width=this.canvas.width=15*s+2*a,this.height=this.canvas.height=15*s+2*a,this.sizeRate=1,this.x=Math.round(this.width/2),this.y=Math.round(this.height/2),this.context=this.canvas.getContext("2d"),this.layers=[],l.instance=this,this.resize()}resize(){const t=innerWidth>innerHeight?innerHeight:innerWidth;this.sizeRate=this.width/t}getLayer(t){return this.layers.find((e=>e.name===t))}}const d=new l,m=document.getElementById("shell");p();let y=!0,x=!1;function p(){m.style.display="flex",m.innerHTML="<div><nobr>CLICK SCREEN</nobr> FOR <nobr>START GAME</nobr></div>"}function u(){p(),y=!1,cancelAnimationFrame(f),console.log("stop render")}document.body.onresize=()=>{d.resize(),document.fullscreenEnabled&&!document.fullscreenElement&&u()},m.onclick=()=>{m.style.display="none",y=!0,g=performance.now(),f=requestAnimationFrame(k),console.log("start render"),document.fullscreenEnabled&&!document.fullscreenElement&&document.body.requestFullscreen(),x||(x=!0,d.canvas.style.opacity=1)},document.body.onblur=u;let g=performance.now(),f=requestAnimationFrame(k);function k(t){const e=t-g;g=t,d.context.clearRect(0,0,d.width,d.height),d.layers.forEach((t=>t.update(e))),y&&(f=requestAnimationFrame(k))}const z=d,I=[1,1],P=class{constructor(t,i){this.img=e.dice,this.x=t-42,this.y=i-42,this.frameSize=84,this.throwDuration=h,this.fps=30,this.frameDuration=Math.floor(1e3/this.fps),this.frameTimeout=this.frameDuration,this.framePathSize=Math.floor(this.throwDuration/this.frameDuration),this.framePath=[],this.framePoint={x:0,y:0},this.value=this.getNewValue(),this.pointer=new class{constructor(t){this.image=e.dicePointer,this.x=t.x+41,this.y=t.y+41,this.scaleDuration=n/2,this.maxSize=160,this.minSize=80,this.scaleRate=(this.maxSize-this.minSize)/this.scaleDuration,this.isScaleUp=!0,this.size=this.minSize,this.halfSize=this.size/2}setMinSize(){this.size=this.minSize,this.halfSize=this.size/2}update(t){this.isScaleUp?(this.size+=this.scaleRate*t,this.size>=this.maxSize&&(this.isScaleUp=!1)):(this.size-=this.scaleRate*t,this.size<=this.minSize&&(this.isScaleUp=!0)),this.halfSize=this.size/2,z.context.drawImage(this.image,this.x-this.halfSize,this.y-this.halfSize,this.size,this.size)}}(this),this.isActive=!1}getNewValue(){const t=I.length?I.shift():Math.ceil(6*Math.random());switch(t){case 1:this.framePoint.x=0,this.framePoint.y=Math.random()<.5?4*this.frameSize:12*this.frameSize;break;case 2:this.framePoint.x=4*this.frameSize,this.framePoint.y=Math.random()<.5?4*this.frameSize:12*this.frameSize;break;case 5:this.framePoint.x=12*this.frameSize,this.framePoint.y=Math.random()<.5?4*this.frameSize:12*this.frameSize;break;case 6:this.framePoint.x=8*this.frameSize,this.framePoint.y=Math.random()<.5?4*this.frameSize:12*this.frameSize;break;case 3:this.framePoint.x=4*Math.floor(4*Math.random())*this.frameSize,this.framePoint.y=0;break;case 4:this.framePoint.x=4*Math.floor(4*Math.random())*this.frameSize,this.framePoint.y=8*this.frameSize;break;default:console.warn("error in dice value")}return t}throw(){if(this.framePath.length)return 0;let t="";for(;t.length<this.framePathSize;)t+=(""+Math.random()).slice(2);this.value=this.getNewValue(),this.framePath.push(this.framePoint);let e=Math.floor(8*Math.random()),{x:i,y:s}=this.framePoint;const a=15*this.frameSize;for(let r=0;r<this.framePathSize;r++)0!==e&&4!==e&&(i+=e<4?this.frameSize:-this.frameSize,i<0&&(i=a),i>a&&(i=0)),2!==e&&6!==e&&(s+=e>2&&e<6?this.frameSize:-this.frameSize,s<0&&(s=a),s>a&&(s=0)),this.framePath.push({x:i,y:s}),+t[r]<2&&(e--,e<0&&(e=7)),+t[r]>7&&(e++,e>7&&(e=0))}update(t){this.isActive&&this.pointer.update(t),this.framePath.length&&(this.frameTimeout-=t,this.frameTimeout<=0&&(this.frameTimeout+=this.frameDuration,this.framePoint=this.framePath.pop())),z.context.drawImage(this.img,this.framePoint.x,this.framePoint.y,this.frameSize,this.frameSize,this.x,this.y,this.frameSize,this.frameSize)}};let S=0;const b=class{constructor(t="",e=z.layers.length,i=[]){this.name=t||"layer"+S++,this.zIndex=e,this.objects=i,e===z.layers.length?z.layers.push(this):(z.layers.splice(e,0,this),z.layers.forEach(((t,e)=>t.zIndex=e)))}update(t){this.objects.forEach((e=>e.update(t)))}remove(t){this.objects=this.objects.filter((e=>e!==t))}add(t){this.objects.push(t)}moveUp(t){this.objects=this.objects.filter((e=>e!==t)),this.objects.push(t)}clear(){this.objects=[]}},X=class{constructor(t,e){this.callback=t,this.milliseconds=e,z.layers[0].add(this)}update(t){this.milliseconds-=t,this.milliseconds<=0&&(setTimeout((()=>this.callback()),0),z.layers[0].remove(this))}},v=class{constructor(t){this.player=t,this.image=t.tokenImage,this.maxSize=128,this.minSize=96,this.size=this.minSize,this.halfSize=this.size/2,this.startPoint=t.startPoint,this.reserve=A.board.reserves[t.startPoint],this.home=A.board.homes[t.startPoint],this.container=this.reserve,this.index=this.player.tokens.length,this.x=this.container[this.index].x,this.y=this.container[this.index].y,this.stepDuration=o,this.halfStepDuration=this.stepDuration/2,this.sizeRate=(this.maxSize-this.minSize)/this.halfStepDuration,this.stepTimeout=this.stepDuration,this.speed=0,this.steps=0,this.direction=0,this.target=null,this.path=[],this.isGoHome=!1,this.isBot=t.isBot,this.pointer=new class{constructor(t,i){this.image=i?e.tokenPointerBot:e.tokenPointerHuman,this.scaleDuration=c,this.maxSize=148,this.minSize=120,this.size=this.minSize+(this.maxSize-this.minSize)/4*t,this.halfSize=this.size/2,this.scaleRate=(this.maxSize-this.minSize)/this.scaleDuration,this.direction=0,this.isScaleUp=!0}draw(t,e){this.isScaleUp?(this.size+=this.scaleRate*e,this.size>=this.maxSize&&(this.isScaleUp=!1,this.size=this.maxSize)):(this.size-=this.scaleRate*e,this.size<=this.minSize&&(this.isScaleUp=!0,this.size=this.minSize)),this.halfSize=this.size/2,z.context.drawImage(this.image,t.x-this.halfSize,t.y-this.halfSize,this.size,this.size)}}(this.index,this.isBot),this.isAvailable=!1,this.isActive=!1}checkCeilAllTokens(t,e){const i=A.players.length;for(let s=0;s<i;s++){const i=this.checkCeilPlayerTokens(t,e,A.players[s]);if(i)return i}return!1}checkCeilPlayerTokens(t,e,i=this.player){const s=i.tokens.length;for(let a=0;a<s;a++){const s=i.tokens[a];if(s.container===t&&s.index===e&&s!==this)return s}return!1}getPath(t){switch(this.path=[],this.container){case this.reserve:this.checkPathFromReserve(t);break;case A.board.toiletTop:case A.board.toiletRight:case A.board.toiletBottom:case A.board.toiletLeft:this.checkPathInToilet(t);break;case this.home:this.checkPathInHome(t);break;default:this.checkPathInMainBoard(t)}this.path.length?this.isAvailable=!0:this.isAvailable=!1}checkPathFromReserve(t){6===t&&(this.checkCeilPlayerTokens(A.board.ceils,this.reserve[0].targetIndex)||(this.isGoHome=!1,this.addPathPoint(A.board.ceils,this.reserve[0].targetIndex)))}checkPathInToilet(t){t===this.container[this.index].move&&("targetIndex"in this.container[this.index]?this.addPathPoint(A.board.ceils,this.container[this.index].targetIndex):this.addPathPoint(this.container,this.index+1))}checkPathInHome(t,e=this.index){console.log(t,e);const i=this.home.length-1-e;if(i<=0||t>i)return this.path=[];const s=e+t;for(let t=e+1;t<=s;t++){if(this.checkCeilPlayerTokens(this.home,t))return this.path=[];this.addPathPoint(this.home,t)}console.log("path after inrty home",[...this.path])}checkPathInMainBoard(t){if(this.isGoHome&&"home"===A.board.ceils[this.index].type&&A.board.ceils[this.index].targetIndex===this.startPoint)return this.checkCeilPlayerTokens(this.home,0)?this.path=[]:(this.addPathPoint(this.home,0),void this.checkPathInHome(t-1,0));let e=this.isGoHome,i=this.index;for(;t>0;){i++,i>=A.board.ceils.length&&(i=0);const s=this.container[i].type;if("corner"===s&&this.checkCeilAllTokens(A.board.ceils,i))return this.path=[];if("home"===s&&e&&A.board.ceils[i].targetIndex===this.startPoint)return this.checkCeilAllTokens(A.board.ceils,i)||this.checkCeilPlayerTokens(this.home,0)?this.path=[]:(this.addPathPoint(A.board.ceils,i),void(t>1&&(this.addPathPoint(this.home,0),t>2&&this.checkPathInHome(t-2,0))));if(t>1){if(this.checkCeilAllTokens(A.board.ceils,i))return this.path=[];this.addPathPoint(A.board.ceils,i)}else{if(this.checkCeilPlayerTokens(A.board.ceils,i))return this.path=[];switch(s){case"port":const t=A.board.ceils[i].targetIndex,e=A.board.ports[t].targetIndex;if(this.checkCeilPlayerTokens(A.board.ceils,e))return this.path=[];this.addPathPoint(A.board.ceils,i),this.addPathPoint(A.board.ports,t),this.addPathPoint(A.board.ceils,e);break;case"toilet":const s=A.board.ceils[i].targetIndex;this.addPathPoint(A.board.ceils,i),this.addPathPoint(A.board.toilets[s],0);break;default:this.addPathPoint(A.board.ceils,i)}}t--}}addPathPoint(t,e){this.path.push({container:t,index:e,x:t[e].x,y:t[e].y})}pushPathInToilet(){console.log("pushPathInToilet"),this.path=[],"targetIndex"in this.container[this.index]?this.addPathPoint(A.board.ceils,this.container[this.index].targetIndex):this.addPathPoint(this.container,this.index+1),this.startStep(),console.log({...this})}pushPathToReserve(){console.log("pushPathToReserve"),this.path=[];const t=this.reserve.length,e=new Array(t);this.player.tokens.forEach((t=>{t.container===this.reserve&&(e[t.index]=!0)}));for(let i=0;i<t;i++)if(!e[i]){this.addPathPoint(this.reserve,i);break}this.startStep(),console.log({...this})}activation(){this.isAvailable&&(this.player.tokens.forEach((t=>t.isAvailable=!1)),this.isActive=!0,this.startStep())}startStep(){if(this.player.layer.moveUp(this),this.target=this.path.shift(),this.target.container===A.board.toiletTop||this.target.container===A.board.toiletRight||this.target.container===A.board.toiletBottom||this.target.container===A.board.toiletLeft){const t=this.checkCeilAllTokens(this.target.container,this.target.index);t&&t.pushPathInToilet()}this.setDirection();const t=this.getDistance();this.speed=t/this.stepDuration,this.container===this.reserve&&i.startToken.play()}setDirection(){this.direction=Math.atan2(this.target.y-this.y,this.target.x-this.x)}getDistance(){let t=this.target.x-this.x,e=this.target.y-this.y;return Math.sqrt(t*t+e*e)}move(t){this.x+=Math.cos(this.direction)*t,this.y+=Math.sin(this.direction)*t}endStep(){if(this.size=this.minSize,this.halfSize=this.size/2,this.stepTimeout=this.stepDuration,this.container=this.target.container,this.index=this.target.index,this.x=this.target.x,this.y=this.target.y,this.target=null,this.container===A.board.ceils){const t=this.checkCeilAllTokens(A.board.ceils,this.index);t&&t.pushPathToReserve()}i["step"+Math.floor(7*Math.random())].play(),this.path.length?this.startStep():this.endMove()}endMove(){if(this.isGoHome||this.container===A.board.ceils&&this.index===this.reserve[0].targetIndex||(this.isGoHome=!0),this.container===this.home){let t=!0;this.player.tokens.forEach((e=>{e.container!==this.home&&(t=!1)})),t&&(A.isEnd=!0)}if(this.container===A.board.ceils&&"corner"===this.container[this.index].type){let t=!0;this.player.tokens.forEach((e=>{e.container===A.board.ceils&&"corner"===e.container[this.index].type||(t=!1)})),t&&(A.isEnd=!0)}this.isActive&&(this.isActive=!1,new X((()=>this.player.diceFinished()),1e3))}update(t){this.isAvailable&&this.pointer.draw({x:this.x,y:this.y},t),this.target&&(this.stepTimeout-=t,this.stepTimeout>this.halfStepDuration?this.size+=this.sizeRate*t:this.size-=this.sizeRate*t,this.halfSize=this.size/2,this.stepTimeout>0?this.move(t*this.speed):this.endStep()),z.context.drawImage(this.image,this.x-this.halfSize,this.y-this.halfSize,this.size,this.size)}},Y=class{constructor(t,i,s){this.getPointerPosition(i),this.image=i%2==0?e.pointerPlayerH:e.pointerPlayerV,this.tokenImage=t,this.frameWidth=i%2==0?480:120,this.frameHeight=i%2==0?120:480,this.frame=0,this.fps=30,this.frameDuration=Math.floor(1e3/this.fps),this.frameTimeout=this.frameDuration,this.frames=this.getFrames(),this.dices=[],this.dice=null,this.isGetDouble=!1,this.startPoint=i,this.tokens=[],this.isBot=s,this.layer=z.getLayer("players"),this.generateTokens()}getPointerPosition(t){t%2==0?(this.x=a+5.5*s,this.y=0===t?a:a+14*s):(this.y=a+5.5*s,this.x=3===t?a:a+14*s)}getFrames(){const t=[];for(let e=0;e<this.image.height;e+=this.frameHeight)for(let i=0;i<this.image.width;i+=this.frameWidth)t.push({x:i,y:e});return t}generateTokens(){const t=z.getLayer("tokens");for(let e=0;e<4;e++){const e=new v(this);this.tokens.push(e),t.add(e)}}startTurn(){this.layer.add(this),this.throwDices()}throwDices(){i.dice2.play(),A.dices.forEach((t=>t.throw())),this.isGetDouble=A.dices[0].value===A.dices[1].value,A.dices[0].value>=A.dices[1].value?this.dices=[1,0]:this.dices=[0,1],new X((()=>this.useDice()),h)}useDice(){this.dice=A.dices[this.dices.pop()],this.dice.isActive=!0;const t=[];this.tokens.forEach((e=>{e.getPath(this.dice.value),e.isAvailable&&t.push(e)})),t.length?this.isBot&&this.botActivation(t.sort((()=>Math.random()-.5))):new X((()=>this.diceFinished()),n)}botActivation(t){new X((()=>t[0].activation()),n)}diceFinished(){this.dice.isActive=!1,this.dice.pointer.setMinSize(),this.dices.length&&!A.isEnd?this.useDice():this.isGetDouble&&!A.isEnd?this.throwDices():this.endTurn()}endTurn(){this.layer.remove(this),A.nextTurn()}update(t){this.frameTimeout-=t,this.frameTimeout<=0&&(this.frameTimeout+=this.frameDuration,this.frame++,this.frame===this.frames.length&&(this.frame=0)),z.context.drawImage(this.image,this.frames[this.frame].x,this.frames[this.frame].y,this.frameWidth,this.frameHeight,this.x,this.y,this.frameWidth,this.frameHeight)}},w=class{constructor(t="",e=0,i=0,s){this.x=e,this.y=i,this.weight=s.weight||"normal",this.style=s.style||"normal",this.size=s.size||24,this.family=s.family||"Arial",this.color=s.color||"#00ff00",this.strokeColor=s.strokeColor||"#00000000",this.strokeWidth=s.strokeWidth||0,this.align=s.align?this.getTextAlign(s.align):"left",this.offsetX=0,this.font=`${this.weight} ${this.style} ${this.size}px ${this.family}, Arial, sans-serif`,this.img=document.createElement("canvas"),this.ctx=this.img.getContext("2d"),this.img.width=this.getTextWidth(t),this.img.height=this.size,this.isExist=!0,this.render(t)}getTextAlign(t){switch(t){case"right":return"right";case"center":return"center";default:return"left"}}getTextWidth(t){return this.ctx.font=this.font,this.ctx.measureText(t||" ").width}render(t){this.ctx.clearRect(0,0,this.img.width,this.img.height),this.img.width=this.getTextWidth(t),"right"===this.align&&(this.offsetX=this.img.width),"center"===this.align&&(this.offsetX=Math.floor(this.img.width/2)),this.ctx.font=this.font,console.log(this.font),this.ctx.textBaseline="top",this.ctx.textAlign=this.align,this.ctx.fillStyle=this.color,this.ctx.fillText(t||" ",this.offsetX,0),this.strokeWidth&&(this.ctx.strokeStyle=this.strokeColor,this.ctx.lineWidth=this.strokeWidth,this.ctx.strokeText(t||" ",this.offsetX,0))}draw(t){t.drawImage(this.img,this.x-this.offsetX,this.y)}},T=(e.tokenBoat,e.tokenButton,e.tokenCap,e.tokenCoin,e.tokenCrystal,e.tokenEye,e.tokenPlane,e.tokenShark,e.tokenSkull,e.tokenStone,e.tokenToy,e.tokenUfo,e.tokenWheel,{players:[{isUsed:!0,isBot:!1,tokenIndex:0},{isUsed:!0,isBot:!0,tokenIndex:0},{isUsed:!1,isBot:!0,tokenIndex:0},{isUsed:!1,isBot:!0,tokenIndex:0}],music:!0,effects:!0}),_=document.querySelector(".first");document.querySelector(".second").innerHTML="VERSION: 0.0.20",function(t){let s=Object.keys(e).length+Object.keys(i).length;for(const t in e){const i=new Image;i.src="./src/images/"+e[t],i.onload=()=>{e[t]=i,a()}}for(const t in i){const e=new Audio("./src/sounds/"+i[t]);e.oncanplaythrough=s=>{s.target.oncanplaythrough=null,i[t]=e,a()}}function a(){s--,s||t()}}(C),new b("timers",0);const E=new b("board",1),M=new b("dices",2),R=(new b("players",3),new b("tokens",4),new b("menu",5)),A={isInit:!1,isStart:!1,players:[],currentTurn:0,board:null,dices:[],isEnd:!1,nextTurn(){if(this.isEnd)return this.end();this.currentTurn++,this.currentTurn===this.players.length&&(this.currentTurn=0),_.innerHTML=`CURRENT TURN: PLAYER ${A.currentTurn}`,this.players[this.currentTurn].startTurn()},end(){_.innerHTML=`PLAYER ${this.currentTurn} WIN!`}};function C(){A.isInit=!0,_.innerHTML="Preparing game . . .";const t=new class{constructor(t=T){this.state=t,this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.canvas.width=z.width,this.canvas.height=z.height,this.underlay1={x:z.x-270,y:z.y-90},this.underlay2={x:z.x+270,y:z.y-90},this.underlay3={x:z.x-270,y:z.y+90},this.underlay4={x:z.x+270,y:z.y+90},this.buttonText=new w("START",z.x,z.y+250,{size:80,family:"clip",weight:"600",color:"#ff00bc",align:"center"}),this.labelText=new w("PARCHIS",z.x,z.y-600,{size:360,family:"clip",weight:"600",color:"#00f66c",align:"center"}),this.render()}render(){this.labelText.draw(this.context),this.context.drawImage(e.pointerPlayerH,0,0,480,120,this.underlay1.x-240,this.underlay1.y-60,480,120),this.context.drawImage(e.pointerPlayerH,0,0,480,120,this.underlay2.x-240,this.underlay2.y-60,480,120),this.context.drawImage(e.pointerPlayerH,0,0,480,120,this.underlay3.x-240,this.underlay3.y-60,480,120),this.context.drawImage(e.pointerPlayerH,0,0,480,120,this.underlay4.x-240,this.underlay4.y-60,480,120),this.context.drawImage(e.menuPlayer,this.underlay1.x-90-60,this.underlay1.y-60,120,120),this.context.drawImage(e.tokenCap,this.underlay1.x+90-60,this.underlay1.y-60,120,120),this.context.drawImage(e.menuComputer,this.underlay2.x-90-60,this.underlay2.y-60,120,120),this.context.drawImage(e.tokenCoin,this.underlay2.x+90-60,this.underlay2.y-60,120,120),this.context.drawImage(e.menuComputer,this.underlay3.x-90-60,this.underlay3.y-60,120,120),this.context.drawImage(e.tokenWheel,this.underlay3.x+90-60,this.underlay3.y-60,120,120),this.context.drawImage(e.menuNoUser,this.underlay4.x-90-60,this.underlay4.y-60,120,120),this.context.drawImage(e.menuRandom,this.underlay4.x+90-60,this.underlay4.y-60,120,120),this.context.drawImage(e.menuMusicOn,this.underlay1.x-90-60,z.y+240,120,120),this.context.drawImage(e.menuButton,z.x-240,z.y+240,480,120),this.context.drawImage(e.menuEffectsOff,this.underlay2.x+90-60,z.y+240,120,120),this.buttonText.draw(this.context),this.context.drawImage(e.menuLogo,this.canvas.width-512-a,this.canvas.height-154-a)}update(){z.context.drawImage(this.canvas,0,0)}};R.add(t),console.log("initGame")}z.canvas.onclick=function(t){const i=t.offsetX*z.sizeRate,h=t.offsetY*z.sizeRate;A.isStart?function(t,e){if(A.players[A.currentTurn].isBot)return;const i=[];let a=!0;if(A.players[A.currentTurn].tokens.forEach((t=>{t.isAvailable&&(i.push(t),t.container!==t.reserve&&(a=!1))})),0!==i.length)if(1!==i.length){for(let a=0;a<i.length;a++){const r=t-i[a].x,h=e-i[a].y;if(Math.sqrt(r*r+h*h)<s/2)return i[a].activation()}a&&i[0].activation()}else i[0].activation()}(i,h):A.isInit&&(R.clear(),function(t){A.isStart=!0,A.board=new class{constructor(){this.image=e.board,this.ceilSize=s,this.imageSize=13*this.ceilSize,this.imageOffset=a+s,this.reserveTop=[{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:5.5,rateY:0},{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:6.5,rateY:0},{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:7.5,rateY:0},{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:8.5,rateY:0}],this.reserveRight=[{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:14,rateY:5.5},{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:14,rateY:6.5},{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:14,rateY:7.5},{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:14,rateY:8.5}],this.reserveBottom=[{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:5.5,rateY:14},{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:6.5,rateY:14},{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:7.5,rateY:14},{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:8.5,rateY:14}],this.reserveLeft=[{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:0,rateY:5.5},{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:0,rateY:6.5},{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:0,rateY:7.5},{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:0,rateY:8.5}],this.reserves=[this.reserveTop,this.reserveRight,this.reserveBottom,this.reserveLeft],this.toiletTop=[{token:null,move:1,x:0,y:0,rateX:10,rateY:2},{token:null,move:3,x:0,y:0,rateX:11,rateY:2},{token:null,move:6,targetIndex:11,x:0,y:0,rateX:12,rateY:2}],this.toiletRight=[{token:null,move:1,x:0,y:0,rateX:12,rateY:10},{token:null,move:3,x:0,y:0,rateX:12,rateY:11},{token:null,move:6,targetIndex:23,x:0,y:0,rateX:12,rateY:12}],this.toiletBottom=[{token:null,move:1,x:0,y:0,rateX:4,rateY:12},{token:null,move:3,x:0,y:0,rateX:3,rateY:12},{token:null,move:6,targetIndex:35,x:0,y:0,rateX:2,rateY:12}],this.toiletLeft=[{token:null,move:1,x:0,y:0,rateX:2,rateY:4},{token:null,move:3,x:0,y:0,rateX:2,rateY:3},{token:null,move:6,targetIndex:47,x:0,y:0,rateX:2,rateY:2}],this.toilets=[this.toiletTop,this.toiletRight,this.toiletBottom,this.toiletLeft],this.homeTop=[{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:7,rateY:2},{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:7,rateY:3},{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:7,rateY:4},{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:7,rateY:5}],this.homeRight=[{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:12,rateY:7},{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:11,rateY:7},{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:10,rateY:7},{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:9,rateY:7}],this.homeBottom=[{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:7,rateY:12},{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:7,rateY:11},{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:7,rateY:10},{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:7,rateY:9}],this.homeLeft=[{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:2,rateY:7},{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:3,rateY:7},{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:4,rateY:7},{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:5,rateY:7}],this.homes=[this.homeTop,this.homeRight,this.homeBottom,this.homeLeft],this.ports=[{type:"topLeft",targetIndex:44,x:0,y:0,rateX:5,rateY:5},{type:"topRight",targetIndex:16,x:0,y:0,rateX:9,rateY:5},{type:"rightTop",targetIndex:8,x:0,y:0,rateX:9,rateY:5},{type:"rightBottom",targetIndex:28,x:0,y:0,rateX:9,rateY:9},{type:"bottomRight",targetIndex:20,x:0,y:0,rateX:9,rateY:9},{type:"bottomLeft",targetIndex:40,x:0,y:0,rateX:5,rateY:9},{type:"leftBottom",targetIndex:32,x:0,y:0,rateX:5,rateY:9},{type:"leftTop",targetIndex:4,x:0,y:0,rateX:5,rateY:5}],this.ceils=[{type:"corner",x:0,y:0,rateX:1,rateY:1},{type:"empty",x:0,y:0,rateX:2,rateY:1},{type:"empty",x:0,y:0,rateX:3,rateY:1},{type:"empty",x:0,y:0,rateX:4,rateY:1},{type:"port",targetIndex:0,x:0,y:0,rateX:5,rateY:1},{type:"empty",x:0,y:0,rateX:6,rateY:1},{type:"home",targetIndex:0,x:0,y:0,rateX:7,rateY:1},{type:"empty",x:0,y:0,rateX:8,rateY:1},{type:"port",targetIndex:1,x:0,y:0,rateX:9,rateY:1},{type:"toilet",targetIndex:0,x:0,y:0,rateX:10,rateY:1},{type:"empty",x:0,y:0,rateX:11,rateY:1},{type:"exit",x:0,y:0,rateX:12,rateY:1},{type:"corner",x:0,y:0,rateX:13,rateY:1},{type:"empty",x:0,y:0,rateX:13,rateY:2},{type:"empty",x:0,y:0,rateX:13,rateY:3},{type:"empty",x:0,y:0,rateX:13,rateY:4},{type:"port",targetIndex:2,x:0,y:0,rateX:13,rateY:5},{type:"empty",x:0,y:0,rateX:13,rateY:6},{type:"home",targetIndex:1,x:0,y:0,rateX:13,rateY:7},{type:"empty",x:0,y:0,rateX:13,rateY:8},{type:"port",targetIndex:3,x:0,y:0,rateX:13,rateY:9},{type:"toilet",targetIndex:1,x:0,y:0,rateX:13,rateY:10},{type:"empty",x:0,y:0,rateX:13,rateY:11},{type:"exit",x:0,y:0,rateX:13,rateY:12},{type:"corner",x:0,y:0,rateX:13,rateY:13},{type:"empty",x:0,y:0,rateX:12,rateY:13},{type:"empty",x:0,y:0,rateX:11,rateY:13},{type:"empty",x:0,y:0,rateX:10,rateY:13},{type:"port",targetIndex:4,x:0,y:0,rateX:9,rateY:13},{type:"empty",x:0,y:0,rateX:8,rateY:13},{type:"home",targetIndex:2,x:0,y:0,rateX:7,rateY:13},{type:"empty",x:0,y:0,rateX:6,rateY:13},{type:"port",targetIndex:5,x:0,y:0,rateX:5,rateY:13},{type:"toilet",targetIndex:2,x:0,y:0,rateX:4,rateY:13},{type:"empty",x:0,y:0,rateX:3,rateY:13},{type:"exit",x:0,y:0,rateX:2,rateY:13},{type:"corner",x:0,y:0,rateX:1,rateY:13},{type:"empty",x:0,y:0,rateX:1,rateY:12},{type:"empty",x:0,y:0,rateX:1,rateY:11},{type:"empty",x:0,y:0,rateX:1,rateY:10},{type:"port",targetIndex:6,x:0,y:0,rateX:1,rateY:9},{type:"empty",x:0,y:0,rateX:1,rateY:8},{type:"home",targetIndex:3,x:0,y:0,rateX:1,rateY:7},{type:"empty",x:0,y:0,rateX:1,rateY:6},{type:"port",targetIndex:7,x:0,y:0,rateX:1,rateY:5},{type:"toilet",targetIndex:3,x:0,y:0,rateX:1,rateY:4},{type:"empty",x:0,y:0,rateX:1,rateY:3},{type:"exit",x:0,y:0,rateX:1,rateY:2}],this.init()}init(){const t=.5*this.ceilSize+a;[...this.reserves,...this.toilets,...this.homes,this.ports,this.ceils].forEach((e=>{e.forEach((e=>{e.x=t+this.ceilSize*e.rateX,e.y=t+this.ceilSize*e.rateY}))}))}update(){z.context.drawImage(this.image,this.imageOffset,this.imageOffset,this.imageSize,this.imageSize)}},E.add(A.board),A.dices.push(new P(z.x-63,z.y-63)),A.dices.push(new P(z.x+63,z.y+63)),A.dices.forEach((t=>M.add(t)));const i=[e.tokenBoat,e.tokenButton,e.tokenCap,e.tokenCoin,e.tokenCrystal,e.tokenEye,e.tokenPlane,e.tokenShark,e.tokenSkull,e.tokenStone,e.tokenToy,e.tokenUfo,e.tokenWheel];i.sort((()=>Math.random()-.5)),A.players.push(new Y(i.pop(),0,!0)),A.players.push(new Y(i.pop(),1,!0)),A.players.push(new Y(i.pop(),2,!1)),A.players.push(new Y(i.pop(),3,!0)),A.currentTurn=Math.floor(Math.random()*A.players.length),new X((()=>A.nextTurn()),r)}())},document.body.addEventListener("click",C,!0),document.body.removeEventListener("click",C,!0)})();