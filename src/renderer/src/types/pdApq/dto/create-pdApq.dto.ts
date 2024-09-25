import { CreateUserInterface } from '../../user/dto/create-user.dto'
import { ConnectUserInterface } from '../../user/dto/connect-user.dto'
import { CreateMstComInterface } from '../../mstCom/dto/create-mstCom.dto'
import { ConnectMstComInterface } from '../../mstCom/dto/connect-mstCom.dto'

interface CreatePdApqUserRelationInputInterface {
  create?: CreateUserInterface
  connect?: ConnectUserInterface
}
interface CreatePdApqComRelationInputInterface {
  create?: CreateMstComInterface
  connect?: ConnectMstComInterface
}
interface CreatePdApqSectionHeadUserRelationInputInterface {
  create?: CreateUserInterface
  connect?: ConnectUserInterface
}

export interface CreatePdApqInterface {
  user?: CreatePdApqUserRelationInputInterface
  date: Date
  com?: CreatePdApqComRelationInputInterface
  section: string
  avaibility: number
  performance: number
  quality: number
  sectionHeadUser?: CreatePdApqSectionHeadUserRelationInputInterface
  createdBy?: string
  updatedBy?: string
}
