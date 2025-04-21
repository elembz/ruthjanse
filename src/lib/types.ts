export interface SerializedDocument {
  id:      string
  title?:  string
  year?:   number
  link?:   DocumentLink
  blocks?: any[]
}

export interface DocumentLink {
  url:          string
  description?: string
}