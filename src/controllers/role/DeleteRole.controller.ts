import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { logger } from '../../main/config';

import roleService from '../../domain/services/role.service';
import { DeleteRoleInterface } from '../../interfaces/useCaseDTO/Role.interfaces';

export class DeleteRoleFactorie implements ControllerInterface {
  constructor(private readonly deleteRole: DeleteRoleInterface) {
    this.deleteRole = deleteRole;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { t } = httpRequest;
      const id = httpRequest.params.id;

      const roleDb: any = await roleService.getById(id);
      if (!Array.isArray(roleDb) || roleDb.length === 0) {
        return badRequestHelper(new Error(t('msg_delete_role_id_doesnt_exists', { id })));
      }

      const handledRoleRegister: any = await this.deleteRole.delete(roleDb[0].id);

      return successHelper(handledRoleRegister);
    } catch (error) {
      logger.error(error.message);
      return serverErrorHelper(error);
    }
  }
}
