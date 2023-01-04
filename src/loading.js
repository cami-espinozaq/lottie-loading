import React, { useEffect, useState } from 'react'
import FadeIn from 'react-fade-in'
import Lottie from 'react-lottie'
import 'bootstrap/dist/css/bootstrap.css'
import * as loadingData from './loading.json'
import * as doneData from './done.json'

const LOTTIE_HEIGHT = 180

const Loading = () => {
  const [done, setDoneState] = useState(null)
  const [loading, setLoadingState] = useState(null)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const defaultOptions2 = {
    ...defaultOptions,
    loop: false,
    animationData: doneData,
  }

  useEffect(() => {
    setTimeout(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()

      setLoadingState(true)

      setTimeout(() => {
        setDoneState(data)
      }, 2600)
    }, 2100)
  })

  return (
    <div>
      {!done ? (
        <FadeIn>
          <div className="d-flex justify-content-center align-items-center">
            <h1>fetching data</h1>
            {!loading ? (
              <Lottie
                options={defaultOptions}
                height={LOTTIE_HEIGHT}
                width={LOTTIE_HEIGHT}
              />
            ) : (
              <Lottie
                options={defaultOptions2}
                height={LOTTIE_HEIGHT}
                width={LOTTIE_HEIGHT}
              />
            )}
          </div>
        </FadeIn>
      ) : (
        <h1>success!</h1>
      )}
    </div>
  )
}

export default Loading
