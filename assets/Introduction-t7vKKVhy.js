import{j as e,M as s}from"./index-CU0vULfX.js";import{useMDXComponents as r}from"./index-B8rYRX2K.js";import"./iframe-DBbECSJd.js";import"./index-D4lIrffr.js";import"./index-DsJinFGm.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";function t(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Introduction/Getting Started"}),`
`,e.jsx(n.h1,{id:"react-github-repos",children:"React GitHub Repos"}),`
`,e.jsx(n.p,{children:"A React component library for displaying GitHub repositories with various customization options."}),`
`,e.jsx(n.h2,{id:"features",children:"Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Display single or multiple GitHub repositories"}),`
`,e.jsx(n.li,{children:"Configurable display options (stars, forks, language, etc.)"}),`
`,e.jsx(n.li,{children:"Built-in sorting and filtering capabilities"}),`
`,e.jsx(n.li,{children:"Responsive grid layout"}),`
`,e.jsx(n.li,{children:"Pagination support"}),`
`,e.jsx(n.li,{children:"Accessible UI components"}),`
`,e.jsx(n.li,{children:"GitHub-like styling"}),`
`,e.jsx(n.li,{children:"Rate limit handling"}),`
`,e.jsx(n.li,{children:"Support for pre-fetched data"}),`
`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install react-github-repos
# or
yarn add react-github-repos
`})}),`
`,e.jsx(n.h2,{id:"component-usage",children:"Component Usage"}),`
`,e.jsx(n.h3,{id:"reactgithubrepo",children:"ReactGithubRepo"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"ReactGithubRepo"})," component displays a single GitHub repository."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { ReactGithubRepo } from 'react-github-repos';

function App() {
  return (
    <ReactGithubRepo 
      user="facebook" 
      repo="react" 
    />
  );
}
`})}),`
`,e.jsx(n.h3,{id:"reactgithubrepos",children:"ReactGithubRepos"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"ReactGithubRepos"})," component displays multiple GitHub repositories in a grid layout."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { ReactGithubRepos } from 'react-github-repos';

function App() {
  return (
    <ReactGithubRepos 
      user="facebook"
      enableSorting={true}
      enableFiltering={true}
      itemsPerPage={6}
    />
  );
}
`})}),`
`,e.jsx(n.h2,{id:"explore-examples",children:"Explore Examples"}),`
`,e.jsx(n.p,{children:"Check out the component examples in the sidebar to see different ways to use and configure the components."})]})}function u(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{u as default};
