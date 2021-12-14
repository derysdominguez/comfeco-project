import React from 'react';
import '../../assets/styles/components/SeeGroup.css';

const SeeGroup = ({ members, group }) => {
  return (
    <div className='container group'>
      <div className='row'>
        <div className='col-12 col-md-3'>
          <img src={group.image} alt='icono del grupo' className='imgGroup' />
        </div>
        <div className='col-12 col-md-9'>
          <div className='headerGroup'>
            <h2>{group.name}</h2>
            <span className='text-muted'>{group.programmingLanguage}</span>
          </div>
          <div className='groupDesc'>
            <p>{group.description}</p>
          </div>
        </div>
      </div>
      <div className='groupMembers'>
          <h2 className='text-muted'>Miembros</h2>
        {
          members.map((member, idx) => {
            return (
              <div key={idx} className='row'>
                <div className='col-3 text-center'>
                  <img src={member.photoUrl} />
                </div>
                <div className='col-9 groupCard'>
                  <h3>{member.name}</h3>
                  <div className='secondInfoMember'>
                    <span>
                      <i className='fas fa-envelope' />
                      {member.email}
                    </span>
                    {
                      member.github ? (
                        <span>
                          <i className='fab fa-github' />
                          {member.github}
                        </span>
                      ) :
                        ''
                    }
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default SeeGroup;
