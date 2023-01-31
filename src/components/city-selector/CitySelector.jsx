import React, { useState, useCallback, useEffect, useMemo, memo } from 'react';
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import classNames from "classnames";
import './CitySelector.css'

const SuggestItem = memo(function SuggestItem(props){
    const {name,onClick} = props;

    return (
        <li className="city-suggest-li" onClick={() => onClick(name)}>
            {name}
        </li>
    );
});

const Suggest = memo(function Suggest(props){
    const {searchKey ,onSelect } = props;
    const[result,setResult] = useState([]);
    useEffect(()=>{
        fetch('/rest/search?key=' + encodeURIComponent(searchKey))
            .then(res => res.json())
            .then(data => {
                const {result , searchKey:sKey} = data;

                if(sKey === searchKey){
                    setResult(result);
                }
            });
    },[searchKey]);

    const fallBackResult = useMemo(()=>{
        if(!result.length){
            return [
                {
                    display:searchKey,
                },
            ];
        }

        return result;
    },[result,searchKey]);

    return (
        <div className="city-suggest">
            <ul className="city-suggest-ul">
                {fallBackResult.map(item =>{
                    return(
                        <SuggestItem
                            key={item.display}
                            name={item.display}
                            onClick={onSelect}
                        />
                    );
                })}
            </ul>
        </div>
    );
});

const CityItem = memo(function CityItem(props){
    const{ name, onSelect } = props;

    return(
        <li className="city-li" onClick={()=> onSelect(name)}>
            {name}
        </li>
    );

})

const CitySection = memo(function CitySection(props){
    const {title ,cities=[] ,onSelect } = props;

    return (
        <ul className="city-ul">
            <li className="city-li" key="title" data-cate={title}>
                {title}
            </li>
            {cities.map(city=>{
                return(
                    <CityItem
                        key={city.name}
                        name={city.name}
                        onSelect={onSelect}
                    />
                );
            })}
        </ul>
    );
})

const AlphaIndex = memo(function AlphaIndex(props){
    const{ alpha, onClick} = props;
    return (
        <i className="city-index-item" onClick={()=> onClick(alpha)}>
            {alpha}
        </i>
    )
})

const CityList = memo(function CityList(props){
        const {sections,toAlpha,onSelect} = props;
        return(
            <div className="city-list">
                <div className="city-cate">
                    {sections.map(section =>{
                        return (
                            <CitySection 
                            key={section.title}
                            title={section.title}
                            cities={section.cities}
                            onSelect={onSelect}
                            />
                        );
                    })}
                </div>
                <div className="city-index">
                    {alphabet.map(alpha =>{
                        return(
                            <AlphaIndex
                                key={alpha}
                                alpha={alpha}
                                onClick={toAlpha}
                            />
                        );
                    })}
                </div>
            </div>
        );
});

const alphabet = Array.from(new Array(26), (element,index)=>{
    return String.fromCharCode(65+index);
})

const CitySelector = memo(function CitySelector(props){
    
    const {
        onBack,
        isLoading,
        cityData,
        onSelect,
        fetchCityData,
        show,
    } = props;


    const [searchKey, setSearchKey] = useState('');
    
    const key = useMemo(()=> searchKey.trim(),[searchKey]);

    useEffect(() => {
        if(!show || cityData || isLoading){
            return;
        }
        fetchCityData();
    },[show,cityData,isLoading])


    const toAlpha = useCallback(alpha => {
        document.querySelector(`[data-cate='${alpha}']`).scrollIntoView();
    }, []);


    const outputCitySections = ()=>{

        if(isLoading){
            return <div>loading</div>;
        }
        
        if(cityData){
            return (
                <CityList
                    sections={cityData.cityList}
                    onSelect={onSelect}
                    toAlpha={toAlpha}
                />
                
            );
        }

        return <div>error</div>;
    };
    
    return(
        <div className={classNames("city-selector",{hidden:!show})}>
            <div className="city-search">
                <div className="search-back" onClick={() => onBack()}>
                    <svg width="42" height="42">
                        <polyline
                            points="25,13 16,21 25,29"
                            stroke="#fff"
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    <input
                        type="text" 
                        value={searchKey}
                        className="search-input"
                        placeholder="城市、车站的中文或拼音"
                        onChange={e => setSearchKey(e.target.value)}
                    />
                </div>
                <i
                    onClick={() => setSearchKey('')}
                    className={classNames('search-clean',{
                        hidden: key.length ===0,
                    })}
                >
                    &#xf063;
                </i>
            </div>
            {outputCitySections()}
        </div>
    );
});

export default CitySelector;

            




