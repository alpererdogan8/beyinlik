import{r as h,j as e}from"./app-430d9bb4.js";import{z as b}from"./index-09b55e4d.js";import{c as a,B as n}from"./button-67c2ea2d.js";const v=a("Braces",[["path",{d:"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",key:"ezmyqa"}],["path",{d:"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",key:"e1hn23"}]]),w=a("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]),C=a("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]),z=a("TextQuote",[["path",{d:"M17 6H3",key:"16j9eg"}],["path",{d:"M21 12H8",key:"scolzb"}],["path",{d:"M21 18H8",key:"1wfozv"}],["path",{d:"M3 12v6",key:"fv4c87"}]]),M=a("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]),N=a("Youtube",[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",key:"1q2vi4"}],["path",{d:"m10 15 5-3-5-3z",key:"1jp15x"}]]);function T(){const[s,p]=h.useState(!1),c=h.useRef(null),{editor:t}=b();if(!t)return null;const x=r=>{var o;if(r.currentTarget.files){const l=(o=r.currentTarget)==null?void 0:o.files[0];if(l){const i=new FileReader;i.onload=u=>{var d;if((d=u.target)!=null&&d.result){const g=u.target.result;t.chain().focus().setImage({src:g}).run()}},i.readAsDataURL(l)}}},f=()=>{c.current&&c.current.click()},m=()=>{const r=prompt("Youtube Linki Giriniz");t.chain().focus().setYoutubeVideo({src:r}).run()},y=()=>{t.chain().focus().toggleCodeBlock().run()},k=()=>{t.chain().focus().setHorizontalRule().run()},j=()=>{t.chain().focus().setBlockquote().run()};return e.jsxs("div",{className:"flex absolute  -left-[60px] items-center justify-between rounded-4xl rounded-full w-full ",children:[e.jsx(n,{onClick:()=>p(!s),variant:"link",className:"w-auto h-0 p-0 rounded-full",type:"button",children:e.jsx(M,{width:42,className:`transition-all stroke-1 ${s?"rotate-0":"rotate-45"}`,size:48})}),e.jsx("div",{className:`absolute flex items-center left-12 w-96 transition-all ${s?"opacity-100":"opacity-0"}`,children:s?e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"outline",className:"mx-auto text-center w-6 h-6 p-6 rounded-full",onClick:f,type:"button",children:e.jsxs("span",{children:[e.jsx(w,{}),e.jsx("input",{ref:c,onChange:x,type:"file",className:"hidden"})]})}),e.jsx(n,{variant:"outline",onClick:m,className:"mx-auto text-center w-0 h-0 p-6 rounded-full",type:"button",children:e.jsx("span",{children:e.jsx(N,{})})}),e.jsx(n,{variant:"outline",onClick:y,className:"mx-auto text-center w-0 h-0 p-6 rounded-full",type:"button",children:e.jsx("span",{children:e.jsx(v,{})})}),e.jsx(n,{variant:"outline",onClick:k,className:"mx-auto text-center w-0 h-0 p-6 rounded-full",type:"button",children:e.jsx("span",{children:e.jsx(C,{})})}),e.jsx(n,{variant:"outline",onClick:j,className:"mx-auto text-center w-0 h-0 p-6 rounded-full",type:"button",children:e.jsx("span",{children:e.jsx(z,{})})})]}):null})]})}export{T as default};
