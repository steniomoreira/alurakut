import React, { useState } from 'react';
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

function ProfileRelationsBox(props){
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>

      {/* <ul>
        {usersFavorites.map((user, index) => (
            <li key={index}>
              <a href={`/users/${user}`} >
                <img src={`http://github.com/${user}.png`} />
                <span>{user}</span>
              </a>
            </li>
        ))}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const [community, setCommunity] = useState([]);

  const user = 'steniomoreira';
  const usersFavorites = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'diiegopaiivam',
    'Isaachintosh',
    'jamillyp'
  ];

  const [followers, setFollowers] = useState([]);

  React.useEffect(() => {
   fetch('https://api.github.com/users/steniomoreira/followers')
    .then(function(response) {
      return response.json();
    })
    .then(function(responseAll) {
      setFollowers(responseAll)
    });

    //GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '4c9f94ee75bf2e0fa878975baecc65',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
          urlMedia
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const communityDatoAPI = respostaCompleta.data.allCommunities;      
      setCommunity(communityDatoAPI)
    })
  }, []);

  const handleCreateCommunity = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const communityData = {
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      urlMedia: formData.get('media'),
      creatorSlug: user
    }

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(communityData)
    })
    .then(async (response) => {
      const dados = await response.json();
      setCommunity([
        ...community, 
        dados.registroCriado
      ])
    })
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
                required              
                placeholder="Qual vai ser o nome da sua comunidade?"
                aria-label="Qual vai ser o nome da sua comunidade?"
              />              
              <input
                type="text"
                name="image"
                required              
                placeholder="Coloque uma URL para usarmos de capa"
                aria-label="Coloque uma URL para usarmos de capa"
              />
              <input
                type="text"
                name="media"
                placeholder="Link de seu site/rede social"
                aria-label="Link de seu site/rede social"
              />
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({usersFavorites.length})
            </h2>

            <ul>
              {usersFavorites.map((user, index) => (
                  <li key={index}>
                    <a href={`http://github.com/${user}`} target="_blank" >
                      <img src={`http://github.com/${user}.png`} />
                      <span>{user}</span>
                    </a>
                  </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({community.length})
            </h2>
            <ul>
              {community.map((item, index) => (
                  <li key={index}>
                    <a href={item.urlMedia} target="_blank">
                      <img src={item.imageUrl} />
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