interface author {
  id: string,
  name: string
}

export default interface FilterProps {
  authors: Array<author>,
  selectedAuthor?: string,
}