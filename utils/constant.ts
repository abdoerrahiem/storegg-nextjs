import Cookies from 'js-cookie'

export const API = 'https://abdoerrahiem-storegg.herokuapp.com/api/v1'

export const IMAGE_API = 'https://abdoerrahiem-storegg.herokuapp.com/uploads'

export const configHeader = { headers: { 'Content-Type': 'application/json' } }

export const configHeaderWithToken = (token: string) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
}

export const token = Cookies.get('token')
