const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};t.startBtn.addEventListener("click",(function(){const n=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`,t.startBtn.disabled=!0,t.stopBtn.disabled=!1}),1e3);t.stopBtn.addEventListener("click",(()=>{clearInterval(n),t.startBtn.disabled=!1,t.stopBtn.disabled=!0}))}));
//# sourceMappingURL=01-color-switcher.2b9eaac9.js.map
