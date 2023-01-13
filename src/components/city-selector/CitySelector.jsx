import { keyboard } from "@testing-library/user-event/dist/keyboard";
import classNames from "classnames";

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

const CitySelector = memo(function CitySelector(props){
    const {
        show,
        cityData,
        isLoading,
        onBack,
        fetchCityData,
        onSelect,
    } = props;

    const [searchKey, setSearchKey] = useState('');
    
    const outputCitySections = ()=>{
        if(isLoading){
            return <div>loading</div>;
        }

        if(cityData){
            return (
                <CityList
                    sections={cityData.CityList}
                    onSelect={onSelect}
                    toAlpha={toAlpha}
                />
            );
        }

        return <div>error</div>;
    };
    
    return(
        <div className={classNames('city-selector',{hidden:!show})}>
            <div className="city-search">
            </div>
            {Boolean(key) && (
                <Suggest ></Suggest>
            )}
            {outputCitySections()}
        </div>
    );
});

export default CitySelector;