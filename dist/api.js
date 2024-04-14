(()=>{"use strict";var e={927:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,o)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=a(r(252)),l=i(r(139)),u=a(r(3)),d=(0,s.default)();d.use(s.default.json()).use(s.default.static(u.default.join(__dirname+"/../java-client"))),Object.keys(l).forEach((e=>{l[e](d)})),d.listen(3e3,(()=>{console.log("Server is running on port 3000")}))},359:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.helloRoute=void 0,t.helloRoute=e=>{e.get("/hello",((e,t)=>{t.send("Hello World!")}))}},139:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,o)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(359),t),o(r(912),t)},952:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.downloadVersion=void 0;const o=n(r(383)),i=n(r(3));t.downloadVersion=e=>{e.get("/downloadVersion/:version",((e,t)=>{const r=e.params.version,n="java-client.jar",a=i.default.join(__dirname,`/../java-client/${r}/${n}`);o.default.existsSync(a)?t.download(a,n,(e=>{e&&(console.error("Error downloading file:",e),t.status(500).send("Error downloading file"))})):t.status(404).send("Version not found")}))}},859:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getLatestVersion=void 0;const o=n(r(383)),i=n(r(3));t.getLatestVersion=e=>{e.get("/getLatestVersion",((e,t)=>{const r=o.default.readdirSync(i.default.join(__dirname,"../java-client")),n=Math.max(...r.map((e=>parseInt(e.split(".")[0])))),a=r.filter((e=>parseInt(e.split(".")[0])===n)),s=Math.max(...a.map((e=>parseInt(e.split(".")[1])))),l=a.filter((e=>parseInt(e.split(".")[1])===s)),u=Math.max(...l.map((e=>parseInt(e.split(".")[2])))),d=l.filter((e=>parseInt(e.split(".")[2])===u));t.send(d[0])}))}},912:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,o)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(952),t),o(r(859),t)},252:e=>{e.exports=require("express")},383:e=>{e.exports=require("fs")},3:e=>{e.exports=require("path")}},t={},r=function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}(927),n=exports;for(var o in r)n[o]=r[o];r.__esModule&&Object.defineProperty(n,"__esModule",{value:!0})})();