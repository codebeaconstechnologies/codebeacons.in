export interface Certificate {
  id: string
  internName: string
  role: string
  startDate: string
  endDate: string
  issueDate: string
  fileType: 'pdf' | 'image'
  fileUrl: string
  status: 'valid' | 'revoked'
}
