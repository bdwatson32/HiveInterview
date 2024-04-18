// HiveSelector.js
import React, { useRef, useState } from 'react';

function HiveSelector({
    value, 
    onChange, 
    multiple = false, 
    options=[], 
    placeholder = '',
    getOptionLabel = (option) => option.label,
    style = {}
}) {
  const rootRef = useRef(null)
  const [selectedValue, setSelectedValue] = useState(multiple ? [] : null);

  const controledValue = value ?? selectedValue;
  const controledOnChange = onChange ?? setSelectedValue;

  const toggleOptions = () => {
    var options = rootRef.current.querySelector(".Hive-selector-options-root");
    rootRef.current.querySelector('.arrow').classList.toggle('up');
    rootRef.current.querySelector('.arrow').classList.toggle('down');
    options.classList.toggle('hide');
  }

  const handelClickHeader = () => {
    toggleOptions();
  }

  const handelClickOption = (val) => {
    if(multiple){
      if(controledValue.includes(val)){
        controledOnChange(controledValue.filter(v => v != val));
      }else{
        controledOnChange([...controledValue, val]);
      }
    } else {
      controledOnChange(val);
      toggleOptions();
    }
  }

  const selectAllOptions = () => {
    if (allSelected()) {
      controledOnChange([]);
      return;
    }
    controledOnChange(options);
  }

  const handelClearAll = () => {
    if (multiple) {
        controledOnChange([]);
        return;
    }
    controledOnChange(null);
  }

  const isSelected = (val) => {
    return multiple && controledValue.includes(val);
  }

  const allSelected = () => {
    return controledValue.length === options.length;
  }

  const clearButtonClick = (e) => {
    handelClearAll();
    e.stopPropagation();
  }

  const showPlaceholder = multiple && controledValue.length == 0 || !multiple && controledValue == null;
  const display = multiple ? controledValue.map(option => {return getOptionLabel(option)}).join(", ") : controledValue && getOptionLabel(controledValue);

  return (
      <div ref={rootRef} className='Hive-selector-root' style={style}>
        <div className='Hive-selector-header .text-with-ellipsis' onClick={handelClickHeader}>
          <div className="Text-with-ellipsis">{showPlaceholder ? placeholder : display}</div>
          <div className="Icon-button" onClick={clearButtonClick}>&#10005;</div>
          <div className='Icon-button'>
            <div className="arrow up"/>
          </div>
        </div>
        <div className="Hive-selector-options-root">
          {multiple && <div className="Hive-selector-option" onClick={() => {selectAllOptions()}}>
            <div className='Icon-button'>
                <input type='checkbox' checked={allSelected()}/>
            </div>
            <div>Select All</div>
          </div>}
          {options.map((option) => {
            return (
                <div className="Hive-selector-option" onClick={() => {handelClickOption(option)}}>
                    {multiple && <div className='Icon-button'>
                            <input type='checkbox' checked={isSelected(option)}/>
                    </div>}
                    <div className='Text-with-ellipsis'>{getOptionLabel(option)}</div>
                </div>
            );
          })}
        </div>
      </div>
  )
}

export default HiveSelector;
