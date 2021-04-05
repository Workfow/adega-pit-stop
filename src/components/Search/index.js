import { useContext } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import styles from '../../styles/components/Search.module.css';
import { InventoryContext } from '../../contexts/InventoryContext';

export default function Search() {
  const { searchData, setSearchData, isSearching, handleSearch, handleStopSearch } = useContext(InventoryContext);

  return(
    <div className={styles.inputBox}>
      <input value={searchData} onChange={event => setSearchData(event.target.value)} id="search" type="text" placeholder=" "/>
      <label htmlFor="search">Digite o nome do produto que deseja pesquisar</label>
      {isSearching && <FiX size={25} onClick={handleStopSearch} />}
      <button onClick={handleSearch} >
        <FiSearch size={25} color="#FFF" />
      </button>
    </div>
  )
}