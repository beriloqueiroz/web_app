'use client'

import { Notification } from "@/helpers/types";
import { validCityState, validateEmail } from "@/helpers/util";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("berilo@gmail.com")
  const [city, setCity] = useState("Fortaleza - CE")
  const [notification, setNotification] = useState<Notification | null>(null)
  const [run, setRun] = useState(true)


  useEffect(() => {
    async function getChargersData(citySt: string, emailSt: string) {
        console.log("verifing")
        await new Promise(r => setTimeout(r, 3000));
        const res = await fetch("/api?city="+citySt+"&email="+emailSt)
        
        if (!res.ok) {
          return;
        }
        
        const {notification} :{notification:Notification} = await res.json()
        if (!notification) {
          setNotification(null)
        } 
        const idBlock = localStorage.getItem("notification_id")
        if (idBlock==notification.ScheduleNotification.ID) return;
        setNotification(notification) 
    }
      let citySt = localStorage.getItem("city")
      let emailSt = localStorage.getItem("email")
      if (!citySt) {
        citySt = city
      }
      if (!emailSt) {
        emailSt=email
      }
      if (citySt && emailSt && validateEmail(emailSt) && validCityState(citySt || "") && !notification)
          getChargersData(citySt, emailSt)

      let interval = null
      if (run) {
        interval = setInterval(()=>{
          setRun(false)
        }, 2000)
      }
      if (interval)
      return ()=>{
        clearInterval(interval)
        setRun(true)
      }
     
      
  }, [run]);



  function changeEmail(e:ChangeEvent<HTMLInputElement>){
    setEmail(e.target.value)
  }
  function changeCity(e:ChangeEvent<HTMLInputElement>){
    setCity(e.target.value)
  }

  function closeAct() {
    if (notification)
      localStorage.setItem("notification_id", notification.ScheduleNotification.ID)      
    setNotification(null)
  }

  function update() {
    localStorage.setItem("notification_id", "")      
    localStorage.setItem("email", email);
    localStorage.setItem("city", city);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col justify-center gap-3">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>      
            <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John@gmail.com" 
            required value={email} onChange={changeEmail}/>
          </div>
          <div>
          <label htmlFor="cidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">cidade</label>      

            <input type="text" id="fcidade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fortaleza - CE" 
            required value={city} onChange={changeCity}/>
          </div>
        </div>
        <button type="button" onClick={()=>update()} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Atualizar</button>
      </div>


      {
        notification &&
        <div id="toast-default" className="flex items-center w-fit max-w-3xl p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                  <path stroke="currentColor" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>
              </svg>
              <span className="sr-only">Fire icon</span>
          </div>
          <div className="ms-3 text-sm font-normal flex gap-2 m-auto justify-around w-full p-4">
            <div>
              <span>
                Previsão do Tempo: Póximos 4 Dias
              </span>
              <ul>
                <li>
                  <strong>Hoje </strong>
                Máxima: ${notification.Message.Clima.Previsao[0].Maxima}°C / Mínima: ${notification.Message.Clima.Previsao[0].Minima}°C
                </li>
                <li>
                  <strong>Amanhã:  </strong>
                Máxima: ${notification.Message.Clima.Previsao[1].Maxima}°C / Mínima: ${notification.Message.Clima.Previsao[1].Minima}°C
                </li>
                <li>
                  <strong>Dia 3: </strong>
                Máxima: ${notification.Message.Clima.Previsao[2].Maxima}°C / Mínima: ${notification.Message.Clima.Previsao[2].Minima}°C
                </li>
                <li>
                  <strong>Dia 4: </strong>
                Máxima: ${notification.Message.Clima.Previsao[3].Maxima}°C / Mínima: ${notification.Message.Clima.Previsao[3].Minima}°C
                </li>
              </ul>
            </div>
            {notification.Message.Ondas.Atualizacao!=""&& <>
              <div className=" bg-slate-700 h-100 w-1 mx-2"></div>
            <div>
            <span>
                Previsão de ondas para hoje
              </span>
              <ul>
                <li>
                  <strong>Manhã: </strong>Altura: {notification.Message.Ondas.Manha.Altura}, Agitação: {notification.Message.Ondas.Manha.Agitacao}
                </li>
                <li>
                  <strong>Tarde: </strong>Altura: {notification.Message.Ondas.Tarde.Altura}, Agitação: {notification.Message.Ondas.Tarde.Agitacao}
                </li>
                <li>
                  <strong>Noite: </strong>Altura: {notification.Message.Ondas.Noite.Altura}, Agitação: {notification.Message.Ondas.Noite.Agitacao}
                </li>
              </ul>
            </div>
            </>
            }
            
            
          </div>
          <button type="button" onClick={()=>closeAct()} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
          </button>
      </div>
      }
    </main>
  );
}
