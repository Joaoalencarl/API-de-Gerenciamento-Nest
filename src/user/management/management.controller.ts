import { Controller, Get, Param } from '@nestjs/common';
import { ManagementService } from './management.service';
import { UserMiddleware } from '../middleware/user.middleware';
import { GroupMiddleware } from 'src/company/group/middleware/group.middleware';
import { EmployeeMiddleware } from 'src/company/employee/middleware/employee.middleware';

@Controller('management')
export class ManagementController {
  constructor(
    private managementService: ManagementService,
    private user: UserMiddleware,
    private group: GroupMiddleware,
    private employee: EmployeeMiddleware,
  ) {}

  @Get('/group/add-employee/:group_id/:employee_id')
  async addEmployeeToGroup(
    @Param('group_id') group_id: number,
    @Param('employee_id') employee_id: number,
  ) {
    await this.group.haveGroup(group_id);
    await this.employee.haveEmployee(employee_id);
    const group = await this.managementService.addEmployeeToGroup(
      group_id,
      employee_id,
    );
    return group;
  }
}
