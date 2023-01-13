import React,{useEffect,useState} from "react"
import {Wrapper} from "./style"
import IceBanner from "./IceBanner"
import {connect} from "react-redux"
import {getShopList,getMapShow} from "./store/actionCreators"

const Nearby =(props) =>{
    const {mapShow,shopList} = props;
    const {getShowListDispatch, getMapShowDispatch} = props;
    const openMap = ()=>{
        getMapShowDispatch(mapShow);
    };
    useEffect(()=>{
        getShowListDispatch();
    },[]);
    return(
        <Wrapper>
            <IceBanner message={shopList} />
        </Wrapper>
    );

};

const mapStateToProps =(state) =>{
    return {
        mapShow: state.nearby.mapShow,
        shopList: state.nearby.shopList,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return {
        getShowListDispatch() {
            dispatch(getShopList());
        },
        getMapShowDispatch(mapShow){
            dispatch(getMapShow(mapShow));
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Nearby);