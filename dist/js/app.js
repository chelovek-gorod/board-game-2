(()=>{"use strict";var t={d:(e,i)=>{for(var s in i)t.o(i,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};t.d({},{H:()=>O});const e="./src/music/",i={halp1:"help_01_920x920px.png",halp2:"help_02_920x920px.png",halp3:"help_03_920x920px.png",halp4:"help_04_920x920px.png",halp5:"help_05_920x920px.png",halp6:"help_06_920x920px.png",halp7:"help_07_920x920px.png",halp8:"help_08_920x920px.png",halp9:"help_09_920x920px.png",halp10:"help_10_920x920px.png",halp11:"help_11_920x920px.png",halp12:"help_12_920x920px.png",menuLogo:"MarsGameLogoDarkBg.png",menuButton:"options_button_128x128px.png",menuButtonLock:"options_button_lock_128x128px.png",menuPlayer:"use_player_128x128px.png",menuComputer:"use_computer_128x128px.png",menuNoUser:"use_no_128x128px.png",menuRandom:"use_random_128x128px.png",menuMusicOn:"options_music_on_128x128px.png",menuMusicOff:"options_music_off_128x128px.png",menuEffectsOn:"options_effects_on_128x128px.png",menuEffectsOff:"options_effects_off_128x128px.png",board:"game_map_1800x1800px.png",dice:"dices_84x84px_mixed_frames.png",dicePointer:"pointer_dice_160x160px.png",pointerPlayerH:"turn_bw_480x120px_32frames.png",pointerPlayerV:"turn_bw_120x480px_32frames.png",tokenPointerHuman:"pointer_token_human_160x160px.png",tokenPointerBot:"pointer_token_bot_160x160px.png",tokenBomb:"token_bomb_128x128px.png",tokenButton:"token_button_128x128px.png",tokenCap:"token_cap_128x128px.png",tokenCoin:"token_coin_128x128px.png",tokenCrystal:"token_crystal_128x128px.png",tokenDragon:"token_dragon_128x128px.png",tokenEye:"token_eye_128x128px.png",tokenHelmet:"token_helmet_128x128px.png",tokenMask:"token_mask_128x128px.png",tokenMolecule:"token_molecule_128x128px.png",tokenMoon:"token_moon_128x128px.png",tokenNut:"token_nut_128x128px.png",tokenPlane:"token_plane_128x128px.png",tokenShark:"token_shark_128x128px.png",tokenShield:"token_shield_128x128px.png",tokenSkull:"token_skull_128x128px.png",tokenStone:"token_stone_128x128px.png",tokenToy:"token_toy_128x128px.png",tokenUfo:"token_ufo_128x128px.png",tokenWheel:"token_wheel_128x128px.png"},s={menuToken:"se_menu_click.mp3",menuClick:"se_menu_token.mp3",menuEffects:"se_menu_effects.mp3",menuMusic:"se_menu_music.mp3",menuStart:"se_menu_start.mp3",dice:"se_dices.mp3",dice2:"se_dices2.mp3",startToken:"se_start_token.mp3",step0:"se_step_0.mp3",step1:"se_step_1.mp3",step2:"se_step_2.mp3",step3:"se_step_3.mp3",toiletStart:"se_toilet_start.mp3",toilet0:"se_toilet_0.mp3",toilet1:"se_toilet_1.mp3",toilet2:"se_toilet_2.mp3",toilet3:"se_toilet_3.mp3",toiletExit:"se_toilet_exit.mp3",home:"se_home.mp3",corner:"se_corner.mp3",port:"se_port.mp3",destroy:"se_destroy.mp3",win:"se_final_win.mp3",lose:"se_final_lose.mp3"},a={files:0,loaded:0},h={version:"1.0.0",ceilSize:120,boardOffset:20,gameStartDuration:2500,diceThrowDuration:1e3,diceActiveDuration:800,tokenStepDuration:600,tokenPointerScaleDuration:600};class n{static instance;constructor(){if(n.instance)return n.instance;this.canvas=document.getElementById("canvas"),this.width=this.canvas.width=15*h.ceilSize+2*h.boardOffset,this.height=this.canvas.height=15*h.ceilSize+2*h.boardOffset,this.sizeRate=1,this.size=0,this.x=Math.round(this.width/2),this.y=Math.round(this.height/2),this.context=this.canvas.getContext("2d"),this.layers=[],n.instance=this,this.resize()}resize(){this.size=innerWidth>innerHeight?innerHeight:innerWidth,this.sizeRate=this.width/this.size}getLayer(t){return this.layers.find((e=>e.name===t))}}const r=n,o={music:!0,effects:!0},l=["bgm_western_0.mp3","bgm_western_1.mp3","bgm_western_2.mp3","bgm_western_3.mp3","bgm_western_4.mp3"];l.sort((()=>Math.random()-.5));let c=Math.floor(Math.random()*l.length);const d=new Audio;function y(t){const e=o.music;o.music=t.music,o.effects=t.effects,e!==o.music&&(o.music?u():u(!1))}d.addEventListener("ended",u);let p=Math.floor(4*Math.random()),m=Math.floor(4*Math.random());function x(t){if(o.effects)if("string"!=typeof t)t.currentTime=0,t.play();else switch(t){case"step":s["step"+p].play(),p++,p>3&&(p=0);break;case"toilet":s["toilet"+m].play(),m++,m>3&&(m=0)}}function u(t=!0){t?(d.src=e+l[c],d.volume=.4,d.play(),c++,c===l.length&&(c=0)):d.pause()}const g=new r,f=document.getElementById("shell");I();let k=!0,b=!1;const w=document.getElementById("help"),P=document.getElementById("imageHalp");function I(){f.style.display="flex",f.innerHTML="<div><nobr>КЛИКНИТЕ</nobr> ПО ЭКРАНУ <nobr>ДЛЯ ПРОДОЛЖЕНИЯ</nobr></div>",u(!1)}function _(){I(),k=!1,cancelAnimationFrame(T)}document.body.onresize=()=>{g.resize(),document.fullscreenEnabled&&!document.fullscreenElement&&_(),w.style.opacity=0,w.style.display="none",P.innerHTML=""},f.onclick=()=>{f.style.display="none",u(),k=!0,S=performance.now(),T=requestAnimationFrame(z),document.fullscreenEnabled&&!document.fullscreenElement&&document.body.requestFullscreen(),b||(b=!0,g.canvas.style.opacity=1)},document.body.onblur=_;let S=performance.now(),T=requestAnimationFrame(z);function z(t){const e=t-S;S=t,g.context.clearRect(0,0,g.width,g.height),g.layers.forEach((t=>t.update(e))),k&&(T=requestAnimationFrame(z))}const v=g,X=class{constructor(){this.image=i.board,this.ceilSize=h.ceilSize,this.imageSize=13*this.ceilSize,this.imageOffset=h.boardOffset+h.ceilSize,this.reserveTop=[{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:5.5,rateY:0},{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:6.5,rateY:0},{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:7.5,rateY:0},{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:8.5,rateY:0}],this.reserveRight=[{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:14,rateY:5.5},{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:14,rateY:6.5},{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:14,rateY:7.5},{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:14,rateY:8.5}],this.reserveBottom=[{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:5.5,rateY:14},{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:6.5,rateY:14},{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:7.5,rateY:14},{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:8.5,rateY:14}],this.reserveLeft=[{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:0,rateY:5.5},{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:0,rateY:6.5},{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:0,rateY:7.5},{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:0,rateY:8.5}],this.reserves=[this.reserveTop,this.reserveRight,this.reserveBottom,this.reserveLeft],this.toiletTop=[{token:null,move:1,x:0,y:0,rateX:10,rateY:2},{token:null,move:3,x:0,y:0,rateX:11,rateY:2},{token:null,move:6,targetIndex:11,x:0,y:0,rateX:12,rateY:2}],this.toiletRight=[{token:null,move:1,x:0,y:0,rateX:12,rateY:10},{token:null,move:3,x:0,y:0,rateX:12,rateY:11},{token:null,move:6,targetIndex:23,x:0,y:0,rateX:12,rateY:12}],this.toiletBottom=[{token:null,move:1,x:0,y:0,rateX:4,rateY:12},{token:null,move:3,x:0,y:0,rateX:3,rateY:12},{token:null,move:6,targetIndex:35,x:0,y:0,rateX:2,rateY:12}],this.toiletLeft=[{token:null,move:1,x:0,y:0,rateX:2,rateY:4},{token:null,move:3,x:0,y:0,rateX:2,rateY:3},{token:null,move:6,targetIndex:47,x:0,y:0,rateX:2,rateY:2}],this.toilets=[this.toiletTop,this.toiletRight,this.toiletBottom,this.toiletLeft],this.homeTop=[{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:7,rateY:2},{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:7,rateY:3},{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:7,rateY:4},{isEmpty:!0,targetIndex:6,x:0,y:0,rateX:7,rateY:5}],this.homeRight=[{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:12,rateY:7},{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:11,rateY:7},{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:10,rateY:7},{isEmpty:!0,targetIndex:18,x:0,y:0,rateX:9,rateY:7}],this.homeBottom=[{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:7,rateY:12},{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:7,rateY:11},{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:7,rateY:10},{isEmpty:!0,targetIndex:30,x:0,y:0,rateX:7,rateY:9}],this.homeLeft=[{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:2,rateY:7},{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:3,rateY:7},{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:4,rateY:7},{isEmpty:!0,targetIndex:42,x:0,y:0,rateX:5,rateY:7}],this.homes=[this.homeTop,this.homeRight,this.homeBottom,this.homeLeft],this.ports=[{type:"topLeft",targetIndex:44,x:0,y:0,rateX:5,rateY:5},{type:"topRight",targetIndex:16,x:0,y:0,rateX:9,rateY:5},{type:"rightTop",targetIndex:8,x:0,y:0,rateX:9,rateY:5},{type:"rightBottom",targetIndex:28,x:0,y:0,rateX:9,rateY:9},{type:"bottomRight",targetIndex:20,x:0,y:0,rateX:9,rateY:9},{type:"bottomLeft",targetIndex:40,x:0,y:0,rateX:5,rateY:9},{type:"leftBottom",targetIndex:32,x:0,y:0,rateX:5,rateY:9},{type:"leftTop",targetIndex:4,x:0,y:0,rateX:5,rateY:5}],this.ceils=[{type:"corner",x:0,y:0,rateX:1,rateY:1},{type:"empty",x:0,y:0,rateX:2,rateY:1},{type:"empty",x:0,y:0,rateX:3,rateY:1},{type:"empty",x:0,y:0,rateX:4,rateY:1},{type:"port",targetIndex:0,x:0,y:0,rateX:5,rateY:1},{type:"empty",x:0,y:0,rateX:6,rateY:1},{type:"home",targetIndex:0,x:0,y:0,rateX:7,rateY:1},{type:"empty",x:0,y:0,rateX:8,rateY:1},{type:"port",targetIndex:1,x:0,y:0,rateX:9,rateY:1},{type:"toilet",targetIndex:0,x:0,y:0,rateX:10,rateY:1},{type:"empty",x:0,y:0,rateX:11,rateY:1},{type:"exit",x:0,y:0,rateX:12,rateY:1},{type:"corner",x:0,y:0,rateX:13,rateY:1},{type:"empty",x:0,y:0,rateX:13,rateY:2},{type:"empty",x:0,y:0,rateX:13,rateY:3},{type:"empty",x:0,y:0,rateX:13,rateY:4},{type:"port",targetIndex:2,x:0,y:0,rateX:13,rateY:5},{type:"empty",x:0,y:0,rateX:13,rateY:6},{type:"home",targetIndex:1,x:0,y:0,rateX:13,rateY:7},{type:"empty",x:0,y:0,rateX:13,rateY:8},{type:"port",targetIndex:3,x:0,y:0,rateX:13,rateY:9},{type:"toilet",targetIndex:1,x:0,y:0,rateX:13,rateY:10},{type:"empty",x:0,y:0,rateX:13,rateY:11},{type:"exit",x:0,y:0,rateX:13,rateY:12},{type:"corner",x:0,y:0,rateX:13,rateY:13},{type:"empty",x:0,y:0,rateX:12,rateY:13},{type:"empty",x:0,y:0,rateX:11,rateY:13},{type:"empty",x:0,y:0,rateX:10,rateY:13},{type:"port",targetIndex:4,x:0,y:0,rateX:9,rateY:13},{type:"empty",x:0,y:0,rateX:8,rateY:13},{type:"home",targetIndex:2,x:0,y:0,rateX:7,rateY:13},{type:"empty",x:0,y:0,rateX:6,rateY:13},{type:"port",targetIndex:5,x:0,y:0,rateX:5,rateY:13},{type:"toilet",targetIndex:2,x:0,y:0,rateX:4,rateY:13},{type:"empty",x:0,y:0,rateX:3,rateY:13},{type:"exit",x:0,y:0,rateX:2,rateY:13},{type:"corner",x:0,y:0,rateX:1,rateY:13},{type:"empty",x:0,y:0,rateX:1,rateY:12},{type:"empty",x:0,y:0,rateX:1,rateY:11},{type:"empty",x:0,y:0,rateX:1,rateY:10},{type:"port",targetIndex:6,x:0,y:0,rateX:1,rateY:9},{type:"empty",x:0,y:0,rateX:1,rateY:8},{type:"home",targetIndex:3,x:0,y:0,rateX:1,rateY:7},{type:"empty",x:0,y:0,rateX:1,rateY:6},{type:"port",targetIndex:7,x:0,y:0,rateX:1,rateY:5},{type:"toilet",targetIndex:3,x:0,y:0,rateX:1,rateY:4},{type:"empty",x:0,y:0,rateX:1,rateY:3},{type:"exit",x:0,y:0,rateX:1,rateY:2}],this.init()}init(){const t=.5*this.ceilSize+h.boardOffset;[...this.reserves,...this.toilets,...this.homes,this.ports,this.ceils].forEach((e=>{e.forEach((e=>{e.x=t+this.ceilSize*e.rateX,e.y=t+this.ceilSize*e.rateY}))}))}update(){v.context.drawImage(this.image,this.imageOffset,this.imageOffset,this.imageSize,this.imageSize)}},Y=class{constructor(t,e){this.img=i.dice,this.x=t-42,this.y=e-42,this.frameSize=84,this.throwDuration=h.diceThrowDuration,this.fps=30,this.frameDuration=Math.floor(1e3/this.fps),this.frameTimeout=this.frameDuration,this.framePathSize=Math.floor(this.throwDuration/this.frameDuration),this.framePath=[],this.framePoint={x:0,y:0},this.value=this.getNewValue(),this.pointer=new class{constructor(t){this.image=i.dicePointer,this.x=t.x+41,this.y=t.y+41,this.scaleDuration=h.diceActiveDuration/2,this.maxSize=160,this.minSize=80,this.scaleRate=(this.maxSize-this.minSize)/this.scaleDuration,this.isScaleUp=!0,this.size=this.minSize,this.halfSize=this.size/2}setMinSize(){this.size=this.minSize,this.halfSize=this.size/2}update(t){this.isScaleUp?(this.size+=this.scaleRate*t,this.size>=this.maxSize&&(this.isScaleUp=!1)):(this.size-=this.scaleRate*t,this.size<=this.minSize&&(this.isScaleUp=!0)),this.halfSize=this.size/2,v.context.drawImage(this.image,this.x-this.halfSize,this.y-this.halfSize,this.size,this.size)}}(this),this.isActive=!1}getNewValue(){const t=function(){let t=0,e=0;const i=O.players[O.currentTurn];return!!i&&(i.tokens.forEach((i=>{i.container===i.reserve&&t++,i.container===O.board.ceils&&e++})),t>e)}()&&Math.random()<.25?6:Math.ceil(6*Math.random());switch(t){case 1:this.framePoint.x=0,this.framePoint.y=Math.random()<.5?4*this.frameSize:12*this.frameSize;break;case 2:this.framePoint.x=4*this.frameSize,this.framePoint.y=Math.random()<.5?4*this.frameSize:12*this.frameSize;break;case 5:this.framePoint.x=12*this.frameSize,this.framePoint.y=Math.random()<.5?4*this.frameSize:12*this.frameSize;break;case 6:this.framePoint.x=8*this.frameSize,this.framePoint.y=Math.random()<.5?4*this.frameSize:12*this.frameSize;break;case 3:this.framePoint.x=4*Math.floor(4*Math.random())*this.frameSize,this.framePoint.y=0;break;case 4:this.framePoint.x=4*Math.floor(4*Math.random())*this.frameSize,this.framePoint.y=8*this.frameSize;break;default:t=6}return t}throw(){if(this.framePath.length)return 0;let t="";for(;t.length<this.framePathSize;)t+=(""+Math.random()).slice(2);this.value=this.getNewValue(),this.framePath.push(this.framePoint);let e=Math.floor(8*Math.random()),{x:i,y:s}=this.framePoint;const a=15*this.frameSize;for(let h=0;h<this.framePathSize;h++)0!==e&&4!==e&&(i+=e<4?this.frameSize:-this.frameSize,i<0&&(i=a),i>a&&(i=0)),2!==e&&6!==e&&(s+=e>2&&e<6?this.frameSize:-this.frameSize,s<0&&(s=a),s>a&&(s=0)),this.framePath.push({x:i,y:s}),+t[h]<2&&(e--,e<0&&(e=7)),+t[h]>7&&(e++,e>7&&(e=0))}update(t){this.isActive&&this.pointer.update(t),this.framePath.length&&(this.frameTimeout-=t,this.frameTimeout<=0&&(this.frameTimeout+=this.frameDuration,this.framePoint=this.framePath.pop())),v.context.drawImage(this.img,this.framePoint.x,this.framePoint.y,this.frameSize,this.frameSize,this.x,this.y,this.frameSize,this.frameSize)}};let E=0;const B=class{constructor(t="",e=v.layers.length,i=[]){this.name=t||"layer"+E++,this.zIndex=e,this.objects=i,e===v.layers.length?v.layers.push(this):(v.layers.splice(e,0,this),v.layers.forEach(((t,e)=>t.zIndex=e)))}update(t){this.objects.forEach((e=>e.update(t)))}remove(t){this.objects=this.objects.filter((e=>e!==t))}add(t){this.objects.push(t)}moveUp(t){this.objects=this.objects.filter((e=>e!==t)),this.objects.push(t)}clear(){this.objects=[]}},M=class{constructor(t,e){this.callback=t,this.milliseconds=e,v.layers[0].add(this)}update(t){this.milliseconds-=t,this.milliseconds<=0&&(setTimeout((()=>this.callback()),0),v.layers[0].remove(this))}},C=class{constructor(t){this.player=t,this.image=t.tokenImage,this.maxSize=128,this.minSize=96,this.size=this.minSize,this.halfSize=this.size/2,this.startPoint=t.startPoint,this.reserve=O.board.reserves[t.startPoint],this.home=O.board.homes[t.startPoint],this.container=this.reserve,this.index=this.player.tokens.length,this.x=this.container[this.index].x,this.y=this.container[this.index].y,this.stepDuration=h.tokenStepDuration,this.halfStepDuration=this.stepDuration/2,this.sizeRate=(this.maxSize-this.minSize)/this.halfStepDuration,this.stepTimeout=this.stepDuration,this.speed=0,this.steps=0,this.direction=0,this.target=null,this.path=[],this.isGoHome=!1,this.isBot=t.isBot,this.pointer=new class{constructor(t,e){this.image=e?i.tokenPointerBot:i.tokenPointerHuman,this.scaleDuration=h.tokenPointerScaleDuration,this.maxSize=148,this.minSize=120,this.size=this.minSize+(this.maxSize-this.minSize)/4*t,this.halfSize=this.size/2,this.scaleRate=(this.maxSize-this.minSize)/this.scaleDuration,this.direction=0,this.isScaleUp=!0}draw(t,e){this.isScaleUp?(this.size+=this.scaleRate*e,this.size>=this.maxSize&&(this.isScaleUp=!1,this.size=this.maxSize)):(this.size-=this.scaleRate*e,this.size<=this.minSize&&(this.isScaleUp=!0,this.size=this.minSize)),this.halfSize=this.size/2,v.context.drawImage(this.image,t.x-this.halfSize,t.y-this.halfSize,this.size,this.size)}}(this.index,this.isBot),this.isAvailable=!1,this.isActive=!1}checkCeilAllTokens(t,e){const i=O.players.length;for(let s=0;s<i;s++){const i=this.checkCeilPlayerTokens(t,e,O.players[s]);if(i)return i}return!1}checkCeilPlayerTokens(t,e,i=this.player){const s=i.tokens.length;for(let a=0;a<s;a++){const s=i.tokens[a];if(s.container===t&&s.index===e&&s!==this)return s}return!1}getPath(t){switch(this.path=[],this.container){case this.reserve:this.checkPathFromReserve(t);break;case O.board.toiletTop:case O.board.toiletRight:case O.board.toiletBottom:case O.board.toiletLeft:this.checkPathInToilet(t);break;case this.home:this.checkPathInHome(t);break;default:this.checkPathInMainBoard(t)}this.path.length?this.isAvailable=!0:this.isAvailable=!1}checkPathFromReserve(t){6===t&&(this.checkCeilPlayerTokens(O.board.ceils,this.reserve[0].targetIndex)||(this.isGoHome=!1,this.addPathPoint(O.board.ceils,this.reserve[0].targetIndex)))}checkPathInToilet(t){t===this.container[this.index].move&&("targetIndex"in this.container[this.index]?this.addPathPoint(O.board.ceils,this.container[this.index].targetIndex):this.addPathPoint(this.container,this.index+1))}checkPathInHome(t,e=this.index){const i=this.home.length-1-e;if(i<=0||t>i)return this.path=[];const s=e+t;for(let t=e+1;t<=s;t++){if(this.checkCeilPlayerTokens(this.home,t))return this.path=[];this.addPathPoint(this.home,t)}}checkPathInMainBoard(t){if(this.isGoHome&&"home"===O.board.ceils[this.index].type&&O.board.ceils[this.index].targetIndex===this.startPoint)return this.checkCeilPlayerTokens(this.home,0)?this.path=[]:(this.addPathPoint(this.home,0),void this.checkPathInHome(t-1,0));let e=this.isGoHome,i=this.index;for(;t>0;){i++,i>=O.board.ceils.length&&(i=0);const s=this.container[i].type;if("corner"===s&&this.checkCeilAllTokens(O.board.ceils,i))return this.path=[];if("home"===s&&e&&O.board.ceils[i].targetIndex===this.startPoint)return this.checkCeilAllTokens(O.board.ceils,i)||this.checkCeilPlayerTokens(this.home,0)?this.path=[]:(this.addPathPoint(O.board.ceils,i),void(t>1&&(this.addPathPoint(this.home,0),t>2&&this.checkPathInHome(t-2,0))));if(t>1){if(this.checkCeilAllTokens(O.board.ceils,i))return this.path=[];this.addPathPoint(O.board.ceils,i)}else{if(this.checkCeilPlayerTokens(O.board.ceils,i))return this.path=[];switch(s){case"port":const t=O.board.ceils[i].targetIndex,e=O.board.ports[t].targetIndex;if(this.checkCeilPlayerTokens(O.board.ceils,e))return this.path=[];this.addPathPoint(O.board.ceils,i),this.addPathPoint(O.board.ports,t),this.addPathPoint(O.board.ceils,e);break;case"toilet":const s=O.board.ceils[i].targetIndex;this.addPathPoint(O.board.ceils,i),this.addPathPoint(O.board.toilets[s],0);break;default:this.addPathPoint(O.board.ceils,i)}}t--}}addPathPoint(t,e){this.path.push({container:t,index:e,x:t[e].x,y:t[e].y})}pushPathInToilet(){this.path=[],"targetIndex"in this.container[this.index]?this.addPathPoint(O.board.ceils,this.container[this.index].targetIndex):this.addPathPoint(this.container,this.index+1),this.startStep()}pushPathToReserve(){this.path=[];const t=this.reserve.length,e=new Array(t);this.player.tokens.forEach((t=>{t.container===this.reserve&&(e[t.index]=!0)}));for(let i=0;i<t;i++)if(!e[i]){this.addPathPoint(this.reserve,i);break}x(s.destroy),this.startStep()}activation(){this.isAvailable&&(this.player.tokens.forEach((t=>t.isAvailable=!1)),this.isActive=!0,this.startStep())}startStep(){if(this.player.layer.moveUp(this),this.target=this.path.shift(),this.target.container===O.board.toiletTop||this.target.container===O.board.toiletRight||this.target.container===O.board.toiletBottom||this.target.container===O.board.toiletLeft){const t=this.checkCeilAllTokens(this.target.container,this.target.index);t&&t.pushPathInToilet()}this.setDirection();const t=this.getDistance();switch(this.speed=t/this.stepDuration,this.container){case this.reserve:x(s.startToken);break;case O.board.toiletTop:case O.board.toiletRight:case O.board.toiletBottom:case O.board.toiletLeft:this.target.container===O.board.ceils?x(s.toiletExit):x("toilet");break;default:this.target.container!==O.board.toiletTop&&this.target.container!==O.board.toiletRight&&this.target.container!==O.board.toiletBottom&&this.target.container!==O.board.toiletLeft||x(s.toiletStart),this.target.container===O.board.ports&&x(s.port)}}setDirection(){this.direction=Math.atan2(this.target.y-this.y,this.target.x-this.x)}getDistance(){let t=this.target.x-this.x,e=this.target.y-this.y;return Math.sqrt(t*t+e*e)}move(t){this.x+=Math.cos(this.direction)*t,this.y+=Math.sin(this.direction)*t}endStep(){if(this.size=this.minSize,this.halfSize=this.size/2,this.stepTimeout=this.stepDuration,this.container=this.target.container,this.index=this.target.index,this.x=this.target.x,this.y=this.target.y,this.target=null,this.container===O.board.ceils){const t=this.checkCeilAllTokens(O.board.ceils,this.index);t&&t.pushPathToReserve()}this.container===this.home&&0===this.index?x(s.home):x("step"),this.path.length?this.startStep():this.endMove()}endMove(){if(this.isGoHome||this.container===O.board.ceils&&this.index===this.reserve[0].targetIndex||(this.isGoHome=!0),this.container===this.home){let t=!0;this.player.tokens.forEach((e=>{e.container!==this.home&&(t=!1)})),t&&(O.isEnd=!0)}if(this.container===O.board.ceils&&"corner"===this.container[this.index].type){x(s.corner);let t=!0;this.player.tokens.forEach((e=>{e.container===O.board.ceils&&"corner"===e.container[e.index].type||(t=!1)})),t&&(O.isEnd=!0)}this.isActive&&(this.isActive=!1,new M((()=>this.player.diceFinished()),1e3))}update(t){this.isAvailable&&this.pointer.draw({x:this.x,y:this.y},t),this.target&&(this.stepTimeout-=t,this.stepTimeout>this.halfStepDuration?this.size+=this.sizeRate*t:this.size-=this.sizeRate*t,this.halfSize=this.size/2,this.stepTimeout>0?this.move(t*this.speed):this.endStep()),v.context.drawImage(this.image,this.x-this.halfSize,this.y-this.halfSize,this.size,this.size)}},D=class{constructor(t,e,s){this.getPointerPosition(e),this.image=e%2==0?i.pointerPlayerH:i.pointerPlayerV,this.tokenImage=t,this.frameWidth=e%2==0?480:120,this.frameHeight=e%2==0?120:480,this.frame=0,this.fps=30,this.frameDuration=Math.floor(1e3/this.fps),this.frameTimeout=this.frameDuration,this.frames=this.getFrames(),this.dices=[],this.dice=null,this.isGetDouble=!1,this.turns=0,this.startPoint=e,this.tokens=[],this.isBot=s,this.layer=v.getLayer("players"),this.generateTokens()}getPointerPosition(t){t%2==0?(this.x=h.boardOffset+5.5*h.ceilSize,this.y=0===t?h.boardOffset:h.boardOffset+14*h.ceilSize):(this.y=h.boardOffset+5.5*h.ceilSize,this.x=3===t?h.boardOffset:h.boardOffset+14*h.ceilSize)}getFrames(){const t=[];for(let e=0;e<this.image.height;e+=this.frameHeight)for(let i=0;i<this.image.width;i+=this.frameWidth)t.push({x:i,y:e});return t}generateTokens(){const t=v.getLayer("tokens");for(let e=0;e<4;e++){const e=new C(this);this.tokens.push(e),t.add(e)}}startTurn(){this.layer.add(this),this.throwDices()}throwDices(){this.turns++,x(s.dice2),O.dices.forEach((t=>t.throw())),this.isGetDouble=O.dices[0].value===O.dices[1].value,O.dices[0].value>=O.dices[1].value?this.dices=[1,0]:this.dices=[0,1],new M((()=>this.useDice()),h.diceThrowDuration)}useDice(){this.dice=O.dices[this.dices.pop()],this.dice.isActive=!0;const t=[];this.tokens.forEach((e=>{e.getPath(this.dice.value),e.isAvailable&&t.push(e)})),t.length?this.isBot&&new M((()=>this.botActivation(t)),h.diceActiveDuration):new M((()=>this.diceFinished()),h.diceActiveDuration)}botActivation(t){if(1===t.length)return void t[0].activation();const e=[],i=[],s=[];t.sort((()=>Math.random()-.5));for(let a=0;a<t.length;a++){const h=t[a],n=h.path[h.path.length-1];O.board.toilets.includes(h.container)&&(h.checkCeilPlayerTokens(O.board.ceils,h.container[2].targetIndex,h.player)?console.log("MOVE IN TOILET AND FRIENDLY TOKEN ON EXIT"):console.log("JUST MOVE IN TOILET")),h.container===h.reserve||n.container===O.board.ceils&&"corner"===n.container[n.index].type||n.container===h.home||n.container===O.board.ceils&&"port"===n.container[n.index].type&&n.container[n.index].targetIndex%2==0?e.push(h):O.board.toilets.includes(n.container)&&0===n.index||O.board.toilets.includes(h.container)&&h.checkCeilPlayerTokens(O.board.ceils,h.container[2].targetIndex,h.player)?s.push(h):n.container===O.board.ceils&&"home"===n.container[n.index].type||n.container===O.board.ceils&&"port"===n.container[n.index].type&&n.container[n.index].targetIndex%2==1||this.container===O.board.ceils&&"corner"===this.container[this.index].type?s.unshift(h):n.container===O.board.ceils&&"exit"===n.container[n.index].type?i.push(h):i.unshift(h)}e.length?e[0].activation():i.length?i[0].activation():s[0].activation()}diceFinished(){this.dice.isActive=!1,this.dice.pointer.setMinSize(),this.dices.length&&!O.isEnd?this.useDice():this.isGetDouble&&!O.isEnd&&this.turns<3?this.throwDices():this.endTurn()}endTurn(){this.turns=0,this.layer.remove(this),O.nextTurn()}update(t){this.frameTimeout-=t,this.frameTimeout<=0&&(this.frameTimeout+=this.frameDuration,this.frame++,this.frame===this.frames.length&&(this.frame=0)),v.context.drawImage(this.image,this.frames[this.frame].x,this.frames[this.frame].y,this.frameWidth,this.frameHeight,this.x,this.y,this.frameWidth,this.frameHeight)}},U=class{constructor(t="",e=0,i=0,s){this.x=e,this.y=i,this.weight=s.weight||"normal",this.style=s.style||"normal",this.size=s.size||24,this.family=s.family||"Arial",this.color=s.color||"#00ff00",this.strokeColor=s.strokeColor||"#00000000",this.strokeWidth=s.strokeWidth||0,this.align=s.align?this.getTextAlign(s.align):"left",this.offsetX=0,this.font=`${this.weight} ${this.style} ${this.size}px ${this.family}, Arial, sans-serif`,this.img=document.createElement("canvas"),this.ctx=this.img.getContext("2d"),this.img.width=this.getTextWidth(t),this.img.height=this.size,this.isExist=!0,this.render(t)}getTextAlign(t){switch(t){case"right":return"right";case"center":return"center";default:return"left"}}getTextWidth(t){return this.ctx.font=this.font,this.ctx.measureText(t||" ").width}render(t){this.ctx.clearRect(0,0,this.img.width,this.img.height),this.img.width=this.getTextWidth(t),"right"===this.align&&(this.offsetX=this.img.width),"center"===this.align&&(this.offsetX=Math.floor(this.img.width/2)),this.ctx.font=this.font,this.ctx.textBaseline="top",this.ctx.textAlign=this.align,this.ctx.fillStyle=this.color,this.ctx.fillText(t||" ",this.offsetX,0),this.strokeWidth&&(this.ctx.strokeStyle=this.strokeColor,this.ctx.lineWidth=this.strokeWidth,this.ctx.strokeText(t||" ",this.offsetX,0))}draw(t){t.drawImage(this.img,this.x-this.offsetX,this.y)}};!function(t,e){let h=Object.keys(i).length+Object.keys(s).length;a.files=h;for(const t in i){const e=new Image;e.src="./src/images/"+i[t],e.onload=()=>{i[t]=e,n()}}for(const t in s){const e=new Audio("./src/sounds/"+s[t]);e.oncanplaythrough=i=>{i.target.oncanplaythrough=null,s[t]=e,n()}}function n(){var e;a.loaded++,e=a,L.innerHTML=`Загружено ${e.loaded} / ${e.files} файлов.`,h--,h||t()}}(W);const L=document.querySelector(".second");L.innerHTML="Загрузка...",new B("timers",0);const A=new B("board",1),H=new B("dices",2),R=(new B("players",3),new B("tokens",4),new B("menu",5)),O={tokens:[],menu:null,isStart:!1,players:[],currentTurn:0,board:null,dices:[],isEnd:!1,nextTurn(){if(this.isEnd)return this.end();this.currentTurn++,this.currentTurn===this.players.length&&(this.currentTurn=0),this.players[this.currentTurn].startTurn()},end(){O.isStart=!1;const t=new class{constructor(t,e){this.endGameCallback=t,this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.canvas.width=v.width,this.canvas.height=v.height,this.button={x:v.x-360,y:v.y+180,width:720,height:180},this.TextStyle={size:120,family:"clip",weight:"600",color:"#000000",align:"center"};const a=e.isBot?"COMPUTER WIN!":"PLAYER WIN!";this.context.drawImage(i.pointerPlayerH,0,0,480,120,v.x-360,v.y-360,720,180),this.playerLabel=new U(a,v.x,v.x-340,this.TextStyle),this.playerLabel.draw(this.context),this.context.drawImage(e.image,v.x-90,v.y-90,180,180),this.context.drawImage(i.menuButton,this.button.x,this.button.y,this.button.width,this.button.height),this.buttonText=new U("CONTINUE",this.button.x+360,this.button.y+10,{size:140,family:"clip",weight:"600",color:"#ff00bc",align:"center"}),this.buttonText.draw(this.context),x(e.isBot?s.lose:s.win)}click(t,e){t>this.button.x&&t<this.button.x+this.button.width&&e>this.button.y&&e<this.button.y+this.button.height&&(x(s.menuClick),v.canvas.style.opacity=0,setTimeout((()=>{this.endGameCallback(),v.canvas.style.opacity=1}),1e3))}update(){v.context.drawImage(this.canvas,0,0)}}((()=>{O.tokens=[],O.isStart=!1,O.players=[],O.currentTurn=0,O.board=null,O.dices=[],O.isEnd=!1,v.layers.forEach((t=>t.clear())),W()}),{isBot:this.players[this.currentTurn].isBot,image:this.players[this.currentTurn].tokenImage});O.menu=t,R.add(t)}};function W(){O.menu=null,O.tokens=[i.tokenBomb,i.tokenButton,i.tokenCap,i.tokenCoin,i.tokenCrystal,i.tokenDragon,i.tokenEye,i.tokenHelmet,i.tokenMask,i.tokenMolecule,i.tokenMoon,i.tokenNut,i.tokenPlane,i.tokenShark,i.tokenShield,i.tokenSkull,i.tokenStone,i.tokenToy,i.tokenUfo,i.tokenWheel],O.menu=new class{constructor(t){this.isStart=!1,this.startGameCallback=t,this.state={players:[{isUsed:!0,isBot:!1,tokenIndex:2},{isUsed:!0,isBot:!0,tokenIndex:11},{isUsed:!0,isBot:!0,tokenIndex:1},{isUsed:!1,isBot:!0,tokenIndex:1/0}],tokens:O.tokens.map(((t,e)=>e)),music:!0,effects:!0,start:!0},this.state.players.forEach((t=>{this.state.tokens=this.state.tokens.filter((e=>t.tokenIndex!==e))})),this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.canvas.width=v.width,this.canvas.height=v.height,this.underlay={width:720,height:180},this.button={width:180,height:180},this.underlay1={x:120,y:v.y-270},this.underlay2={x:v.x+60,y:v.y-270},this.underlay3={x:120,y:v.y+90},this.underlay4={x:v.x+60,y:v.y+90},this.btnP1User={x:this.underlay1.x+90,y:this.underlay1.y,width:this.button.width,height:this.button.height},this.btnP1Token={x:this.underlay1.x+450,y:this.underlay1.y,width:this.button.width,height:this.button.height},this.btnP2User={x:this.underlay2.x+90,y:this.underlay2.y,width:this.button.width,height:this.button.height},this.btnP2Token={x:this.underlay2.x+450,y:this.underlay2.y,width:this.button.width,height:this.button.height},this.btnP3User={x:this.underlay3.x+90,y:this.underlay3.y,width:this.button.width,height:this.button.height},this.btnP3Token={x:this.underlay3.x+450,y:this.underlay3.y,width:this.button.width,height:this.button.height},this.btnP4User={x:this.underlay4.x+90,y:this.underlay4.y,width:this.button.width,height:this.button.height},this.btnP4Token={x:this.underlay4.x+450,y:this.underlay4.y,width:this.button.width,height:this.button.height},this.btnMusic={x:this.underlay3.x+90,y:this.underlay3.y+360,width:this.button.width,height:this.button.height},this.btnEffects={x:this.underlay4.x+450,y:this.underlay4.y+360,width:this.button.width,height:this.button.height},this.btnStart={x:v.x-360,y:this.underlay4.y+360,width:this.underlay.width,height:this.underlay.height},this.playerTextStyle={size:60,family:"clip",weight:"600",color:"#ffffff",align:"center"},this.playerLabels=[new U("",this.underlay1.x+360,this.underlay1.y+200,this.playerTextStyle),new U("",this.underlay2.x+360,this.underlay2.y+200,this.playerTextStyle),new U("",this.underlay3.x+360,this.underlay3.y+200,this.playerTextStyle),new U("",this.underlay4.x+360,this.underlay4.y+200,this.playerTextStyle)],this.buttonText=new U("СТАРТ",this.btnStart.x+360,this.btnStart.y+10,{size:140,family:"clip",weight:"600",color:"#ff00bc",align:"center"}),this.labelText=new U("ПАРЧИС",v.x,v.y-960,{size:540,family:"clip",weight:"600",color:"#00f66c",align:"center"}),this.labelSubText=new U("Квадрат",v.x+320,v.y-600,{size:210,family:"clip",weight:"600",color:"#ff00bc",align:"center"}),this.versionText=new U(`ВЕРСИЯ: ${h.version}`,160,this.canvas.height-70,{size:68,family:"clip",weight:"600",color:"#ffffff",align:"left"}),this.render()}updatePlayerLabels(){function t(t,e,i){return`${t?e?"компьютер":"игрок":"без игрока"} ${i}`}this.state.players.forEach(((e,i)=>{switch(i){case 0:this.playerLabels[i].render(t(e.isUsed,e.isBot,"снизу"));break;case 1:this.playerLabels[i].render(t(e.isUsed,e.isBot,"слева"));break;case 2:this.playerLabels[i].render(t(e.isUsed,e.isBot,"сверху"));break;case 3:this.playerLabels[i].render(t(e.isUsed,e.isBot,"справа"))}this.playerLabels[i].draw(this.context)}))}getPlayerImage(t){return this.state.players[t].isUsed?this.state.players[t].isBot?i.menuComputer:i.menuPlayer:i.menuNoUser}getTokenImage(t){if(!this.state.players[t].isUsed||this.state.players[t].tokenIndex>=O.tokens.length)return i.menuRandom;const e=this.state.players[t].tokenIndex;return O.tokens[e]}render(){this.updateStateStart(),this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.labelText.draw(this.context),this.labelSubText.draw(this.context),this.context.drawImage(i.pointerPlayerH,0,0,480,120,this.underlay1.x,this.underlay1.y,this.underlay.width,this.underlay.height),this.context.drawImage(i.pointerPlayerH,0,0,480,120,this.underlay2.x,this.underlay2.y,this.underlay.width,this.underlay.height),this.context.drawImage(i.pointerPlayerH,0,0,480,120,this.underlay3.x,this.underlay3.y,this.underlay.width,this.underlay.height),this.context.drawImage(i.pointerPlayerH,0,0,480,120,this.underlay4.x,this.underlay4.y,this.underlay.width,this.underlay.height),this.updatePlayerLabels(),this.context.drawImage(this.getPlayerImage(0),this.btnP1User.x,this.btnP1User.y,this.button.width,this.button.height),this.context.drawImage(this.getTokenImage(0),this.btnP1Token.x,this.btnP1Token.y,this.button.width,this.button.height),this.context.drawImage(this.getPlayerImage(1),this.btnP2User.x,this.btnP2User.y,this.button.width,this.button.height),this.context.drawImage(this.getTokenImage(1),this.btnP2Token.x,this.btnP2Token.y,this.button.width,this.button.height),this.context.drawImage(this.getPlayerImage(2),this.btnP3User.x,this.btnP3User.y,this.button.width,this.button.height),this.context.drawImage(this.getTokenImage(2),this.btnP3Token.x,this.btnP3Token.y,this.button.width,this.button.height),this.context.drawImage(this.getPlayerImage(3),this.btnP4User.x,this.btnP4User.y,this.button.width,this.button.height),this.context.drawImage(this.getTokenImage(3),this.btnP4Token.x,this.btnP4Token.y,this.button.width,this.button.height),this.context.drawImage(this.state.music?i.menuMusicOn:i.menuMusicOff,this.btnMusic.x,this.btnMusic.y,this.button.width,this.button.height),this.context.drawImage(this.state.start?i.menuButton:i.menuButtonLock,this.btnStart.x,this.btnStart.y,this.underlay.width,this.underlay.height),this.context.drawImage(this.state.effects?i.menuEffectsOn:i.menuEffectsOff,this.btnEffects.x,this.btnEffects.y,this.button.width,this.button.height),this.buttonText.draw(this.context),this.context.drawImage(i.menuLogo,v.x+240,this.canvas.height-160),this.versionText.draw(this.context)}checkClickButton(t,e,i){return t>i.x&&t<i.x+i.width&&e>i.y&&e<i.y+i.height}click(t,e){this.isStart||(this.checkClickButton(t,e,this.btnStart)&&this.state.start&&this.startGame(),this.checkClickButton(t,e,this.btnMusic)&&(this.state.music=!this.state.music,y(this.state),x(s.menuMusic),this.render()),this.checkClickButton(t,e,this.btnEffects)&&(this.state.effects=!this.state.effects,y(this.state),x(s.menuEffects),this.render()),this.checkClickButton(t,e,this.btnP1User)&&this.clickPlayer(0),this.checkClickButton(t,e,this.btnP1Token)&&this.clickToken(0),this.checkClickButton(t,e,this.btnP2User)&&this.clickPlayer(1),this.checkClickButton(t,e,this.btnP2Token)&&this.clickToken(1),this.checkClickButton(t,e,this.btnP3User)&&this.clickPlayer(2),this.checkClickButton(t,e,this.btnP3Token)&&this.clickToken(2),this.checkClickButton(t,e,this.btnP4User)&&this.clickPlayer(3),this.checkClickButton(t,e,this.btnP4Token)&&this.clickToken(3))}updateStateStart(){let t=0;this.state.players.forEach((e=>{e.isUsed&&t++})),this.state.start=t>1}clickPlayer(t){x(s.menuClick),this.state.players[t].isUsed?this.state.players[t].isBot?(this.state.players[t].isUsed=!1,this.state.players[t].isBot=!1,isFinite(this.state.players[t].tokenIndex)&&(this.state.tokens.push(this.state.players[t].tokenIndex),this.state.players[t].tokenIndex=1/0)):this.state.players[t].isBot=!0:this.state.players[t].isUsed=!0,this.render()}clickToken(t){if(x(s.menuToken),!this.state.players[t].isUsed)return this.state.players[t].isUsed=!0,this.render();isFinite(this.state.players[t].tokenIndex)&&this.state.tokens.push(this.state.players[t].tokenIndex),this.state.players[t].tokenIndex=this.state.tokens.shift(),this.render()}startGame(){this.isStart=!0,x(s.menuStart),this.state.players.forEach((t=>{isFinite(t.tokenIndex)||(this.state.tokens.sort((()=>Math.random()-.5)),t.tokenIndex=this.state.tokens.pop())})),v.canvas.style.opacity=0,setTimeout((()=>{v.getLayer("menu").clear(),this.startGameCallback(this.state),setTimeout((()=>v.canvas.style.opacity=1),500)}),1e3)}update(){v.context.drawImage(this.canvas,0,0)}}(N),R.add(O.menu),L.innerHTML='<div id="halpButton"></div>';const t=document.getElementById("halpButton");t.style.opacity=1,t.onclick=J,q=[i.halp1,i.halp2,i.halp3,i.halp4,i.halp5,i.halp6,i.halp7,i.halp8,i.halp9,i.halp10,i.halp11,i.halp12]}function N(t){O.isStart=!0,O.board=new X,A.add(O.board),O.dices.push(new Y(v.x-63,v.y-63)),O.dices.push(new Y(v.x+63,v.y+63)),O.dices.forEach((t=>H.add(t)));for(let e=0;e<t.players.length;e++)if(t.players[e].isUsed){const i=t.players[e].tokenIndex,s=(e+2)%t.players.length;O.players.push(new D(O.tokens[i],s,t.players[e].isBot))}O.currentTurn=Math.floor(Math.random()*O.players.length),new M((()=>O.nextTurn()),h.gameStartDuration)}v.canvas.onclick=function(t){const e=t.offsetX*v.sizeRate,i=t.offsetY*v.sizeRate;O.isStart?function(t,e){if(O.players[O.currentTurn].isBot)return;const i=[];let s=!0;if(O.players[O.currentTurn].tokens.forEach((t=>{t.isAvailable&&(i.push(t),t.container!==t.reserve&&(s=!1))})),0!==i.length)if(1!==i.length){for(let s=0;s<i.length;s++){const a=t-i[s].x,n=e-i[s].y;if(Math.sqrt(a*a+n*n)<h.ceilSize/2)return i[s].activation()}s&&i[0].activation()}else i[0].activation()}(e,i):O.menu&&O.menu.click(e,i)};const F=document.getElementById("help"),G=document.getElementById("halpContent"),j=document.getElementById("imageHalp"),$=document.getElementById("closeHelp");let q=[],V=0;function J(){G.style.width=v.size-64+"px",G.style.height=v.size-64+"px",F.style.display="flex",j.append(q[V]),setTimeout((()=>F.style.opacity=1),0)}$.onclick=function(){F.style.opacity=0,setTimeout((()=>{F.style.display="none",j.innerHTML=""}),1e3)},G.onclick=function(){V++,V===q.length&&(V=0),j.innerHTML="",j.append(q[V])}})();