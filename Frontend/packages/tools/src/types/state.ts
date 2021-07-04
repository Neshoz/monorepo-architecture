export type AppState = {
  idMap: Record<string, any>
  organization: {
    _id: string
    name: string
    campaigns: any[]
  }
}