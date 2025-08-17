import{a as B,S,i}from"./assets/vendor-5YrzWRhu.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const $="https://pixabay.com/api/",q="51715494-fc6bd8fe76f0a6511ef4fb43b",P=15;async function m(s,t=1){try{return(await B.get($,{params:{key:q,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:P,page:t}})).data}catch(a){throw a}}const p=document.getElementById("gallery"),y=document.getElementById("loader"),h=document.querySelector(".load-more");let I=new S(".gallery a",{captionsData:"alt",captionDelay:250});function g(s){const t=s.map(({webformatURL:a,largeImageURL:l,tags:e,likes:r,views:n,comments:w,downloads:E})=>`
    <li class="gallery-item">
      <a href="${l}" data-caption="${e}">
        <img src="${a}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <span class="label">Likes</span>
          <span class="value">${r}</span>
        </div>
        <div class="info-item">
          <span class="label">Views</span>
          <span class="value">${n}</span>
        </div>
        <div class="info-item">
          <span class="label">Comments</span>
          <span class="value">${w}</span>
        </div>
        <div class="info-item">
          <span class="label">Downloads</span>
          <span class="value">${E}</span>
        </div>
      </div>
    </li>
  `).join("");p.insertAdjacentHTML("beforeend",t),I.refresh()}function M(){p.innerHTML=""}function v(){y.classList.remove("is-hidden")}function L(){y.classList.add("is-hidden")}function b(){h.classList.remove("is-hidden")}function u(){h.classList.add("is-hidden")}const d=document.getElementById("search-form"),O=document.querySelector(".load-more");let c="",o=1,f=0;d.addEventListener("submit",async s=>{if(s.preventDefault(),c=d.elements.searchQuery.value.trim(),o=1,d.elements.searchQuery.value="",M(),u(),!c){i.error({title:"Error",message:"Please enter a search query."});return}v();try{const t=await m(c,o);if(f=t.totalHits,t.hits.length===0){i.warning({title:"No Results",message:"Sorry, no images match your search query."});return}g(t.hits),f>o*15&&b()}catch{i.error({title:"Error",message:"Something went wrong. Try again later."})}finally{L()}});O.addEventListener("click",async()=>{o+=1,u(),v();try{const s=await m(c,o);g(s.hits),A(),o*15>=f?(u(),i.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."})):b()}catch{i.error({title:"Error",message:"Something went wrong. Try again later."})}finally{L()}});function A(){const s=document.querySelector(".gallery .gallery-item");if(s){const{height:t}=s.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
