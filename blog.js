;(function(window,document){"use strict";function getId(id){return document.getElementById(id);}
function append(element,contents){if(!Array.isArray(contents)){contents=[contents];}
contents.forEach(function(content){return element.appendChild("string"===typeof content?document.createTextNode(content):content);});}
function h(tag,attrs,contents){var el=document.createElement(tag);if(attrs){Object.assign(el,attrs);}
if(contents){append(el,contents);}
return el;}
window.addEventListener("DOMContentLoaded",function(){var root=document.querySelector("article.content");if(!root)return;var headings=root.querySelectorAll('h1,h2,h3,h4,h5,h6');var i=1;if(headings.length>i){var tocRoot=processLevel(h("ul"));root.insertBefore(h("div",{className:"toc"},[h("b",null,"文章目录"),tocRoot]),root.firstChild);setTimeout(fixTocScroll,150);}
function getHeaderLevel(e){return parseInt(e.tagName[1],10);}
function strip(str){return str.replace(/[\s\/]/g,'-');}
function uniqueId(id){var r='h-'+id;var i=2;while(getId(r)){r='h-'+id+'-'+i;i++;}
return r;}
function generateLink(html,id){return h("li",null,[h('a',{href:"#"+id},html)]);}
function generateItem(el){var id=el.id;if(!id){id=uniqueId(strip(el.textContent));el.parentNode.insertBefore(h("span",{id:id}),el);}
return generateLink(el.textContent,id);}
function processLevel(tocs){var heading=headings[i];if(!heading){return tocs;}
var level=getHeaderLevel(heading);do{var currentLv=getHeaderLevel(heading);if(currentLv===level){i++;append(tocs,generateItem(heading));}else if(currentLv<level){break;}else{append(tocs,processLevel(h("ul")));}
heading=headings[i];}while(i<headings.length);return tocs;}
function fixTocScroll(){var el=getId(decodeURIComponent(location.hash.slice(1)));if(el){scrollTop(el.offsetTop);}}
function scrollTop(top){window.scrollTo(window.scrollX,top);}});})(window,document);