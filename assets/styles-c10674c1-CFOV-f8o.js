import{G as M}from"./graph-DwCnWRpm.js";import{ab as R,ae as F,a9 as U,af as j,l as h,g as v,d as C,A as H,p as K,q as N,r as E,o as L,u as G,k as z,t as W}from"./mermaid.core-DIN_1fof.js";import{r as X}from"./index-3862675e-BMd-myMB.js";import{c as J}from"./channel-B-BObAbK.js";function Q(e){return new R([document.querySelectorAll(e)],[document.documentElement])}function fe(e,l){return!!e.children(l).length}function pe(e){return A(e.v)+":"+A(e.w)+":"+A(e.name)}var Y=/:/g;function A(e){return e?String(e).replace(Y,"\\:"):""}function Z(e,l){l&&e.attr("style",l)}function be(e,l,c){l&&e.attr("class",l).attr("class",c+" "+e.attr("class"))}function ue(e,l){var c=l.graph();if(F(c)){var a=c.transition;if(U(a))return a(e)}return e}function O(e,l){var c=e.append("foreignObject").attr("width","100000"),a=c.append("xhtml:div");a.attr("xmlns","http://www.w3.org/1999/xhtml");var i=l.label;switch(typeof i){case"function":a.insert(i);break;case"object":a.insert(function(){return i});break;default:a.html(i)}Z(a,l.labelStyle),a.style("display","inline-block"),a.style("white-space","nowrap");var d=a.node().getBoundingClientRect();return c.attr("width",d.width).attr("height",d.height),c}const q={},ee=function(e){const l=Object.keys(e);for(const c of l)q[c]=e[c]},P=async function(e,l,c,a,i,d){const u=a.select(`[id="${c}"]`),o=Object.keys(e);for(const f of o){const r=e[f];let y="default";r.classes.length>0&&(y=r.classes.join(" ")),y=y+" flowchart-label";const w=N(r.styles);let t=r.text!==void 0?r.text:r.id,s;if(h.info("vertex",r,r.labelType),r.labelType==="markdown")h.info("vertex",r,r.labelType);else if(W(v().flowchart.htmlLabels))s=O(u,{label:t}).node(),s.parentNode.removeChild(s);else{const k=i.createElementNS("http://www.w3.org/2000/svg","text");k.setAttribute("style",w.labelStyle.replace("color:","fill:"));const _=t.split(z.lineBreakRegex);for(const $ of _){const S=i.createElementNS("http://www.w3.org/2000/svg","tspan");S.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),S.setAttribute("dy","1em"),S.setAttribute("x","1"),S.textContent=$,k.appendChild(S)}s=k}let p=0,n="";switch(r.type){case"round":p=5,n="rect";break;case"square":n="rect";break;case"diamond":n="question";break;case"hexagon":n="hexagon";break;case"odd":n="rect_left_inv_arrow";break;case"lean_right":n="lean_right";break;case"lean_left":n="lean_left";break;case"trapezoid":n="trapezoid";break;case"inv_trapezoid":n="inv_trapezoid";break;case"odd_right":n="rect_left_inv_arrow";break;case"circle":n="circle";break;case"ellipse":n="ellipse";break;case"stadium":n="stadium";break;case"subroutine":n="subroutine";break;case"cylinder":n="cylinder";break;case"group":n="rect";break;case"doublecircle":n="doublecircle";break;default:n="rect"}const T=await G(t,v());l.setNode(r.id,{labelStyle:w.labelStyle,shape:n,labelText:T,labelType:r.labelType,rx:p,ry:p,class:y,style:w.style,id:r.id,link:r.link,linkTarget:r.linkTarget,tooltip:d.db.getTooltip(r.id)||"",domId:d.db.lookUpDomId(r.id),haveCallback:r.haveCallback,width:r.type==="group"?500:void 0,dir:r.dir,type:r.type,props:r.props,padding:v().flowchart.padding}),h.info("setNode",{labelStyle:w.labelStyle,labelType:r.labelType,shape:n,labelText:T,rx:p,ry:p,class:y,style:w.style,id:r.id,domId:d.db.lookUpDomId(r.id),width:r.type==="group"?500:void 0,type:r.type,dir:r.dir,props:r.props,padding:v().flowchart.padding})}},V=async function(e,l,c){h.info("abc78 edges = ",e);let a=0,i={},d,u;if(e.defaultStyle!==void 0){const o=N(e.defaultStyle);d=o.style,u=o.labelStyle}for(const o of e){a++;const f="L-"+o.start+"-"+o.end;i[f]===void 0?(i[f]=0,h.info("abc78 new entry",f,i[f])):(i[f]++,h.info("abc78 new entry",f,i[f]));let r=f+"-"+i[f];h.info("abc78 new link id to be used is",f,r,i[f]);const y="LS-"+o.start,w="LE-"+o.end,t={style:"",labelStyle:""};switch(t.minlen=o.length||1,o.type==="arrow_open"?t.arrowhead="none":t.arrowhead="normal",t.arrowTypeStart="arrow_open",t.arrowTypeEnd="arrow_open",o.type){case"double_arrow_cross":t.arrowTypeStart="arrow_cross";case"arrow_cross":t.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":t.arrowTypeStart="arrow_point";case"arrow_point":t.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":t.arrowTypeStart="arrow_circle";case"arrow_circle":t.arrowTypeEnd="arrow_circle";break}let s="",p="";switch(o.stroke){case"normal":s="fill:none;",d!==void 0&&(s=d),u!==void 0&&(p=u),t.thickness="normal",t.pattern="solid";break;case"dotted":t.thickness="normal",t.pattern="dotted",t.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":t.thickness="thick",t.pattern="solid",t.style="stroke-width: 3.5px;fill:none;";break;case"invisible":t.thickness="invisible",t.pattern="solid",t.style="stroke-width: 0;fill:none;";break}if(o.style!==void 0){const n=N(o.style);s=n.style,p=n.labelStyle}t.style=t.style+=s,t.labelStyle=t.labelStyle+=p,o.interpolate!==void 0?t.curve=E(o.interpolate,L):e.defaultInterpolate!==void 0?t.curve=E(e.defaultInterpolate,L):t.curve=E(q.curve,L),o.text===void 0?o.style!==void 0&&(t.arrowheadStyle="fill: #333"):(t.arrowheadStyle="fill: #333",t.labelpos="c"),t.labelType=o.labelType,t.label=await G(o.text.replace(z.lineBreakRegex,`
`),v()),o.style===void 0&&(t.style=t.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),t.labelStyle=t.labelStyle.replace("color:","fill:"),t.id=r,t.classes="flowchart-link "+y+" "+w,l.setEdge(o.start,o.end,t,a)}},te=function(e,l){return l.db.getClasses()},re=async function(e,l,c,a){h.info("Drawing flowchart");let i=a.db.getDirection();i===void 0&&(i="TD");const{securityLevel:d,flowchart:u}=v(),o=u.nodeSpacing||50,f=u.rankSpacing||50;let r;d==="sandbox"&&(r=C("#i"+l));const y=d==="sandbox"?C(r.nodes()[0].contentDocument.body):C("body"),w=d==="sandbox"?r.nodes()[0].contentDocument:document,t=new M({multigraph:!0,compound:!0}).setGraph({rankdir:i,nodesep:o,ranksep:f,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}});let s;const p=a.db.getSubGraphs();h.info("Subgraphs - ",p);for(let b=p.length-1;b>=0;b--)s=p[b],h.info("Subgraph - ",s),a.db.addVertex(s.id,{text:s.title,type:s.labelType},"group",void 0,s.classes,s.dir);const n=a.db.getVertices(),T=a.db.getEdges();h.info("Edges",T);let k=0;for(k=p.length-1;k>=0;k--){s=p[k],Q("cluster").append("text");for(let b=0;b<s.nodes.length;b++)h.info("Setting up subgraphs",s.nodes[b],s.id),t.setParent(s.nodes[b],s.id)}await P(n,t,l,y,w,a),await V(T,t);const _=y.select(`[id="${l}"]`),$=y.select("#"+l+" g");if(await X($,t,["point","circle","cross"],"flowchart",l),H.insertTitle(_,"flowchartTitleText",u.titleTopMargin,a.db.getDiagramTitle()),K(t,_,u.diagramPadding,u.useMaxWidth),a.db.indexNodes("subGraph"+k),!u.htmlLabels){const b=w.querySelectorAll('[id="'+l+'"] .edgeLabel .label');for(const x of b){const m=x.getBBox(),g=w.createElementNS("http://www.w3.org/2000/svg","rect");g.setAttribute("rx",0),g.setAttribute("ry",0),g.setAttribute("width",m.width),g.setAttribute("height",m.height),x.insertBefore(g,x.firstChild)}}Object.keys(n).forEach(function(b){const x=n[b];if(x.link){const m=C("#"+l+' [id="'+b+'"]');if(m){const g=w.createElementNS("http://www.w3.org/2000/svg","a");g.setAttributeNS("http://www.w3.org/2000/svg","class",x.classes.join(" ")),g.setAttributeNS("http://www.w3.org/2000/svg","href",x.link),g.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),d==="sandbox"?g.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):x.linkTarget&&g.setAttributeNS("http://www.w3.org/2000/svg","target",x.linkTarget);const B=m.insert(function(){return g},":first-child"),I=m.select(".label-container");I&&B.append(function(){return I.node()});const D=m.select(".label");D&&B.append(function(){return D.node()})}}})},we={setConf:ee,addVertices:P,addEdges:V,getClasses:te,draw:re},le=(e,l)=>{const c=J,a=c(e,"r"),i=c(e,"g"),d=c(e,"b");return j(a,i,d,l)},ae=e=>`.label {
    font-family: ${e.fontFamily};
    color: ${e.nodeTextColor||e.textColor};
  }
  .cluster-label text {
    fill: ${e.titleColor};
  }
  .cluster-label span,p {
    color: ${e.titleColor};
  }

  .label text,span,p {
    fill: ${e.nodeTextColor||e.textColor};
    color: ${e.nodeTextColor||e.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${e.mainBkg};
    stroke: ${e.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .katex path {
    fill: #000;
    stroke: #000;
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${e.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${e.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${e.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${e.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${e.edgeLabelBackground};
      fill: ${e.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${le(e.edgeLabelBackground,.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${e.clusterBkg};
    stroke: ${e.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${e.titleColor};
  }

  .cluster span,p {
    color: ${e.titleColor};
  }
  /* .cluster div {
    color: ${e.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${e.fontFamily};
    font-size: 12px;
    background: ${e.tertiaryColor};
    border: 1px solid ${e.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.textColor};
  }
`,ge=ae;export{Z as a,O as b,ue as c,be as d,pe as e,ge as f,we as g,fe as i,Q as s};
