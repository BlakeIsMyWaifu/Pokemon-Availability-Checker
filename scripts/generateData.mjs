import getData from './getPokemon.mjs';
import saveData from './saveData.mjs';

const data = await getData(['bulbasaur', 'ivysaur'])
await saveData(data)