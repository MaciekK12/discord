import React, { useEffect, useState} from 'react'
import axios from 'axios'

const Auth = () => {
  const [data, setData] = useState(null);
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    // const getUserGuilds = async (accessToken) => {
    //     try {
    //         const response = await axios.get('https://discord.com/api/users/@me/guilds', {
    //             headers: {
    //                 authorization: `${accessToken.data.token_type} ${accessToken.data.access_token}`
    //             }
    //         })
    //         return response.data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const getUserInfo = async (accessToken) => {
        try {
            const response = await axios.get('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${accessToken.data.token_type} ${accessToken.data.access_token}`
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const getToken = async () => {
        try {
            const options = new URLSearchParams({
                client_id: '1078976811465183263',
                client_secret: 'ZjlmzO2wzSdmh1ak6NslRhxoZNgr6tbq',
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost:3000',
                // redirect_uri: 'https://codebusters.click/',
                // scope: 'identify%20guilds'
            })
            const headers = new URLSearchParams({
                'Content-Type': 'application/x-www-form-urlencoded'
            } )
            const result = await axios.post('https://discord.com/api/oauth2/token', options, { headers: headers })

            return result
        } catch (error) {
            console.log(error)
        }
    }

    const getInfo = async () => {
        const accessToken = await getToken()
        const userInfo = await getUserInfo(accessToken)
        // const guildInfo = await getUserGuilds(accessToken)
        // console.log({ userInfo, guildInfo })
        setData(userInfo)
        console.log(userInfo)
        console.log(userInfo.avatar)

    }

    const redirDiscord = () => {
        window.location.href='https://discord.com/oauth2/authorize?response_type=code&client_id=1078976811465183263&scope=identify%20guilds.join&state=15773059ghq9183habn&redirect_uri=http%3A%2F%2Flocalhost%3A3000&prompt=consent'
    }

    const reset = () => {
        window.location.href= 'http://localhost:3000/'
    }

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())
        if (!params.code) return
        getInfo(params.code)
    },[])

    return (
        <>  
            {code && data ?
                (
                    <>
                        <img src={`https://cdn.discordapp.com/avatars/1078995535748415488/${data.avatar}.webp?size=100`} alt=" " aria-hidden="true"></img>
                        <div>user: {data?.username}</div>
                        <div>id: {data?.id}</div>
                        <button onClick={reset}>RESET</button>
                    </>
                )
                :
                (
                    <>
                        <button onClick={redirDiscord} >CONNECT TO DISCORD</button>
                    </>
                )
            }
        </>
    )
}

export default Auth


// function MyComponent() {

//   useEffect(() => {
//     // perform some asynchronous task
//     const fetchData = async () => {
//       const response = await fetch('https://example.com/data')
//       const result = await response.json()
   
//     }
//     fetchData()
//   }, [])

//   return (
//     <div>
//       {data ? (
//         <ul>
//           {data.map(item => (
//             <li key={item.id}>{item.name}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// }