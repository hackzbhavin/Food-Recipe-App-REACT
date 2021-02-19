import './App.css';
import Axios from 'axios';
import { useState } from 'react';
import RecipeTile from './RecipeTile';


function App() {
  const [query, setquery] = useState("")
  const [recipe, setrecipe] = useState([]) //this will help user to get the details instantly without waiting
const [healthLabels, sethealthLabels] = useState('vegan')

  const YOUR_APP_ID = ''; // Your App Id
  const YOUR_APP_KEY = ''; //Your App key

  var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=alcohol-free`

  async function getRecipes() {
    var result = await Axios.get(url);
    setrecipe(result.data.hits)
    console.log(result.data);
  }

  const onSubmit = (e)=>{
    //helps to reload only specific component not the whole page
    e.preventDefault();
    getRecipes();
  
  }
  
  return (
    <div className="app">
      <h1>Food Recepie Api 🍔</h1>
      <form className='app_searchform' onSubmit={onSubmit}>
        <input type='text' className='app_input' placeholder='enter the ingredient' value={query} onChange={(e) => setquery(e.target.value)} />
        <input type='submit' className='app_submit' value='search' />
      <select className='app_healthLabels'>
        <option onClick={()=>sethealthLabels('vegan')} >Vegan</option>
        <option onClick={()=>sethealthLabels('vegetarian')} >vegetarian</option>
        <option onClick={()=>sethealthLabels('dairy-free')} >dairy-free</option>
        <option onClick={()=>sethealthLabels('gluten-free')} >gluten-free</option>
        <option onClick={()=>sethealthLabels('wheat-free')} >wheat-free</option>
        <option onClick={()=>sethealthLabels('low-sugar')} >low-sugar</option>
        <option onClick={()=>sethealthLabels('egg-free')} >egg-free</option>
        <option onClick={()=>sethealthLabels('peanut-free')} >peanut-free</option>
        <option onClick={()=>sethealthLabels('tree-nut-free')} >tree-nut-free</option>
        <option onClick={()=>sethealthLabels('soy-free')} >soy-free</option>
        <option onClick={()=>sethealthLabels('fish-free')} >fish-free</option>

      </select>
      </form>
<div className='app_recipes'> {recipe.map(recipe=>{

return <RecipeTile recipe={recipe} />;

})}</div>
    </div>
  );
}

export default App;
