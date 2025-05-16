import{R as f}from"./RepoCard-YD4OVroH.js";/* empty css               */import"./index-D4lIrffr.js";const t={id:10270250,name:"react",full_name:"facebook/react",html_url:"https://github.com/facebook/react",description:"A declarative, efficient, and flexible JavaScript library for building user interfaces.",fork:!1,url:"https://api.github.com/repos/facebook/react",created_at:"2013-05-24T16:15:54Z",updated_at:"2023-06-15T10:47:32Z",pushed_at:"2023-06-15T09:36:27Z",stargazers_count:203e3,watchers_count:203e3,language:"JavaScript",forks_count:42e3,archived:!1,disabled:!1,open_issues_count:1200,license:{key:"mit",name:"MIT License",url:"https://api.github.com/licenses/mit"},topics:["javascript","reactjs","frontend"],visibility:"public"},L={title:"GitHub/RepoCard",component:f,parameters:{layout:"centered",docs:{description:{component:"Repository card component that displays GitHub repository information. Clicking on the card will open the repository in a new window."}}},tags:["autodocs"],argTypes:{showName:{control:"boolean"},showDescription:{control:"boolean"},showStars:{control:"boolean"},showForks:{control:"boolean"},showLanguage:{control:"boolean"},showLastUpdated:{control:"boolean"}}},e={args:{repository:t,showName:!0,showDescription:!0,showStars:!0,showForks:!0,showLanguage:!0,showLastUpdated:!0}},o={args:{repository:t,showName:!0,showDescription:!1,showStars:!0,showForks:!1,showLanguage:!0,showLastUpdated:!1}},s={args:{repository:t,showName:!0,showDescription:!0,showStars:!0,showForks:!0,showLanguage:!0,showLastUpdated:!0,cardClassName:"custom-card"}},r={args:{repository:t,showName:!0,showDescription:!0,showStars:!0,showForks:!0,showLanguage:!0,showLastUpdated:!0,showAvatar:!0,avatarUrl:"https://avatars.githubusercontent.com/u/69631?v=4"}};var a,n,c;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    repository: mockRepo as any,
    showName: true,
    showDescription: true,
    showStars: true,
    showForks: true,
    showLanguage: true,
    showLastUpdated: true
  }
}`,...(c=(n=e.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var u,i,p;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    repository: mockRepo as any,
    showName: true,
    showDescription: false,
    showStars: true,
    showForks: false,
    showLanguage: true,
    showLastUpdated: false
  }
}`,...(p=(i=o.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var h,w,d;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    repository: mockRepo as any,
    showName: true,
    showDescription: true,
    showStars: true,
    showForks: true,
    showLanguage: true,
    showLastUpdated: true,
    cardClassName: 'custom-card'
  }
}`,...(d=(w=s.parameters)==null?void 0:w.docs)==null?void 0:d.source}}};var m,l,g;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    repository: mockRepo as any,
    showName: true,
    showDescription: true,
    showStars: true,
    showForks: true,
    showLanguage: true,
    showLastUpdated: true,
    showAvatar: true,
    avatarUrl: 'https://avatars.githubusercontent.com/u/69631?v=4' // Facebook's GitHub avatar
  }
}`,...(g=(l=r.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const v=["Default","MinimalInfo","CustomStyling","WithAvatar"];export{s as CustomStyling,e as Default,o as MinimalInfo,r as WithAvatar,v as __namedExportsOrder,L as default};
