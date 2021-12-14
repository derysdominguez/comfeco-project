import React, { useContext } from 'react';
import '../../assets/styles/components/CanJoin.css';
import AuthContext from '../../auth/AuthContext';
import { db, setActivity } from '../../firebase/client';

const CanJoin = ({ id, lang, name, desc, img, onClose }) => {

  const { usuario } = useContext(AuthContext);
  const handleJoin = async () => {
    await db.collection('usuarios').doc(usuario.uid).set({
      group: id,
    }, { merge: true });
    await setActivity(
      'group',
      'Has ingresado en un nuevo grupo ¡Genial!',
      'Entraste a grupo',
      'success',
      usuario.uid,
    );
    onClose();
  };

  return (
    <div className='CanJoin'>
      <img src={img} alt='group image' />
      <h1>{name}</h1>
      <h2 className='text-muted'>{lang}</h2>
      <p>{desc}</p>
      <p className='cta'>¿Quieres unirte a este grupo?</p>
      <button type='button' className='btn d-inline-block btn-outline-secondary btn-evento' onClick={handleJoin}>Unirme</button>
    </div>
  );
};

export default CanJoin;
