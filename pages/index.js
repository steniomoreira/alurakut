import { useState } from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar({githubUser}) {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr/>

      <a className="boxLink" href={`https://github.com/${githubUser}`}>
        @{githubUser}
      </a>
      <hr/>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const [community, setCommunity] = useState([{
    title: 'Alura',
    image: 'alura-challenges.png',
    url: 'https://github.com/alura-challenges'
  }]);

  const user = 'steniomoreira';
  const usersFavorites = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  const handleCreateCommunity = (event) => {
    event.preventDefault();

    const inputValue = new FormData(event.target);
    setCommunity([
      ...community, 
      {
        title: inputValue.get('title'),
        image: inputValue.get('image'),
        url: inputValue.get('url')
      }
    ]);
  }

  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid>        
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(event)=>handleCreateCommunity(event)}>
              <input
                type="text"
                name="title"               
                placeholder="Qual vai ser o nome da sua comunidade?"
                aria-label="Qual vai ser o nome da sua comunidade?"
              />              
              <input
                type="text"
                name="image"               
                placeholder="Coloque uma URL para usarmos de capa"
                aria-label="Coloque uma URL para usarmos de capa"
              />
              <input
                type="text"
                name="url"
                placeholder="Link de sua rede social"
                aria-label="Link de sua rede social"
              />
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({usersFavorites.length})
            </h2>

            <ul>
              {usersFavorites.map((user, index) => (
                  <li key={index}>
                    <a href={`/users/${user}`} >
                      <img src={`http://github.com/${user}.png`} />
                      <span>{user}</span>
                    </a>
                  </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <ul>
              {community.map((item, index) => (
                  <li key={index}>
                    <a href={`${item.url}`} target="_blank">
                      <img src={`http://github.com/${item.image}.png`} />
                      <span>{item.title}</span>
                    </a>
                  </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}