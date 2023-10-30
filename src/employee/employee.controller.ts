import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeMiddleware } from './middleware/employee.middleware';
import { UserMiddleware } from 'src/user/middleware/user.middleware';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlayFabMiddleware } from './middleware/playfab.middleware';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
    private middleware: EmployeeMiddleware,
    private userMiddleware: UserMiddleware,
    private playFab: PlayFabMiddleware,
  ) {}

  @Post('create/:user_id')
  @UseInterceptors(FileInterceptor('url_img'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Param('user_id') user_id: number,
    @Body()
    createEmployeeDto: CreateEmployeeDto,
  ) {
    const userId = user_id;
    await this.userMiddleware.haveUser(userId);
    await this.middleware.verify(createEmployeeDto);

    const employee = await this.employeeService.create(user_id, {
      ...createEmployeeDto,
    });
    return employee;
  }

  @Get('read-all/:user_id')
  async readAll(@Param('user_id') user_id: number) {
    const userId = user_id;
    await this.userMiddleware.haveUser(userId);
    return this.employeeService.readAll(userId);
  }

  @Get('read/:employe_id')
  async read(@Param('employe_id') employe_id: number) {
    await this.middleware.haveEmployee(employe_id);
    return this.employeeService.read(employe_id);
  }

  @Patch('update/:employe_id')
  @UseInterceptors(FileInterceptor('url_img'))
  async update(
    @Param('employe_id') employe_id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    await this.middleware.haveEmployee(employe_id);
    await this.middleware.verifyUpdate(updateEmployeeDto);
    return this.employeeService.update(employe_id, updateEmployeeDto);
  }

  @Delete('delete/:employe_id')
  async delete(@Param('employe_id') employe_id: number) {
    await this.middleware.haveEmployee(employe_id);
    return this.employeeService.delete(employe_id);
  }
}
