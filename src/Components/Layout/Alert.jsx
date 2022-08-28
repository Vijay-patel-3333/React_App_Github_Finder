import React from 'react'
import { useContext } from 'react'
import AlertContext from '../../Context/Alert/AlertContext'

function Alert() {

    const {alert}= useContext(AlertContext)

  return (
    alert !== null && (
        <p className="flex items-start mb-4 space-x-2">
            {alert.type=== 'error' && (
                <svg
                fill='none'
                viewBox='0 0 24 24'
                className='w-6 h-6 stroke-current mr-3'
              >
                <circle cx='12' cy='12' fill='#FECDD3'></circle>
                <path
                  d='M8 818 8M16 81-8 8'
                  stroke='red'
                  strokeWidth='2'
                ></path>
              </svg>
            )}
            <p className="flex-1 text-base font-semibold leading-7 text-white">
                <strong>{alert.msg}</strong>
            </p>
        </p>
    )
  )
}

export default Alert