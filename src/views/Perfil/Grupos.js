import React, { useContext, useEffect, useState } from 'react';
import '../../assets/styles/components/Grupos.css';
import AuthContext from '../../auth/AuthContext';
import Group from '../../components/perfil/Group';
import MyGroup from '../../components/perfil/MyGroup';
import { getGroup, getGroupsFilterLanguage } from '../../firebase/client';

const Grupos = () => {
  const { usuario } = useContext(AuthContext);
  const [groupList, setGroupList] = useState([]);
  // const [valueSelectLanguage, setValueSelectLanguaje] = useState('');
  const [valueSearch, setValueSearch] = useState('');
  const [searchGroups, setSearchGroups] = useState([]);

  useEffect(() => {
    getGroup(setGroupList);
  }, []);

  const selectLanguage = (e) => {
    e.preventDefault();
    getGroupsFilterLanguage(e.target.value, setGroupList);
  };
  const functionSearch = (e) => {
    e.preventDefault();
    const searchFilter = e.target.value.toLowerCase();
    setValueSearch(searchFilter);
  };

  const searchName = (e) => {
    e.preventDefault();
    if (valueSearch !== '') {
      getGroup(setSearchGroups);
    }

    if (searchGroups.length >= 1) {
      setGroupList(
        searchGroups.filter(
          (filterName) => filterName.name.toLowerCase().indexOf(valueSearch) >= 0,
        ),
      );
    }
  };

  return (
    <div className='fade-in animated container__badge'>
      <h2 className='container__badge-title'>Grupos</h2>
      <div className='box-group'>
        <div className='box-1'>
          <div className='box-my-group'>
            <MyGroup id={usuario.group} />
          </div>
        </div>
        <div className='box-2'>
          <div className='box-all-group'>
            <div className='box-filter'>
              <select
                className='form-select'
                aria-label='Default select example'
                value=''
                onChange={selectLanguage}
              >
                <option defaultValue>Selecciona un lenguaje de programación</option>
                <option value='Typescript'>Typescript</option>
                <option value='PHP'>PHP</option>
                <option value='Python'>Python</option>
                <option value='JavaScript'>JavaScript</option>
              </select>
              <form className='d-flex' onSubmit={searchName}>
                <input
                  className='form-control me-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                  value={valueSearch}
                  onChange={functionSearch}
                />
                <button
                  className='btn btn-outline-success btn-evento'
                  type='submit'
                >
                  Search
                </button>
              </form>
            </div>
            <div>
              <div className='row row-cols-2 row-cols-xs-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-4  g-4'>
                {groupList.map((group) => (
                  <Group key={group.id} id={group.id} name={group.name} lang={group.programmingLanguage} img={group.image} desc={group.description} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grupos;
