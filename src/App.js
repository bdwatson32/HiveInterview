// App.js
import './App.css';
import HiveSelector from './components/HiveSelector';
import { useState } from 'react';

function App() {

  const [selectedValue, setSelectedValue] = useState(null);

  const onChange = (val) => {
    setSelectedValue(val);
  }

  const options = [
    { value: "1", label: "Option 1", label2: "Grape"},
    { value: "2", label: "Option 2", label2: "Apple" },
    { value: "3", label: "Option 3", label2: "Bread" },
    { value: "4", label: "Option 4", label2: "Banana" },
  ]

  const VeryLargeOption = Array(1000).fill(1).map((_, i) => {return { value: i, label: `Option ${i}`}});
 
  return (
    <div className="App">
      <h3>Hive Selector [Single Select]</h3>
      <p>Here is a basic single select option!</p>
      <HiveSelector
        multiple={false} 
        placeholder="Please make a selection..."
        options={options}
        getOptionLabel={(option) => option.label2}
        />

      <h3>Hive Selector [Multiple Select]</h3>
      <p>Here is the multi-select option. Select multiple, selete all at ones and remove all at once.</p>
      <HiveSelector
        multiple={true} 
        placeholder="Please make a selection..."
        options={options}
        getOptionLabel={(option) => option.label2}
        />'
        
      <h3>Hive Selector [Very Large Options]</h3>
      <p>Here is a very large option list. It contains 1000 options. See how the selector handels overflow.</p>
      <div style={{width:400}}>
        <HiveSelector
          multiple={true} 
          placeholder="Please make a selection..."
          options={VeryLargeOption}
          getOptionLabel={(option) => option.label}
          />
      </div>

        <h3>Hive Controled Element</h3>
        <p>Here is a controlled element. The value is controled by the parent component.</p>
        <div style={{display:'flex', gap:'10px'}}>
          <div style={{flexShrink: 0, width:400}}>
            <HiveSelector
              value={selectedValue}
              onChange={onChange}
              multiple={false} 
              placeholder="Please make a selection..."
              options={options}
              getOptionLabel={(option) => option.label2}
              />
          </div>
          <div>
            Value: <pre>{JSON.stringify(selectedValue, null, 2)}</pre>
          </div>
        </div>
    </div>
  )
}

export default App;
