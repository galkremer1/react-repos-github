import{r as t,R as o}from"./index-D4lIrffr.js";import{a as D,L as N,E as f}from"./ErrorMessage--3a89Vxk.js";import{R as F}from"./RepoCard-YD4OVroH.js";/* empty css               */const U=({user:a,repo:n})=>{const[h,i]=t.useState(null),[s,p]=t.useState(!0),[u,c]=t.useState(null),[e,E]=t.useState(null);return t.useEffect(()=>{(async()=>{try{p(!0),c(null);const r=await D.get(`https://api.github.com/repos/${a}/${n}`);i(r.data),E({limit:parseInt(r.headers["x-ratelimit-limit"]||"0"),remaining:parseInt(r.headers["x-ratelimit-remaining"]||"0"),reset:parseInt(r.headers["x-ratelimit-reset"]||"0")})}catch(r){c(r instanceof Error?r:new Error("An unknown error occurred"))}finally{p(!1)}})()},[a,n]),{repository:h,loading:s,error:u,rateLimit:e}},k=({user:a,repo:n,usePreFetchedData:h=!1,preFetchedData:i,onError:s,...p})=>{const{repository:u,loading:c,error:e}=h&&i?{repository:i,loading:!1,error:null}:U({user:a,repo:n});return o.useEffect(()=>{e&&s&&s(e)},[e,s]),c?o.createElement(N,null):e?o.createElement(f,{message:`Failed to load repository: ${e.message}`}):u?o.createElement(F,{repository:u,...p}):o.createElement(f,{message:"Repository not found"})};k.__docgenInfo={description:"",methods:[],displayName:"ReactGithubRepo",props:{showName:{required:!1,tsType:{name:"boolean"},description:""},showDescription:{required:!1,tsType:{name:"boolean"},description:""},showStars:{required:!1,tsType:{name:"boolean"},description:""},showForks:{required:!1,tsType:{name:"boolean"},description:""},showLanguage:{required:!1,tsType:{name:"boolean"},description:""},showLastUpdated:{required:!1,tsType:{name:"boolean"},description:""},showAvatar:{required:!1,tsType:{name:"boolean"},description:""},avatarUrl:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},cardClassName:{required:!1,tsType:{name:"string"},description:""},onRepoClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(repo: Repository) => void",signature:{arguments:[{type:{name:"Repository"},name:"repo"}],return:{name:"void"}}},description:""},onError:{required:!1,tsType:{name:"signature",type:"function",raw:"(error: Error) => void",signature:{arguments:[{type:{name:"Error"},name:"error"}],return:{name:"void"}}},description:""},user:{required:!0,tsType:{name:"string"},description:""},repo:{required:!0,tsType:{name:"string"},description:""},usePreFetchedData:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},preFetchedData:{required:!1,tsType:{name:"Repository"},description:""}}};const C={title:"GitHub/ReactGithubRepo",component:k,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{showName:{control:"boolean"},showDescription:{control:"boolean"},showStars:{control:"boolean"},showForks:{control:"boolean"},showLanguage:{control:"boolean"},showLastUpdated:{control:"boolean"}}},l={args:{user:"facebook",repo:"react",showName:!0,showDescription:!0,showStars:!0,showForks:!0,showLanguage:!0,showLastUpdated:!0}},d={args:{user:"facebook",repo:"react",showName:!0,showDescription:!1,showStars:!0,showForks:!1,showLanguage:!1,showLastUpdated:!1}},m={args:{user:"microsoft",repo:"typescript",showName:!0,showDescription:!0,showStars:!0,showForks:!0,showLanguage:!0,showLastUpdated:!0}};var w,g,y;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    user: 'facebook',
    repo: 'react',
    showName: true,
    showDescription: true,
    showStars: true,
    showForks: true,
    showLanguage: true,
    showLastUpdated: true
  }
}`,...(y=(g=l.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var b,R,L;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    user: 'facebook',
    repo: 'react',
    showName: true,
    showDescription: false,
    showStars: true,
    showForks: false,
    showLanguage: false,
    showLastUpdated: false
  }
}`,...(L=(R=d.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var T,S,q;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    user: 'microsoft',
    repo: 'typescript',
    showName: true,
    showDescription: true,
    showStars: true,
    showForks: true,
    showLanguage: true,
    showLastUpdated: true
  }
}`,...(q=(S=m.parameters)==null?void 0:S.docs)==null?void 0:q.source}}};const M=["Default","MinimalDisplay","TypeScriptRepo"];export{l as Default,d as MinimalDisplay,m as TypeScriptRepo,M as __namedExportsOrder,C as default};
