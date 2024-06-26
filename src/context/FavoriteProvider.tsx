'use client'
import useLocalStorage from '@rehooks/local-storage'
import { createContext, ReactNode, useContext } from 'react'

interface FavoriteContextType {
  addFavorite: (id: string) => void,
  favoriteExist: (id: string) => boolean,
  favorites: string[],
  removeFavorite: (id: string) => void
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined)

export const useFavorites = (): FavoriteContextType => {
  const context = useContext(FavoriteContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider')
  }
  return context
}

export const FavoriteProvider = ({ children }: {children: ReactNode}) => {
  const [
    favorites, 
    setFavorites
  ]  = useLocalStorage<Array<string>>("favorite", [])

  const addFavorite = (id: string) => {
    setFavorites(favorites ? [...favorites, id] : [id]);
  }

  const removeFavorite = (id: string) => {
    setFavorites(() => 
      favorites ? favorites.filter((favorite) => favorite !== id) : []
    )
  }

  const favoriteExist = (id: string) => {
    return favorites.includes(id)
  }

  const value = {
    favorites: favorites || [],
    addFavorite,
    removeFavorite,
    favoriteExist,
  }

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
}