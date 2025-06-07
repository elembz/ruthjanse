export interface SerializedDocument {
  id:      string
  title?:  string
  year?:   number
  link?:   DocumentLink
  blocks?: any[]
  images?: SerializedImage[]
}

export interface DocumentLink {
  url:          string
  description?: string
}

export interface SerializedImage {
  id:     string
  width:  number
  height: number
}