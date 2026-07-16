import { FC, useState } from 'react';
// import { Link } from 'react-router-dom';
// import CodeEditor from './components/CodeEditor';
// import GitHubIcon from './components/GitHubIcon';
// import SpecSelector from './components/SpecSelector';
// import UriInput from './components/UriInput';
// import { Spec } from './types';

interface Props {
  spec: Spec;
}

const App: FC<Props> = ({ spec }) => {
  const [uri, setUri] = useState('');


  const appStyle = {
    background: "#f2f4f6"
  }

  return (
    <div className="flex flex-col h-screen" style={appStyle}>

      <div className='mt-32 w-4xl mx-auto'>
        <p className='text-xl mb-2'>The oas-checker has been replaced by the developer.overheid.nl general checker:</p>
        <a className='text-2xl text-blue-800 font-bold' href="https://developer-overheid-nl.github.io/don-checker/#/adr/2.1.0">developer-overheid-nl.github.io/don-checker</a>
      </div>

      {/* <header className="flex justify-between items-center px-4 py-2 bg-slate-700 text-white">
        <div>
          <h1 className="text-lg font-medium">
            <Link to="/">Publiccode Checker</Link>: {spec.name}
          </h1>
        </div>
        <UriInput onSubmit={setUri} />
        <div className="flex items-center">
          <SpecSelector className="mr-4" />
          <a href="https://github.com/developer-overheid-nl/publiccode-checker" target="_blank">
            <GitHubIcon />
          </a>
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <CodeEditor spec={spec} uri={uri !== '' ? uri : undefined} />
      </div> */}
    </div>
  );
};

export default App;
