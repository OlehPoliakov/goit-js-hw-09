!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},e.parcelRequired7c6=o);var i=o("h6c0i");function r(e,n){var t=Math.random()>.3,o={position:e,delay:n};return new Promise((function(e,n){t&&e(o),n(o)}))}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();for(var n=Number(e.target.delay.value),t=Number(e.target.step.value),o=Number(e.target.amount.value),u=1;u<=o;u+=1)r(u,n).then((function(e){var n=e.position,t=e.delay;setTimeout((function(){i.Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(t,"ms"),{useIcon:!1})}),t)})).catch((function(e){var n=e.position,t=e.delay;setTimeout((function(){i.Notify.failure("❌ Rejected promise ".concat(n," in ").concat(t,"ms"),{useIcon:!1})}),t)})),n+=t}))}();
//# sourceMappingURL=03-promises.dfcd244f.js.map
