import './App.css'
import Header from "./components/Header/Header.tsx";
import Chatbox from "./components/Chatbox/Chatbox.tsx";
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import axios from 'axios';


function App() {
  const client_key = import.meta.env.VITE_client_id

  return (
      <div id="app">
          <Header/>
          <GoogleOAuthProvider clientId={client_key}>
            <div className="App">
              <GoogleLogin
                onSuccess= {async ({ credential }) => {
                  const _ = await axios.get('http://localhost:8000/auth/google', 
                    {
                      headers: {'Authorization': `Bearer ${credential}`},
                      withCredentials: true,
                    }
                  );

                  const result = await axios.get('http://localhost:8000/api/me', {
                    withCredentials: true,
                  });

                  console.log('Server response:', result.data);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          </GoogleOAuthProvider>
          <Chatbox/>
      </div>
  )
}

export default App
