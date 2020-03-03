import React from 'react';
import './App.scss';
import Safe from './components/Safe'
import Risk from './components/Risk'
import OneDay from './components/OneDay'
import Running from './components/Running'
import Speed from './components/Speed'
import Warning from './components/Warning'
import Position from './components/Position'
import Hot from './components/Hot'
function App() {
  return (
    <div className="App">
      <div className="outer">
        <div className="title">大数据汇总显示</div>
        <div className="container">
          <div>
            <Safe/>
            <Risk/>
            <OneDay/>
          </div>
          <div className="flex-1">
            <Position />
            <Hot />
          </div>
          <div>
            <Running/>
            <Speed/>
            <Warning/>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
