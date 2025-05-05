export class ProfileDto {
  id: number
  name: string
  biography: string
  favouriteGenres: string[]
  readKm: number
  readBooks: number = 20
  ranking: number = 10
  friendsNumber: number
  isAuthor: boolean
  email: string
  profileImage?: string | null = null
}
