import { Reflector } from '@nestjs/core'

import { type Role } from '@boilerplate/core/interfaces/user'

export const Roles = Reflector.createDecorator<Role[]>()
