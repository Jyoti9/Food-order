import { useContext, useEffect, useState } from "react";
import Meal from "./Meal";
import  CartContxt  from "../store/CartContext";
import { useHttps } from "../hooks/usehttps";
import Error from "./Error";
const initData={
    url: 'http://localhost:3000/meals',
    config: {},
    items: []
}
export default function MealCards(){
    const {isLoading,isError, data: meals} = useHttps(initData);
    if(isLoading){
        return <p className="text-center">Fetching Meals...</p>
    }
    if(isError){
        return <Error title="Data couldn't fetched" msg={isError}/>
    }
    return(
        <div id="meals">{meals.map((meal) => <Meal key={meal.id} meal={meal}/>)}</div>
    )
}